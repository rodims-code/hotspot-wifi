import qrcode
from io import BytesIO
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import HotspotConfig, UserSession, ConnectionLog
from .serializers import HotspotConfigSerializer, UserSessionSerializer, ConnectionLogSerializer
from .utils import start_hotspot_platform, stop_hotspot_platform
from .services import create_user_session

class HotspotStartView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # JWT required
    def post(self, request):
        cfg = HotspotConfig.objects.first()
        if not cfg:
            return Response({"error": "Aucune configuration trouvée"}, status=404)
        try:
            res = start_hotspot_platform(cfg.ssid, cfg.password)
            return Response({"message": "Hotspot started", "detail": str(res)})
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class HotspotStopView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        try:
            stop_hotspot_platform()
            return Response({"message": "Hotspot stopped"})
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class QRCodeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        cfg = HotspotConfig.objects.first()
        if not cfg:
            return Response({"error": "Aucune configuration trouvée"}, status=404)
        data = f"WIFI:T:WPA;S:{cfg.ssid};P:{cfg.password};;"
        img = qrcode.make(data)
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        return HttpResponse(buffer.getvalue(), content_type="image/png")

class UserSessionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        sessions = UserSession.objects.all().order_by("-start_time")
        serializer = UserSessionSerializer(sessions, many=True)
        return Response(serializer.data)

    def post(self, request):
        mac = request.data.get("mac_address")
        if not mac:
            return Response({"error": "mac_address is required"}, status=400)
        session = create_user_session(mac)
        return Response(UserSessionSerializer(session).data, status=status.HTTP_201_CREATED)

class VerifySessionView(APIView):
    permission_classes = [permissions.AllowAny]  # utilisé par le portail captive pour vérifier la MAC
    def post(self, request):
        mac = request.data.get("mac_address")
        if not mac:
            return Response({"error": "mac_address required"}, status=400)
        session = UserSession.objects.filter(mac_address=mac).order_by("-start_time").first()
        if session and session.state == UserSession._meta.get_field('state').choices[0][0]:
            # but we'll check value directly
            pass
        # Sa manière correcte :
        if session and session.state == "EN_COURS":
            return Response({"authorized": True})
        return Response({"authorized": False, "next_start_time": getattr(session, "start_time", None)})

class ConnectionLogView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        logs = ConnectionLog.objects.all().order_by("-timestamp")
        serializer = ConnectionLogSerializer(logs, many=True)
        return Response(serializer.data)

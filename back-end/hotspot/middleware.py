from django.http import JsonResponse
from .models import UserSession, State

class HotspotAccessMiddleware:
    """
    Vérifie header X-Client-MAC. Si la MAC n'a pas de session EN_COURS => 403.
    (Adapter selon ton architecture : si la requête est destinée à admin, bypass.)
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # bypass pour admin / docs / token obtain
        path = request.path
        if path.startswith("/admin") or path.startswith("/api/hotspot") or path.startswith("/api/token"):
            return self.get_response(request)

        mac = request.headers.get("X-Client-MAC")
        if not mac:
            return JsonResponse({"error": "MAC address required in X-Client-MAC"}, status=403)

        # chercher la dernière session pour cette MAC
        session = UserSession.objects.filter(mac_address=mac).order_by("-start_time").first()
        if not session or session.state != State.EN_COURS:
            return JsonResponse({"error": "Access denied: no active session"}, status=403)

        return self.get_response(request)

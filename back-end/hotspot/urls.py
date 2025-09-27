from django.urls import path
from .views import HotspotStartView, HotspotStopView, QRCodeView, UserSessionView, VerifySessionView, ConnectionLogView

urlpatterns = [
    path("api/hotspot/start/", HotspotStartView.as_view(), name="hotspot-start"),
    path("api/hotspot/stop/", HotspotStopView.as_view(), name="hotspot-stop"),
    path("api/hotspot/qrcode/", QRCodeView.as_view(), name="hotspot-qr"),
    path("api/sessions/", UserSessionView.as_view(), name="sessions"),
    path("api/sessions/verify/", VerifySessionView.as_view(), name="session-verify"),
    path("api/logs/", ConnectionLogView.as_view(), name="logs"),
]

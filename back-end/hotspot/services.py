from django.utils import timezone
from datetime import timedelta
from .models import UserSession, ConnectionLog, State

def create_user_session(mac_address, duration_hours=1):
    start = timezone.now()
    end = start + timedelta(hours=duration_hours)
    session = UserSession.objects.create(
        mac_address=mac_address,
        start_time=start,
        end_time=end,
        state=State.EN_COURS
    )
    ConnectionLog.objects.create(user_session=session, action=ConnectionLog.CONNEXION)
    return session

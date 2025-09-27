from django.utils import timezone
from datetime import timedelta
from .models import UserSession, ConnectionLog, State

def check_sessions():
    now = timezone.now()
    en_cours = UserSession.objects.filter(state=State.EN_COURS)
    for session in en_cours:
        if session.end_time and now > session.end_time:
            # marquer expirée -> ATTENTE et programmer la prochaine start_time
            session.state = State.ATTENTE
            # on définit la prochaine autorisation possible après 30 minutes
            session.start_time = now + timedelta(minutes=30)
            session.end_time = None
            session.save()
            ConnectionLog.objects.create(user_session=session, action=ConnectionLog.DECONNEXION)

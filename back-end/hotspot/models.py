from django.db import models
from django.utils import timezone
from datetime import timedelta

class HotspotConfig(models.Model):
    ssid = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.ssid} ({'Actif' if self.active else 'Inactif'})"


class State(models.TextChoices):
    EN_COURS = "EN_COURS", "En cours"
    EXPIREE = "EXPIREE", "Expirée"
    ATTENTE = "ATTENTE", "En attente"


class UserSession(models.Model):
    mac_address = models.CharField(max_length=50)
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(blank=True, null=True)
    state = models.CharField(max_length=20, choices=State.choices, default=State.ATTENTE)

    DEFAULT_DURATION = timedelta(hours=1)

    def save(self, *args, **kwargs):
        # si pas d'end_time, on calcule
        if not self.end_time and self.start_time:
            self.end_time = self.start_time + self.DEFAULT_DURATION

        now = timezone.now()
        if self.start_time <= now < (self.end_time or now):
            self.state = State.EN_COURS
        elif self.end_time and now >= self.end_time:
            self.state = State.EXPIREE
        else:
            self.state = State.ATTENTE

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.mac_address} [{self.state}]"


class ConnectionLog(models.Model):
    CONNEXION = "CONNEXION"
    DECONNEXION = "DECONNEXION"

    ACTION_CHOICES = [
        (CONNEXION, "Connexion"),
        (DECONNEXION, "Déconnexion"),
    ]

    user_session = models.ForeignKey(UserSession, on_delete=models.CASCADE, related_name="logs")
    timestamp = models.DateTimeField(auto_now_add=True)
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)

    def __str__(self):
        return f"{self.user_session.mac_address} - {self.action} @ {self.timestamp}"

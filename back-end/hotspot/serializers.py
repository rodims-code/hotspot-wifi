from rest_framework import serializers
from .models import HotspotConfig, UserSession, ConnectionLog

class HotspotConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotspotConfig
        fields = "__all__"

class UserSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSession
        fields = "__all__"
        read_only_fields = ("end_time", "state", "start_time")

class ConnectionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectionLog
        fields = "__all__"
        read_only_fields = ("timestamp",)

from rest_framework import serializers
from .models import (
    TradingProject,
    CybersecurityProject,
    ProgrammingProject,
    AudioProject,
    AIProject,
)

class TradingProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = TradingProject
        fields = "__all__"

class CybersecurityProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CybersecurityProject
        fields = "__all__"

class ProgrammingProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgrammingProject
        fields = "__all__"

class AudioProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioProject
        fields = "__all__"

class AIProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIProject
        fields = "__all__"

from rest_framework import viewsets
from .models import (
    TradingProject,
    CybersecurityProject,
    ProgrammingProject,
    AudioProject,
    AIProject,
)
from .serializers import (
    TradingProjectSerializer,
    CybersecurityProjectSerializer,
    ProgrammingProjectSerializer,
    AudioProjectSerializer,
    AIProjectSerializer,
)


class TradingProjectViewSet(viewsets.ModelViewSet):
    queryset = TradingProject.objects.all()
    serializer_class = TradingProjectSerializer


class CybersecurityProjectViewSet(viewsets.ModelViewSet):
    queryset = CybersecurityProject.objects.all()
    serializer_class = CybersecurityProjectSerializer


class ProgrammingProjectViewSet(viewsets.ModelViewSet):
    queryset = ProgrammingProject.objects.all()
    serializer_class = ProgrammingProjectSerializer


class AudioProjectViewSet(viewsets.ModelViewSet):
    queryset = AudioProject.objects.all()
    serializer_class = AudioProjectSerializer


class AIProjectViewSet(viewsets.ModelViewSet):
    queryset = AIProject.objects.all()
    serializer_class = AIProjectSerializer

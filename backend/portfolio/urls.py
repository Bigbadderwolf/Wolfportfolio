from rest_framework.routers import DefaultRouter
from .views import (
    TradingProjectViewSet,
    CybersecurityProjectViewSet,
    ProgrammingProjectViewSet,
    AudioProjectViewSet,
    AIProjectViewSet,
)

router = DefaultRouter()
router.register(r"trading", TradingProjectViewSet)
router.register(r"cybersecurity", CybersecurityProjectViewSet)
router.register(r"programming", ProgrammingProjectViewSet)
router.register(r"audio", AudioProjectViewSet)
router.register(r"ai", AIProjectViewSet)

urlpatterns = router.urls



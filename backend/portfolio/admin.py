
from django.contrib import admin
from .models import (
    TradingProject, CybersecurityProject, ProgrammingProject,
    AudioProject, AIProject
)

admin.site.register(TradingProject)
admin.site.register(CybersecurityProject)
admin.site.register(ProgrammingProject)
admin.site.register(AudioProject)
admin.site.register(AIProject)


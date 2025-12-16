from django.db import models


# -------- Trading --------
class TradingProject(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.TextField(blank=True)
    detailed_description = models.TextField(blank=True)
    chart_image = models.ImageField(upload_to="trading/charts/", blank=True, null=True)
    strategy_used = models.CharField(max_length=100, blank=True, null=True)  # e.g., RSI, MACD
    timeframe = models.CharField(max_length=50, blank=True, null=True)       # e.g., 1h, 4h
    github_link = models.URLField(blank=True, null=True)
    demo_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# -------- Cybersecurity --------
class CybersecurityProject(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.TextField(blank=True)
    detailed_description = models.TextField(blank=True)
    exploit_demo = models.FileField(upload_to="cyber/demos/", blank=True, null=True)
    cve_id = models.CharField(max_length=50, blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    writeup = models.FileField(upload_to="cyber/writeups/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# -------- Programming --------
class ProgrammingProject(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.TextField(blank=True)
    detailed_description = models.TextField(blank=True)
    language = models.CharField(max_length=50, blank=True, null=True)  # e.g., Python, JS
    code_snippet = models.TextField(blank=True, null=True)
    repo_link = models.URLField(blank=True, null=True)
    demo_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.language or 'Code'} - {self.title}"


# -------- Audio Manipulation --------
class AudioProject(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.TextField(blank=True)
    detailed_description = models.TextField(blank=True)
    audio_file = models.FileField(upload_to="audio/files/", blank=True, null=True)
    waveform_image = models.ImageField(upload_to="audio/waveforms/", blank=True, null=True)
    software_used = models.CharField(max_length=100, blank=True, null=True)
    demo_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# -------- AI Engineering --------
class AIProject(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.TextField(blank=True)
    detailed_description = models.TextField(blank=True)
    model_type = models.CharField(max_length=100, blank=True, null=True)   # e.g., LLM, CNN, Transformer
    dataset_used = models.CharField(max_length=200, blank=True, null=True)
    demo_link = models.URLField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    image_preview = models.ImageField(upload_to="ai/previews/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

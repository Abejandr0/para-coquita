from django.db import models
from django.utils import timezone

class Reason(models.Model):
    text = models.TextField()
    def __str__(self): return self.text[:50]

class QuickChallenge(models.Model):
    text = models.TextField()
    def __str__(self): return self.text[:50]

class WeeklyChallenge(models.Model):
    text = models.TextField()
    def __str__(self): return self.text[:50]

class QuizQuestion(models.Model):
    question = models.CharField(max_length=255)
    options = models.JSONField(help_text='List of strings like ["Pizza", "Tacos"]')
    correct_index = models.IntegerField()
    def __str__(self): return self.question

class RouletteOption(models.Model):
    text = models.CharField(max_length=255)
    def __str__(self): return self.text

class MysteryContent(models.Model):
    content_type = models.CharField(max_length=50, default='text')
    content = models.TextField()
    def __str__(self): return self.content[:50]

class TimelineEvent(models.Model):
    date_str = models.CharField(max_length=100)
    title = models.CharField(max_length=255, blank=True)
    desc = models.TextField()
    def __str__(self): return f"{self.date_str} - {self.title}"

class PlaylistSong(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    story = models.TextField(blank=True)
    def __str__(self): return self.title

class MapPin(models.Model):
    x = models.FloatField()
    y = models.FloatField()
    icon = models.CharField(max_length=50)
    label = models.CharField(max_length=255)
    desc = models.TextField()
    def __str__(self): return self.label

class CalendarEvent(models.Model):
    day = models.CharField(max_length=10)
    month = models.CharField(max_length=20)
    title = models.CharField(max_length=255)
    desc = models.TextField()
    def __str__(self): return self.title

class DiaryEntry(models.Model):
    date_str = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    class Meta:
        ordering = ['-created_at']
    def __str__(self): return self.title

class Letter(models.Model):
    open_date = models.DateField()
    title = models.CharField(max_length=255)
    content = models.TextField()
    def __str__(self): return self.title

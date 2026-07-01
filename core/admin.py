from django.contrib import admin
from .models import (Reason, QuickChallenge, WeeklyChallenge, QuizQuestion, 
                     RouletteOption, MysteryContent, TimelineEvent, PlaylistSong, 
                     MapPin, CalendarEvent, DiaryEntry, Letter)

admin.site.register(Reason)
admin.site.register(QuickChallenge)
admin.site.register(WeeklyChallenge)
admin.site.register(QuizQuestion)
admin.site.register(RouletteOption)
admin.site.register(MysteryContent)
admin.site.register(TimelineEvent)
admin.site.register(PlaylistSong)
admin.site.register(MapPin)
admin.site.register(CalendarEvent)
admin.site.register(DiaryEntry)
admin.site.register(Letter)

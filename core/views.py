from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import (Reason, QuickChallenge, WeeklyChallenge, QuizQuestion, 
                     RouletteOption, MysteryContent, TimelineEvent, PlaylistSong, 
                     MapPin, CalendarEvent, DiaryEntry, Letter, ComebackReason,
                     UnsentLetter, NostalgicSong)

def home(request):
    data = {
        "reasons": [r.text for r in Reason.objects.all()],
        "comebackReasons": [
            {"day": r.day_number, "text": r.text}
            for r in ComebackReason.objects.order_by("day_number")
        ],
        "unsentLetters": [
            {"title": l.title, "text": l.text} for l in UnsentLetter.objects.all()
        ],
        "nostalgicSongs": [
            {"title": s.title, "artist": s.artist, "story": s.story} for s in NostalgicSong.objects.all()
        ],
        "quickChallenges": [q.text for q in QuickChallenge.objects.all()],
        "weeklyChallenges": [w.text for w in WeeklyChallenge.objects.all()],
        "quiz": [
            {"q": q.question, "options": q.options, "correct": q.correct_index}
            for q in QuizQuestion.objects.all()
        ],
        "rouletteOptions": [r.text for r in RouletteOption.objects.all()],
        "mysteryContent": [
            {"type": m.content_type, "content": m.content}
            for m in MysteryContent.objects.all()
        ],
        "timeline": [
            {"date": t.date_str, "title": t.title, "desc": t.desc}
            for t in TimelineEvent.objects.all()
        ],
        "playlist": [
            {"title": p.title, "artist": p.artist, "story": p.story}
            for p in PlaylistSong.objects.filter(is_sad=False)
        ],
        "sadPlaylist": [
            {"title": p.title, "artist": p.artist, "story": p.story}
            for p in PlaylistSong.objects.filter(is_sad=True)
        ],
        "mapPins": [
            {"x": m.x, "y": m.y, "icon": m.icon, "label": m.label, "desc": m.desc}
            for m in MapPin.objects.all()
        ],
        "calendar": [
            {"day": c.day, "month": c.month, "title": c.title, "desc": c.desc}
            for c in CalendarEvent.objects.all()
        ],
        "diary": [
            {"date": d.date_str, "title": d.title, "text": d.text, "id": d.id}
            for d in DiaryEntry.objects.all()
        ],
        "letters": [
            {"id": l.id, "date": l.open_date.strftime("%Y-%m-%d"), "title": l.title, "content": l.content}
            for l in Letter.objects.all()
        ],
        "config": {
            "startDate": "2025-07-25T00:00:00",
            "comebackStartDate": "2026-07-01T00:00:00",
            "birthday": "07-25", 
            "secretPin": "2506"
        }
    }
    return render(request, 'core/index.html', {'db_json': json.dumps(data)})

@csrf_exempt
def save_diary(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            date_str = body.get('date', '')
            title = body.get('title', 'Nota de Amor')
            text = body.get('text', '')
            if text:
                entry = DiaryEntry.objects.create(date_str=date_str, title=title, text=text)
                return JsonResponse({'status': 'success', 'id': entry.id})
            return JsonResponse({'status': 'error', 'msg': 'Empty text'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'msg': str(e)})
    return JsonResponse({'status': 'error', 'msg': 'Invalid method'})

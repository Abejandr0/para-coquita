import os
import django
from datetime import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coquita_project.settings')
django.setup()

from core.models import (Reason, QuickChallenge, WeeklyChallenge, QuizQuestion, 
                         RouletteOption, MysteryContent, TimelineEvent, PlaylistSong, 
                         MapPin, CalendarEvent, DiaryEntry, Letter)

def populate():
    # Razones
    reasons = [
        "Amo cómo tu voz cambia cuando estás emocionada.",
        "Amo cuando te ríes tan fuerte que hasta te tapas la cara.",
        "Amo cómo me miras cuando piensas que no estoy poniendo atención.",
        "Amo que siempre quieras saber si ya comí.",
        "Amo lo dulce que eres incluso cuando dices que no lo eres.",
        "Amo que contigo todo parece más sencillo.",
        "Amo cómo haces que hasta los silencios se sientan bonitos.",
        "Amo cómo pronuncias mi nombre, como si tuviera un brillo especial.",
        "Amo tu forma de abrazar, porque siento que ahí pertenezco.",
        "Amo cuando te emocionas por cosas pequeñas.",
        "Amo que seas mi paz incluso en mis tormentas.",
        "Amo cómo cuidas de mí sin que yo te lo pida.",
        "Amo que contigo quiero ser mejor persona siempre.",
        "Amo cuando te burlas de mí, pero con cariño."
    ]
    for r in reasons:
        Reason.objects.get_or_create(text=r)

    # Quick Challenges
    qcs = [
        "Desafío de Cocina: Elegir una receta nueva y cocinarla juntos.",
        "Noche de Spa: Masaje de 15 minutos (yo empiezo).",
        "El Viaje Ciego: Una mini excursión sorpresa.",
        "Carta y Café: Escribirnos cartas sin usar el celular.",
        "Maratón de Fotos: Ver nuestras fotos antiguas 1 hora.",
        "Guerra de Cosquillas: El que pierda invita la cena."
    ]
    for q in qcs:
        QuickChallenge.objects.get_or_create(text=q)

    # Weekly Challenges
    wcs = [
        "Semana de conexión: Preguntarnos algo nuevo cada día.",
        "Semana fitness: Salir a caminar juntos 3 veces.",
        "Semana culinaria: Preparar una cena temática.",
        "Semana de relax: Ver una serie completa juntos.",
        "Semana creativa: Pintar o dibujar algo juntos."
    ]
    for w in wcs:
        WeeklyChallenge.objects.get_or_create(text=w)

    # Quiz
    quiz = [
        { "q": "¿Cuál es mi comida favorita?", "options": ["Pizza", "Gomitas", "Hamburguesa", "Papitas"], "correct": 3 },
        { "q": "¿Qué me pone de mal humor rápido?", "options": ["El tráfico", "Tener hambre", "El calor", "El sueño"], "correct": 3 },
        { "q": "¿Cuál es nuestro lugar especial?", "options": ["El Parque", "El Cine", "Casita", "Afuera de casita"], "correct": 0 },
        { "q": "¿Qué es lo que más amo de ti?", "options": ["Tu risa", "Tus ojos", "Todo todito", "Tu paciencia"], "correct": 2 } 
    ]
    for q in quiz:
        QuizQuestion.objects.get_or_create(question=q["q"], defaults={'options': q["options"], 'correct_index': q["correct"]})

    # Roulette
    roulette = [
        "🍕 Noche de Pizza", "🍿 Ver Pelis", "🍦 Ir por Helado", "🍳 Cocinar Juntos", "🕹️ Jugar un Ratito", 
        "🍷 Cena Romántica", "⚽ Jugar", "🛌 Dormir todo el día", 
        "🌳 Picnic en el parque", "💃 Ir a bailar", "📸 Tomarnos Fotos"
    ]
    for r in roulette:
        RouletteOption.objects.get_or_create(text=r)

    # Mystery Box
    mystery = [
        { "type": "text", "content": "Vale por: Un beso infinito de 5 minutos 😘" },
        { "type": "text", "content": "Chiste: ¿Qué hace una abeja en el gimnasio? ¡Zum-ba! 🐝" },
        { "type": "text", "content": "Dato: Los caballitos de mar se eligen para toda la vida. Tú eres el mío." },
        { "type": "text", "content": "Reto: ¡Mándame una selfie haciendo muecas ahora mismo!" }
    ]
    for m in mystery:
        MysteryContent.objects.get_or_create(content_type=m["type"], content=m["content"])

    # Timeline
    timeline = [
        { "date": "28 May 2025", "title": "Primera Cita", "desc": "Fuimos a comer algo y no habia nada abierto jaja." },
        { "date": "25 Jul 2025", "title": "Novios Oficiales", "desc": "El día que me dijiste que sí con esa sonrisa." },
        { "date": "14 Feb 2026", "title": "", "desc": "Me diste una hamburguesita :3" }
    ]
    for t in timeline:
        TimelineEvent.objects.get_or_create(date_str=t["date"], defaults={'title': t["title"], 'desc': t["desc"]})

    # Playlist
    playlist = [
        { "title": " ", "artist": " ", "story": "Deberiamos llenar esto" },
        { "title": " ", "artist": " ", "story": " " },
        { "title": " ", "artist": " ", "story": " " }
    ]
    for p in playlist:
        PlaylistSong.objects.get_or_create(title=p["title"], defaults={'artist': p["artist"], 'story': p["story"]})

    # Map Pins
    mapPins = [
        { "x": 50, "y": 50, "icon": "📍", "label": "Primer piquito", "desc": "En la banca del parque" },
        { "x": 20, "y": 30, "icon": "🍦", "label": "Papas favoritas", "desc": " venden papitas ricas" },
        { "x": 80, "y": 70, "icon": "🏠", "label": "Donde nos abrazamos", "desc": "El lugar más seguro del mundo." }
    ]
    for m in mapPins:
        MapPin.objects.get_or_create(x=m["x"], y=m["y"], defaults={'icon': m["icon"], 'label': m["label"], 'desc': m["desc"]})

    # Calendar
    calendar = [
        { "day": " ", "month": " ", "title": " ", "desc": " " },
        { "day": "25", "month": "FEB", "title": "Cumple 7 meses", "desc": "Cena especial hecha por mí (sorpresa)." }
    ]
    for c in calendar:
        CalendarEvent.objects.get_or_create(day=c["day"], month=c["month"], title=c["title"], defaults={'desc': c["desc"]})

    # Diary
    diary = [
        { "date": "14 Feb 2026", "title": "Creando esto", "text": "Hoy pasé todo el día programando este regalo. Espero que te encante." },
        { "date": "25 julio 2025", "title": "Nuestro comienzo", "text": "Aqui empezamos a escribir nuestra historia." }
    ]
    for d in diary:
        DiaryEntry.objects.get_or_create(title=d["title"], defaults={'date_str': d["date"], 'text': d["text"]})

    # Letters
    letters = [
        { "date": "2025-07-25", "title": "Carta Abierta", "content": "Hola amor, bienvenida a tu regalo." },
        { "date": "2026-12-31", "title": "Fin de Año", "content": "¡Feliz año nuevo! Gracias por otro año juntos." },
        { "date": "2030-01-01", "title": "El Futuro", "content": "Si lees esto, llevamos mucho tiempo amándonos." }
    ]
    for l in letters:
        date_obj = datetime.strptime(l["date"], "%Y-%m-%d").date()
        Letter.objects.get_or_create(title=l["title"], defaults={'open_date': date_obj, 'content': l["content"]})

    print("Database populated successfully!")

if __name__ == '__main__':
    populate()

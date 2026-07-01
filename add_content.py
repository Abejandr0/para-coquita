import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coquita_project.settings')
django.setup()

from core.models import RouletteOption, WeeklyChallenge, MysteryContent, MapPin

# Add some Roulette Options
plans = [
    "Cita de helados y caminar sin rumbo 🍦",
    "Tarde de películas y cobijas 🍿",
    "Cocinar algo nuevo juntos 🍳",
    "Picnic en el parque 🧺",
    "Maratón de nuestra serie favorita 🎬",
    "Cita elegante en casa con velas 🕯️"
]
for p in plans:
    RouletteOption.objects.get_or_create(text=p)

# Add Weekly Challenges
challenges = [
    "Dejarse una notita escondida para que el otro la encuentre 💌",
    "Hacerse un masaje de 10 minutos cada uno 💆",
    "Cocinar el postre favorito del otro 🍰",
    "Tener una cita sin celulares por 3 horas 📵",
    "Escribir 5 cosas nuevas que amas del otro y leerlas antes de dormir 🌙",
    "Caminar de la mano y tomarse una foto chistosa 📸"
]
for c in challenges:
    WeeklyChallenge.objects.get_or_create(text=c)

# Add Mystery Content
mysteries = [
    {"type": "text", "content": "¡Vale por un beso apasionado de 30 segundos! 😘"},
    {"type": "text", "content": "¡Ganaste un masaje de espalda gratis esta noche! 💆‍♀️"},
    {"type": "text", "content": "¡Tienes el control de la TV por hoy, elige lo que quieras ver! 📺"},
    {"type": "text", "content": "¡Te debo tu dulce o antojo favorito, cóbralo cuando quieras! 🍫"}
]
for m in mysteries:
    MysteryContent.objects.get_or_create(content_type=m["type"], content=m["content"])

# Improve Map Pins
MapPin.objects.all().delete()
pins = [
    {"x": 20, "y": 35, "icon": "🍦", "label": "Nuestra primera cita", "desc": "Ese helado que compartimos mientras los nervios nos ganaban."},
    {"x": 60, "y": 50, "icon": "💋", "label": "El primer beso", "desc": "El momento donde el tiempo se detuvo y todo cambió."},
    {"x": 80, "y": 70, "icon": "🏡", "label": "Nuestro rincón seguro", "desc": "Ese lugar donde nos abrazamos y el resto del mundo no importa."},
    {"x": 40, "y": 80, "icon": "☕", "label": "Café de la tarde", "desc": "Donde tuvimos nuestra charla más profunda y honesta."},
]
for p in pins:
    MapPin.objects.create(x=p["x"], y=p["y"], icon=p["icon"], label=p["label"], desc=p["desc"])

print("Contenido agregado exitosamente.")

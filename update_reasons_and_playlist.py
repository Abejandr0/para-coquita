import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coquita_project.settings')
django.setup()

from core.models import ComebackReason, PlaylistSong, NostalgicSong

def run():
    print("Corrigiendo razones existentes...")
    
    # Razones para corregir (buscar por fragmentos clave)
    corrections = {
        "nadie me conoce": "Me di cuenta que me conoces más profundamente que yo mismo.",
        "alguien pasa": "Aún creo sentir tu perfume cuando camino por nuestros lugares favoritos.",
        "nadie me ha vuelto a mirar": "Extraño la forma única y especial en la que me mirabas."
    }
    
    for r in ComebackReason.objects.all():
        for keyword, new_text in corrections.items():
            if keyword.lower() in r.text.lower():
                r.text = new_text
                r.save()
                print(f"Razón actualizada (Día {r.day_number})")

    print("Insertando nuevas razones (si no existen)...")
    new_reasons = [
        "A veces escucho una canción y automáticamente viajo a un recuerdo contigo.",
        "No he podido borrar nuestras fotos, me duele demasiado intentar hacerlo.",
        "Extraño la tranquilidad de quedarnos en silencio sin sentir que debíamos hablar.",
        "Sigo entrando a nuestro chat solo para leer los mensajes de cuando éramos felices.",
        "Me doy cuenta de que todo lo que quiero hacer, desearía poder hacerlo contigo."
    ]
    
    last_reason = ComebackReason.objects.order_by('-day_number').first()
    start_day = last_reason.day_number + 1 if last_reason else 0
    
    # Para evitar insertar duplicados si corremos esto varias veces
    existing = [r.text for r in ComebackReason.objects.all()]
    for text in new_reasons:
        if text not in existing:
            ComebackReason.objects.create(day_number=start_day, text=text)
            start_day += 1

    print("Migrando NostalgicSong a PlaylistSong con is_sad=True...")
    # El usuario quería separar las playlists de Lado Alegre y Lado Triste.
    # Anteriormente creamos NostalgicSong pero es mejor usar PlaylistSong con is_sad.
    for n in NostalgicSong.objects.all():
        if not PlaylistSong.objects.filter(title=n.title, artist=n.artist).exists():
            PlaylistSong.objects.create(
                title=n.title,
                artist=n.artist,
                story=n.story,
                is_sad=True
            )

            #comment
            
    print("Listo!")

if __name__ == '__main__':
    run()

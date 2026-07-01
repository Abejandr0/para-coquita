import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coquita_project.settings')
django.setup()

from core.models import ComebackReason, UnsentLetter, NostalgicSong

def run():
    print("Insertando más Razones para Volver...")
    new_reasons = [
        "Extraño cómo me hacías reír incluso cuando estaba enojado.",
        "Sigo buscando tu perfume en la calle cuando alguien pasa.",
        "Aún guardo los mensajes bonitos que me mandabas de la nada.",
        "Extraño tener con quién compartir las pequeñas cosas de mi día.",
        "Me hace falta mi lugar seguro, y ese lugar eras tú.",
        "Nadie me ha vuelto a mirar como tú lo hacías.",
        "Sigo pensando que podríamos intentarlo de nuevo y hacerlo mejor.",
        "Extraño nuestra complicidad y los chistes que solo nosotros entendíamos.",
        "Aún siento que una parte de mí se quedó contigo.",
        "Cada vez que algo bueno me pasa, eres la primera persona a la que quiero contárselo."
    ]
    # start from the last day number
    last_reason = ComebackReason.objects.order_by('-day_number').first()
    start_day = last_reason.day_number + 1 if last_reason else 0
    
    for idx, text in enumerate(new_reasons):
        ComebackReason.objects.create(day_number=start_day + idx, text=text)

    print("Insertando Cartas no enviadas...")
    letters = [
        {"title": "Lo que nunca te dije ese día", "text": "A veces pienso en el último día que nos vimos. Tenía tantas cosas que decirte, pero las palabras se quedaron atrapadas. Quería decirte que tenía miedo de perderte, pero en lugar de eso, actué como si no me importara. Lo siento."},
        {"title": "Aún guardo tus cosas", "text": "Hoy estaba ordenando mi cuarto y encontré la sudadera que te gustaba usar. Todavía tiene un poco de tu olor. Pensé en tirarla, pero no pude. Supongo que es mi forma tonta de no soltarte del todo."},
        {"title": "Si pudieras leerme", "text": "Espero que estés bien. De verdad lo espero. Aunque me duele no ser parte de tus días, me consuela saber que sigues persiguiendo tus sueños. Solo quería que supieras que aún te apoyo desde lejos."}
    ]
    for l in letters:
        UnsentLetter.objects.create(title=l["title"], text=l["text"])

    print("Insertando Soundtrack Nostálgico...")
    songs = [
        {"title": "The Night We Met", "artist": "Lord Huron", "story": "Esta canción siempre me hace pensar en nosotros y en cómo me gustaría retroceder el tiempo hasta ese momento."},
        {"title": "Yellow", "artist": "Coldplay", "story": "Porque para mí, tú eras amarillo. Brillante, cálida, y llenabas todo de luz."},
        {"title": "Sparks", "artist": "Coldplay", "story": "Siempre me recuerda a lo tranquilos que éramos cuando estábamos juntos."}
    ]
    for s in songs:
        NostalgicSong.objects.create(title=s["title"], artist=s["artist"], story=s["story"])

    print("Listo!")

if __name__ == '__main__':
    run()

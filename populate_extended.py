import os
import django
import sys
import json

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coquita_project.settings')
django.setup()

from core.models import Reason, QuickChallenge, WeeklyChallenge, QuizQuestion, RouletteOption, MysteryContent

def run():
    print("Limpiando DB anterior para insertar la versión extendida...")
    Reason.objects.all().delete()
    QuickChallenge.objects.all().delete()
    WeeklyChallenge.objects.all().delete()
    QuizQuestion.objects.all().delete()
    RouletteOption.objects.all().delete()
    MysteryContent.objects.all().delete()

    print("Insertando 40+ Razones...")
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
        "Amo cuando te burlas de mí, pero con cariño.",
        "Amo tu sentido del humor, incluso cuando es un poco malo.",
        "Amo cómo te brillan los ojos cuando hablas de lo que te gusta.",
        "Amo cómo te estiras por las mañanas.",
        "Amo tus pequeños bailes de felicidad cuando comes algo rico.",
        "Amo cómo me escuchas incluso cuando hablo de cosas aburridas.",
        "Amo la forma en que me haces sentir seguro a tu lado.",
        "Amo cómo te preocupas por las personas que quieres.",
        "Amo que me dejes conocer tus miedos y vulnerabilidades.",
        "Amo tus besos sorpresa.",
        "Amo que siempre tienes una palabra de aliento para mí.",
        "Amo lo terca que puedes llegar a ser cuando sabes que tienes razón.",
        "Amo que me incluyas en tus planes futuros.",
        "Amo cómo te ves recién despierta.",
        "Amo tu determinación para superar los problemas.",
        "Amo tu olor, es mi lugar favorito.",
        "Amo la facilidad con la que me haces sonreír.",
        "Amo cuando me tomas de la mano de la nada.",
        "Amo que no necesitas maquillaje para ser la más hermosa.",
        "Amo cómo me apoyas incondicionalmente.",
        "Amo que a tu lado el tiempo vuela.",
        "Amo que siempre encuentras el lado positivo de las cosas.",
        "Amo cómo me consientes cuando estoy cansado.",
        "Amo que seas mi mejor amiga además de mi novia."
    ]
    for text in reasons:
        Reason.objects.create(text=text)

    print("Insertando Retos Rápidos...")
    quick_challenges = [
        "Desafío de Cocina: Elegir una receta nueva y cocinarla juntos.",
        "Noche de Spa: Masaje de 15 minutos (yo empiezo).",
        "El Viaje Ciego: Una mini excursión sorpresa.",
        "Carta y Café: Escribirnos cartas sin usar el celular.",
        "Maratón de Fotos: Ver nuestras fotos antiguas 1 hora.",
        "Guerra de Cosquillas: El que pierda invita la cena.",
        "Duelo de Miradas: El primero en reír pierde un beso.",
        "Día de Postres: Hornear algo dulce juntos.",
        "Aventura Urbana: Caminar por la ciudad sin rumbo fijo.",
        "Noche de Karaoke: Cantar a todo pulmón en casa."
    ]
    for text in quick_challenges:
        QuickChallenge.objects.create(text=text)

    print("Insertando Retos Semanales...")
    weekly_challenges = [
        "Semana de conexión: Preguntarnos algo nuevo cada día.",
        "Semana fitness: Salir a caminar juntos 3 veces.",
        "Semana culinaria: Preparar una cena temática.",
        "Semana de relax: Ver una serie completa juntos.",
        "Semana creativa: Pintar o dibujar algo juntos.",
        "Semana de los recuerdos: Recrear nuestra primera cita.",
        "Semana de desconexión: 1 hora sin pantallas al día.",
        "Semana dulce: Dejarnos notas sorpresa por toda la casa.",
        "Semana aventurera: Ir a un lugar de la ciudad que no conozcamos.",
        "Semana de gratitud: Decirnos una cosa que agradecemos del otro cada noche."
    ]
    for text in weekly_challenges:
        WeeklyChallenge.objects.create(text=text)

    print("Insertando Preguntas del Quiz...")
    quiz_data = [
        {"q": "¿Cuál es mi comida favorita?", "options": '["Pizza", "Gomitas", "Hamburguesa", "Papitas"]', "correct_index": 3},
        {"q": "¿Qué me pone de mal humor rápido?", "options": '["El tráfico", "Tener hambre", "El calor", "El sueño"]', "correct_index": 3},
        {"q": "¿Cuál es nuestro lugar especial?", "options": '["El Parque", "El Cine", "Casita", "Afuera de casita"]', "correct_index": 0},
        {"q": "¿Qué es lo que más amo de ti?", "options": '["Tu risa", "Tus ojos", "Todo todito", "Tu paciencia"]', "correct_index": 2},
        {"q": "¿Qué película podríamos ver 100 veces sin aburrirnos?", "options": '["Shrek", "Harry Potter", "Spiderman", "Enredados"]', "correct_index": 3},
        {"q": "¿Cuál es mi mayor sueño?", "options": '["Viajar por el mundo", "Tener una casita contigo", "Ser millonario", "Comer sin engordar"]', "correct_index": 1},
        {"q": "¿Qué color me queda mejor según yo?", "options": '["Negro", "Azul", "Blanco", "Rojo"]', "correct_index": 0},
        {"q": "¿Cuál fue el mes de nuestro primer beso?", "options": '["Mayo", "Junio", "Julio", "Agosto"]', "correct_index": 2},
        {"q": "¿Qué prefiero un viernes en la noche?", "options": '["Salir de fiesta", "Pelis y pizza", "Cena elegante", "Dormir temprano"]', "correct_index": 1},
        {"q": "¿Qué apodo me gusta más que me digas?", "options": '["Amor", "Bebé", "Mi vida", "Gordito"]', "correct_index": 0}
    ]
    for q in quiz_data:
        QuizQuestion.objects.create(
            question=q["q"], 
            options=json.loads(q["options"]), 
            correct_index=q["correct_index"]
        )

    print("Insertando Opciones de Ruleta...")
    roulette = [
        "🍕 Noche de Pizza", "🍿 Ver Pelis", "🍦 Ir por Helado", "🍳 Cocinar Juntos", 
        "🕹️ Jugar un Ratito", "🍷 Cena Romántica", "⚽ Jugar algo", "🛌 Dormir todo el día", 
        "🌳 Picnic en el parque", "💃 Ir a bailar", "📸 Tomarnos Fotos", 
        "☕ Ir por un café", "🛍️ Día de compras", "🧖‍♀️ Tarde de Masajes", "🚗 Paseo en auto"
    ]
    for text in roulette:
        RouletteOption.objects.create(text=text)

    print("Insertando Contenido Misterioso...")
    mystery = [
        {"type": "text", "content": "Vale por: Un beso infinito de 5 minutos 😘"},
        {"type": "text", "content": "Chiste: ¿Qué hace una abeja en el gimnasio? ¡Zum-ba! 🐝"},
        {"type": "text", "content": "Dato: Los pingüinos se regalan piedritas para declararse. Aquí tienes mi piedrita. 🪨"},
        {"type": "text", "content": "Reto: ¡Mándame una selfie haciendo muecas ahora mismo!"},
        {"type": "text", "content": "Vale por: Un masaje en la espalda de 20 minutos 💆‍♀️"},
        {"type": "text", "content": "Secreto: La primera vez que te vi, supe que eras para mí."},
        {"type": "text", "content": "Vale por: Tú eliges la próxima película sin que yo me queje 🍿"},
        {"type": "text", "content": "Reto: Envíame un audio cantando tu canción favorita 🎤"},
        {"type": "text", "content": "Vale por: Una cena pagada por mí a donde tú quieras 🍽️"},
        {"type": "text", "content": "Dato: Cada vez que sonríes, mi mundo se ilumina un poquito más. ✨"}
    ]
    for m in mystery:
        MysteryContent.objects.create(content_type=m["type"], content=m["content"])

    print("¡Base de datos extendida insertada con éxito! 🎉")

if __name__ == '__main__':
    run()

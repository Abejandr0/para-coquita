import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coquita_project.settings')
django.setup()

from core.models import UnsentLetter

def run():
    print("Insertando nuevas cartas pequeñas...")
    letters = [
        {"title": "Tanta Nostalgia", "text": "A veces me siento y recuerdo con mucha nostalgia todos esos momentos hermosos que compartimos. Fueron instantes mágicos que siempre guardaré como un tesoro en mi memoria."},
        {"title": "Mis Mejores Deseos", "text": "Espero de todo corazón que te esté yendo súper bien en todo lo que estés haciendo. Quiero que sepas que siempre te apoyaré desde la distancia y celebraré tus triunfos."}
    ]
    for l in letters:
        UnsentLetter.objects.create(title=l["title"], text=l["text"])

    print("Listo!")

if __name__ == '__main__':
    run()

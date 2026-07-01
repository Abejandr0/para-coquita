const reasons = [
        "Amo cómo tu voz cambia cuando estás emocionada por algo.",
        "Amo cuando te ríes tan fuerte que hasta te tapas la cara.",
        "Amo cómo me miras cuando piensas que no estoy poniendo atención.",
        "Amo que siempre quieras saber si ya comí.",
        "Amo lo dulce que eres incluso cuando dices que no lo eres.",
        "Amo que contigo todo parece más sencillo.",
        "Amo cómo haces que hasta los silencios se sientan bonitos.",
        "Amo cómo pronuncias mi nombre, como si tuviera un brillo especial.",
        "Amo tu forma de abrazar, porque siento que ahí pertenezco.",
        "Amo cuando te emocionas por cosas pequeñas, como un niño feliz.",
        "Amo cómo me haces sentir importante, incluso sin intentarlo.",
        "Amo que siempre sepas qué decirme cuando estoy cansado.",
        "Amo cuando te pones seria, porque sé que detrás hay un corazón enorme.",
        "Amo cuando te sorprendes, porque tus ojos brillan muchísimo.",
        "Amo que nunca te rindes, aunque tengas días difíciles.",
        "Amo lo bien que me haces sentir con solo un mensaje.",
        "Amo cómo haces que el tiempo pase más rápido cuando estoy contigo.",
        "Amo que te acuerdes de cosas que yo dije sin darme cuenta.",
        "Amo cuando caminas a mi lado y nuestras manos se buscan solitas.",
        "Amo que siempre quieras aprender cosas nuevas.",
        "Amo tu curiosidad y tus preguntas inesperadas.",
        "Amo cuando frunces la nariz sin darte cuenta.",
        "Amo que seas mi paz incluso en mis tormentas.",
        "Amo cómo cuidas de mí sin que yo te lo pida.",
        "Amo que contigo quiero ser mejor persona siempre.",
        "Amo cuando te burlas de mí, pero con cariño.",
        "Amo que puedas hacerme sonreír sin siquiera verme.",
        "Amo lo fuerte que eres y lo poco que presumes esa fuerza.",
        "Amo que tus abrazos tengan la temperatura exacta de hogar.",
        "Amo cuando te emocionas por algo que te cuento.",
        "Amo que contigo soy yo sin filtros ni máscaras.",
        "Amo cómo tu presencia cambia todo mi día.",
        "Amo que no necesito nada más cuando estás cerca.",
        "Amo cómo me haces sentir afortunado sin que digas una palabra.",
        "Amo cómo haces especial incluso un día normal.",
        "Amo que contigo el mundo se siente menos pesado.",
        "Amo que seas tú, simplemente tú, y eso basta para enamorarme.",
        "Amo que cada día contigo me enseña otra razón para amarte más."
    ];

    // --- NUEVO ARRAY DE DESAFÍOS ---
    const challengeList = [
        "Desafío de Cocina: Elegir una receta que ninguno de los dos haya hecho antes y cocinarla juntos (sin estrés, con risas).",
        "Noche de Spa en Casa: Tienes que darme un masaje de 15 minutos (y yo te doy uno, ¡claro!).",
        "El Viaje Ciego: Uno planea una mini excursión de un día sin decirle al otro el destino hasta el momento de llegar.",
        "Carta y Café: Ambos nos escribimos una carta de amor sin usar el celular y la leemos mientras tomamos café/té.",
        "Maratón de Fotos: Pasamos una hora viendo TODAS nuestras fotos y recordando el momento más divertido de cada una.",
        "Día de Servicio: Elegimos una actividad juntos para ayudar a alguien más o hacer un acto de bondad aleatorio.",
        "Crear el 'Mapa de Sueños': Diseñamos un collage o un mapa con todos los sueños que tenemos para el futuro juntos."
    ];
    // --- FIN NUEVO ARRAY ---

    const card = document.getElementById("reason-card");
    const btn = document.getElementById("next-reason");
    const musicBtn = document.getElementById("toggle-music");
    const challengeBtn = document.getElementById("start-challenge-btn"); // Nuevo botón
    const challengeDisplay = document.getElementById("challenge-display"); // Nuevo contenedor
    const challengeResultCard = document.getElementById("challenge-result-card"); // Nueva tarjeta de resultado
    const music = document.getElementById("bg-music");
    const counterText = document.getElementById("counter-text");

    let lastIndex = -1;

    function showRandomReason() {
      // Ocultar desafío si se muestra una razón
      challengeDisplay.style.display = 'none';
      card.style.display = 'flex';
      
      if (reasons.length === 0) {
        card.textContent = "Todavía no he escrito las razones… pero prometo llenarlo pronto. 💗";
        return;
      }

      let index;
      do {
        index = Math.floor(Math.random() * reasons.length);
      } while (reasons.length > 1 && index === lastIndex);

      lastIndex = index;

      card.classList.remove("show");
      setTimeout(() => {
        card.textContent = reasons[index];
        card.classList.add("show");
      }, 150);
    }
    
    // --- NUEVA FUNCIÓN DE DESAFÍO ---
    function startChallenge() {
        // Ocultar tarjeta de razones
        card.style.display = 'none';
        
        // Mostrar desafío
        challengeDisplay.style.display = 'block';

        challengeResultCard.textContent = "🎲 Girando... ¡Piensa en un deseo! 💫";
        
        // Simular un 'giro' con un pequeño retraso
        setTimeout(() => {
            const index = Math.floor(Math.random() * challengeList.length);
            challengeResultCard.textContent = challengeList[index];
            createClickHeart(event); // Reutilizar el efecto del corazón al mostrar el resultado
        }, 800);
    }
    // --- FIN NUEVA FUNCIÓN ---

    let isPlaying = false;

    musicBtn.addEventListener("click", async () => {
      try {
        if (!isPlaying) {
          await music.play();
          isPlaying = true;
          musicBtn.textContent = "Pausar música ⏸️";
        } else {
          music.pause();
          isPlaying = false;
          musicBtn.textContent = "Reproducir música 🎵";
        }
      } catch (e) {
        console.log(e);
      }
    });

    // --- FUNCIÓN DE CONTADOR AVANZADO ---
    const startDate = new Date(2025, 6, 25, 0, 0, 0); // Meses son 0-index (Julio es 6)

    function updateCounter() {
      const now = new Date();
      let diffMs = now - startDate;
      let prefix;

      if (diffMs >= 0) {
        prefix = "Llevamos siendo novios:";
      } else {
        prefix = "Falta para que seamos novios:";
        diffMs = -diffMs;
      }

      let date1 = new Date(startDate.getTime());
      let date2 = new Date(now.getTime());

      if (diffMs < 0) {
        date1 = new Date(now.getTime());
        date2 = new Date(startDate.getTime());
      }

      let years = date2.getFullYear() - date1.getFullYear();
      let months = date2.getMonth() - date1.getMonth();
      let days = date2.getDate() - date1.getDate();

      if (days < 0) {
        months--;
        days += new Date(date2.getFullYear(), date2.getMonth(), 0).getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }
      
      let seconds = Math.floor(diffMs / 1000);
      let totalDays = Math.floor(seconds / (60 * 60 * 24));
      
      seconds -= totalDays * 60 * 60 * 24;

      const hours = Math.floor(seconds / (60 * 60));
      seconds -= hours * 60 * 60;

      const minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;

      let mainText = `${prefix} ${years} años, ${months} meses y ${days} días.`;
      
      let detailText = `(Total: ${totalDays} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos.)`;
      
      counterText.innerHTML = `${mainText} <br/> <span style="font-size: 11px; opacity: 0.7;">${detailText}</span>`;
    }
    // --- FIN FUNCIÓN DE CONTADOR AVANZADO ---


    function createFloatingHearts() {
      const container = document.querySelector(".container");

      for (let i = 0; i < 8; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent = "❤";

        const startX = Math.random() * 100;
        const delay = Math.random() * 5;

        heart.style.left = startX + "%";
        heart.style.bottom = "-24px";
        heart.style.animationDelay = delay + "s";

        container.appendChild(heart);
      }
    }

    // --- FUNCIÓN DE EFECTO DE CLIC ---
    function createClickHeart(event) {
      const heart = document.createElement("div");
      heart.classList.add("click-heart");
      heart.textContent = "💖";

      const rect = event.currentTarget.getBoundingClientRect();
      const containerRect = document.querySelector(".container").getBoundingClientRect();
      
      const x = rect.left + rect.width / 2 - containerRect.left;
      const y = rect.top + rect.height / 2 - containerRect.top;

      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;

      const container = document.querySelector(".container");
      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 700);
    }
    // --- FIN FUNCIÓN DE EFECTO DE CLIC ---


    // Listener modificado para incluir el efecto
    btn.addEventListener("click", (event) => {
        showRandomReason();
        createClickHeart(event); // Llama a la función del efecto
    });

    // Nuevo listener para el botón de desafío
    challengeBtn.addEventListener("click", (event) => {
        startChallenge();
        createClickHeart(event);
    });


    window.addEventListener("load", () => {
      showRandomReason();
      createFloatingHearts();
      updateCounter();
      setInterval(updateCounter, 1000);
    });
/* =========================================
   1. BASE DE DATOS MAESTRA
   Aquí están todos los textos y configuraciones.
   ========================================= */
const db = window.DJANGO_DB || {};
if (!db.config) {
    db.config = {
        startDate: new Date(2025, 6, 25, 0, 0, 0), // Julio (6)
        birthday: "07-25", 
        secretPin: "2506"
    };
} else {
    // Convert string to Date
    db.config.startDate = new Date(db.config.startDate);
}

/* =========================================
   2. FUNCIONES VISUALES (EFECTOS)
   ========================================= */

// ❤️ Corazones Flotantes
function createFloatingHearts() {
  const container = document.querySelector(".container");
  const oldHearts = document.querySelectorAll('.heart');
  oldHearts.forEach(h => h.remove());

  for (let i = 0; i < 10; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤";
    const startX = Math.random() * 100;
    const delay = Math.random() * 5;
    const size = Math.random() * 10 + 10;

    heart.style.left = startX + "%";
    heart.style.bottom = "-30px";
    heart.style.fontSize = size + "px";
    heart.style.animationDelay = delay + "s";
    container.appendChild(heart);
  }
}

// ⏱️ Contador Detallado
function updateSpecificCounter(startDate, elId, prefixMain, prefixDetail) {
    const now = new Date();
    let diffMs = now - startDate;
    
    let date1 = new Date(startDate.getTime());
    let date2 = new Date(now.getTime());

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

    let mainText = `${years} años, ${months} meses y ${days} días`;
    // Si es tiempo separado, tal vez no queremos "llevamos siendo novios"
    if (years === 0 && months === 0) {
        mainText = `${days} días`;
    } else if (years === 0) {
        mainText = `${months} meses y ${days} días`;
    }
    
    const detailText = `(${totalDays} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos)`;
    
    const counterElement = document.getElementById(elId);
    if(counterElement) {
        counterElement.innerHTML = `<span style="font-size: 20px;">${mainText}</span><br/> <span style="font-size: 13px; opacity: 0.8; margin-top:4px; display:block;">${detailText}</span>`;
    }
}

// ⏱️ Contador Detallado
function updateCounter() {
    updateSpecificCounter(db.config.startDate, "happy-counter", "Llevamos siendo novios:", "Total:");
    
    // Asumiendo 18 de abril de 2026
    const sepDate = new Date("2026-04-18T00:00:00");
    if(new Date() > sepDate) {
        updateSpecificCounter(sepDate, "sad-counter", "Tiempo separados:", "Total:");
    } else {
        const sadC = document.getElementById("sad-counter");
        if(sadC) sadC.innerHTML = "0 días";
    }
}

// 🌌 Funciones para Constelaciones
let isFirstHappyDate = true;
function toggleHappyStars() {
    const iframe1 = document.getElementById("happy-iframe-1");
    const iframe2 = document.getElementById("happy-iframe-2");
    const title = document.getElementById("happy-stars-title");
    const desc = document.getElementById("happy-stars-desc");
    
    if(!iframe1 || !iframe2) return;
    
    isFirstHappyDate = !isFirstHappyDate;
    if(isFirstHappyDate) {
        iframe1.style.display = "block";
        iframe2.style.display = "none";
        title.innerHTML = "✨ 27 de mayo de 2025";
        desc.innerHTML = "El cielo bajo el cual empezamos a hablar.";
    } else {
        iframe1.style.display = "none";
        iframe2.style.display = "block";
        title.innerHTML = "✨ 25 de julio de 2025";
        desc.innerHTML = "El cielo de la noche en que nos hicimos novios.";
    }
}

function fullscreenStars(sectionId) {
    const el = document.getElementById(sectionId);
    if(!el) return;
    const wrapper = el.querySelector("div"); // finds the div holding the map
    if(!wrapper) return;
    
    const isFS = wrapper.classList.contains("stars-fullscreen");
    if(isFS) {
        wrapper.classList.remove("stars-fullscreen");
        const closeBtn = wrapper.querySelector(".fs-close-btn");
        if(closeBtn) closeBtn.remove();
    } else {
        wrapper.classList.add("stars-fullscreen");
        const closeBtn = document.createElement("button");
        closeBtn.className = "fs-close-btn";
        closeBtn.innerHTML = "✕ Cerrar";
        closeBtn.style.cssText = "position: absolute; top: 20px; right: 20px; z-index: 100000; background: rgba(0,0,0,0.6); color: white; border: 1px solid white; padding: 8px 15px; border-radius: 20px; cursor: pointer; font-family: sans-serif; font-size: 14px;";
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            wrapper.classList.remove("stars-fullscreen");
            closeBtn.remove();
        };
        wrapper.appendChild(closeBtn);
    }
}

/* =========================================
   3. NAVEGACIÓN Y HOME
   ========================================= */

function showSection(targetId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => s.style.display = 'none');
    const targetSection = document.getElementById(targetId);
    if(targetSection) targetSection.style.display = 'block';

    // Show or hide back button based on whether we are on welcome screen
    const backBtn = document.getElementById('back-btn');
    const menuBtn = document.getElementById('menu-btn');
    const themeBtn = document.getElementById('theme-toggle');
    
    if(targetId === 'welcome-screen') {
        if(backBtn) backBtn.style.display = 'none';
        if(menuBtn) menuBtn.style.display = 'block';
        if(themeBtn) themeBtn.style.display = 'block';
    } else if(targetId === 'te-extrano-screen') {
        if(backBtn) backBtn.style.display = 'none';
        if(menuBtn) menuBtn.style.display = 'block';
        if(themeBtn) themeBtn.style.display = 'none';
    } else {
        if(backBtn) backBtn.style.display = 'flex';
        if(menuBtn) menuBtn.style.display = 'block';
        if(themeBtn) themeBtn.style.display = 'block';
    }
}

let isMelancholy = false;

function goBackHome() {
    isMelancholy = false;
    document.body.classList.remove('theme-melancholy');
    showSection('welcome-screen');
}

function enterMelancholyMode() {
    isMelancholy = true;
    document.body.classList.add('theme-melancholy');
    showSection('te-extrano-screen');
}

function toggleThemeMode() {
    // Deprecated, use enterMelancholyMode
    enterMelancholyMode();
}

function setupNavigation() {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-menu');
    const links = document.querySelectorAll('.nav-links li');

    const toggleMenu = () => sidebar.classList.toggle('open');
    menuBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);

    links.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-target');
            if (target === 'home') {
                goBackHome();
            } else if (target === 'comeback') {
                enterMelancholyMode();
            } else {
                showSection(target);
            }
            toggleMenu();
        });
    });
}

// --- LÓGICA DEL HOME (VISIBILIDAD) ---
let lastReasonIndex = -1;

function showRandomReason() {
    const headers = document.getElementById("home-headers");
    const card = document.getElementById("reason-card");
    const challengeDisplay = document.getElementById("challenge-display");
    
    // RESTAURAR VISTA (Mostrar Títulos y Razón)
    if(challengeDisplay) challengeDisplay.style.display = 'none';
    if(headers) headers.style.display = 'block'; 
    if(card) card.style.display = 'flex';

    let index;
    do {
        index = Math.floor(Math.random() * db.reasons.length);
    } while (db.reasons.length > 1 && index === lastReasonIndex);
    lastReasonIndex = index;

    card.classList.remove("show");
    void card.offsetWidth; 
    setTimeout(() => {
        card.textContent = db.reasons[index];
        card.classList.add("show");
    }, 150);
}

function startHomeChallenge() {
    const headers = document.getElementById("home-headers");
    const reasonCard = document.getElementById("reason-card");
    const display = document.getElementById("challenge-display");
    const result = document.getElementById("challenge-result-card");
    
    // LIMPIAR VISTA (Ocultar Títulos y Razón)
    if(headers) headers.style.display = 'none';
    if(reasonCard) reasonCard.style.display = 'none';
    
    // MOSTRAR DESAFÍO
    display.style.display = 'block';
    result.textContent = "🎲 Girando...";
    result.style.opacity = 0.7;
    
    setTimeout(() => {
        const randomChallenge = db.quickChallenges[Math.floor(Math.random() * db.quickChallenges.length)];
        result.textContent = randomChallenge;
        result.style.opacity = 1;
    }, 600);
}

/* =========================================
   4. LÓGICA DEL DIARIO (CON GUARDADO)
   ========================================= */

function saveDiaryEntry() {
    const textInput = document.getElementById("diary-text");
    const text = textInput.value.trim();
    
    if (!text) return alert("Escribe algo bonito primero 😉");

    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    
    const newEntry = {
        date: dateStr,
        title: "Nota de Amor",
        text: text
    };

    fetch('/api/save_diary/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry)
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            newEntry.id = data.id;
            db.diary.unshift(newEntry);
            textInput.value = "";
            renderDiary();
        } else {
            alert("Hubo un error guardando tu recuerdo.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Hubo un error guardando tu recuerdo.");
    });
}

function deleteNote(id) {
    alert("Para borrar recuerdos, por favor usa el panel de administrador.");
}

function renderDiary() { 
    const container = document.getElementById("diary-entries");
    const allEntries = db.diary;

    if (allEntries.length === 0) {
        container.innerHTML = "<p style='color:#999; font-style:italic;'>Aún no hay historias...</p>";
        return;
    }

    container.innerHTML = allEntries.map(d => `
        <div class="diary-entry">
            ${d.id ? `<button class="delete-note" onclick="deleteNote(${d.id})">×</button>` : ''}
            <small style="color:#ff5b8a; font-weight:bold; text-transform:uppercase;">${d.date}</small><br>
            <strong style="font-size:1.1em; color:#444;">${d.title}</strong>
            <p style="margin-top:5px; color:#666;">${d.text}</p>
        </div>`
    ).join(''); 
}

/* =========================================
   5. JUEGOS Y RENDERIZADO
   ========================================= */

// Reto Semanal
function loadWeeklyChallenge() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const weekNumber = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    
    const elWeek = document.getElementById("week-number");
    const elText = document.getElementById("weekly-challenge-text");
    if(elWeek) elWeek.textContent = weekNumber;
    if(elText) elText.textContent = db.weeklyChallenges[weekNumber % db.weeklyChallenges.length];
}

// Quiz
let currentQuestion = 0, score = 0;
function loadQuiz() {
    if (currentQuestion >= db.quiz.length) {
        document.getElementById("quiz-container").style.display = "none";
        document.getElementById("quiz-result").style.display = "block";
        document.getElementById("final-score").textContent = `Puntuación: ${score}/${db.quiz.length}`;
        return;
    }
    const qData = db.quiz[currentQuestion];
    document.getElementById("quiz-question").innerHTML = `<h3>${qData.q}</h3>`;
    const opts = document.getElementById("quiz-options");
    opts.innerHTML = ""; document.getElementById("quiz-feedback").textContent = "";
    
    qData.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "quiz-btn"; btn.textContent = opt;
        btn.onclick = () => checkAnswer(idx, qData.correct, btn);
        opts.appendChild(btn);
    });
}
function checkAnswer(sel, cor, btn) {
    document.querySelectorAll(".quiz-btn").forEach(b => b.disabled = true);
    if (sel === cor) { btn.classList.add("correct"); document.getElementById("quiz-feedback").textContent = "¡Correcto! 😍"; score++; }
    else { btn.classList.add("wrong"); document.getElementById("quiz-feedback").textContent = "Ups... 😅"; }
    setTimeout(() => { currentQuestion++; loadQuiz(); }, 1500);
}
function resetQuiz() { currentQuestion=0; score=0; document.getElementById("quiz-result").style.display="none"; document.getElementById("quiz-container").style.display="block"; loadQuiz(); }

// Ruleta y Caja
function setupRoulette() {
    const btn = document.getElementById("spin-btn");
    if(btn) btn.onclick = () => {
        let i = 0, max = 20;
        const disp = document.getElementById("roulette-display");
        const interval = setInterval(() => {
            disp.textContent = db.rouletteOptions[Math.floor(Math.random() * db.rouletteOptions.length)];
            if (++i > max) { clearInterval(interval); disp.style.transform = "scale(1.2)"; setTimeout(() => disp.style.transform="scale(1)", 300); }
        }, 100);
    };
}
function setupMysteryBox() {
    const box = document.getElementById("mystery-box-icon");
    if(box) box.onclick = () => {
        box.style.display="none";
        document.getElementById("mystery-content").style.display="block";
        document.getElementById("reset-box").style.display="inline-block";
        const item = db.mysteryContent[Math.floor(Math.random()*db.mysteryContent.length)];
        document.getElementById("mystery-content").innerHTML = `<h3>🎁 Sorpresa</h3><p>${item.content}</p>`;
    };
}
function resetMysteryBox() { document.getElementById("mystery-box-icon").style.display="block"; document.getElementById("mystery-content").style.display="none"; document.getElementById("reset-box").style.display="none"; }

// Renderizadores
function renderTimeline() { document.getElementById("timeline-container").innerHTML = db.timeline.map(t => `<div class="timeline-item"><div style="font-size:11px; color:#999; font-weight:bold;">${t.date}</div><strong style="color:#ff5b8a;">${t.title}</strong><div style="background:#fff0f6; padding:10px; border-radius:10px; margin-top:5px; font-size:14px;">${t.desc}</div></div>`).join(''); }
function renderPlaylist() {
    const list = document.getElementById("playlist-list");
    if(!list || !db.playlist) return;
    list.innerHTML = "";
    db.playlist.forEach(song => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${song.title}</strong> - ${song.artist}`;
        li.onclick = () => {
            document.getElementById("song-info").innerHTML = `<strong>${song.title}</strong> - ${song.artist}`;
            document.getElementById("song-story").innerHTML = `<div class="card-special" style="font-size:14px; line-height:1.4;">${song.story}</div>`;
        };
        list.appendChild(li);
    });
}
function renderMap() { document.getElementById("map-pins-container").innerHTML = db.mapPins.map((p,i) => `<div class="map-pin" style="left:${p.x}%; top:${p.y}%" onclick="showMapDetail(${i})">${p.icon}</div>`).join(''); }
function showMapDetail(i) { const d = document.getElementById("map-detail"); d.style.display="block"; d.innerHTML=`<strong>${db.mapPins[i].icon} ${db.mapPins[i].label}</strong><p>${db.mapPins[i].desc}</p>`; }
function renderCalendar() { document.getElementById("calendar-list").innerHTML = db.calendar.map(c => `<div class="calendar-item"><div class="cal-date-box">${c.day}<br><span style="font-size:10px">${c.month}</span></div><div><strong>${c.title}</strong><br><small style="color:#777;">${c.desc}</small></div></div>`).join(''); }
function renderLetters() { 
    const today = new Date();
    document.getElementById("letters-grid").innerHTML = db.letters.map(l => {
        const locked = today < new Date(l.date);
        return `<div class="card-special" style="background:${locked?'#eee':'#fff0f6'}; cursor:${locked?'not-allowed':'pointer'}" onclick="${locked?'':`alert('${l.content}')`}"><div style="font-size:20px;">${locked?'🔒':'💌'}</div><strong>${l.title}</strong><br><small>${locked?'Disponible: '+l.date:'¡Leer ahora!'}</small></div>`;
    }).join(''); 
}

// Lógica de "Razones para Volver"
function renderComeback() {
    const textEl = document.getElementById("comeback-text");
    const dayEl = document.getElementById("comeback-day-display");
    if (!textEl) return;

    if (!db.comebackReasons || db.comebackReasons.length === 0) {
        textEl.innerHTML = "Pronto descubrirás algo aquí...";
        return;
    }

    // Calcula los días transcurridos desde una fecha (por ejemplo, el inicio original o una nueva fecha)
    const startDate = new Date(db.config.comebackStartDate || db.config.startDate);
    const now = new Date();
    
    // Si queremos que empiece "hoy" sin cambiar la fecha original, 
    // asumimos que las razones se desbloquean basándose en db.comebackReasons[0] como hoy.
    // Para simplificar, usaremos el índice diario:
    // (Por ahora mostramos el primer registro o calculamos días desde una fecha fija)
    // Usaremos un "Día X" basándonos en la diferencia de días.
    let diffMs = now - startDate;
    let daysSinceStart = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Si daysSinceStart es menor que 0 o demasiado grande, ajustamos:
    if (daysSinceStart < 0) daysSinceStart = 0;
    
    // Buscar la razón correspondiente a este día (o anterior si no hay exacta)
    let reasonToShow = db.comebackReasons.find(r => r.day === daysSinceStart);
    
    if (!reasonToShow) {
        // Mostrar la última desbloqueada
        const available = db.comebackReasons.filter(r => r.day <= daysSinceStart);
        if (available.length > 0) {
            reasonToShow = available[available.length - 1];
        } else {
            reasonToShow = db.comebackReasons[0]; // Fallback
        }
    }

    if (reasonToShow) {
        textEl.innerHTML = reasonToShow.text;
        dayEl.innerHTML = `Día ${reasonToShow.day}`;
        currentComebackReasonIndex = db.comebackReasons.findIndex(r => r.day === reasonToShow.day);
        if(currentComebackReasonIndex === -1) currentComebackReasonIndex = 0;
    }
}

function renderComebackLists() {
    const lettersContainer = document.getElementById("unsent-letters-list");
    if(lettersContainer && db.unsentLetters) {
        lettersContainer.innerHTML = db.unsentLetters.map(l => `
            <div class="letter-item">
                <div class="letter-title">${l.title}</div>
                <div class="letter-text">${l.text}</div>
            </div>
        `).join('');
    }

    const songsContainer = document.getElementById("nostalgic-songs-list");
    if(songsContainer && db.sadPlaylist) {
        songsContainer.innerHTML = db.sadPlaylist.map(s => `
            <div class="song-item">
                <div class="song-title">${s.title}</div>
                <div class="song-artist" style="color: #6366f1; font-size: 13px; margin-bottom: 5px;">${s.artist}</div>
                <div class="song-story">${s.story}</div>
            </div>
        `).join('');
    }
}

/* =========================================
   6. CONSTELACIONES (CANVAS)
   ========================================= */
// Constelaciones removidas a favor de iframes de VirtualSky

/* =========================================
   7. INICIALIZACIÓN
   ========================================= */
window.onload = () => {
    // Animación de Entrada
    setTimeout(() => {
        const intro = document.getElementById('intro-animation');
        if(intro) intro.classList.add('hidden');
    }, 3000);

    setupNavigation();
    showRandomReason();
    createFloatingHearts();
    updateCounter();

    // Cargar todo
    loadWeeklyChallenge(); loadQuiz(); setupRoulette(); setupMysteryBox();
    renderTimeline(); renderPlaylist(); renderMap(); renderCalendar(); renderDiary(); renderLetters();
    renderComeback();
    renderComebackLists();
    
    // Listeners
    document.getElementById("next-reason").onclick = showRandomReason;
    
    let currentComebackReasonIndex = 0;
    
    function showComebackReason(index) {
        if(db.comebackReasons && db.comebackReasons.length > 0) {
            if(index < 0) index = 0;
            if(index >= db.comebackReasons.length) index = db.comebackReasons.length - 1;
            currentComebackReasonIndex = index;
            const reason = db.comebackReasons[index];
            document.getElementById("comeback-text").innerHTML = reason.text;
            document.getElementById("comeback-day-display").innerHTML = `Día ${reason.day}`;
        }
    }

    const btnNext = document.getElementById("btn-next-reason");
    const btnPrev = document.getElementById("btn-prev-reason");
    
    if(btnNext) {
        btnNext.onclick = () => showComebackReason(currentComebackReasonIndex + 1);
    }
    if(btnPrev) {
        btnPrev.onclick = () => showComebackReason(currentComebackReasonIndex - 1);
    }
    
    // Al abrir el modal, podríamos cargar la primera si no se ha cargado.
    // Esto se puede llamar justo después de cargar los datos.

    // Modal listeners
    document.getElementById("start-challenge-btn").onclick = startHomeChallenge;
    
    // Listener para guardar diario
    const saveBtn = document.getElementById("save-diary-btn");
    if(saveBtn) saveBtn.onclick = saveDiaryEntry;
    
    // Lógica del Controlador de Música (FAB)
    const fabContainer = document.getElementById("music-fab");
    const fabTrigger = document.querySelector(".music-fab-trigger");
    const audio = document.getElementById("bg-music");
    const playPauseBtn = document.getElementById("fab-playpause");
    const volumeSlider = document.getElementById("fab-volume");

    const svgPlay = document.getElementById("svg-play");
    const svgPause = document.getElementById("svg-pause");

    fabTrigger.onclick = () => {
        fabContainer.classList.toggle("open");
    };

    playPauseBtn.onclick = () => {
        if(audio.paused) {
            audio.play().catch(e=>console.log("Audio bloqueado por el navegador"));
            if(svgPlay) svgPlay.style.display = 'none';
            if(svgPause) svgPause.style.display = 'block';
        } else {
            audio.pause();
            if(svgPlay) svgPlay.style.display = 'block';
            if(svgPause) svgPause.style.display = 'none';
        }
    };

    const fabPrev = document.getElementById("fab-prev");
    const fabNext = document.getElementById("fab-next");
    if(fabPrev) fabPrev.onclick = () => alert("¡Próximamente más canciones! 🎵");
    if(fabNext) fabNext.onclick = () => alert("¡Próximamente más canciones! 🎵");

    volumeSlider.oninput = (e) => {
        audio.volume = e.target.value;
    };
    
    document.getElementById("btn-unlock").onclick = () => {
        if(document.getElementById("secret-pass").value === db.config.secretPin) {
            document.getElementById("secret-lock").style.display="none"; document.getElementById("secret-content").style.display="block";
        } else alert("Contraseña incorrecta 🐝");
    };
    
    const themeToggleBtn = document.getElementById("theme-toggle");
    if(themeToggleBtn) {
        themeToggleBtn.onclick = toggleThemeMode;
    }

    setInterval(updateCounter, 1000);
    setInterval(() => {
        const now = new Date();
        if(now.getHours()===0 && now.getMinutes()===0) {
            const msg = document.getElementById('midnight-msg');
            if(msg) { msg.classList.add('show'); setTimeout(() => msg.classList.remove('show'), 5000); }
        }
    }, 60000);
};
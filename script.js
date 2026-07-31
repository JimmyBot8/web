document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const playBtn = document.getElementById('playBtn');
  const audio = document.getElementById('audio');
  const progress = document.getElementById('progress');
  const progressBar = document.querySelector('.progress-bar');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');

  function formatTime(seconds, isRemaining = false) {
    if (isNaN(seconds) || seconds === Infinity) return isRemaining ? "-0:00" : "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedSecs = secs < 10 ? `0${secs}` : secs;
    return isRemaining ? `-${mins}:${formattedSecs}` : `${mins}:${formattedSecs}`;
  }

  if (playBtn && audio) {
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(e => console.log("Error al reproducir:", e));
        playBtn.innerHTML = `<i data-lucide="pause"></i>`;
      } else {
        audio.pause();
        playBtn.innerHTML = `<i data-lucide="play"></i>`;
      }
      lucide.createIcons();
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        if (progress) progress.style.width = `${percentage}%`;
        if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
        if (durationEl) durationEl.textContent = formatTime(audio.duration - audio.currentTime, true);
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      if (durationEl) durationEl.textContent = formatTime(audio.duration, true);
    });
  }

  if (progressBar && audio) {
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      if (audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
      }
    });
  }

  const clockEl = document.getElementById('clock');
  const dateEl = document.querySelector('.lock-header .date');

  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const dateString = now.toLocaleDateString('en-US', options);

    if (clockEl) clockEl.textContent = `${hours}:${minutes}`;
    if (dateEl) dateEl.textContent = dateString;

    document.querySelectorAll('.status-time').forEach(el => {
      el.textContent = `${hours}:${minutes}`;
    });
  }

  updateClock();
  setInterval(updateClock, 1000);

  const appIcons = document.querySelectorAll('.app-icon[data-app]');
  const closeBtns = document.querySelectorAll('.close-app');

  appIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const appName = icon.getAttribute('data-app');
      const targetModal = document.getElementById(`modal-${appName}`);
      if (targetModal) {
        targetModal.classList.add('active');
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.app-modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });

  const lockScreen = document.getElementById('lockScreen');
  const swipeBar = document.getElementById('swipeBar');
  const topDragZone = document.getElementById('topDragZone');

  if (lockScreen) {
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    if (swipeBar) {
      swipeBar.addEventListener('click', () => {
        lockScreen.classList.add('unlocked');
        lockScreen.style.transform = '';
      });

      swipeBar.addEventListener('mousedown', (e) => startDrag(e));
      swipeBar.addEventListener('touchstart', (e) => startDrag(e), { passive: true });
    }

    if (topDragZone) {
      topDragZone.addEventListener('click', () => {
        lockScreen.classList.remove('unlocked');
        lockScreen.style.transform = '';
      });

      topDragZone.addEventListener('mousedown', (e) => startDrag(e));
      topDragZone.addEventListener('touchstart', (e) => startDrag(e), { passive: true });
    }

    const startDrag = (e) => {
      isDragging = true;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      lockScreen.style.transition = 'none';
    };

    const moveDrag = (e) => {
      if (!isDragging) return;
      currentY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = currentY - startY;

      if (!lockScreen.classList.contains('unlocked') && deltaY < 0) {
        lockScreen.style.transform = `translateY(${deltaY}px)`;
      } 
      else if (lockScreen.classList.contains('unlocked') && deltaY > 0) {
        lockScreen.style.transform = `translateY(calc(-100% + ${deltaY}px))`;
      }
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      lockScreen.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease';

      const deltaY = currentY - startY;

      if (!lockScreen.classList.contains('unlocked')) {
        if (deltaY < -80) {
          lockScreen.classList.add('unlocked');
        }
      } else {
        if (deltaY > 80) {
          lockScreen.classList.remove('unlocked');
        }
      }

      lockScreen.style.transform = '';
    };

    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchmove', moveDrag, { passive: true });
    window.addEventListener('touchend', endDrag);
  }

  const waContainer = document.getElementById('waMessagesContainer');
  let waSequenceStarted = false;

  const chatSequence = [
    { text: "Mi amoooor feliiz cumpleaños te amoooooo 🎂🍰🎂💖💖💘", time: "12:00 AM", delay: 800 },
    { text: "Felices 22 mi princesa hermosa 💖", time: "12:00 AM", delay: 1500 },
    { text: "Estoy muy orgulloso de vos 💖", time: "12:00 AM", delay: 2000 },
    { text: "Un añito más y más cerca de casarnos 🤵👰", time: "12:00 AM", delay: 1400 },
    { text: "Mi esposita hermosa te amo mucho 💖💖", time: "12:00 AM", delay: 2200 },
    { 
      type: "sticker", 
      src: "assets/Apps/sticker.png",
      time: "12:01 AM", 
      delay: 1200 
    }
  ];

  function playNotificationSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      console.log("Audio no permitido aún por interacción del usuario");
    }
  }

  const waAppIcon = document.querySelector('.app-icon[data-app="whatsapp"]');
  if (waAppIcon) {
    waAppIcon.addEventListener('click', () => {
      if (!waSequenceStarted) {
        waSequenceStarted = true;
        if (waContainer) waContainer.innerHTML = '';
        startChatSequence();
      }
    });
  }

  function startChatSequence() {
    let currentDelay = 0;

    chatSequence.forEach((msg) => {
      currentDelay += msg.delay;

      setTimeout(() => {
        let msgElement = document.createElement('div');

        if (msg.type === 'sticker') {
          msgElement.className = 'wa-bubble wa-bubble-sticker';
          msgElement.innerHTML = `<img src="${msg.src}" alt="Sticker">`;
        } else {
          msgElement.className = 'wa-bubble';
          msgElement.innerHTML = `${msg.text} <span class="wa-bubble-time">${msg.time}</span>`;
        }

        if (waContainer) waContainer.appendChild(msgElement);
        playNotificationSound();

        const chatBody = document.getElementById('waChatBody');
        if (chatBody) {
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      }, currentDelay);
    });
  }
});
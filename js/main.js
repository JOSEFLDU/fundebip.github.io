// ===============================
// MENÚ MÓVIL
// ===============================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainMenu = document.getElementById('mainMenu');

mobileMenuBtn.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainMenu.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        mainMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===============================
// NAVEGACIÓN SUAVE
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================
// MODAL
// ===============================
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

// ===============================
// VER DETALLES (INFO DASHBOARD)
// ===============================
document.querySelectorAll('.view-info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-title');
        const desc = btn.getAttribute('data-desc');

        modalTitle.textContent = title;
        modalBody.innerHTML = `
            <div class="dashboard-full-view">
                <i class="fas fa-chart-bar"></i>
                <h3 style="color: var(--color-plomo); margin-bottom: 15px;">${title}</h3>
                <p style="color: var(--color-plomo); max-width: 600px; margin-bottom: 20px;">
                    ${desc}
                </p>
                <p style="color: var(--color-plomo-medio); margin-bottom: 25px;">
                    <i class="fas fa-info-circle"></i>
                    Este dashboard está alojado en Looker Studio y debe abrirse en una nueva ventana.
                </p>
                <a href="https://lookerstudio.google.com/reporting/43b93834-2f40-4050-ad43-51a6c1c510ee/page/p_hhtwsz5rzd"
                   target="_blank"
                   class="btn"
                   style="text-decoration: none;">
                    <i class="fas fa-external-link-alt"></i> Abrir en Looker Studio
                </a>
            </div>
        `;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// ===============================
// MAXIMIZAR VIDEO O IMAGEN
// ===============================
document.querySelectorAll('.maximize-btn, .btn[data-type]').forEach(btn => {
    btn.addEventListener('click', () => {

        const url = btn.getAttribute('data-url');
        const type = btn.getAttribute('data-type');

        modalTitle.textContent = 'Vista completa';
        modalBody.innerHTML = '';

        // VIDEO
        if (type === 'video') {
            modalBody.innerHTML = `
                <iframe
                    src="${url}"
                    frameborder="0"
                    allow="autoplay"
                    allowfullscreen
                    style="width:100%; height:80vh;"
                ></iframe>
            `;
        }

        // IMAGEN
        if (type === 'image') {
            modalBody.innerHTML = `
                <img
                    src="${url}"
                    style="width:100%; height:90vh; object-fit:contain;"
                >
            `;
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// ===============================
// CERRAR MODAL
// ===============================
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalBody.innerHTML = '';
    document.body.style.overflow = 'auto';
});

// Cerrar al hacer clic fuera
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalBody.innerHTML = '';
        document.body.style.overflow = 'auto';
    }
});

// ===============================
// ACTUALIZAR ENLACE ACTIVO AL SCROLL
// ===============================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});




// ===============================
// CARRUSEL DE IMÁGENES FUNDEBIP
// SEPARADO DEL CÓDIGO PRINCIPAL PARA EVITAR CONFLICTOS
// ===============================

/* ===== ALBUMES ===== */
const albums = {
  donaciones: [
    "img/carr1/hospitales.jpeg",
    "img/carr1/canes.jpeg",
    "img/carr1/caballos.jpeg"
  ],
  autogestion: [
    "img/autoges/medicina.jpeg",
    "img/autoges/medicina2.jpeg",
    "img/autoges/medicina4.jpeg",
    "img/autoges/amplificador.jpeg"
  ],
  eventos: [
    "img/eventos/lentes.jpeg",
    "img/eventos/entrega_kits.jpeg",
    "img/eventos/manifestaciones.jpeg",
    "img/eventos/colada.jpeg",
    "img/eventos/navidad.jpeg"
  ]
};

let currentAlbum = [];
let currentIndex = 0;


const albumViewer = document.getElementById("albumViewer");
const albumImage = document.getElementById("albumImage");

function openAlbum(name) {
  currentAlbum = albums[name];
  currentIndex = 0;

  document.getElementById("modalTitle").innerText = "Álbum Fotográfico";
  albumImage.src = currentAlbum[currentIndex];

  modalBody.innerHTML = "";
  modalBody.appendChild(albumViewer);

  modal.style.display = "flex";
}

function showImage(index) {
  if (index < 0) index = currentAlbum.length - 1;
  if (index >= currentAlbum.length) index = 0;
  currentIndex = index;
  albumImage.src = currentAlbum[currentIndex];
}

/* Navegación */
document.querySelector(".album-nav.next").addEventListener("click", () => {
  showImage(currentIndex + 1);
});

document.querySelector(".album-nav.prev").addEventListener("click", () => {
  showImage(currentIndex - 1);
});

/* Fullscreen real */
document.getElementById("fullscreenBtn").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    albumImage.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

/* Botones abrir álbum */
document.querySelectorAll("[data-album]").forEach(btn => {
  btn.addEventListener("click", () => {
    openAlbum(btn.dataset.album);
  });
});

/* Cerrar modal */
document.getElementById("closeModal").addEventListener("click", () => {
  modal.style.display = "none";
  document.exitFullscreen?.();
});

document.addEventListener("keydown", e => {

  // Solo cuando el modal está abierto
  if (modal.style.display !== "flex") return;

  switch (e.key) {
    case "ArrowRight":
      showImage(currentIndex + 1);
      break;

    case "ArrowLeft":
      showImage(currentIndex - 1);
      break;

    case "Escape":
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        modal.style.display = "none";
      }
      break;
  }
});
function showImage(index) {

  // 👉 Llegó al FINAL
  if (index >= currentAlbum.length) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    return;
  }

  // 👉 Llegó al INICIO
  if (index < 0) {
    return;
  }

  currentIndex = index;
  albumImage.src = currentAlbum[currentIndex];
}
document.getElementById("homeBtn").addEventListener("click", () => {
  showImage(0);          // ⏮️ vuelve a la primera imagen
});

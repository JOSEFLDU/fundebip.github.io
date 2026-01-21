// ============================================
// CONFIGURACIÓN INICIAL
// ============================================


// ============================================
// MENÚ MÓVIL
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainMenu = document.getElementById('mainMenu');
    
    if (!mobileMenuBtn || !mainMenu) return;
    
    // Toggle del menú móvil
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mainMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Cambiar icono del botón
        if (mainMenu.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!mainMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mainMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
    
    // Cerrar menú al redimensionar ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// NAVEGACIÓN SUAVE
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calcular posición del destino
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight - 20;
            
            // Scroll suave
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            const mobileMenu = document.getElementById('mainMenu');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    });
}

// ============================================
// SISTEMA DE MODALES
// ============================================
function initModalSystem() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');
    
    if (!modal || !modalTitle || !modalBody || !closeModal) return;
    
    // Configurar botones de maximizar
    document.querySelectorAll('.maximize-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const url = this.getAttribute('data-url');
            const type = this.getAttribute('data-type');
            
            if (!url || !type) return;
            
            openModal(url, type);
        });
    });
    
    // Abrir modal
    function openModal(url, type) {
        modalTitle.textContent = 'Vista completa';
        modalBody.innerHTML = '';
        
        if (type === 'image') {
            modalBody.innerHTML = `
                <div class="modal-image-container">
                    <img src="${url}" alt="Imagen ampliada" 
                         onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600?text=Imagen+no+disponible'">
                </div>
            `;
        } else if (type === 'video') {
            modalBody.innerHTML = `
                <div class="modal-video-container">
                    <iframe src="${url}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>
            `;
        }
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Enfocar el modal para navegación por teclado
        modal.focus();
    }
    
    // Cerrar modal
    function closeModalHandler() {
        modal.style.display = 'none';
        modalBody.innerHTML = '';
        document.body.style.overflow = '';
    }
    
    // Event listeners
    closeModal.addEventListener('click', closeModalHandler);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModalHandler();
        }
    });
    
    // Prevenir scroll del fondo cuando el modal está abierto
    modal.addEventListener('wheel', function(e) {
        if (!e.target.closest('.modal-body')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ============================================
// SISTEMA DE CARRUSEL
// ============================================
// ============================================
// SISTEMA DE CARRUSEL (VERSIÓN CORREGIDA)
// ============================================
function initCarouselSystem() {
    // Álbumes de imágenes
    const albums = {
        tics: [
            "img/tics/dashbord2.jpeg",
            "img/tics/formulario.jpeg",
            "img/tics/dashbord.jpeg",
            "img/tics/sistema.jpeg"
        ],
        donaciones: [
            "img/carr1/hospitales.jpeg",
            "img/carr1/canes.jpeg",
            "img/carr1/caballos.jpeg"
        ],
        autogestion: [
            "img/eventos/lentes.jpeg",
            "img/autoges/medicina.jpeg",
            "img/autoges/medicina2.jpeg",
            "img/autoges/medicina4.jpeg",
            "img/autoges/amplificador.jpeg"
        ],
        eventos: [
            "img/eventos/entrega_kits.jpeg",
            "img/eventos/manifestaciones.jpeg",
            "img/eventos/colada.jpeg",
            "img/eventos/navidad.jpeg"
        ]
    };
    
    // Elementos del DOM
    const carouselModal = document.getElementById('carouselModal');
    const carouselTitle = document.getElementById('carouselTitle');
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const closeCarouselModal = document.getElementById('closeCarouselModal');
    const currentSlide = document.getElementById('currentSlide');
    const totalSlides = document.getElementById('totalSlides');
    const fullscreenBtn = document.getElementById('carouselFullscreenBtn');
    
    if (!carouselModal) return;
    
    let currentAlbum = null;
    let currentIndex = 0;
    let isTransitioning = false;
    let isFullscreen = false;
    
    // FUNCIÓN: Resetear carrusel a primera imagen
    function resetToFirstImage() {
        console.log('🔁 Reseteando a primera imagen...');
        
        // 1. Ir a la primera imagen
        currentIndex = 0;
        
        // 2. Resetear posición del track
        if (carouselTrack) {
            carouselTrack.style.transition = 'none'; // Sin animación
            carouselTrack.style.transform = 'translateX(0)';
            
            // Forzar reflow para aplicar cambios inmediatos
            carouselTrack.offsetHeight;
            
            // Restaurar transición después de 10ms
            setTimeout(() => {
                carouselTrack.style.transition = '';
            }, 10);
        }
        
        // 3. Resetear dots
        if (carouselDots) {
            const dots = carouselDots.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === 0);
            });
        }
        
        // 4. Resetear contador
        if (currentSlide) currentSlide.textContent = '1';
        
        // 5. Resetear slides activos
        document.querySelectorAll('.carousel-slide').forEach((slide, index) => {
            slide.classList.toggle('active', index === 0);
        });
        
        console.log('✅ Reset completado - Índice actual:', currentIndex);
    }
    
    // FUNCIÓN: Salir de pantalla completa
    function exitFullscreen() {
        if (!isFullscreen) return;
        
        console.log('📱 Saliendo de pantalla completa...');
        isFullscreen = false;
        carouselModal.classList.remove('fullscreen');
        
        if (fullscreenBtn) {
            const icon = fullscreenBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-expand';
            }
            fullscreenBtn.classList.remove('active');
            fullscreenBtn.title = 'Pantalla completa';
        }
        
        // Restaurar estilos originales del modal
        carouselModal.style.padding = '';
        const content = document.querySelector('.carousel-content');
        if (content) {
            content.style.cssText = '';
            content.style.width = '90vw';
            content.style.maxWidth = '1200px';
            content.style.height = '90vh';
            content.style.borderRadius = 'var(--radio-lg)';
        }
        
        // Forzar redibujado
        carouselModal.offsetHeight;
        
        // Resetear a primera imagen después de salir de pantalla completa
        setTimeout(resetToFirstImage, 50);
    }
    
    // FUNCIÓN: Entrar en pantalla completa
    function enterFullscreen() {
        if (isFullscreen) return;
        
        console.log('🖥️ Entrando en pantalla completa...');
        isFullscreen = true;
        carouselModal.classList.add('fullscreen');
        
        if (fullscreenBtn) {
            const icon = fullscreenBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-compress';
            }
            fullscreenBtn.classList.add('active');
            fullscreenBtn.title = 'Salir de pantalla completa';
        }
        
        // Ajustar modal para pantalla completa
        carouselModal.style.padding = '0';
        const content = document.querySelector('.carousel-content');
        if (content) {
            content.style.cssText = `
                width: 100vw !important;
                height: 100vh !important;
                max-width: 100vw !important;
                max-height: 100vh !important;
                border-radius: 0 !important;
                background: #000;
            `;
        }
        
        // Forzar redibujado
        carouselModal.offsetHeight;
        
        // Asegurar que la imagen actual se vea bien
        setTimeout(() => {
            updateCarouselPosition();
            resetToFirstImage();
        }, 100);
    }
    
    // FUNCIÓN: Alternar pantalla completa
    function toggleFullscreen() {
        if (isFullscreen) {
            exitFullscreen();
        } else {
            enterFullscreen();
        }
    }
    
    // Configurar botones que abren carruseles
    document.querySelectorAll('[data-album]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const albumName = this.getAttribute('data-album');
            if (!albums[albumName]) return;
            
            openCarousel(albumName);
        });
    });
    
    // Abrir carrusel
    function openCarousel(albumName) {
        console.log('🎬 Abriendo carrusel:', albumName);
        
        // 1. SIEMPRE salir de pantalla completa primero
        exitFullscreen();
        
        // 2. Resetear variables
        currentAlbum = albums[albumName];
        currentIndex = 0;
        isFullscreen = false;
        
        // Configurar título
        const albumTitles = {
            tics: 'Galería TICS',
            donaciones: 'Donaciones Realizadas',
            autogestion: 'Autogestión',
            eventos: 'Eventos Relevantes'
        };
        
        carouselTitle.textContent = albumTitles[albumName] || 'Galería de imágenes';
        
        // Limpiar carrusel anterior
        carouselTrack.innerHTML = '';
        carouselDots.innerHTML = '';
        
        // Crear slides
        currentAlbum.forEach((imgSrc, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            if (index === 0) slide.classList.add('active');
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Imagen ${index + 1}`;
            img.loading = 'lazy';
            img.onerror = function() {
                this.onerror = null;
                this.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
            };
            
            slide.appendChild(img);
            carouselTrack.appendChild(slide);
            
            // Crear dots
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('data-index', index);
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
        });
        
        // Actualizar contadores
        updateCounters();
        
        // Mostrar modal
        carouselModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Asegurar que esté en modo normal
        carouselModal.classList.remove('fullscreen');
        
        // Actualizar posición después de que las imágenes carguen
        setTimeout(() => {
            updateCarouselPosition();
            resetToFirstImage();
        }, 100);
        
        // Añadir evento de doble clic para pantalla completa
        setTimeout(() => {
            document.querySelectorAll('.carousel-slide').forEach(slide => {
                slide.addEventListener('dblclick', () => {
                    toggleFullscreen();
                });
            });
        }, 200);
    }
    
    // Navegación
    function goToSlide(index) {
        if (isTransitioning || index === currentIndex || !currentAlbum) return;
        
        isTransitioning = true;
        currentIndex = index;
        updateCarouselPosition();
        updateCounters();
        updateDots();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    function nextSlide() {
        if (isTransitioning || !currentAlbum) return;
        
        const nextIndex = (currentIndex + 1) % currentAlbum.length;
        goToSlide(nextIndex);
    }
    
    function prevSlide() {
        if (isTransitioning || !currentAlbum) return;
        
        const prevIndex = (currentIndex - 1 + currentAlbum.length) % currentAlbum.length;
        goToSlide(prevIndex);
    }
    
    // Actualizar posición del carrusel
    function updateCarouselPosition() {
        if (!carouselTrack || !currentAlbum) return;
        
        const slideWidth = carouselTrack.clientWidth;
        carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    // Actualizar contadores
    function updateCounters() {
        if (!currentAlbum) return;
        
        if (currentSlide) currentSlide.textContent = currentIndex + 1;
        if (totalSlides) totalSlides.textContent = currentAlbum.length;
    }
    
    // Actualizar dots
    function updateDots() {
        if (!carouselDots) return;
        
        const dots = carouselDots.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Event listeners para navegación
    if (carouselPrev) {
        carouselPrev.addEventListener('click', prevSlide);
    }
    
    if (carouselNext) {
        carouselNext.addEventListener('click', nextSlide);
    }
    
    // Event listener para pantalla completa
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleFullscreen();
        });
    }
    
    // Cerrar modal
    function closeCarouselHandler() {
        console.log('❌ Cerrando carrusel...');
        
        // 1. SIEMPRE salir de pantalla completa
        exitFullscreen();
        
        // 2. Ocultar modal
        carouselModal.style.display = 'none';
        document.body.style.overflow = '';
        
        // 3. Resetear variables
        currentAlbum = null;
        currentIndex = 0;
        isFullscreen = false;
        
        // 4. Limpiar contenido
        setTimeout(() => {
            if (carouselTrack) carouselTrack.innerHTML = '';
            if (carouselDots) carouselDots.innerHTML = '';
            if (currentSlide) currentSlide.textContent = '1';
            if (totalSlides) totalSlides.textContent = '0';
        }, 300);
    }
    
    if (closeCarouselModal) {
        closeCarouselModal.addEventListener('click', closeCarouselHandler);
    }
    
    carouselModal.addEventListener('click', function(e) {
        if (e.target === carouselModal) {
            closeCarouselHandler();
        }
    });
    
    // Navegación por teclado
    document.addEventListener('keydown', function(e) {
        if (carouselModal.style.display !== 'flex' || !currentAlbum) return;
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                break;
            case 'Escape':
                e.preventDefault();
                if (isFullscreen) {
                    exitFullscreen(); // Solo salir de pantalla completa
                } else {
                    closeCarouselHandler(); // Cerrar modal completamente
                }
                break;
            case 'f':
            case 'F':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    toggleFullscreen();
                }
                break;
        }
    });
    
    // Navegación táctil
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselTrack.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        
        if (Math.abs(diffX) < swipeThreshold || !currentAlbum) return;
        
        if (diffX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
    
    // Redimensionar ventana - IMPORTANTE: recalcular posición
    window.addEventListener('resize', function() {
        if (carouselModal.style.display === 'flex' && currentAlbum) {
            updateCarouselPosition();
        }
    });
    
    // Cuando las imágenes se cargan, recalcular posición
    if (carouselTrack) {
        carouselTrack.addEventListener('load', function(e) {
            if (e.target.tagName === 'IMG' && carouselModal.style.display === 'flex') {
                updateCarouselPosition();
            }
        }, true);
    }
    
    console.log('✅ Sistema de carrusel inicializado');
}

// ============================================
// INICIALIZACIÓN COMPLETA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 FUNDEBIP - Iniciando sistema...');
    
    // Inicializar todos los módulos
    initMobileMenu();
    initSmoothScroll();
    initModalSystem();
    initCarouselSystem(); // Esta es la función corregida
    initScrollAnimations();
    initActiveLinkTracking();
    initImageLoading();
    initHeaderEffects();
    initDynamicContent();
    
    console.log('✅ FUNDEBIP - Sistema inicializado correctamente');
});

// ... (el resto de tus funciones permanecen igual, NO las modifiques) ...
// ============================================
// ANIMACIONES AL SCROLL
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Añadir retrasos escalonados para hijos
                const children = entry.target.querySelectorAll('.fade-in');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Efectos especiales en scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto de header al hacer scroll
        if (scrollTop > 100) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.98)';
        } else {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
        }
        
        // Mostrar/ocultar botón de scroll to top
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (scrollToTopBtn) {
            if (scrollTop > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// ============================================
// SEGUIMIENTO DE ENLACE ACTIVO
// ============================================
function initActiveLinkTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Actualizar al hacer scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Actualizar al cargar la página
    updateActiveLink();
}

// ============================================
// CARGA DE IMÁGENES
// ============================================
function initImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Manejar errores de carga
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
            e.target.classList.add('error');
        }
    }, true);
}

// ============================================
// EFECTOS DEL HEADER
// ============================================
function initHeaderEffects() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // Efecto de blur en móviles
    if ('CSS' in window && CSS.supports('backdrop-filter', 'blur(10px)')) {
        header.style.backdropFilter = 'blur(10px)';
    }
}

// ============================================
// CONTENIDO DINÁMICO
// ============================================
function initDynamicContent() {
    // Actualizar año en copyright
    const copyrightElement = document.querySelector('.copyright p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2026', currentYear);
    }
    
    // Inicializar tooltips
    initTooltips();
    
    // Inicializar contadores animados
    initCounters();
}

// ============================================
// TOOLTIPS
// ============================================
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
        element.addEventListener('focus', showTooltip);
        element.addEventListener('blur', hideTooltip);
    });
    
    function showTooltip(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        if (!tooltipText) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.transform = 'translateX(-50%)';
        
        this._tooltip = tooltip;
    }
    
    function hideTooltip() {
        if (this._tooltip) {
            this._tooltip.remove();
            this._tooltip = null;
        }
    }
}

// ============================================
// CONTADORES ANIMADOS
// ============================================
function initCounters() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    if (counterElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace('+', ''));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => observer.observe(counter));
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = (target > 1000 ? '+' : '') + Math.floor(current);
        }, 30);
    }
}

// ============================================
// MANEJO DE ERRORES
// ============================================
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
    
    // Mostrar mensaje de error amigable en desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #c53030;
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 9999;
            max-width: 300px;
            font-family: monospace;
            font-size: 12px;
        `;
        errorDiv.textContent = `Error: ${e.error.message}`;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => errorDiv.remove(), 5000);
    }
});

// ============================================
// POLYFILLS PARA FUNCIONALIDADES MÁS ANTIGUAS
// ============================================
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.matchesSelector || 
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector || 
        Element.prototype.oMatchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit = 100) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// INICIALIZACIÓN COMPLETA
// ============================================
console.log('FUNDEBIP - Sistema inicializado correctamente');





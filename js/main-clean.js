// ===== APLICACIÓN PRINCIPAL STD TEC =====

class STDTecApp {
    constructor() {
        this.init();
    }
    
    init() {
        try {
            console.log('🚀 Inicializando STD TEC App...');
            
            // Initialize core components
            console.log('📱 Configurando navegación...');
            this.setupNavigation();
            
            console.log('🎨 Configurando tema...');
            this.setupTheme();
            
            console.log('✨ Configurando animaciones...');
            this.setupAnimations();
            
            console.log('📝 Configurando animaciones de título...');
            this.setupTitleAnimations();
            
            console.log('🔢 Configurando contadores...');
            this.setupCounters();
            
            console.log('❓ Configurando FAQ...');
            this.setupFAQ();
            
            console.log('🔍 Configurando búsqueda de tickets...');
            this.setupTicketSearch();
            
            console.log('🔧 Configurando selector de servicios...');
            this.setupServiceSelector();
            
            console.log('🔗 Configurando navegación suave...');
            this.setupSmoothNavigation();
            
            console.log('🎥 Configurando video...');
            this.setupVideo();
            
            console.log('🖼️ Configurando portafolio...');
            this.setupPortfolio();
            
            console.log('⬆️ Configurando scroll to top...');
            this.setupScrollToTop();
            
            console.log('🔒 Configurando acceso secreto...');
            this.setupSecretAccess();
            
            console.log('🛒 Configurando tienda online...');
            this.setupOnlineStore();
            
            console.log('📧 Configurando formulario de contacto...');
            this.setupContactForm();
            
            // Hide loader
            console.log('🎯 Ocultando loader...');
            this.hideLoader();
            
            console.log('✅ STD TEC App inicializada correctamente');
            
        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error);
            console.error('Stack trace:', error.stack);
            this.hideLoader();
        }
    }
    
    // ===== TEMA =====
    setupTheme() {
        try {
            const themeToggle = document.getElementById('theme-toggle');
            const savedTheme = localStorage.getItem('theme') || 'light';
            
            document.documentElement.setAttribute('data-theme', savedTheme);
            
            if (themeToggle) {
                themeToggle.addEventListener('click', () => {
                    const currentTheme = document.documentElement.getAttribute('data-theme');
                    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                    
                    document.documentElement.setAttribute('data-theme', newTheme);
                    localStorage.setItem('theme', newTheme);
                });
            }
        } catch (error) {
            console.warn('Error configurando tema:', error);
        }
    }
    
    setupNavigation() {
        try {
            const navbar = document.getElementById('navbar');
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            
            // Scroll effect
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar?.classList.add('scrolled');
                } else {
                    navbar?.classList.remove('scrolled');
                }
            });
            
            // Mobile menu toggle
            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    navToggle.classList.toggle('active');
                });
            }
        } catch (error) {
            console.warn('Error configurando navegación:', error);
        }
    }
    
    setupLoader() {
        // Loader básico sin dependencias
    }
    
    hideLoader() {
        try {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }
        } catch (error) {
            console.warn('Error ocultando loader:', error);
        }
    }
    
    // ===== ANIMACIONES =====
    setupAnimations() {
        try {
            // Animaciones muy suaves y tranquilas
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -20px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animated');
                    }
                });
            }, observerOptions);
            
            // Aplicar animaciones muy suaves a elementos específicos
            const animatedElements = document.querySelectorAll(
                '.stat-card, .testimonial-card, .faq-item, .service-card, ' +
                '.project-card, .support-card, .contact-card, .hero-text, ' +
                '.section-header, .service-item, .process-step'
            );
            
            animatedElements.forEach((el, index) => {
                // Configuración inicial muy sutil
                el.style.opacity = '0';
                el.style.transform = 'translateY(15px)'; // Movimiento más sutil
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'; // Más lento y suave
                el.style.transitionDelay = `${index * 0.05}s`; // Delay muy pequeño
                
                observer.observe(el);
            });
        } catch (error) {
            console.warn('Error configurando animaciones:', error);
        }
    }
    
    // ===== ANIMACIONES DE TÍTULO =====
    setupTitleAnimations() {
        try {
            const titleLines = document.querySelectorAll('.title-line');
            
            if (titleLines.length > 0) {
                titleLines.forEach((line, index) => {
                    // Reiniciar animación
                    line.style.opacity = '0';
                    line.style.transform = 'translateY(30px)';
                    
                    // Aplicar animación con delay
                    setTimeout(() => {
                        line.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                        line.style.opacity = '1';
                        line.style.transform = 'translateY(0)';
                    }, index * 200 + 100);
                });
            }
        } catch (error) {
            console.warn('Error configurando animaciones de título:', error);
        }
    }
    
    // ===== CONTADORES =====
    setupCounters() {
        try {
            const counters = document.querySelectorAll('[data-count]');
            
            const animateCounter = (counter) => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2500; // Duración más larga para efecto más tranquilo
                const start = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing más suave (ease-out cuadrático)
                    const easeOut = 1 - Math.pow(1 - progress, 2);
                    const current = Math.floor(target * easeOut);
                    
                    counter.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target; // Asegurar valor final exacto
                    }
                };
                
                // Pequeño delay para que sea más natural
                setTimeout(() => {
                    requestAnimationFrame(updateCounter);
                }, 200);
            };
            
            if (counters.length > 0) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                            animateCounter(entry.target);
                            entry.target.classList.add('animated');
                        }
                    });
                }, { threshold: 0.3 }); // Threshold más bajo para activación más temprana
                
                counters.forEach(counter => observer.observe(counter));
            }
        } catch (error) {
            console.warn('Error en setupCounterAnimations:', error);
        }
    }
    
    // ===== FAQ INTERACTIVO SUAVE =====
    setupFAQ() {
        try {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                
                if (question && answer) {
                    question.addEventListener('click', () => {
                        const isActive = item.classList.contains('active');
                        
                        // Cerrar otros FAQs suavemente
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('active')) {
                                otherItem.classList.remove('active');
                            }
                        });
                        
                        // Toggle el FAQ actual con delay suave
                        if (!isActive) {
                            setTimeout(() => {
                                item.classList.add('active');
                            }, 150); // Pequeño delay para suavizar la transición
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
            });
        } catch (error) {
            console.warn('Error en setupFAQ:', error);
        }
    }
    
    // ===== BÚSQUEDA DE TICKETS =====
    setupTicketSearch() {
        try {
            const searchBtn = document.getElementById('search-ticket-btn');
            const searchInput = document.getElementById('ticket-search');
            const resultDiv = document.getElementById('ticket-result');
            const exampleButtons = document.querySelectorAll('.example-card');
            
            if (searchBtn && searchInput && resultDiv) {
                searchBtn.addEventListener('click', () => {
                    // Limpiar y convertir a mayúsculas
                    const cleanValue = searchInput.value.trim().toUpperCase();
                    searchInput.value = cleanValue;
                    this.searchTicket(cleanValue, resultDiv);
                });
                
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        // Limpiar y convertir a mayúsculas
                        const cleanValue = searchInput.value.trim().toUpperCase();
                        searchInput.value = cleanValue;
                        this.searchTicket(cleanValue, resultDiv);
                    }
                });
            }
            
            // Botones de ejemplo
            exampleButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const folio = btn.dataset.folio;
                    if (searchInput) searchInput.value = folio;
                    this.searchTicket(folio, resultDiv);
                });
            });
            
        } catch (error) {
            console.log('Búsqueda de tickets no disponible en esta página');
        }
    }
    
    searchTicket(folio, resultDiv) {
        if (!folio || !resultDiv) return;
        
        // Limpiar espacios y convertir a mayúsculas
        folio = folio.trim().toUpperCase();
        
        // Mostrar loading
        resultDiv.innerHTML = `
            <div class="ticket-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Buscando folio...</p>
            </div>
        `;
        resultDiv.style.display = 'block';
        
        // Simular delay de búsqueda
        setTimeout(async () => {
            let foundFolio = null;
            
            try {
                // Intentar buscar en Firebase primero
                if (window.firebaseSimple) {
                    foundFolio = await window.firebaseSimple.searchFolio(folio);
                    console.log('🔥 Búsqueda en Firebase:', foundFolio ? 'Encontrado' : 'No encontrado');
                }
                
                // Fallback a localStorage si no se encuentra en Firebase
                if (!foundFolio) {
                    const folios = this.getStorage('stdtec_folios') || [];
                    foundFolio = folios.find(f => f.id.toUpperCase() === folio);
                    console.log('💾 Búsqueda en localStorage:', foundFolio ? 'Encontrado' : 'No encontrado');
                }
            } catch (error) {
                console.warn('⚠️ Error en búsqueda Firebase, usando localStorage');
                const folios = this.getStorage('stdtec_folios') || [];
                foundFolio = folios.find(f => f.id.toUpperCase() === folio);
            }
            
            if (foundFolio) {
                const statusLabels = {
                    'pendiente': 'Pendiente',
                    'revision': 'En Revisión',
                    'proceso': 'En Proceso',
                    'finalizado': 'Finalizado',
                    'devuelto': 'Devuelto',
                    'entregado': 'Entregado'
                };
                
                resultDiv.innerHTML = `
                    <div class="ticket-found">
                        <h4>✅ Folio encontrado: ${foundFolio.id}</h4>
                        <div class="ticket-details">
                            <p><strong>Cliente:</strong> ${foundFolio.client.name}</p>
                            <p><strong>Equipo:</strong> ${foundFolio.equipment.type} ${foundFolio.equipment.brand || ''} ${foundFolio.equipment.model || ''}</p>
                            <p><strong>Estado:</strong> <span class="status ${foundFolio.service.status}">${statusLabels[foundFolio.service.status] || foundFolio.service.status}</span></p>
                            <p><strong>Fecha:</strong> ${new Date(foundFolio.createdAt).toLocaleDateString('es-ES')}</p>
                            <p><strong>Problema:</strong> ${foundFolio.equipment.problemDescription}</p>
                            ${foundFolio.service.price ? `<p><strong>Precio:</strong> $${foundFolio.service.price}</p>` : ''}
                        </div>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="ticket-not-found">
                        <h4>❌ Folio no encontrado</h4>
                        <p>El folio "${folio}" no existe en nuestro sistema. Verifica que esté escrito correctamente.</p>
                    </div>
                `;
            }
        }, 800);
    }
    
    // Método auxiliar para obtener datos del localStorage
    getStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error al leer localStorage:', error);
            return null;
        }
    }
    
    // ===== SELECTOR DE SERVICIOS =====
    setupServiceSelector() {
        try {
            const selectorButtons = document.querySelectorAll('.selector-btn');
            const serviceCategories = document.querySelectorAll('.service-category');
            
            if (selectorButtons.length > 0 && serviceCategories.length > 0) {
                selectorButtons.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const serviceType = btn.dataset.service;
                        
                        // Actualizar botones activos
                        selectorButtons.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        
                        // Mostrar/ocultar categorías de servicios
                        serviceCategories.forEach(category => {
                            category.classList.remove('active');
                            if (category.id === `${serviceType}-services`) {
                                category.classList.add('active');
                            }
                        });
                    });
                });
            }
        } catch (error) {
            console.log('Selector de servicios no disponible en esta página');
        }
    }
    
    // ===== VIDEO PLAYER =====
    setupVideo() {
        try {
            const playBtn = document.getElementById('video-play-btn');
            const placeholder = document.getElementById('video-placeholder');
            const iframeContainer = document.getElementById('video-iframe-container');
            const iframe = document.getElementById('youtube-iframe');
            
            if (playBtn && placeholder && iframeContainer && iframe) {
                playBtn.addEventListener('click', () => {
                    // URL del video de YouTube (puedes cambiar el ID del video)
                    const videoId = 'pTst8Fy8JCY'; // Video corporativo STD TEC
                    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
                    
                    // Cargar el video
                    iframe.src = videoUrl;
                    
                    // Mostrar iframe y ocultar placeholder
                    placeholder.style.display = 'none';
                    iframeContainer.style.display = 'block';
                    
                    // Animación suave
                    iframeContainer.style.opacity = '0';
                    setTimeout(() => {
                        iframeContainer.style.transition = 'opacity 0.3s ease-in-out';
                        iframeContainer.style.opacity = '1';
                    }, 50);
                });
            }
        } catch (error) {
            console.log('Video player no disponible en esta página');
        }
    }
    
    // ===== PORTFOLIO =====
    setupPortfolio() {
        try {
            // Portfolio main selector (Desarrollo vs Soporte)
            const portfolioButtons = document.querySelectorAll('.portfolio-btn');
            const portfolioCategories = document.querySelectorAll('.portfolio-category');
            
            if (portfolioButtons.length > 0) {
                portfolioButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const portfolioType = btn.dataset.portfolio;
                        
                        // Update main buttons
                        portfolioButtons.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        
                        // Show/hide portfolio categories
                        portfolioCategories.forEach(category => {
                            category.classList.remove('active');
                            if (category.id === `${portfolioType}-portfolio`) {
                                category.classList.add('active');
                            }
                        });
                    });
                });
            }
            
            // Sub-selectors (Particulares vs Empresariales)
            const subSelectorButtons = document.querySelectorAll('.sub-selector-btn');
            const portfolioGrids = document.querySelectorAll('.portfolio-grid');
            
            if (subSelectorButtons.length > 0) {
                subSelectorButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const subType = btn.dataset.sub;
                        const parentCategory = btn.closest('.portfolio-category');
                        
                        // Update sub-selector buttons within the same category
                        const categorySubButtons = parentCategory.querySelectorAll('.sub-selector-btn');
                        categorySubButtons.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        
                        // Show/hide portfolio grids within the same category
                        const categoryGrids = parentCategory.querySelectorAll('.portfolio-grid');
                        categoryGrids.forEach(grid => {
                            grid.classList.remove('active');
                            if (grid.id === subType) {
                                grid.classList.add('active');
                            }
                        });
                    });
                });
            }
            
            // Portfolio view buttons (optional - for future modal functionality)
            const viewButtons = document.querySelectorAll('.portfolio-view-btn');
            viewButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Future: Open modal with project details
                    console.log('Ver proyecto:', btn.closest('.portfolio-item'));
                });
            });
            
        } catch (error) {
            console.warn('Error en setupPortfolio:', error);
        }
    }
    
    // ===== VIDEO PLAYER =====
    setupVideo() {
        try {
            const playBtn = document.getElementById('video-play-btn');
            const placeholder = document.getElementById('video-placeholder');
            const iframeContainer = document.getElementById('video-iframe-container');
            const iframe = document.getElementById('youtube-iframe');
                    
            if (playBtn && placeholder && iframeContainer && iframe) {
                playBtn.addEventListener('click', () => {
                    // URL del video de YouTube (puedes cambiar el ID del video)
                    const videoId = 'pTst8Fy8JCY'; // Video corporativo STD TEC
                    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
                            
                    // Cargar el video
                    iframe.src = videoUrl;
                            
                    // Mostrar iframe y ocultar placeholder
                    placeholder.style.display = 'none';
                    iframeContainer.style.display = 'block';
                            
                    // Animación suave
                    iframeContainer.style.opacity = '0';
                    setTimeout(() => {
                        iframeContainer.style.transition = 'opacity 0.3s ease-in-out';
                        iframeContainer.style.opacity = '1';
                    }, 50);
                });
            }
        } catch (error) {
            console.log('Video player no disponible en esta página');
        }
    }
            
    // ===== PORTFOLIO =====
    setupPortfolio() {
        try {
        // Portfolio main selector (Desarrollo vs Soporte)
        const portfolioButtons = document.querySelectorAll('.portfolio-btn');
        const portfolioCategories = document.querySelectorAll('.portfolio-category');
                
        if (portfolioButtons.length > 0) {
            portfolioButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const portfolioType = btn.dataset.portfolio;
                            
                    // Update main buttons
                    portfolioButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                            
                    // Show/hide portfolio categories
                    portfolioCategories.forEach(category => {
                        category.classList.remove('active');
                        if (category.id === `${portfolioType}-portfolio`) {
                            category.classList.add('active');
                        }
                    });
                });
            });
        }
                
        // Sub-selectors (Particulares vs Empresariales)
        const subSelectorButtons = document.querySelectorAll('.sub-selector-btn');
        const portfolioGrids = document.querySelectorAll('.portfolio-grid');
                
        if (subSelectorButtons.length > 0) {
            subSelectorButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const subType = btn.dataset.sub;
                    const parentCategory = btn.closest('.portfolio-category');
                            
                    // Update sub-selector buttons within the same category
                    const categorySubButtons = parentCategory.querySelectorAll('.sub-selector-btn');
                    categorySubButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                            
                    // Show/hide portfolio grids within the same category
                    const categoryGrids = parentCategory.querySelectorAll('.portfolio-grid');
                    categoryGrids.forEach(grid => {
                        grid.classList.remove('active');
                        if (grid.id === subType) {
                            grid.classList.add('active');
                        }
                    });
                });
            });
        }
                
        // Portfolio view buttons (optional - for future modal functionality)
        const viewButtons = document.querySelectorAll('.portfolio-view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Future: Open modal with project details
                console.log('Ver proyecto:', btn.closest('.portfolio-item'));
            });
        });
                
        } catch (error) {
            console.log('Portfolio no disponible en esta página');
        }
    }

    // ===== SCROLL TO TOP =====
    setupScrollToTop() {
        try {
            console.log('⬆️ Configurando scroll to top...');
                    
            const scrollToTopBtn = document.getElementById('scroll-to-top');
            console.log('🔍 Botón encontrado:', scrollToTopBtn);
                    
            if (scrollToTopBtn) {
                // Aplicar estilos directamente para asegurar visibilidad
                scrollToTopBtn.style.cssText = `
                    position: fixed !important;
                    bottom: 30px !important;
                    right: 30px !important;
                    width: 60px !important;
                    height: 60px !important;
                    background: #007bff !important;
                    color: white !important;
                    border: none !important;
                    border-radius: 50% !important;
                    cursor: pointer !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    font-size: 20px !important;
                    z-index: 9999 !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                    transform: translateY(20px) !important;
                    transition: all 0.3s ease !important;
                    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4) !important;
                `;
                
                // Mostrar/ocultar botón según scroll
                window.addEventListener('scroll', () => {
                    const scrollY = window.pageYOffset;
                    console.log('📏 Scroll position:', scrollY);
                    
                    if (scrollY > 100) {
                        scrollToTopBtn.style.opacity = '1';
                        scrollToTopBtn.style.visibility = 'visible';
                        scrollToTopBtn.style.transform = 'translateY(0)';
                        console.log('👁️ Botón mostrado');
                    } else {
                        scrollToTopBtn.style.opacity = '0';
                        scrollToTopBtn.style.visibility = 'hidden';
                        scrollToTopBtn.style.transform = 'translateY(20px)';
                        console.log('🙈 Botón oculto');
                    }
                });
                        
                // Hover effects
                scrollToTopBtn.addEventListener('mouseenter', () => {
                    scrollToTopBtn.style.background = '#0056b3';
                    scrollToTopBtn.style.transform = scrollToTopBtn.style.opacity === '1' ? 'translateY(-3px) scale(1.05)' : 'translateY(20px)';
                    scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.6)';
                });
                
                scrollToTopBtn.addEventListener('mouseleave', () => {
                    scrollToTopBtn.style.background = '#007bff';
                    scrollToTopBtn.style.transform = scrollToTopBtn.style.opacity === '1' ? 'translateY(0)' : 'translateY(20px)';
                    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
                });
                
                // Click para ir arriba
                scrollToTopBtn.addEventListener('click', () => {
                    console.log('🔝 Click en scroll to top');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
                        
                console.log('✅ Scroll to top configurado correctamente');
            } else {
                console.log('❌ Botón scroll to top NO encontrado');
            }
        } catch (error) {
            console.warn('Error en setupScrollToTop:', error);
        }
    }
    
    // Configurar navegación suave
    setupSmoothNavigation() {
        try {
            // Configurar scroll suave solo para enlaces del menú de navegación
            const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .btn[href^="#"]');
            
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    
                    // Solo procesar si es un enlace interno válido
                    if (href && href !== '#') {
                        const targetId = href.substring(1);
                        const targetElement = document.getElementById(targetId);
                        
                        if (targetElement) {
                            e.preventDefault();
                            
                            // Scroll suave al elemento
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            
                            // Cerrar menú móvil si está abierto
                            const navMenu = document.getElementById('nav-menu');
                            const navToggle = document.getElementById('nav-toggle');
                            if (navMenu && navMenu.classList.contains('active')) {
                                navMenu.classList.remove('active');
                                if (navToggle) {
                                    navToggle.classList.remove('active');
                                }
                            }
                            
                            console.log(`🔗 Navegando suavemente a: ${targetId}`);
                        }
                    }
                });
            });
            
            console.log('✅ Navegación suave configurada');
        } catch (error) {
            console.warn('Error en setupSmoothNavigation:', error);
        }
    }
    
    // Configurar acceso secreto al panel admin
    setupSecretAccess() {
        try {
            const secretElement = document.getElementById('secret-admin-access');
            if (secretElement) {
                let clickCount = 0;
                let clickTimer = null;
                
                console.log('🔒 Elemento de acceso secreto encontrado:', secretElement);
                
                // Usar addEventListener directamente sin conflictos
                secretElement.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('🔒 Click en acceso secreto - Solicitando clave');
                    
                    // Visual feedback
                    secretElement.style.color = '#f59e0b';
                    
                    // Prompt for password
                    const password = prompt('🔒 Ingresa la clave de acceso:');
                    
                    if (password === 'clave') {
                        console.log('🔓 Clave correcta - Acceso concedido');
                        
                        // Visual feedback success
                        secretElement.style.animation = 'pulse 0.5s ease-in-out 3';
                        secretElement.style.color = '#10b981';
                        
                        // Show success notification
                        this.showNotification('🔓 Acceso administrativo concedido', 'success');
                        
                        // Redirect to admin panel
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 1500);
                        
                    } else if (password !== null) {
                        // Wrong password (but not cancelled)
                        console.log('❌ Clave incorrecta');
                        
                        // Visual feedback error
                        secretElement.style.color = '#ef4444';
                        secretElement.style.animation = 'shake 0.5s ease-in-out';
                        
                        // Show error notification
                        this.showNotification('❌ Clave incorrecta', 'error');
                        
                        // Reset color after animation
                        setTimeout(() => {
                            secretElement.style.color = '';
                            secretElement.style.animation = '';
                        }, 1000);
                    } else {
                        // Cancelled
                        console.log('🔒 Acceso cancelado');
                        secretElement.style.color = '';
                    }
                };
                
                console.log('✅ Acceso secreto configurado correctamente');
                
                // Test de funcionalidad (solo para debug)
                window.testSecretAccess = () => {
                    console.log('🧪 Probando acceso secreto...');
                    // Simular prompt con clave correcta
                    window.prompt = () => 'clave';
                    secretElement.click();
                    // Restaurar prompt original después de un momento
                    setTimeout(() => {
                        delete window.prompt;
                    }, 100);
                };
                
            } else {
                console.log('❌ Elemento de acceso secreto NO encontrado');
            }
        } catch (error) {
            console.warn('Error en setupSecretAccess:', error);
        }
    }
    
    // Configurar funcionalidad de tienda online
    setupOnlineStore() {
        try {
            const storeBtn = document.getElementById('visit-store-btn');
            if (storeBtn) {
                // Add hover effect for better UX
                storeBtn.addEventListener('mouseenter', () => {
                    storeBtn.style.transform = 'translateY(-2px) scale(1.02)';
                });
                
                storeBtn.addEventListener('mouseleave', () => {
                    storeBtn.style.transform = '';
                });
                
                console.log('✅ Tienda online configurada');
            } else {
                console.log('❌ Botón de tienda NO encontrado');
            }
        } catch (error) {
            console.warn('Error en setupOnlineStore:', error);
        }
    }
    
    // Mostrar notificaciones
    showNotification(message, type = 'info') {
        try {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-message">${message}</span>
                    <button class="notification-close">&times;</button>
                </div>
            `;
            
            // Add styles
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#10b981' : type === 'info' ? '#3b82f6' : '#f59e0b'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 300px;
                font-size: 0.9rem;
            `;
            
            // Add animation styles
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }
                .notification-close:hover {
                    opacity: 1;
                }
            `;
            
            if (!document.querySelector('#notification-styles')) {
                style.id = 'notification-styles';
                document.head.appendChild(style);
            }
            
            // Add to page
            document.body.appendChild(notification);
            
            // Close button functionality
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            });
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOutRight 0.3s ease';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }
            }, 5000);
            
        } catch (error) {
            console.warn('Error mostrando notificación:', error);
            // Fallback to alert
            alert(message);
        }
    }
    
    // ===== FORMULARIO DE CONTACTO =====
    setupContactForm() {
        try {
            const contactForm = document.getElementById('contact-form');
            if (!contactForm) return;
            
            console.log('📧 Configurando formulario de contacto...');
            
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Obtener datos del formulario
                const formData = new FormData(contactForm);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    service: formData.get('service'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                    privacy: formData.get('privacy')
                };
                
                // Validar campos obligatorios
                if (!data.name || !data.email || !data.subject || !data.message || !data.privacy) {
                    this.showNotification('❌ Por favor completa todos los campos obligatorios', 'error');
                    return;
                }
                
                // Validar email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    this.showNotification('❌ Por favor ingresa un email válido', 'error');
                    return;
                }
                
                // Mostrar estado de envío
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                try {
                    // Simular envío (aquí se integraría con un servicio real)
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    // Crear mensaje para WhatsApp
                    const whatsappMessage = encodeURIComponent(
                        `Hola, soy ${data.name}.\n\n` +
                        `Email: ${data.email}\n` +
                        `Teléfono: ${data.phone || 'No proporcionado'}\n` +
                        `Servicio: ${data.service || 'No especificado'}\n` +
                        `Asunto: ${data.subject}\n\n` +
                        `Mensaje:\n${data.message}`
                    );
                    
                    // Crear mensaje para email
                    const emailSubject = encodeURIComponent(`Contacto Web: ${data.subject}`);
                    const emailBody = encodeURIComponent(
                        `Nombre: ${data.name}\n` +
                        `Email: ${data.email}\n` +
                        `Teléfono: ${data.phone || 'No proporcionado'}\n` +
                        `Servicio: ${data.service || 'No especificado'}\n\n` +
                        `Mensaje:\n${data.message}`
                    );
                    
                    // Mostrar opciones de envío
                    const modal = document.createElement('div');
                    modal.innerHTML = `
                        <div style="
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(0, 0, 0, 0.5);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 10000;
                        ">
                            <div style="
                                background: white;
                                padding: 2rem;
                                border-radius: 12px;
                                max-width: 500px;
                                width: 90%;
                                text-align: center;
                                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                            ">
                                <h3 style="margin-bottom: 1rem; color: #333;">✅ Mensaje Preparado</h3>
                                <p style="margin-bottom: 2rem; color: #666;">
                                    Tu mensaje ha sido preparado. Elige cómo quieres enviarlo:
                                </p>
                                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                                    <a href="https://wa.me/524273719797?text=${whatsappMessage}" 
                                       target="_blank"
                                       style="
                                           background: #25d366;
                                           color: white;
                                           padding: 0.75rem 1.5rem;
                                           border-radius: 8px;
                                           text-decoration: none;
                                           display: flex;
                                           align-items: center;
                                           gap: 0.5rem;
                                           transition: background 0.3s;
                                       "
                                       onmouseover="this.style.background='#128c7e'"
                                       onmouseout="this.style.background='#25d366'">
                                        <i class="fab fa-whatsapp"></i>
                                        WhatsApp
                                    </a>
                                    <a href="mailto:cyberstdtec@gmail.com?subject=${emailSubject}&body=${emailBody}"
                                       style="
                                           background: #007bff;
                                           color: white;
                                           padding: 0.75rem 1.5rem;
                                           border-radius: 8px;
                                           text-decoration: none;
                                           display: flex;
                                           align-items: center;
                                           gap: 0.5rem;
                                           transition: background 0.3s;
                                       "
                                       onmouseover="this.style.background='#0056b3'"
                                       onmouseout="this.style.background='#007bff'">
                                        <i class="fas fa-envelope"></i>
                                        Email
                                    </a>
                                </div>
                                <button onclick="this.parentElement.parentElement.remove()" 
                                        style="
                                            background: #6c757d;
                                            color: white;
                                            border: none;
                                            padding: 0.5rem 1rem;
                                            border-radius: 6px;
                                            margin-top: 1rem;
                                            cursor: pointer;
                                            transition: background 0.3s;
                                        "
                                        onmouseover="this.style.background='#545b62'"
                                        onmouseout="this.style.background='#6c757d'">
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modal);
                    
                    // Limpiar formulario
                    contactForm.reset();
                    
                    this.showNotification('✅ Mensaje preparado exitosamente', 'success');
                    
                } catch (error) {
                    console.error('Error enviando formulario:', error);
                    this.showNotification('❌ Error al procesar el mensaje. Inténtalo de nuevo.', 'error');
                } finally {
                    // Restaurar botón
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
            
        } catch (error) {
            console.error('Error configurando formulario de contacto:', error);
        }
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    window.app = new STDTecApp();
});

// Fallback para navegadores antiguos
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.app) {
            window.app = new STDTecApp();
        }
    });
} else {
    window.app = new STDTecApp();
}

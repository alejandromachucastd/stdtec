// ===== APLICACIÓN PRINCIPAL STD TEC =====

class STDTecApp {
    constructor() {
        this.init();
    }
    
    async init() {
        try {
            console.log('🚀 Inicializando STD TEC App...');
            
            // Configurar componentes básicos
            this.setupTheme();
            this.setupNavigation();
            this.setupLoader();
            
            // Configurar animaciones simples y estables
            this.setupSimpleAnimations();
            
            // Configurar funcionalidades específicas de página
            this.setupPageSpecificFeatures();
            
            // Configurar búsqueda de tickets
            this.setupTicketSearch();
            
            // Ocultar loader
            this.hideLoader();
            
            console.log('✅ STD TEC App inicializada correctamente');
            
        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error);
            this.hideLoader();
        }
    }
    
    // ===== MÉTODOS BÁSICOS =====
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
                    
                    // Actualizar icono
                    const icon = themeToggle.querySelector('i');
                    if (icon) {
                        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                    }
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
            const navLinks = document.querySelectorAll('.nav-link');
            
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
            
            // Smooth scroll para enlaces internos
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                        
                        // Cerrar menú móvil
                        navMenu?.classList.remove('active');
                        navToggle?.classList.remove('active');
                    }
                });
            });
            
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
    
    // ===== ANIMACIONES SIMPLES Y ESTABLES =====
    setupSimpleAnimations() {
        try {
            // Animaciones de scroll suaves y estables
            const observerOptions = {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Aplicar animaciones a elementos específicos
            const animatedElements = document.querySelectorAll('.stat-card, .testimonial-card, .faq-item, .service-card, .trust-indicator, .project-card');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        } catch (error) {
            console.warn('Error configurando animaciones:', error);
        }
    }
    
    // ===== FUNCIONALIDADES ESPECÍFICAS DE PÁGINA =====
    setupPageSpecificFeatures() {
        try {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            switch (currentPage) {
                case 'desarrollo.html':
                    this.setupDevelopmentPage();
                    break;
                case 'soporte.html':
                    this.setupSupportPage();
                    break;
                case 'contacto.html':
                    this.setupContactPage();
                    break;
                default:
                    this.setupHomePage();
            }
        } catch (error) {
            console.warn('Error en setupPageSpecificFeatures:', error);
        }
    }
    
    setupHomePage() {
        try {
            this.setupCounterAnimations();
            this.setupFAQ();
            this.setupServiceSelector();
        } catch (error) {
            console.warn('Error en setupHomePage:', error);
        }
    }
    
    setupDevelopmentPage() {
        try {
            this.setupCounterAnimations();
            this.setupServiceSelector();
        } catch (error) {
            console.warn('Error en setupDevelopmentPage:', error);
        }
    }
    
    setupSupportPage() {
        try {
            this.setupCounterAnimations();
            this.setupFAQ();
        } catch (error) {
            console.warn('Error en setupSupportPage:', error);
        }
    }
    
    setupContactPage() {
        try {
            this.setupCounterAnimations();
        } catch (error) {
            console.warn('Error en setupContactPage:', error);
        }
    }
    
    // ===== SELECTOR DE SERVICIOS =====
    setupServiceSelector() {
        try {
            const serviceButtons = document.querySelectorAll('.service-type-btn');
            const serviceCards = document.querySelectorAll('.service-card');
            
            serviceButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const serviceType = button.getAttribute('data-service');
                    
                    // Actualizar botones activos
                    serviceButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Mostrar/ocultar servicios
                    serviceCards.forEach(card => {
                        const cardType = card.getAttribute('data-service');
                        if (serviceType === 'all' || cardType === serviceType) {
                            card.style.display = 'block';
                            card.style.opacity = '0';
                            setTimeout(() => {
                                card.style.opacity = '1';
                            }, 100);
                        } else {
                            card.style.opacity = '0';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        } catch (error) {
            console.warn('Error en setupServiceSelector:', error);
        }
    }
    
    // ===== BÚSQUEDA DE TICKETS =====
    setupTicketSearch() {
        try {
            console.log('🔍 Configurando búsqueda de tickets...');
            
            const searchButton = document.getElementById('search-ticket-btn');
            const searchInput = document.getElementById('ticket-search');
            const resultContainer = document.getElementById('ticket-result');
            
            console.log('🔍 Elementos encontrados:');
            console.log('- Botón búsqueda:', searchButton ? 'SÍ' : 'NO');
            console.log('- Input búsqueda:', searchInput ? 'SÍ' : 'NO');
            console.log('- Contenedor resultado:', resultContainer ? 'SÍ' : 'NO');
            
            if (searchButton && searchInput) {
                console.log('✅ Configurando event listeners de búsqueda');
                
                searchButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('🔍 Click en botón de búsqueda');
                    this.searchTicket();
                });
                
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        console.log('🔍 Enter en input de búsqueda');
                        this.searchTicket();
                    }
                });
                
                console.log('✅ Event listeners configurados correctamente');
            } else {
                console.warn('❌ No se encontraron los elementos de búsqueda');
            }
        } catch (error) {
            console.error('❌ Error en setupTicketSearch:', error);
        }
    }
    
    async searchTicket() {
        try {
            console.log('🔍 Iniciando búsqueda de folio...');
            
            const searchInput = document.getElementById('ticket-search');
            const resultContainer = document.getElementById('ticket-result');
            
            console.log('🔍 Elementos de búsqueda:');
            console.log('- Input:', searchInput);
            console.log('- Container:', resultContainer);
            
            if (!searchInput || !resultContainer) {
                console.error('❌ No se encontraron elementos necesarios para la búsqueda');
                return;
            }
            
            // Limpiar espacios y convertir a mayúsculas
            let ticketId = searchInput.value.trim().toUpperCase();
            console.log('🔍 ID original:', searchInput.value);
            console.log('🔍 ID procesado:', ticketId);
            
            // Actualizar el input con el texto limpio
            searchInput.value = ticketId;
            
            if (!ticketId) {
                console.log('❌ ID vacío');
                this.showSearchResult(resultContainer, 'error', 'Por favor ingresa un número de folio');
                return;
            }
            
            // Mostrar loading
            console.log('⏳ Mostrando estado de carga...');
            this.showSearchResult(resultContainer, 'loading', 'Buscando folio...');
            
            // Simular búsqueda
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Obtener folios reales del localStorage (mismo key que usa el admin)
            const folios = this.getStorage('stdtec_folios') || [];
            console.log('📊 Total de folios en localStorage:', folios.length);
            console.log('📊 Folios encontrados:', folios);
            console.log('🔍 Buscando ID:', ticketId);
            
            // Buscar el folio (comparación insensible a mayúsculas)
            const folio = folios.find(f => {
                const folioIdUpper = f.id.toUpperCase();
                console.log(`🔍 Comparando: "${folioIdUpper}" === "${ticketId}"`);
                return folioIdUpper === ticketId;
            });
            
            console.log('🎯 Folio encontrado:', folio);
            
            if (folio) {
                // Convertir folio al formato esperado
                const ticket = {
                    id: folio.id,
                    client: folio.client.name,
                    equipment: `${folio.equipment.type} ${folio.equipment.brand || ''} ${folio.equipment.model || ''}`.trim(),
                    status: this.getStatusLabel(folio.service.status),
                    date: new Date(folio.createdAt).toLocaleDateString('es-ES'),
                    price: folio.service.price || 0,
                    problem: folio.equipment.problemDescription
                };
                
                console.log('✅ Mostrando resultado exitoso:', ticket);
                this.showSearchResult(resultContainer, 'success', '', ticket);
            } else {
                console.log('❌ Folio no encontrado');
                this.showSearchResult(resultContainer, 'not-found', `No se encontró el folio: ${ticketId}`);
            }
            
        } catch (error) {
            console.error('❌ Error en búsqueda:', error);
            const resultContainer = document.getElementById('ticket-result');
            if (resultContainer) {
                this.showSearchResult(resultContainer, 'error', 'Error en la búsqueda. Intenta nuevamente.');
            }
        }
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
    
    // Método auxiliar para obtener etiquetas de estado
    getStatusLabel(status) {
        const statusLabels = {
            'pendiente': 'Pendiente',
            'revision': 'En Revisión',
            'proceso': 'En Proceso',
            'finalizado': 'Finalizado',
            'devuelto': 'Devuelto',
            'entregado': 'Entregado'
        };
        return statusLabels[status] || status;
    }
    
    showSearchResult(container, type, message, ticket = null) {
        let content = '';
        
        switch (type) {
            case 'loading':
                content = `
                    <div class="search-result loading">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>${message}</p>
                    </div>
                `;
                break;
                
            case 'success':
                content = `
                    <div class="search-result success">
                        <div class="ticket-info">
                            <h4><i class="fas fa-check-circle"></i> Folio Encontrado</h4>
                            <div class="ticket-details">
                                <p><strong>ID:</strong> ${ticket.id}</p>
                                <p><strong>Cliente:</strong> ${ticket.client}</p>
                                <p><strong>Equipo:</strong> ${ticket.equipment}</p>
                                <p><strong>Estado:</strong> <span class="status-badge">${ticket.status}</span></p>
                                <p><strong>Fecha:</strong> ${ticket.date}</p>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'not-found':
                content = `
                    <div class="search-result not-found">
                        <i class="fas fa-search"></i>
                        <h4>Folio no encontrado</h4>
                        <p>${message}</p>
                    </div>
                `;
                break;
                
            case 'error':
                content = `
                    <div class="search-result error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h4>Error</h4>
                        <p>${message}</p>
                    </div>
                `;
                break;
        }
        
        container.innerHTML = content;
        container.style.display = 'block';
    }
    
    // ===== ANIMACIONES DE CONTADORES =====
    setupCounterAnimations() {
        try {
            const counters = document.querySelectorAll('[data-count]');
            
            const animateCounter = (counter) => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 1500;
                const start = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(target * progress);
                    
                    counter.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                };
                
                requestAnimationFrame(updateCounter);
            };
            
            if (counters.length > 0) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                            animateCounter(entry.target);
                            entry.target.classList.add('animated');
                        }
                    });
                }, { threshold: 0.5 });
                
                counters.forEach(counter => observer.observe(counter));
            }
        } catch (error) {
            console.warn('Error en setupCounterAnimations:', error);
        }
    }
    
    // ===== FAQ INTERACTIVO =====
    setupFAQ() {
        try {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                if (question) {
                    question.addEventListener('click', () => {
                        // Cerrar otros FAQs
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                            }
                        });
                        
                        // Toggle el FAQ actual
                        item.classList.toggle('active');
                    });
                }
            });
        } catch (error) {
            console.warn('Error en setupFAQ:', error);
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

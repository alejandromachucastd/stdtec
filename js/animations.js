// ===== SISTEMA DE ANIMACIONES =====

class Animations {
    constructor() {
        this.observers = new Map();
        this.animationQueue = [];
        this.isProcessing = false;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }
    
    // ===== INTERSECTION OBSERVER =====
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, observerOptions);
        
        this.observers.set('scroll', observer);
        
        // Observar elementos con animación
        this.observeElements();
    }
    
    observeElements() {
        const animatedElements = Utils.$$('[data-animate], .animate-on-scroll, .scroll-animate');
        
        animatedElements.forEach(element => {
            this.observers.get('scroll').observe(element);
        });
    }
    
    triggerAnimation(element) {
        const animationType = element.getAttribute('data-animate') || 'fadeInUp';
        const delay = parseInt(element.getAttribute('data-delay')) || 0;
        
        setTimeout(() => {
            this.animate(element, animationType);
        }, delay);
        
        // Dejar de observar el elemento
        this.observers.get('scroll').unobserve(element);
    }
    
    // ===== ANIMACIONES PRINCIPALES =====
    
    animate(element, type, options = {}) {
        const defaultOptions = {
            duration: 600,
            easing: 'ease-out',
            fill: 'forwards'
        };
        
        const animationOptions = { ...defaultOptions, ...options };
        
        let keyframes;
        
        switch (type) {
            case 'fadeIn':
                keyframes = [
                    { opacity: 0 },
                    { opacity: 1 }
                ];
                break;
                
            case 'fadeInUp':
                keyframes = [
                    { opacity: 0, transform: 'translateY(30px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ];
                break;
                
            case 'fadeInDown':
                keyframes = [
                    { opacity: 0, transform: 'translateY(-30px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ];
                break;
                
            case 'fadeInLeft':
                keyframes = [
                    { opacity: 0, transform: 'translateX(-30px)' },
                    { opacity: 1, transform: 'translateX(0)' }
                ];
                break;
                
            case 'fadeInRight':
                keyframes = [
                    { opacity: 0, transform: 'translateX(30px)' },
                    { opacity: 1, transform: 'translateX(0)' }
                ];
                break;
                
            case 'scaleIn':
                keyframes = [
                    { opacity: 0, transform: 'scale(0.8)' },
                    { opacity: 1, transform: 'scale(1)' }
                ];
                break;
                
            case 'slideUp':
                keyframes = [
                    { transform: 'translateY(100%)', opacity: 0 },
                    { transform: 'translateY(0)', opacity: 1 }
                ];
                break;
                
            case 'slideDown':
                keyframes = [
                    { transform: 'translateY(-100%)', opacity: 0 },
                    { transform: 'translateY(0)', opacity: 1 }
                ];
                break;
                
            case 'zoomIn':
                keyframes = [
                    { opacity: 0, transform: 'scale(0.3)' },
                    { opacity: 1, transform: 'scale(1)' }
                ];
                break;
                
            case 'rotateIn':
                keyframes = [
                    { opacity: 0, transform: 'rotate(-180deg) scale(0.8)' },
                    { opacity: 1, transform: 'rotate(0deg) scale(1)' }
                ];
                break;
                
            case 'bounce':
                keyframes = [
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-20px)' },
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-10px)' },
                    { transform: 'translateY(0)' }
                ];
                animationOptions.duration = 1000;
                break;
                
            case 'pulse':
                keyframes = [
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.05)' },
                    { transform: 'scale(1)' }
                ];
                animationOptions.duration = 800;
                break;
                
            case 'shake':
                keyframes = [
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-10px)' },
                    { transform: 'translateX(10px)' },
                    { transform: 'translateX(-10px)' },
                    { transform: 'translateX(10px)' },
                    { transform: 'translateX(0)' }
                ];
                animationOptions.duration = 500;
                break;
                
            default:
                console.warn(`Tipo de animación no reconocido: ${type}`);
                return;
        }
        
        const animation = element.animate(keyframes, animationOptions);
        
        // Agregar clase para indicar que está animado
        Utils.addClass(element, 'animated');
        
        return animation;
    }
    
    // ===== ANIMACIONES DE SCROLL =====
    
    setupScrollAnimations() {
        // Parallax effect
        window.addEventListener('scroll', Utils.throttle(() => {
            this.updateParallaxElements();
            this.updateProgressBars();
        }, 16)); // 60fps
    }
    
    updateParallaxElements() {
        const parallaxElements = Utils.$$('[data-parallax]');
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    updateProgressBars() {
        const progressBars = Utils.$$('.scroll-progress');
        
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1);
                bar.style.setProperty('--progress', `${progress * 100}%`);
            }
        });
    }
    
    // ===== EFECTOS HOVER =====
    
    setupHoverEffects() {
        // Efecto de elevación en cards
        const hoverCards = Utils.$$('.card-hover, .hover-lift');
        
        hoverCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animate(card, 'lift', { duration: 200 });
            });
            
            card.addEventListener('mouseleave', () => {
                this.animate(card, 'unlift', { duration: 200 });
            });
        });
        
        // Efecto de glow en botones
        const glowButtons = Utils.$$('.btn-glow, .glow-effect');
        
        glowButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                Utils.addClass(button, 'glowing');
            });
            
            button.addEventListener('mouseleave', () => {
                Utils.removeClass(button, 'glowing');
            });
        });
    }
    
    // ===== ANIMACIONES PERSONALIZADAS =====
    
    // Animación de typing
    typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);
        
        return typeInterval;
    }
    
    // Animación de contador
    countUp(element, start = 0, end, duration = 2000) {
        const startTime = performance.now();
        const startValue = start;
        const endValue = end;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut);
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    // Animación de progress bar
    animateProgressBar(element, targetValue, duration = 1000) {
        const startTime = performance.now();
        const startValue = 0;
        
        const updateProgress = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (targetValue - startValue) * easeOut;
            
            element.style.width = `${currentValue}%`;
            
            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            }
        };
        
        requestAnimationFrame(updateProgress);
    }
    
    // ===== ANIMACIONES DE PARTÍCULAS =====
    
    createParticles(container, count = 50) {
        for (let i = 0; i < count; i++) {
            const particle = Utils.createElement('div', 'particle');
            
            // Posición aleatoria
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Tamaño aleatorio
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Animación aleatoria
            const duration = Math.random() * 10 + 5;
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            container.appendChild(particle);
        }
    }
    
    // ===== ANIMACIONES DE TRANSICIÓN =====
    
    slideTransition(fromElement, toElement, direction = 'left') {
        const container = fromElement.parentNode;
        const containerRect = container.getBoundingClientRect();
        
        // Configurar posiciones iniciales
        toElement.style.position = 'absolute';
        toElement.style.top = '0';
        toElement.style.width = '100%';
        
        let fromTransform, toTransform;
        
        switch (direction) {
            case 'left':
                toElement.style.left = '100%';
                fromTransform = 'translateX(-100%)';
                toTransform = 'translateX(-100%)';
                break;
            case 'right':
                toElement.style.left = '-100%';
                fromTransform = 'translateX(100%)';
                toTransform = 'translateX(100%)';
                break;
            case 'up':
                toElement.style.top = '100%';
                fromTransform = 'translateY(-100%)';
                toTransform = 'translateY(-100%)';
                break;
            case 'down':
                toElement.style.top = '-100%';
                fromTransform = 'translateY(100%)';
                toTransform = 'translateY(100%)';
                break;
        }
        
        container.appendChild(toElement);
        
        // Animar
        const fromAnimation = fromElement.animate([
            { transform: 'translateX(0)' },
            { transform: fromTransform }
        ], { duration: 300, easing: 'ease-in-out' });
        
        const toAnimation = toElement.animate([
            { transform: toTransform },
            { transform: 'translateX(0)' }
        ], { duration: 300, easing: 'ease-in-out' });
        
        return Promise.all([fromAnimation.finished, toAnimation.finished]);
    }
    
    fadeTransition(fromElement, toElement, duration = 300) {
        const fromAnimation = fromElement.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], { duration, easing: 'ease-out' });
        
        const toAnimation = toElement.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], { duration, easing: 'ease-in' });
        
        return Promise.all([fromAnimation.finished, toAnimation.finished]);
    }
    
    // ===== ANIMACIONES DE CARGA =====
    
    createLoadingAnimation(container, type = 'spinner') {
        const loader = Utils.createElement('div', `loading-animation loading-${type}`);
        
        switch (type) {
            case 'spinner':
                loader.innerHTML = '<div class="spinner"></div>';
                break;
                
            case 'dots':
                loader.innerHTML = `
                    <div class="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;
                break;
                
            case 'pulse':
                loader.innerHTML = '<div class="pulse-loader"></div>';
                break;
                
            case 'wave':
                loader.innerHTML = `
                    <div class="wave-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                `;
                break;
        }
        
        container.appendChild(loader);
        return loader;
    }
    
    // ===== UTILIDADES =====
    
    // Pausar todas las animaciones
    pauseAnimations() {
        document.querySelectorAll('*').forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    }
    
    // Reanudar todas las animaciones
    resumeAnimations() {
        document.querySelectorAll('*').forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
    
    // Verificar si las animaciones están habilitadas
    areAnimationsEnabled() {
        return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    // Configurar respeto por preferencias de accesibilidad
    respectMotionPreferences() {
        if (!this.areAnimationsEnabled()) {
            // Deshabilitar animaciones si el usuario prefiere movimiento reducido
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Limpiar observadores
    cleanup() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
    }
}

// ===== INICIALIZACIÓN =====
let animations;

document.addEventListener('DOMContentLoaded', () => {
    animations = new Animations();
    
    // Respetar preferencias de movimiento
    animations.respectMotionPreferences();
});

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Animations;
} else {
    window.Animations = Animations;
}

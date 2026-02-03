// ============================================
// LIVRARIA SÃO LUDOVICO PAVONI - SCRIPT.JS
// JavaScript otimizado e funcional
// ============================================

// Configurações globais
const CONFIG = {
    whatsappNumber: '5561983364705',
    whatsappMessage: 'Olá! Gostaria de informações sobre os produtos da livraria.',
    animationSpeed: 300,
    formSubmitDelay: 1500
};

// Classe principal do site
class LivrariaSite {
    constructor() {
        this.init();
    }

    // Inicialização principal
    init() {
        console.log('🚀 Livraria São Ludovico Pavoni - Site inicializando...');
        
        // Inicializa todas as funcionalidades
        this.setupMobileMenu();
        this.setupHeaderScroll();
        this.setupProductFilter();
        this.setupContactForm();
        this.setupSmoothScroll();
        this.setupActiveNav();
        this.setupProductModals();
        this.setupCurrentYear();
        this.setupTypeWriterEffect();
        this.setupWhatsAppButton();
        this.setupImageLazyLoading();
        this.setupFormValidation();
        this.setupIntersectionObserver();
        
        // Marca como carregado
        document.body.classList.add('loaded');
        
        console.log('✅ Site inicializado com sucesso!');
    }

    // ============ MENU MOBILE ============
    setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const mainNav = document.getElementById('mainNav');
        
        if (!menuToggle || !mainNav) return;

        // Toggle do menu
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Alterna ícone
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fechar menu ao clicar em links
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fechar menu com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ============ HEADER SCROLL EFFECT ============
    setupHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Efeito de shrink no header
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Esconder/mostrar header no scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                // Scroll para baixo
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scroll para cima
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ============ FILTRO DE PRODUTOS ============
    setupProductFilter() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const productCards = document.querySelectorAll('.product-card');
        const productCount = document.getElementById('productCount');
        
        if (categoryButtons.length === 0 || productCards.length === 0) return;

        // Atualiza contador inicial
        this.updateProductCount('todos');

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove classe active de todos
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                
                // Adiciona classe active ao clicado
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
                
                // Obtém categoria
                const category = button.dataset.category;
                
                // Filtra produtos com animação
                this.filterProducts(category);
                
                // Atualiza contador
                this.updateProductCount(category);
            });
        });
    }

    // Filtra produtos por categoria
    filterProducts(category) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            // Adiciona transição
            card.style.transition = 'all 0.3s ease';
            
            if (category === 'todos' || card.dataset.category === category) {
                // Mostra produto
                setTimeout(() => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                }, 100);
            } else {
                // Esconde produto
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Atualiza contador de produtos
    updateProductCount(category) {
        const productCount = document.getElementById('productCount');
        if (!productCount) return;

        const productCards = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        productCards.forEach(card => {
            if (category === 'todos' || card.dataset.category === category) {
                if (card.style.display !== 'none') {
                    visibleCount++;
                }
            }
        });

        productCount.textContent = `${visibleCount} produto${visibleCount !== 1 ? 's' : ''} encontrado${visibleCount !== 1 ? 's' : ''}`;
    }

    // ============ FORMULÁRIO DE CONTATO ============
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Valida formulário
            if (!this.validateForm(contactForm)) {
                this.showNotification('Por favor, corrija os erros no formulário.', 'error');
                return;
            }
            
            // Prepara dados
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Botão de submit
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Estado de loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            try {
                // Simula envio
                await this.simulateFormSubmit(data);
                
                // Sucesso
                this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                contactForm.reset();
                
            } catch (error) {
                // Erro
                this.showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.', 'error');
                console.error('Erro no formulário:', error);
            } finally {
                // Restaura botão
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Simula envio do formulário
    simulateFormSubmit(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('📧 Formulário enviado:', data);
                resolve(data);
            }, CONFIG.formSubmitDelay);
        });
    }

    // ============ VALIDAÇÃO DE FORMULÁRIO ============
    setupFormValidation() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const inputs = contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Validação em tempo real ao sair do campo
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            // Remove erro ao digitar
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    input.classList.remove('error');
                    const errorElement = input.nextElementSibling;
                    if (errorElement && errorElement.classList.contains('error-message')) {
                        errorElement.remove();
                    }
                }
            });
        });
    }

    // Valida campo individual
    validateField(field) {
        let isValid = true;
        let message = '';
        
        // Campo obrigatório
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'Este campo é obrigatório.';
        }
        
        // Validação de email
        else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'Por favor, insira um e-mail válido.';
            }
        }
        
        // Validação de telefone
        else if (field.type === 'tel' && field.value) {
            const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
            if (!phoneRegex.test(field.value.replace(/\D/g, ''))) {
                isValid = false;
                message = 'Por favor, insira um telefone válido.';
            }
        }
        
        // Aplica validação
        if (!isValid) {
            this.showFieldError(field, message);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }

    // Valida formulário completo
    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Mostra erro no campo
    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove mensagem anterior
        this.clearFieldError(field);
        
        // Cria nova mensagem
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.animation = 'fadeIn 0.3s ease';
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    // Limpa erro do campo
    clearFieldError(field) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }

    // ============ SCROLL SUAVE ============
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignora links vazios
                if (href === '#' || href === '#!') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualiza URL
                    history.pushState(null, null, href);
                }
            });
        });
    }

    // ============ NAVEGAÇÃO ATIVA ============
    setupActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav a[href^="#"]');
        
        if (sections.length === 0 || navLinks.length === 0) return;

        // Observer para detectar seção visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    // Atualiza links ativos
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        });

        // Observa todas as seções
        sections.forEach(section => observer.observe(section));
    }

    // ============ MODAIS DE PRODUTOS ============
    setupProductModals() {
        document.querySelectorAll('.btn-product').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                if (!productCard) return;
                
                const productData = {
                    name: productCard.querySelector('h3').textContent,
                    price: productCard.querySelector('.price').textContent,
                    description: productCard.querySelector('.product-description').textContent,
                    image: productCard.querySelector('img').src,
                    category: productCard.dataset.category
                };
                
                this.showProductModal(productData);
            });
        });
    }

    // Mostra modal de produto
    showProductModal(product) {
        // Remove modal existente
        this.closeProductModal();
        
        // Cria overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            z-index: 9998;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        `;
        
        // Cria modal
        const modal = document.createElement('div');
        modal.className = 'modal-content';
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -60%);
            background: white;
            border-radius: 16px;
            max-width: 800px;
            width: 90%;
            max-height: 85vh;
            overflow-y: auto;
            z-index: 9999;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            opacity: 0;
            animation: slideIn 0.3s ease 0.1s forwards;
        `;
        
        // Conteúdo do modal
        modal.innerHTML = `
            <button class="modal-close" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #666;
                cursor: pointer;
                z-index: 2;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            ">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="modal-body" style="
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                padding: 40px;
            ">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}" style="
                        width: 100%;
                        height: auto;
                        border-radius: 12px;
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                    ">
                </div>
                
                <div class="modal-info">
                    <h3 style="color: #333; margin-bottom: 15px;">${product.name}</h3>
                    <p class="modal-description" style="color: #666; margin-bottom: 20px; line-height: 1.6;">
                        ${product.description}
                    </p>
                    <div class="modal-price" style="
                        font-size: 2rem;
                        font-weight: 700;
                        color: #2aa8e3;
                        margin-bottom: 25px;
                    ">
                        ${product.price}
                    </div>
                    
                    <div class="modal-actions" style="display: flex; flex-direction: column; gap: 10px;">
                        <a href="https://wa.me/${CONFIG.whatsappNumber}?text=Olá! Gostaria de informações sobre: ${encodeURIComponent(product.name)}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="btn btn-whatsapp" 
                           style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 10px;">
                            <i class="fab fa-whatsapp"></i> Consultar no WhatsApp
                        </a>
                        
                        <button class="btn btn-secondary modal-close-btn" style="
                            background: transparent;
                            color: #2aa8e3;
                            border: 2px solid #2aa8e3;
                        ">
                            Continuar Navegando
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Adiciona ao DOM
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        // Previne scroll do body
        document.body.style.overflow = 'hidden';
        
        // Event listeners para fechar
        const closeModal = () => {
            modal.style.animation = 'slideOut 0.3s ease forwards';
            overlay.style.animation = 'fadeOut 0.3s ease forwards';
            
            setTimeout(() => {
                if (modal.parentNode) modal.remove();
                if (overlay.parentNode) overlay.remove();
                document.body.style.overflow = '';
            }, 300);
        };
        
        // Botão de fechar
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        // Fechar com ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // Remove event listener quando modal é fechado
        modal.addEventListener('close', () => {
            document.removeEventListener('keydown', escHandler);
        });
    }

    // Fecha modal de produto
    closeProductModal() {
        const existingModal = document.querySelector('.modal-content');
        const existingOverlay = document.querySelector('.modal-overlay');
        
        if (existingModal) existingModal.remove();
        if (existingOverlay) existingOverlay.remove();
        
        document.body.style.overflow = '';
    }

    // ============ ANO ATUAL NO FOOTER ============
    setupCurrentYear() {
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    // ============ EFEITO DE DIGITAÇÃO ============
    setupTypeWriterEffect() {
        const heroTitle = document.querySelector('.hero h2');
        if (!heroTitle) return;
        
        // Guarda texto original
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        // Adiciona cursor
        heroTitle.style.borderRight = '3px solid rgba(255, 255, 255, 0.75)';
        
        let i = 0;
        const speed = 50; // ms por letra
        
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Animação do cursor piscando
                let cursorVisible = true;
                setInterval(() => {
                    heroTitle.style.borderRightColor = cursorVisible 
                        ? 'transparent' 
                        : 'rgba(255, 255, 255, 0.75)';
                    cursorVisible = !cursorVisible;
                }, 500);
            }
        }
        
        // Inicia após 500ms
        setTimeout(typeWriter, 500);
    }

    // ============ BOTÃO WHATSAPP ============
    setupWhatsAppButton() {
        const whatsappBtn = document.querySelector('.whatsapp-float');
        if (!whatsappBtn) return;
        
        // Tooltip
        whatsappBtn.setAttribute('title', 'Conversar no WhatsApp');
        
        // Efeito de pulso periódico
        let pulseInterval;
        
        const startPulse = () => {
            pulseInterval = setInterval(() => {
                if (document.visibilityState === 'visible') {
                    whatsappBtn.classList.add('pulse');
                    setTimeout(() => {
                        whatsappBtn.classList.remove('pulse');
                    }, 1500);
                }
            }, 8000); // A cada 8 segundos
        };
        
        // Inicia após 3 segundos
        setTimeout(startPulse, 3000);
        
        // Para quando a página não está visível
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                clearInterval(pulseInterval);
            } else {
                startPulse();
            }
        });
    }

    // ============ LAZY LOADING DE IMAGENS ============
    setupImageLazyLoading() {
        if (!('IntersectionObserver' in window)) return;
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        if (lazyImages.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    // Quando carregar, remove atributo e classe
                    img.onload = () => {
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    };
                    
                    // Para de observar
                    imageObserver.unobserve(img);
                }
            });
        }, {
            root: null,
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============ OBSERVER PARA ANIMAÇÕES ============
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;
        
        // Observer para elementos que devem aparecer com animação
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observa elementos com data-animate
        document.querySelectorAll('[data-animate]').forEach(el => {
            fadeObserver.observe(el);
        });
    }

    // ============ NOTIFICAÇÕES ============
    showNotification(message, type = 'info') {
        // Remove notificação existente
        this.closeNotification();
        
        // Tipos de ícone
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        
        // Cores por tipo
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        
        // Cria notificação
        const notification = document.createElement('div');
        notification.id = 'site-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 400px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            border-left: 4px solid ${colors[type]};
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; padding: 15px 20px; gap: 15px;">
                <i class="fas ${icons[type]}" style="font-size: 1.2rem; color: ${colors[type]};"></i>
                <span style="flex: 1;">${message}</span>
                <button class="notification-close" style="
                    background: none;
                    border: none;
                    color: #666;
                    cursor: pointer;
                    padding: 5px;
                ">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Fecha automaticamente após 5 segundos
        const autoClose = setTimeout(() => {
            this.closeNotification();
        }, 5000);
        
        // Botão de fechar
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(autoClose);
            this.closeNotification();
        });
    }

    closeNotification() {
        const notification = document.getElementById('site-notification');
        if (notification) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }

    // ============ UTILITÁRIOS ============
    
    // Formata número de telefone
    formatPhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    }
    
    // Formata moeda
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
    
    // Debounce para otimizar eventos
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle para otimizar eventos
    throttle(func, limit) {
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
}

// ============ POLYFILLS ============

// Polyfill para forEach em NodeList (IE)
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Polyfill para closest (IE)
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        let el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Polyfill para matches (IE)
if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.matchesSelector || 
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector || 
        Element.prototype.oMatchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            const matches = (this.document || this.ownerDocument).querySelectorAll(s);
            let i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;            
        };
}

// ============ INICIALIZAÇÃO ============

// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o site
    window.livrariaSite = new LivrariaSite();
    
    // Adiciona animações CSS dinâmicas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes slideIn {
            from {
                transform: translate(-50%, -60%);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translate(-50%, -50%);
                opacity: 1;
            }
            to {
                transform: translate(-50%, -40%);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
            }
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease forwards;
        }
    `;
    document.head.appendChild(style);
    
    // Remove qualquer spinner de loading
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.remove();
    }
});

// ============ HANDLERS GLOBAIS ============

// Previne envio de formulários inválidos
document.addEventListener('submit', (e) => {
    if (e.target.tagName === 'FORM' && !e.target.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
    }
}, true);

// Melhora a acessibilidade do foco
document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Adiciona classe para navegação por teclado
const keyboardNavigationStyle = document.createElement('style');
keyboardNavigationStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid #2aa8e3 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardNavigationStyle);

// ============ ERROR HANDLING ============

// Captura erros não tratados
window.addEventListener('error', (e) => {
    console.error('Erro capturado:', e.error);
    
    // Mostra notificação amigável em produção
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 10000;
            font-size: 0.9rem;
        `;
        notification.textContent = 'Ocorreu um erro. Por favor, recarregue a página.';
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 5000);
    }
});

// Log para debug
console.log('🔧 Script.js carregado com sucesso!');
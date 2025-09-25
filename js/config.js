// ===== CONFIGURACIÓN GLOBAL =====

// Configuración de la aplicación
const APP_CONFIG = {
    name: 'STD TEC',
    version: '1.0.0',
    author: 'STD TEC Team',
    description: 'Sistema de gestión de servicios técnicos',
    
    // URLs y endpoints
    api: {
        base: window.location.origin,
        endpoints: {
            folios: '/api/folios',
            clients: '/api/clients',
            reports: '/api/reports'
        }
    },
    
    // Firebase removido - Sistema funciona con localStorage únicamente
    
    // Configuración de autenticación
    auth: {
        adminCredentials: {
            username: 'admin',
            password: 'stdtec2024'
        },
        sessionTimeout: 24 * 60 * 60 * 1000, // 24 horas
        maxLoginAttempts: 3,
        lockoutTime: 15 * 60 * 1000 // 15 minutos
    },
    
    // Configuración de folios
    folios: {
        idPrefix: 'STD',
        idFormat: 'STD-YYYY-###',
        statuses: [
            { key: 'pendiente', label: 'Pendiente', color: '#f59e0b' },
            { key: 'revision', label: 'En Revisión', color: '#a855f7' },
            { key: 'proceso', label: 'En Proceso', color: '#3b82f6' },
            { key: 'finalizado', label: 'Finalizado', color: '#22c55e' },
            { key: 'devuelto', label: 'Devuelto', color: '#ef4444' },
            { key: 'entregado', label: 'Entregado', color: '#10b981' }
        ],
        equipmentTypes: [
            { key: 'pc', label: 'PC' },
            { key: 'laptop', label: 'Laptop' },
            { key: 'impresora', label: 'Impresora' },
            { key: 'otro', label: 'Otro' }
        ],
        paymentMethods: [
            { key: 'efectivo', label: 'Efectivo' },
            { key: 'tarjeta', label: 'Tarjeta' },
            { key: 'transferencia', label: 'Transferencia' },
            { key: 'otro', label: 'Otro' }
        ],
        clientTypes: [
            { key: 'particular', label: 'Particular' },
            { key: 'empresa', label: 'Empresa' }
        ]
    },
    
    // Configuración de reportes
    reports: {
        formats: ['pdf', 'excel'],
        periods: [
            { key: 'week', label: 'Esta semana' },
            { key: 'month', label: 'Este mes' },
            { key: 'quarter', label: 'Este trimestre' },
            { key: 'year', label: 'Este año' },
            { key: 'custom', label: 'Personalizado' }
        ]
    },
    
    // Configuración de notificaciones
    notifications: {
        duration: 5000, // 5 segundos
        position: 'top-right',
        types: {
            success: { icon: 'fas fa-check-circle', color: '#22c55e' },
            error: { icon: 'fas fa-exclamation-circle', color: '#ef4444' },
            warning: { icon: 'fas fa-exclamation-triangle', color: '#f59e0b' },
            info: { icon: 'fas fa-info-circle', color: '#3b82f6' }
        }
    },
    
    // Configuración de animaciones
    animations: {
        duration: {
            fast: 150,
            normal: 300,
            slow: 500
        },
        easing: 'ease-in-out'
    },
    
    // Configuración de temas
    themes: {
        default: 'light',
        available: ['light', 'dark'],
        storageKey: 'stdtec-theme'
    },
    
    // Configuración de almacenamiento local
    storage: {
        keys: {
            theme: 'stdtec-theme',
            auth: 'stdtec-auth',
            folios: 'stdtec-folios',
            settings: 'stdtec-settings',
            lastBackup: 'stdtec-last-backup'
        },
        backup: {
            interval: 24 * 60 * 60 * 1000, // 24 horas
            maxBackups: 7
        }
    },
    
    // Configuración de validación
    validation: {
        folio: {
            clientName: {
                required: true,
                minLength: 2,
                maxLength: 100
            },
            clientPhone: {
                required: true,
                pattern: /^[\d\s\-\+\(\)]+$/,
                minLength: 10
            },
            clientEmail: {
                required: false,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            problemDescription: {
                required: true,
                minLength: 10,
                maxLength: 500
            },
            price: {
                required: false,
                min: 0,
                max: 999999
            }
        }
    },
    
    // Configuración de PDF
    pdf: {
        format: 'a4',
        orientation: 'portrait',
        margins: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        fonts: {
            normal: 'helvetica',
            bold: 'helvetica-bold'
        },
        colors: {
            primary: '#2563eb',
            secondary: '#64748b',
            text: '#0f172a'
        }
    },
    
    // Configuración de Kanban
    kanban: {
        columns: [
            { key: 'pendiente', label: 'Pendiente', color: '#f59e0b' },
            { key: 'revision', label: 'En Revisión', color: '#a855f7' },
            { key: 'proceso', label: 'En Proceso', color: '#3b82f6' },
            { key: 'finalizado', label: 'Finalizado', color: '#22c55e' }
        ],
        dragDelay: 100,
        animationDuration: 300
    },
    
    // Configuración de búsqueda
    search: {
        debounceDelay: 300,
        minLength: 2,
        maxResults: 50
    },
    
    // Configuración de paginación
    pagination: {
        defaultPageSize: 20,
        pageSizes: [10, 20, 50, 100],
        maxVisiblePages: 5
    }
};

// Configuración de desarrollo/producción
const ENV_CONFIG = {
    development: {
        debug: true,
        logging: true,
        mockData: true,
        localStorage: true
    },
    production: {
        debug: false,
        logging: false,
        mockData: false,
        localStorage: true
    }
};

// Detectar entorno
const ENVIRONMENT = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' ? 
                   'development' : 'production';

// Configuración actual basada en el entorno
const CURRENT_CONFIG = {
    ...APP_CONFIG,
    ...ENV_CONFIG[ENVIRONMENT],
    environment: ENVIRONMENT
};

// Datos de ejemplo para desarrollo
const MOCK_DATA = {
    folios: [
        {
            id: 'STD-2024-001',
            createdAt: new Date('2024-01-15'),
            status: 'proceso',
            price: 1500,
            paymentMethod: 'efectivo',
            internalNotes: 'Cliente frecuente, prioridad alta',
            client: {
                name: 'Juan Pérez García',
                phone: '+52 427 371 9797',
                email: 'juan.perez@email.com',
                address: 'Calle Ignacio Allende 12, Centro, 76800 San Juan del Río, Qro.',
                company: '',
                type: 'particular'
            },
            equipment: {
                type: 'laptop',
                brand: 'Dell',
                model: 'Inspiron 15 3000',
                serial: 'DL123456789',
                problemDescription: 'La laptop no enciende, posible problema con la fuente de poder',
                deliveryDate: new Date('2024-01-20'),
                technicalNotes: 'Revisar cargador y batería'
            }
        },
        {
            id: 'STD-2024-002',
            createdAt: new Date('2024-01-16'),
            status: 'pendiente',
            price: 800,
            paymentMethod: 'tarjeta',
            internalNotes: 'Revisar garantía',
            client: {
                name: 'María González López',
                phone: '+52 427 371 9797',
                email: 'maria.gonzalez@empresa.com',
                address: 'Calle Ignacio Allende 12, Centro, 76800 San Juan del Río, Qro.',
                company: 'Empresa ABC S.A. de C.V.',
                type: 'empresa'
            },
            equipment: {
                type: 'impresora',
                brand: 'HP',
                model: 'LaserJet Pro M404n',
                serial: 'HP987654321',
                problemDescription: 'Impresora no imprime, aparece error de papel atascado',
                deliveryDate: new Date('2024-01-18'),
                technicalNotes: 'Limpiar rodillos y revisar sensores'
            }
        },
        {
            id: 'STD-2024-003',
            createdAt: new Date('2024-01-17'),
            status: 'finalizado',
            price: 2200,
            paymentMethod: 'transferencia',
            internalNotes: 'Trabajo completado satisfactoriamente',
            client: {
                name: 'Carlos Rodríguez Martínez',
                phone: '+52 427 371 9797',
                email: 'carlos.rodriguez@email.com',
                address: 'Calle Ignacio Allende 12, Centro, 76800 San Juan del Río, Qro.',
                company: '',
                type: 'particular'
            },
            equipment: {
                type: 'pc',
                brand: 'HP',
                model: 'Pavilion Desktop',
                serial: 'HP456789123',
                problemDescription: 'PC muy lenta, posible virus o falta de mantenimiento',
                deliveryDate: new Date('2024-01-19'),
                technicalNotes: 'Formateo completo, instalación de antivirus'
            }
        }
    ],
    
    projects: [
        {
            id: 1,
            title: 'Sistema de Gestión Empresarial',
            description: 'Plataforma web completa para gestión de inventarios, ventas y clientes',
            category: 'web',
            image: 'https://via.placeholder.com/400x300/2563eb/ffffff?text=ERP+System',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
            status: 'completed',
            client: 'Empresa XYZ',
            year: 2024
        },
        {
            id: 2,
            title: 'App Móvil de Delivery',
            description: 'Aplicación móvil para pedidos de comida con geolocalización',
            category: 'mobile',
            image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Delivery+App',
            technologies: ['React Native', 'Node.js', 'Google Maps API'],
            status: 'completed',
            client: 'Restaurante ABC',
            year: 2024
        },
        {
            id: 3,
            title: 'E-commerce Personalizado',
            description: 'Plataforma de comercio electrónico con carrito de compras y pasarela de pagos',
            category: 'ecommerce',
            image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=E-commerce',
            technologies: ['Vue.js', 'Laravel', 'MySQL', 'Stripe'],
            status: 'in-progress',
            client: 'Comercio Digital',
            year: 2024
        },
        {
            id: 4,
            title: 'Software de Contabilidad',
            description: 'Aplicación de escritorio para gestión contable y facturación',
            category: 'desktop',
            image: 'https://via.placeholder.com/400x300/a855f7/ffffff?text=Accounting+Software',
            technologies: ['Electron', 'React', 'SQLite'],
            status: 'completed',
            client: 'Despacho Contable',
            year: 2023
        }
    ]
};

// Exportar configuraciones
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APP_CONFIG, ENV_CONFIG, CURRENT_CONFIG, MOCK_DATA };
} else {
    window.APP_CONFIG = APP_CONFIG;
    window.ENV_CONFIG = ENV_CONFIG;
    window.CURRENT_CONFIG = CURRENT_CONFIG;
    window.MOCK_DATA = MOCK_DATA;
    window.ENVIRONMENT = ENVIRONMENT;
}

// Log de configuración en desarrollo
if (CURRENT_CONFIG.debug) {
    console.log('🔧 STD TEC - Configuración cargada:', CURRENT_CONFIG);
    console.log('🌍 Entorno:', ENVIRONMENT);
}

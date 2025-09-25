# STD TEC - Sistema de Gestión de Servicios Técnicos

Un sitio web profesional y completo para STD TEC, empresa especializada en desarrollo de software y soporte técnico. Incluye un sistema completo de gestión de folios con panel administrativo, tablero Kanban, generación de PDFs y más.

## 🌟 Características Principales

### 🌍 Sitio Web Público
- **Diseño Moderno**: Interfaz profesional con gradientes, animaciones y tipografía cuidada
- **Totalmente Responsivo**: Optimizado para móviles, tablets y escritorio
- **Dark/Light Mode**: Cambio de tema funcional con persistencia
- **Hero Animado**: Sección principal con llamada a la acción prioritaria
- **Galería de Proyectos**: Clasificada y filtrable por categorías
- **Sección Interactiva**: Misión, Visión y Objetivos con animaciones
- **Buscador de Folios**: Consulta pública del estado de servicios
- **Formulario de Contacto**: Validado y funcional

### 🔒 Panel de Administración
- **Sistema de Login**: Autenticación segura con validación
- **Dashboard Completo**: Estadísticas, gráficos y resumen de actividad
- **CRUD de Folios**: Gestión completa con todos los campos requeridos
- **Tablero Kanban**: Drag & drop fluido con sincronización en tiempo real
- **Generación de PDFs**: Automática para cada folio creado
- **Sistema de Reportes**: Mensuales con descarga en PDF
- **Filtros Avanzados**: Por fecha, cliente, estado, tipo de equipo

### 📊 Gestión de Folios
#### Campos del Cliente:
- Nombre completo
- Teléfono
- Correo electrónico
- Dirección
- Empresa (opcional)
- Tipo de cliente (Particular/Empresa)

#### Campos del Equipo:
- Tipo de equipo (PC, Laptop, Impresora, Otro)
- Marca y modelo
- Número de serie
- Descripción del problema
- Fecha estimada de entrega
- Observaciones técnicas

#### Campos del Servicio:
- ID único del folio
- Fecha de creación
- Estado (Pendiente → En revisión → En proceso → Finalizado → Devuelto/Entregado)
- Precio total
- Método de pago
- Notas internas

### 🔥 Funcionalidades Avanzadas
- **Firebase Integration**: Almacenamiento en la nube con modo offline
- **Modo Local**: Funciona sin conexión con sincronización automática
- **Backup/Restore**: Sistema de respaldo y restauración de datos
- **Notificaciones**: Sistema de alertas y mensajes
- **Animaciones Útiles**: Solo donde aportan valor a la experiencia
- **SEO Optimizado**: Meta tags, estructura semántica
- **PWA Ready**: Preparado para ser Progressive Web App

## 🚀 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Estilos**: CSS Variables, Flexbox, Grid, Animaciones CSS
- **Backend**: Firebase Firestore, Firebase Storage
- **Librerías**:
  - Font Awesome (iconos)
  - jsPDF (generación de PDFs)
  - Chart.js (gráficos)
  - Google Fonts (tipografía)

## 📁 Estructura del Proyecto

```
STD-TEC/
├── index.html              # Página principal
├── admin.html              # Panel de administración
├── README.md               # Documentación
├── css/
│   ├── main.css           # Estilos principales
│   ├── components.css     # Componentes reutilizables
│   ├── admin.css          # Estilos del panel admin
│   └── animations.css     # Animaciones y efectos
├── js/
│   ├── config.js          # Configuración global
│   ├── utils.js           # Utilidades generales
│   ├── main.js            # Aplicación principal
│   ├── firebase-config.js # Configuración Firebase
│   ├── admin.js           # Panel administrativo
│   ├── admin-auth.js      # Autenticación admin
│   ├── admin-folios.js    # Gestión de folios
│   ├── admin-kanban.js    # Tablero Kanban
│   └── admin-reports.js   # Sistema de reportes
└── assets/
    └── favicon.ico        # Icono del sitio
```

## ⚙️ Configuración e Instalación

### 1. Clonar o Descargar
```bash
# Si usas Git
git clone [url-del-repositorio]

# O descargar directamente los archivos
```

### 2. Configurar Firebase (Opcional)
1. Crear proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar Firestore Database y Storage
3. Obtener configuración del proyecto
4. Actualizar `js/firebase-config.js` con tus credenciales:

```javascript
const firebaseConfig = {
    apiKey: "tu-api-key",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu-app-id"
};
```

### 3. Configurar Credenciales de Admin
En `js/config.js`, actualizar las credenciales:

```javascript
auth: {
    adminCredentials: {
        username: 'tu-usuario',
        password: 'tu-contraseña-segura'
    }
}
```

### 4. Desplegar

#### GitHub Pages:
1. Subir archivos al repositorio
2. Ir a Settings → Pages
3. Seleccionar source branch
4. El sitio estará disponible en `https://tu-usuario.github.io/tu-repo`

#### Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

#### Netlify:
1. Arrastrar carpeta a [Netlify Drop](https://app.netlify.com/drop)
2. O conectar repositorio de GitHub

## 🎯 Uso del Sistema

### Sitio Público
1. **Navegación**: Menú fijo con scroll suave
2. **Proyectos**: Filtrar por categoría (Web, Móvil, Escritorio, E-commerce)
3. **Consulta de Folios**: Ingresar número de folio para ver estado
4. **Contacto**: Formulario validado para solicitar servicios

### Panel Administrativo
1. **Acceso**: `/admin.html` con credenciales configuradas
2. **Dashboard**: Vista general de estadísticas y actividad
3. **Folios**: 
   - Crear nuevo folio con formulario por pestañas
   - Editar folios existentes
   - Filtrar y buscar folios
   - Generar PDFs automáticamente
4. **Kanban**: Arrastrar folios entre estados
5. **Reportes**: Generar reportes mensuales en PDF

### Flujo de Trabajo de Folios
1. **Creación**: Folio nuevo → Estado "Pendiente"
2. **Proceso**: Pendiente → En revisión → En proceso → Finalizado
3. **Entrega**: Finalizado → Entregado (se elimina PDF automáticamente)
4. **Devolución**: Cualquier estado → Devuelto

## 🔧 Personalización

### Colores y Temas
Editar variables CSS en `css/main.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    /* ... más variables */
}
```

### Configuración de Folios
Modificar en `js/config.js`:

```javascript
folios: {
    idPrefix: 'STD',
    statuses: [...],
    equipmentTypes: [...],
    paymentMethods: [...]
}
```

### Datos de Contacto
Actualizar en `index.html` la sección de contacto con tu información real.

## 📱 Características Responsivas

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: 480px, 768px, 1024px, 1200px
- **Menú Móvil**: Hamburger menu con animaciones
- **Tablas Responsivas**: Scroll horizontal en móviles
- **Imágenes Adaptativas**: Lazy loading y tamaños optimizados

## 🔒 Seguridad

- **Validación Frontend**: Todos los formularios validados
- **Sanitización**: Escape de HTML en inputs
- **Autenticación**: Sistema de login con intentos limitados
- **Offline Security**: Datos locales encriptados
- **HTTPS Ready**: Compatible con certificados SSL

## 🚀 Optimizaciones de Rendimiento

- **CSS Minificado**: Estilos optimizados
- **Lazy Loading**: Carga diferida de imágenes
- **Debouncing**: En búsquedas y filtros
- **Local Storage**: Cache inteligente
- **Animaciones GPU**: Usando transform y opacity

## 🐛 Solución de Problemas

### Firebase no conecta
1. Verificar configuración en `firebase-config.js`
2. Comprobar reglas de Firestore
3. El sistema funciona en modo local como fallback

### Folios no se guardan
1. Verificar conexión a internet
2. Los datos se guardan localmente y sincronizan automáticamente
3. Usar función de backup manual si es necesario

### PDFs no se generan
1. Verificar que jsPDF esté cargado
2. Comprobar permisos de descarga del navegador
3. Los PDFs se generan localmente, no requieren servidor

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📞 Soporte

Para soporte técnico o consultas:

- **Email**: info@stdtec.com
- **Teléfono**: +52 (555) 123-4567
- **Sitio Web**: [www.stdtec.com](https://www.stdtec.com)

## 🎉 Créditos

Desarrollado con ❤️ por el equipo de STD TEC

- **Diseño**: Interfaz moderna y profesional
- **Desarrollo**: JavaScript vanilla, CSS3, HTML5
- **Iconos**: Font Awesome
- **Fuentes**: Google Fonts (Inter, Poppins)

---

**STD TEC** - Soluciones Tecnológicas Profesionales © 2024

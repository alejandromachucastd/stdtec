# 🔥 CONFIGURACIÓN FIREBASE - STD TEC
## Respaldo para usar en otros proyectos

### 📋 CONFIGURACIÓN COMPLETA

```javascript
// Configuración Firebase para STD TEC
const firebaseConfig = {
    apiKey: "AIzaSyDIiT1RnZsXiQvwstZug3kU3fq4QPVCSR0",
    authDomain: "stdtec-sistema.firebaseapp.com",
    projectId: "stdtec-sistema",
    storageBucket: "stdtec-sistema.firebasestorage.app",
    messagingSenderId: "932140820509",
    appId: "1:932140820509:web:822d28dda4846707a27ef4"
};
```

### 🔧 INICIALIZACIÓN BÁSICA

```javascript
// Inicializar Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
```

### 📦 CDN PARA HTML (Versión Compat)

```html
<!-- Firebase CDN -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>

<script>
// Inicializar con CDN
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
</script>
```

### 🎯 DATOS DEL PROYECTO

- **Proyecto ID**: `stdtec-sistema`
- **API Key**: `AIzaSyDIiT1RnZsXiQvwstZug3kU3fq4QPVCSR0`
- **Auth Domain**: `stdtec-sistema.firebaseapp.com`
- **Storage Bucket**: `stdtec-sistema.firebasestorage.app`
- **Messaging Sender ID**: `932140820509`
- **App ID**: `1:932140820509:web:822d28dda4846707a27ef4`

### 💾 ESTRUCTURA DE DATOS USADA

```javascript
// Estructura de folio en Firestore
{
    id: "STD-2025-123456",
    client: {
        name: "Nombre completo",
        phone: "Teléfono",
        email: "Email",
        type: "particular/empresa",
        address: "Dirección",
        company: "Empresa (opcional)"
    },
    equipment: {
        type: "pc/laptop/impresora/otro",
        brand: "Marca",
        model: "Modelo",
        serial: "Número de serie",
        problemDescription: "Descripción detallada",
        technicalNotes: "Observaciones técnicas"
    },
    service: {
        status: "pendiente/revision/proceso/finalizado/devuelto/entregado",
        price: 0,
        paymentMethod: "efectivo/tarjeta/transferencia/otro",
        deliveryDate: "YYYY-MM-DD",
        internalNotes: "Notas internas"
    },
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
}
```

### 🔍 COLECCIONES USADAS

- **`folios`**: Colección principal de folios de servicio
- **Subcollections**: Ninguna (estructura plana)

### 🛡️ REGLAS DE SEGURIDAD SUGERIDAS

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura solo a usuarios autenticados
    match /folios/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 📱 FUNCIONES PRINCIPALES IMPLEMENTADAS

```javascript
// Guardar folio
await db.collection('folios').add(folioData);

// Obtener todos los folios
const snapshot = await db.collection('folios').get();

// Actualizar folio
await db.collection('folios').doc(folioId).update(updateData);

// Eliminar folio
await db.collection('folios').doc(folioId).delete();

// Escuchar cambios en tiempo real
db.collection('folios').onSnapshot(snapshot => {
    // Manejar cambios
});
```

### 🌐 MODO HÍBRIDO (Firebase + localStorage)

El sistema implementado usa Firebase como principal y localStorage como fallback:

```javascript
// Sistema híbrido
if (isOnline && firebaseAvailable) {
    // Usar Firebase
    await saveToFirebase(data);
    saveToLocalStorage(data); // Backup
} else {
    // Usar localStorage
    saveToLocalStorage(data);
}
```

### 📝 NOTAS IMPORTANTES

1. **API Key**: Es pública, pero las reglas de seguridad protegen los datos
2. **Autenticación**: Implementar según necesidades del proyecto
3. **Offline**: El sistema funciona sin conexión usando localStorage
4. **Sincronización**: Implementar sync cuando vuelva la conexión

---

**Fecha de respaldo**: 2025-01-24
**Proyecto**: STD TEC - Sistema de Gestión de Folios
**Versión Firebase**: 9.22.0

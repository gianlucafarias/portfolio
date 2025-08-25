# 🚀 Gianluca Palmier - Portfolio Personal

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

> **Full Stack Developer** con 3+ años de experiencia desarrollando soluciones web y móviles para el sector público y privado.

## 🌟 **Características del Portfolio**

- ✨ **Diseño Moderno y Responsive** - Adaptado para todos los dispositivos
- 🌓 **Tema Claro/Oscuro** - Cambio dinámico de tema
- 🌍 **Multilingüe** - Soporte completo en Español e Inglés
- 📱 **Mobile-First** - Optimizado para dispositivos móviles
- 🚀 **Performance Optimizada** - Lazy loading, imágenes optimizadas
- 🎨 **UI/UX Profesional** - Interfaz elegante y funcional

## 🛠️ **Stack Tecnológico**

### **Frontend**
- **Next.js 15** - Framework React con SSR y optimizaciones
- **React 19** - Biblioteca de interfaz de usuario
- **Tailwind CSS 4** - Framework CSS utility-first
- **DaisyUI** - Componentes UI pre-construidos

### **Backend & APIs**
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **Google Sheets API** - Integración para formulario de contacto

### **Base de Datos & Cloud**
- **PostgreSQL** - Base de datos relacional
- **Firebase** - Plataforma de desarrollo móvil y web
- **AWS** - Servicios en la nube

### **Herramientas de Desarrollo**
- **TypeScript** - JavaScript tipado
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS

## 📱 **Proyectos Destacados**

### **MenteSana.app** 🧠
- **Descripción**: Plataforma web para adolescentes sobre salud mental con IA personalizada
- **Tecnologías**: React, Node.js, PostgreSQL, OpenAI, Tailwind
- **Estado**: En producción, financiado por programa "Eureka"
- **Demo**: [mentesana.app](https://mentesana.app/)

### **La Max Stream** 📻
- **Descripción**: App nativa para streaming en vivo de radio y video
- **Tecnologías**: React Native, Expo, TypeScript, Firebase
- **Estado**: Publicada en Play Store y App Store
- **Demo**: [Google Play](https://play.google.com/store/apps/details?id=com.maximaceres.app)

### **Ceresito Chatbot** 🤖
- **Descripción**: Chatbot inteligente para atención ciudadana con IA
- **Tecnologías**: Node.js, OpenAI, WhatsApp API, Next.js
- **Estado**: En producción para Gobierno de Ceres
- **Demo**: [holaceresito.bit.ly](https://bit.ly/holaceresito)

## 🚀 **Instalación y Uso**

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn
- Git

### **Clonar el Repositorio**
```bash
git clone https://github.com/gianlucafarias/portfolio.git
cd portfolio
```

### **Instalar Dependencias**
```bash
npm install
# o
yarn install
```

### **Variables de Entorno**
Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Google Sheets API (para formulario de contacto)
GOOGLE_SERVICE_ACCOUNT_TYPE=service_account
GOOGLE_PROJECT_ID=tu-proyecto-id
GOOGLE_PRIVATE_KEY_ID=tu-private-key-id
GOOGLE_PRIVATE_KEY=tu-private-key
GOOGLE_CLIENT_EMAIL=tu-client-email
GOOGLE_CLIENT_ID=tu-client-id
GOOGLE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_TOKEN_URI=https://oauth2.googleapis.com/token
GOOGLE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
GOOGLE_CLIENT_X509_CERT_URL=tu-cert-url
GOOGLE_UNIVERSE_DOMAIN=googleapis.com

# Google Sheets ID
NEXT_PUBLIC_SHEET_ID=tu-sheet-id
```

### **Ejecutar en Desarrollo**
```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### **Construir para Producción**
```bash
npm run build
npm start
# o
yarn build
yarn start
```

## 📁 **Estructura del Proyecto**

```
portfolio/
├── src/
│   ├── app/                 # App Router de Next.js 13+
│   │   ├── components/      # Componentes reutilizables
│   │   ├── api/            # API routes
│   │   ├── contact/        # Página de contacto
│   │   ├── projects/       # Página de proyectos
│   │   └── globals.css     # Estilos globales
│   ├── contexts/           # Contextos de React
│   ├── data/               # Datos estáticos
│   ├── hooks/              # Hooks personalizados
│   ├── lib/                # Utilidades y configuraciones
│   └── messages/           # Traducciones (ES/EN)
├── public/                 # Archivos estáticos
├── next.config.mjs        # Configuración de Next.js
├── tailwind.config.js     # Configuración de Tailwind
└── package.json           # Dependencias del proyecto
```

## 🎨 **Personalización**

### **Cambiar Información Personal**
Edita los archivos en `src/messages/`:
- `es.json` - Contenido en español
- `en.json` - Contenido en inglés

### **Modificar Estilos**
- **Colores**: Edita `src/app/globals.css`
- **Componentes**: Modifica archivos en `src/app/components/`
- **Layout**: Personaliza `src/app/layout.js`

### **Agregar Proyectos**
Edita el array `pinProjects` y `otherProjects` en los archivos de mensajes:

```json
{
  "title": "Nombre del Proyecto",
  "description": "Descripción larga del proyecto",
  "shortDescription": "Descripción corta para las cards",
  "tags": ["React", "Node.js", "PostgreSQL"],
  "link": "https://tu-proyecto.com",
  "github": "https://github.com/tu-usuario/tu-repo",
  "image": "/projects/tu-imagen.png"
}
```

## 🌍 **Internacionalización**

El portfolio soporta múltiples idiomas usando el contexto `LanguageContext`:

```jsx
import { useLanguage } from "@/contexts/LanguageContext";

const { messages, isEnglish, changeLanguage } = useLanguage();
```

### **Agregar Nuevo Idioma**
1. Crea archivo `src/messages/nuevo-idioma.json`
2. Agrega el idioma al contexto
3. Implementa el selector de idioma

## 🎯 **Características Técnicas**

- **SEO Optimizado** - Metadatos, estructura semántica
- **Performance** - Lazy loading, optimización de imágenes
- **Accesibilidad** - Navegación por teclado, alt texts
- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - Cambio dinámico de tema
- **Formulario de Contacto** - Integración con Google Sheets

## 📊 **Métricas de Performance**

- **Lighthouse Score**: 95+ en todas las categorías
- **Core Web Vitals**: Optimizados
- **Bundle Size**: < 500KB
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 **Contacto**

- **Email**: [palmiergianluca@gmail.com](mailto:palmiergianluca@gmail.com)
- **LinkedIn**: [Gianluca Palmier](https://www.linkedin.com/in/gianlucapalmier/)
- **GitHub**: [@gianlucafarias](https://github.com/gianlucafarias)
- **Portfolio**: [gianluca.dev](https://gianluca.dev)

## 🙏 **Agradecimientos**

- [Next.js](https://nextjs.org/) - Framework increíble
- [Tailwind CSS](https://tailwindcss.com/) - CSS utility-first
- [DaisyUI](https://daisyui.com/) - Componentes pre-construidos
- [React](https://reactjs.org/) - Biblioteca de UI
- [OpenAI](https://openai.com/) - APIs de IA

---

⭐ **Si te gusta este portfolio, dale una estrella en GitHub!**

---

**Desarrollado con ❤️ por Gianluca Palmier**

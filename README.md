# Portfolio - Gianluca Palmier

Portfolio personal construido con Next.js 15 y TypeScript.

## Tech Stack

- **Next.js 15** - App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** + DaisyUI - Estilos
- **Framer Motion** - Animaciones
- **Google Sheets API** - Formulario de contacto

## Características

- Diseño responsive y minimalista
- Tema claro/oscuro
- Soporte bilingüe (ES/EN)
- Case studies para cada proyecto
- Formulario de contacto funcional

## Comenzar

```bash
# Clonar
git clone https://github.com/gianlucafarias/portfolio.git
cd portfolio

# Instalar dependencias
npm install

# Desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Variables de entorno

Crear `.env.local` para el formulario de contacto (Google Sheets):

```env
GOOGLE_PROJECT_ID=
GOOGLE_PRIVATE_KEY=
GOOGLE_CLIENT_EMAIL=
GOOGLE_CLIENT_ID=
NEXT_PUBLIC_SHEET_ID=
```

Opcional para proyectos:

```env
PROJECTS_SHEET_TAB=projects
```

## Estructura

```
src/
├── app/                    # Páginas (App Router)
│   ├── page.tsx           # Home
│   ├── projects/          # Proyectos
│   ├── contact/           # Contacto
│   └── api/               # API routes
├── components/
│   ├── layout/            # Header, Footer
│   ├── forms/             # ContactForm
│   ├── pages/             # CaseStudyPage
│   └── ui/                # Componentes reutilizables
├── contexts/              # LanguageContext, ThemeContext
├── data/                  # Constantes (socials, SEO)
└── messages/              # Traducciones (es.json, en.json)
```

## Personalización

El contenido general se edita en `src/messages/es.json` y `src/messages/en.json`:
- Info personal en `profile`
- Experiencia en `experience`
- Educación en `education`

Los proyectos ahora se gestionan desde Google Sheets en una pestaña `projects` (configurable con `PROJECTS_SHEET_TAB`).

## Contacto

- [palmiergianluca@gmail.com](mailto:palmiergianluca@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/gianlucapalmier/)
- [GitHub](https://github.com/gianlucafarias)



export const about = {
    name: "Gianluca Palmier",
    role: "Técnico Universitario en Programación - Full Stack Developer",
    about: "Disfruto de crear soluciones útiles con tecnología y de aprender algo nuevo cada día. En el futuro, quiero aplicar inteligencia artificial y Machine Learning a mis proyectos.",
    email: "palmiergianluca@gmail.com",
};
export const seo = {
    title: `${about.name} | ${about.role}`,
    description: "Desarrollador Full-Stack con experiencia práctica en el desarrollo de aplicaciones web utilizando frameworks como React y Angular, junto con herramientas como Next.js y Node. Me adapto rápidamente a nuevos desafíos y busco contribuir con soluciones eficientes que mejoren procesos de forma concreta.",
    keywords: "portfolio, web developer, Next.js, developer portfolio, minimal portfolio",
}


export const skills = [
    { name: "Html", alt: "html logo", icon: "/html.svg" },
    { name: "Css", alt: "css logo", icon: "/css.svg" },
    { name: "Js", alt: "js logo", icon: "/js.svg" },
    { name: "Tailwind", alt: "tailwind logo", icon: "/tailwind.svg" },
    { name: "React Js", alt: "react logo", icon: "/react.svg" },
    { name: "Next Js", alt: "nextjs logo", icon: "/nextjs.svg" },
    { name: "Node Js", alt: "nodejs logo", icon: "/node-js.svg" },
    { name: 'Angular', alt: 'angular logo', icon: '/angular.svg' },
    { name: 'PostgreSQL', alt: 'postgresql logo', icon: '/postgresql.svg' },
    { name: 'Github', alt: 'github logo', icon: '/github.svg' },
];

export const socials = {
    github: "https://github.com/gianlucafarias",
    twitter: "https://twitter.com/gianlucadev1",
    instagram: "https://www.instagram.com/gianlucafarias",
    linkedin: "https://www.linkedin.com/in/gianlucapalmier/",
};

export const projects = {
    pinProjects: [
        {
            title: "MenteSana.app",
            description:
                "Desarrollamos una web destinada a adolescentes con el objetivo de promover información y eventos relacionados a la salud mental. Implementamos un espacio personal en donde los usuarios cargan sus emociones diariamente y reciben mensajes personalizados con inteligencia artificial. El proyecto recibió financiación del programa \"Eureka\".",
            tags: ["CSS", "React", "Vite", "Node.js", "Express", "PostgreSQL", "Tailwind", "OpenAI"],
            link: "https://mentesana.app/",
            github: "https://github.com/gianlucafarias/mentesana-app",
            image: "/projects/mentesana.png"
        },
        {
            title: "La Max Stream - Android & iOS App",
            description:
                "Desarrollo de una aplicación nativa para el medio Maxima FM 95.5. Implementé un sistema de streaming en vivo para audio y también video, además de la posibilidad de ver contenido on demand. La aplicación fue desarrollada en React Native con Expo y se distribuyó en Play Store y App Store.",
            tags: ["React Native", "Expo", "Typescript", "Firebase"],
            link: "https://play.google.com/store/apps/details?id=com.maximaceres.app",
            github: "https://github.com/gianlucafarias/max-stream-app",
            image: "/projects/maximaapp.png"
        },
        {
            title: "Incubadora del NOC - XAcademy Final Project",
            description:
                "Implementé las funcionalidades de Login y Registro en el backend, integrando con Firebase como proveedor de autenticación. Además, desarrollé el módulo del panel de administración para profesores y administradores en el frontend, utilizando Angular y Material, lo que facilitó la gestión de Cursos y el control de Acceso.",
            tags: ["Angular", "Material", "Firebase", "Node.js", "Express", "PostgreSQL", "Tailwind"],
            link: "https://github.com/gianlucafarias/xacademy3-back",
            github: "https://github.com/gianlucafarias/xacademy3-back",
            image: "/projects/incubadora.jpeg"
        },
    ],
    otherProjects: [
        {
            title: "ArquiTrack - Proyecto Final de Carrera",
            description:
                "Proyecto presentado para la materia Práctica Profesional de la carrera de Técnico Universitario en Programación. El proyecto consiste en un sistema de gestión de proyectos de construcción, donde se pueden crear, editar y eliminar proyectos, así como también se pueden crear, editar y eliminar tareas, visitas, cargar archivos e invitar colaboradores.",
            tags: ["Angular", "Material", "Firebase", "Node.js", "Express", "PostgreSQL"],
            link: "https://www.linkedin.com/posts/gianlucapalmier_fullstack-angular-material-activity-7361002158894256130-Z8xc?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSZdkkBDY4aRSUwemY2Xa6WfCsTppcfg7A",
            github: "https://github.com/gianlucafarias/arquitrack-front",
            image: "/projects/arquitrack.png"
        },
        {
            title: "Ceresito - Chatbot del Gobierno de la Ciudad de Ceres",
            description:
                "Desarrollo de un chatbot para el Gobierno de la Ciudad de Ceres, utilizando Node.js, Express, PostgreSQL, Tailwind y OpenAI. El chatbot es capaz de responder preguntas sobre la ciudad y los servicios que ofrece el gobierno, además de poder enviar reclamos. Además, se implementó un dashboard desarrollado en Nextjs para el control de reclamos.",
            tags: ["Node.js", "Express", "PostgreSQL", "Tailwind", "OpenAI", "Whatsapp API", "Langchain", "Nextjs", "Shadcn"],
            link: "https://bit.ly/holaceresito",
            github: "",
            image: "/projects/ceresito.png"
        },
        {
            title: "Encuesta - Plan de Obras 2026",
            description:
                "Plataforma web para que los vecinos de Ceres puedan participar en la encuesta del Plan de Obras 2026.",
            tags: ["Astro", "Tailwind", "Node Js", "Express", "Redis", "Typescript", "Docker", "PostgreSQL", "Firebase"],
            link: "https://encuesta.ceres.gob.ar/",
            github: "",
            image: "/projects/encuesta.jpeg"
        },
        {
            title: "Club Central Argentino Olímpico - Web Oficial",
            description:
                "Proyecto en desarrollo. Web oficial del Club Central Argentino Olímpico. Se implementó un sistema de login y registro para socios, donde podrán pagar su cuota societaria a través de Mercado Pago.",
            tags: ["Next Js", "Tailwind", "Node Js", "Express", "PostgreSQL", "Firebase", "Mercado Pago SDK"],
            link: "https://central-web-rose.vercel.app/",
            github: "",
            image: "/projects/arquitrack.png"
        },
       
    ],   
};

export const experience = [
    {
        title: "Full Stack Developer - Gobierno de la Ciudad de Ceres",
        description: "Desarrollo soluciones web completas para el área de modernización, cubriendo aplicaciones internas y externas. Responsable de todo el ciclo de desarrollo: toma de requerimientos, diseño, desarrollo, despliegue y mantenimiento. Reduje dependencias de servicios externos implementando soluciones propias.",
        date: "01/04/2024 - Actualmente",
        icon: "/gobceres.svg",
    },
    {
        title: "Motion Graphic Designer - Gobierno de la Ciudad de Ceres ",
        description:
        "Creación de animaciones gráficas y spots publicitarios para el gobierno de la ciudad utilizando After Effects y Premiere. Desarrollo de contenido visual para campañas de comunicación institucional.",
        date: "01/05/2021 - 01/04/2024",
        icon: "/gobceres.svg",
    },
    {
        title: "Wordpress Developer - CeresCiudad.com",
        description:
        "Diseño, desarrollo y mantenimiento del sitio web de noticias Ceres Ciudad. Implementación de funcionalidades personalizadas y optimización del rendimiento del sitio.",
        date: "01/12/2019 - 01/04/2021",
        icon: "https://ceresciudad.com/wp-content/uploads/2024/05/cropped-faviconcc-512-32x32.png"
    },
    
];

export const blogs = [
    {
        title: "Understanding React Hooks",
        date: "12/03/2025",
        link: "#",
    },
    {
        title: "CSS Grid vs Flexbox: When to Use Which",
        date: "25/12/2024",
        link: "#",
    },
    {
        title: "Next.js SEO Best Practices",
        date: "10/07/2024",
        link: "#",
    },
];

    export const education = [
        {
            title: "Fundamentos de Nube AWS",
            institution: "Argentina Talento Cloud",
            date: "06/08/2025",
        },
    {
        title: "Técnico Universitario en Programación",
        institution: "Universidad Tecnológica Nacional - Facultad Regional Rafaela",
        date: "01/01/2023 - 28/07/2025",
    },
    {
        title: "XAcademy DEV",
        institution: "Technology With Purpose",
        date: "01/06/2024 - 01/03/2025",
    }
    
    
];
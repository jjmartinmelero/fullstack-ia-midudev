# 🚀 Fullstack IA - Midudev

<div align="center">
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/jjmartinmelero/fullstack-ia-midudev?color=blue&style=for-the-badge">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/jjmartinmelero/fullstack-ia-midudev?color=green&style=for-the-badge">
  <img alt="Lines of code" src="https://img.shields.io/tokei/lines/github/jjmartinmelero/fullstack-ia-midudev?color=yellow&style=for-the-badge">
</div>

<br />

Proyecto desarrollado por **Juan Jesus Martin Melero** 👨‍💻 siguiendo el curso **"Desarrollo Web con IA"** en [Midu.dev](https://midu.dev/curso/desarrollo-web-con-ia) 🧠💻.

Este proyecto fue diseñado para integrar Inteligencia Artificial en un entorno Fullstack, creando aplicaciones modernas, escalables y con las mejores prácticas del ecosistema JavaScript.

---

## 🏗️ Estructura del Proyecto

Este repositorio está configurado como un **Monorepo Multipaquete**, lo cual permite estructurar el frontend y el backend de forma modular y mantenerlos dentro del mismo repositorio de control de versiones.

```bash
📦 fullstack-ia-midudev
├── 📂 backend/         # Lógica del servidor, API e integraciones de IA (Node.js)
│   ├── 📂 controllers/ # Controladores de rutas
│   ├── 📂 middlewares/ # Middlewares de Express
│   ├── 📂 models/      # Modelos de datos
│   ├── 📂 routes/      # Definición de rutas y endpoints (ej. ai.js)
│   ├── 📂 schemas/     # Esquemas de validación
│   └── 📄 app.js       # Punto de entrada del backend
│
├── 📂 frontend/        # Aplicación cliente (React + Vite)
│   ├── 📂 public/      # Archivos estáticos
│   └── 📂 src/         # Código fuente de React
│       ├── 📂 pages/   # Páginas de la aplicación (ej. Detail.jsx)
│       └── ...         # Componentes y utilidades
│
└── 📄 package.json     # Configuración principal del Monorepo
```

---

## ⚙️ Variables de Entorno (`.env`)

Cada paquete dentro del monorepo requiere su propio archivo de variables de entorno para funcionar correctamente.

### 🌐 Backend (`/backend/.env`)

Debes crear un archivo `.env` en la carpeta `backend` con las claves de acceso de la IA:

```env
OPENAI_API_KEY="tu_api_key_de_openai_aqui"
```

### 🎨 Frontend (`/frontend/.env`)

Debes crear un archivo `.env` en la carpeta `frontend` indicando la URL donde se estará ejecutando el backend:

```env
VITE_BACKEND_HOST="http://localhost:1234"
```

---

<div align="center">
  <i>Desarrollado con ❤️ y 🤖 por Juan Jesus Martin Melero</i>
</div>
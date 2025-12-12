# DGR SPARK — Plataforma Web Modular (Next.js)

Proyecto oficial de la gama DGR Spark, desarrollado con arquitectura modular, carga dinámica por máquina y diseño inspirado en ecosistemas Apple. Construido con **Next.js** siguiendo una arquitectura limpia, escalable y profesional.

---

## 🚀 Arquitectura del Proyecto

El proyecto está estructurado en secciones independientes dentro de:

src/app/components/

Componentes principales:

- Header
- PostHeader
- Hero
- LoPrincipal
- Details
- Finder
- Contact
- Footer

Cada componente tiene:
- Un archivo .jsx (vista)
- Un archivo .module.css (estilos encapsulados)
- Un index.js (archivo de barril para importaciones limpias)

---

## 📁 Estructura Global

public/
  data/
    machines/
      dash.json
      storm.json
      strike.json
      zero.json
      index.js

  images/
    spark-dash/
      hero/
      principal/
      details/
    spark-storm/
      hero/
      principal/
      details/
    spark-strike/
      hero/
      principal/
      details/
    spark-zero/
      hero/
      principal/
      details/

src/
  app/
    spark/
      page.js
      [machine]/
        page.js

    components/
      Header/
      PostHeader/
      Hero/
      LoPrincipal/
      Details/
      Finder/
      Contact/
      Footer/

---

## 🔥 Carga dinámica por máquina (rutas tipo Apple)

La web carga cada máquina mediante rutas dinámicas:

/spark/dash  
/spark/storm  
/spark/strike  
/spark/zero  

Archivo principal:

src/app/spark/[machine]/page.js

Funcionamiento:
1. Extrae la máquina desde la URL.
2. Carga automáticamente su JSON desde public/data/machines/.
3. Renderiza Hero, LoPrincipal y Details según esa máquina.

---

## 🔄 Redirección automática

Al entrar en:

/spark

la web redirige automáticamente a:

/spark/dash

Esto se controla desde:

src/app/spark/page.js

---

## 🧠 Formato de los JSON por máquina

Cada máquina tiene un archivo .json:

public/data/machines/dash.json  
public/data/machines/storm.json  
etc.

Estructura:

{
  "hero": {
    "title": "",
    "subtitle": "",
    "image": ""
  },
  "loPrincipal": {
    "title": "",
    "slides": []
  },
  "details": {
    "items": []
  }
}

---

## ➕ Añadir una nueva máquina

1. Crear carpeta:
/public/images/spark-nombre/{hero,principal,details}

2. Crear JSON:
/public/data/machines/nombre.json

3. Añadir al índice:
public/data/machines/index.js

4. Acceder por URL:
/spark/nombre

---

## 🔗 Flujo de trabajo Git

Inicializar git:

git init
git add .
git commit -m "Initial commit — DGR Spark"

Conectar a GitHub:

git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main

Actualizar proyecto:

git add .
git commit -m "update"
git push

Cada push → despliegue automático en Vercel.

---

## ✔ Estado actual

- Arquitectura limpia y modular
- Rutas dinámicas funcionando
- JSON por máquina implementado
- Sistema de imágenes organizado
- Proyecto listo para producción

---

© DGR SPARK — 2025  
Desarrollado por Lucas + ChatGPT SPARK

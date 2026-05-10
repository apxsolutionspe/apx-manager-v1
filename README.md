# APX Manager v1.0

Sistema interno para APX - Apex Prime X.

## Objetivo

Gestionar clientes, ventas, gastos, servicios, ordenes de trabajo, soporte tecnico, equipos recibidos y reportes empresariales.

## Tecnologia base

- Vite
- HTML
- CSS
- JavaScript vanilla
- LocalStorage

## Estructura inicial

```text
APX-MANAGER/
├── assets/
├── css/
│   ├── main.css
│   ├── variables.css
│   ├── layout.css
│   └── responsive.css
├── database/
├── docs/
├── js/
│   ├── app.js
│   ├── components/
│   ├── config/
│   │   └── settings.js
│   ├── modules/
│   ├── storage/
│   │   └── localStorage.js
│   └── utils/
│       ├── constants.js
│       ├── formatter.js
│       ├── helpers.js
│       └── validators.js
├── pages/
├── index.html
├── package.json
└── README.md
```

## Scripts

```bash
npm install
npm run dev
```

## Estado

La version inicial solo define estructura, imports base y pantalla de bienvenida funcional. Los modulos de negocio se implementaran en fases posteriores.

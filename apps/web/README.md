# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## Shadcn installation with VITE

https://ui.shadcn.com/docs/installation/vite

### Add a Shadcn component

To create a component target the web app and execute `npx shadcn@latest add <component-name>`

## Folder structure

```
src/
│
├── components/           # Reusable components
│   ├── common/           # Generic application specific components (custom button, custom list, etc.)
│   ├── feature/          # Feature-specific components
│   ├── layout/           # Structural components (Header, Sidebar, etc.)
│   └── ui/               # Design system components (shadcn, radixui, etc.)
│
├── pages/                # Full-page components grouped by charasteristics or sections
│   ├── Auth/             # Authentication pages
│   ├── Dashboard/        # Dashboard pages
│   └── Error/            # Error pages
│
├── features/             # Business logic by feature
│   ├── auth/             # Authentication logic
│   ├── user/             # User management
│   └── analytics/        # Analytics functionalities
│
├── hooks/                # Custom React hooks
│   ├── useAuth.ts        # Authentication hook
│   ├── useForm.ts        # Form handling hook
│   └── useApi.ts         # API call hook
│
├── contexts/             # React contexts
│   ├── AuthContext.tsx   # Authentication context
│   └── ThemeContext.tsx  # Theme context
│
├── services/             # API services and external logic
│   ├── api.ts            # Axios configuration
│   ├── auth-service.ts   # Authentication service
│   └── user-service.ts   # User management service
│
├── utils/                # Utility functions
│   ├── formatters.ts     # Formatting functions
│   ├── validators.ts     # Validation functions
│   └── constants.ts      # Application constants
│
├── types/                # TypeScript type definitions
│   ├── user.ts           # User-related types
│   └── api.ts            # API response types
│
├── styles/               # Global styles
│   ├── global.css        # Global styles
│   └── theme.ts          # Theme configuration
│
├── routes/               # Route configuration
│   ├── PrivateRoute.tsx  # Protected route component
│   └── index.tsx         # Main route configuration
│
├── assets/               # Static assets
│   ├── images/           # Images
│   └── icons/            # Icons
│
├── config/               # Application configurations
│   ├── env.ts            # Environment variables
│   └── app-config.ts     # General configurations
│
├── i18n/                 # Internationalization
│   └── index.ts          # Config file
│
├── locales/              # Languages for internationalization
│   └── en                # Folder containing json files for translations
│
└── App.tsx               # Main application component
```

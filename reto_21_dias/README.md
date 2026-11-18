# Reto 21 días

Aplicación móvil para crear hábitos y seguir el progreso personal durante un reto de 21 días. Está hecha con Expo, React Native y TypeScript; no necesita una base de datos, formularios ni servicios externos.

## Funcionalidades

- Cuatro hábitos predefinidos: estudiar programación, leer, hacer ejercicio y beber agua.
- Marcar y desmarcar hábitos por cada uno de los 21 días.
- Porcentaje diario, avance global y calendario visual del reto.
- Navegación con Expo Router: Stack raíz, Drawer para Inicio/Perfil y Tabs para Hoy/Hábitos/Progreso.
- Tema claro y oscuro desde Perfil y ajustes.
- Componentes reutilizables con props tipadas y estilos NativeWind.
- Los datos viven en el estado local de la aplicación y se reinician al cerrar la sesión de la app; no se envían a ningún servidor.

## Requisitos

- Node.js LTS y npm.
- Expo Go o emulador Android para probar.
- Cuenta de Expo para compilar con EAS Build.

## Ejecutar

Desde esta carpeta del proyecto:

```bash
npm install
npx expo start
```

Pulsa `a` para abrir Android conectado o escanea el QR con Expo Go. Para validar los tipos:

```bash
npm run typecheck
```

## Estructura

```text
src/
  app/
    _layout.tsx                 Stack raíz y providers
    (drawer)/
      _layout.tsx               Drawer de la aplicación
      profile.tsx               Perfil y ajustes
      (tabs)/
        _layout.tsx             Pestañas Hoy, Hábitos y Progreso
        index.tsx               Resumen de hoy
        habits.tsx              Registro diario
        progress.tsx            Avance de los 21 días
  components/
    themed-view.tsx
    themed-text.tsx
    habit-card.tsx
    progress-card.tsx
    menu-item.tsx
  constants/theme.ts            Paleta y tema
  data/habits.ts                Hábitos locales tipados
  hooks/
    use-app-theme.tsx           Estado de tema claro/oscuro
    use-habits.tsx              Estado y cálculos del reto
global.css                      Entrada de NativeWind
tailwind.config.js              Paleta y contenido Tailwind
eas.json                        Perfiles de compilación EAS
```

`useHabits` mantiene los cumplimientos por día y expone el porcentaje diario, el avance global y los días activos. `HabitCard`, `ProgressCard`, `MenuItem`, `ThemedView` y `ThemedText` separan presentación y lógica de las pantallas.

## Generar el APK de prueba

Instala o usa EAS CLI y autentícate con tu cuenta de Expo:

```bash
npx eas-cli@latest login
npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android --profile preview
```

El perfil `preview` de [eas.json](./eas.json) genera un APK de distribución interna. EAS mostrará el enlace de instalación y un QR al finalizar la compilación. Añade ese enlace y QR aquí después de crear el build:

- **APK / enlace de instalación:** pendiente de generar con EAS.
- **QR:** pendiente de generar con EAS.

La primera compilación requiere iniciar sesión y vincular el proyecto con una cuenta Expo; por eso el APK no está incluido en el repositorio fuente.

## Evidencias para la entrega

Captura las pantallas Hoy, Hábitos, Progreso, Perfil en modo claro y oscuro, y la página de instalación del APK de EAS. Guárdalas en `docs/evidencias/` y enlázalas aquí antes de entregar. El screencast de sustentación (máximo cuatro minutos) y el enlace del repositorio deben entregarse por el aula virtual.

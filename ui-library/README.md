# Honeycomb UI

Honeycomb UI is a React UI library based on Tailwind CSS, inspired by HeroUI. It provides a collection of modern, accessible, and highly customizable components to streamline your development process.

## Installation

Before installing Honeycomb UI, ensure that your project is set up with Tailwind CSS (v4). You can find installation guides for different frameworks on the official Tailwind CSS site:

[Tailwind CSS Installation Guide](https://tailwindcss.com/docs/installation/framework-guides)

### Step 1: Install Dependencies

Once Tailwind CSS is set up in your project, install `framer-motion` and `@honeycomb-app/design` by running the following command:

```sh
npm install @honeycomb-app/design framer-motion
```

### Step 2: Update Your Styles

Modify your `index.css` file to ensure Tailwind can access Honeycomb UI styles. Add the following imports:

```css
@import "../node_modules/@honeycomb-app/design/dist/index.css";
@import "../node_modules/@honeycomb-app/design/dist/theme.css";

@import "tailwindcss";
```

### Step 3: Wrap Your App with `HoneycombUIProvider`

To use Honeycomb UI components, wrap your application with `HoneycombUIProvider` in your `index.tsx` file:

```tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { HoneycombUIProvider } from "@honeycomb-app/design"
import { App } from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<HoneycombUIProvider theme="dark">
		<App />
	</HoneycombUIProvider>
)
```

## Usage

Once the setup is complete, you can start using Honeycomb UI components in your React application.

## License

Honeycomb UI is open-source and licensed under the MIT License.

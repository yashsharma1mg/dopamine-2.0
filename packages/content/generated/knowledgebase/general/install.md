# Install & set up Dopamine2.0

Dopamine2.0 ships as one self-contained React package: `@dopamine2.0/ui` (ESM, React 18+).

## Install

The package is distributed as a tarball (private design system, not on the public npm registry):

```bash
npm install ./dopamine2.0-ui-0.1.0.tgz
# peer deps (if not already present)
npm install react react-dom
```

## Wire it up

1. Import the stylesheet **once** at your app root — it carries the tokens, fonts, and all
   component styles:

   ```tsx
   import "@dopamine2.0/ui/styles.css";
   ```

2. Import components from the barrel and use them:

   ```tsx
   import { Button, Snackbar } from "@dopamine2.0/ui";

   export function App() {
     return (
       <>
         <Button type="Fill">Save changes</Button>
         <Snackbar type="Success" message="Saved" />
       </>
     );
   }
   ```

Icons are inlined (data-URIs) inside the package — there are **no external asset URLs to host**.
Fonts (Figtree) are bundled and referenced by the stylesheet.

## Requirements

- React `>=18`, React DOM `>=18`.
- A bundler that resolves the `exports` map (Vite, Next.js, webpack 5, esbuild). ESM only —
  CommonJS `require()` is not supported.

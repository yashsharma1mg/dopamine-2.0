import type { Preview } from "@storybook/react-vite";
import "../packages/ui/src/styles.css";
import "./storybook.css";

const preview: Preview = {
  tags: ["autodocs", "test"],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    a11y: {
      test: "error"
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      toc: true
    },
    options: {
      // Blade-style taxonomy order: learn → tokens → parts → compositions.
      storySort: { order: ["Guides", "Foundations", "Components", "Patterns", "*"] }
    },
    // Mobile device presets — these are a mobile design system, so the viewport
    // toolbar defaults to phone sizes. Patterns opt into `phone` via story globals.
    viewport: {
      options: {
        phone: { name: "Phone (360×780)", styles: { width: "360px", height: "780px" } },
        phoneLarge: { name: "Phone large (390×844)", styles: { width: "390px", height: "844px" } },
        phoneSmall: { name: "Phone small (360×640)", styles: { width: "360px", height: "640px" } }
      }
    },
    layout: "centered"
  }
};

export default preview;

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
    layout: "centered"
  }
};

export default preview;

import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: [
    "../packages/tokens/**/*.stories.@(ts|tsx)",
    "../packages/ui/src/**/*.stories.@(ts|tsx)"
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  docs: { defaultName: "Documentation" },
  core: {
    builder: {
      name: "@storybook/builder-vite",
      options: {
        viteConfigPath: "./.storybook/standalone-vite.config.ts"
      }
    }
  }
};

export default config;

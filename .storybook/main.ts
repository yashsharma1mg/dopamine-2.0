import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: [
    "../packages/tokens/**/*.stories.@(ts|tsx)",
    "../packages/ui/src/**/*.stories.@(ts|tsx)"
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  // Serve the iconography/asset library at /assets so DS icons render in Storybook.
  // Scoped to public/assets (not all of ../public) because the build outputs into
  // public/storybook — copying the whole folder into itself would recurse.
  staticDirs: [{ from: "../public/assets", to: "/assets" }],
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

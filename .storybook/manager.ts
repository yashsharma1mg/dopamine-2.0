import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Internal Design System",
    brandUrl: "/",
    colorPrimary: "#3568F4",
    colorSecondary: "#2855D9",
    appBg: "#F7F8FA",
    appContentBg: "#FFFFFF",
    appBorderColor: "#DDE1E8",
    appBorderRadius: 10
  })
});

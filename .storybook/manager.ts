import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Dopamine2.0",
    brandUrl: "/",
    colorPrimary: "#ff5443",
    colorSecondary: "#414752",
    appBg: "#f7f8fa",
    appContentBg: "#FFFFFF",
    appBorderColor: "#dde2eb",
    appBorderRadius: 8
  })
});

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

// Show the same blue "New" (+) marker on EVERY component row in the sidebar,
// not only the recently-added ones. Storybook auto-assigns that badge to newly
// detected components and there is no public API to set it on the rest, so we
// mirror the built-in glyph (#icon--new) onto any component row that lacks it.
// ponytail: cosmetic DOM hook on Storybook's internal sidebar markup — purely
// visual, may need a tweak if Storybook restructures the sidebar in a future major.
addons.register("dopamine/uniform-new-badge", () => {
  const style = document.createElement("style");
  style.textContent = `
    .dopamine-new-badge { display:inline-flex; align-items:center; margin-left:auto; padding:0 6px; color:#029CFD; }
    .sidebar-item[data-nodetype="component"][data-item-id^="components-"] { position: relative; }
  `;
  document.head.appendChild(style);

  const decorate = () => {
    document.querySelectorAll('.sidebar-item[data-nodetype="component"][data-item-id^="components-"]').forEach((row) => {
      if (row.querySelector('[data-testid="tree-change-status-button"]')) return; // already has the real one
      if (row.querySelector(".dopamine-new-badge")) return;
      const badge = document.createElement("span");
      badge.className = "dopamine-new-badge";
      badge.setAttribute("aria-label", "Status: New");
      badge.innerHTML = '<svg viewBox="0 0 14 14" width="14" height="14"><use xlink:href="#icon--new"></use></svg>';
      row.appendChild(badge);
    });
  };

  const observer = new MutationObserver(() => decorate());
  observer.observe(document.body, { childList: true, subtree: true });
  decorate();
});

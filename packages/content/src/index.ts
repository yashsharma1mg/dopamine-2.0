export type ComponentStatus = "ready" | "draft" | "experimental" | "deprecated";

export type ComponentManifest = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  status: ComponentStatus;
  storyId: string;
  packageName: string;
  importExample: string;
  anatomy: string[];
  variants: string[];
  sizes: string[];
  states: string[];
  usage: { do: string[]; dont: string[] };
  accessibility: string[];
  contentGuidance: string[];
  api: { name: string; type: string; defaultValue: string; description: string }[];
  links: {
    figma?: string;
    specification: string;
    audit: string;
    source: string;
  };
};

export const foundationPages = [
  {
    slug: "colours",
    name: "Colours",
    summary: "Base values flow into semantic roles and component-level decisions.",
    group: "Colour"
  },
  {
    slug: "typography",
    name: "Typography",
    summary: "A compact type scale for product content, labels, headings, and code.",
    group: "Core"
  },
  {
    slug: "layout",
    name: "Layout",
    summary: "The documented eight-point gutter and sixteen-point page margin.",
    group: "Core"
  },
  {
    slug: "spacing",
    name: "Spacing",
    summary: "A four-point rhythm that keeps layout decisions consistent.",
    group: "Core"
  },
  {
    slug: "radius",
    name: "Corner radius",
    summary: "A small set of radii that communicates hierarchy without decoration.",
    group: "Core"
  },
  {
    slug: "shadows",
    name: "Shadows",
    summary: "Purposeful elevation for raised controls, floating surfaces, and focus.",
    group: "Core"
  },
  {
    slug: "iconography",
    name: "Iconography",
    summary: "A 24px icon library organised by purpose and coloured through component tokens.",
    group: "Core"
  }
] as const;

export const iconographyCategories = [
  { name: "Arrows and Chevrons", icons: ["arrow-right", "arrow-left", "arrow up-right", "chevron-down", "chevron-up", "chevron-right", "chevron-left", "double-chevron-right", "double-chevron-left", "double-chevron-down"] },
  { name: "Actions", icons: ["tick", "subtract", "add", "cross", "edit"] },
  { name: "Location", icons: ["Location pin", "Location pin off", "House/home/address", "Office/work/building"] },
  { name: "Alerts", icons: ["information", "help"] },
  { name: "Medical", icons: ["consultation", "lab-test", "hearing", "Vaccine/Vaccination", "prescription"] },
  { name: "General", icons: ["left-to-right-list-bullet", "grid", "hamburger-menu", "kebab-menu", "search", "filter", "delete", "reorder", "category", "discount", "coupon", "language", "rapid", "lock", "clock", "date-time", "timer", "sort", "unlock", "home", "cart", "bag", "phone", "navigation", "Search history", "Retry / Redo", "care plan", "error", "customer support", "Rating/star", "notification", "QR code/scan", "Payment/card", "Call/ringing", "Tag/offer/coupon", "Logout", "Update", "copy", "Rain/weather"] },
  { name: "Files", icons: ["download", "document-download", "health-records", "document-upload", "Document/Paper/Report", "profile-user-person", "health plan"] },
  { name: "Media", icons: ["play", "pause", "sound-on", "sound-off", "camera", "gallery"] },
  { name: "Insights", icons: ["insights", "trends", "bar-graph", "trend up", "trend down"] }
] as const;

export const componentManifests: ComponentManifest[] = [
  {
    slug: "button",
    name: "Button",
    summary: "Triggers an immediate action or confirms a decision.",
    category: "Actions",
    status: "ready",
    storyId: "components-button--playground",
    packageName: "@internal/design-system",
    importExample: 'import { Button } from "@internal/design-system";',
    anatomy: ["Container", "Optional leading icon", "Label", "Optional trailing icon", "Loading indicator"],
    variants: ["Fill", "Outline", "Ghost", "Text with icon", "Underline"],
    sizes: ["Medium", "Large"],
    states: ["Primary", "Secondary", "Inverse", "Disabled", "Loading"],
    usage: {
      do: [
        "Use one primary action per decision area.",
        "Use verbs that describe the action’s outcome.",
        "Keep destructive actions visually and spatially distinct."
      ],
      dont: [
        "Use a button for navigation when a link is semantically correct.",
        "Use disabled styling to hide permission or validation problems.",
        "Place several primary buttons next to each other."
      ]
    },
    accessibility: [
      "Uses the native button element and inherits its keyboard behavior.",
      "Uses the Figma medium and large size contracts.",
      "Shows a token-backed focus ring only for keyboard focus.",
      "Loading sets aria-busy and prevents duplicate activation."
    ],
    contentGuidance: [
      "Lead with a clear verb: Save changes, Add patient, Continue.",
      "Prefer one to three words; keep labels below 32 characters.",
      "Avoid vague labels such as Click here, Yes, or Submit when a clearer outcome exists."
    ],
    api: [
      { name: "type", type: "Fill | Outline | Ghost", defaultValue: "Fill", description: "Figma visual container treatment." },
      { name: "state", type: "Primary | Secondary | Inverse | Disabled", defaultValue: "Primary", description: "Figma state variant." },
      { name: "size", type: "Medium | Large", defaultValue: "Large", description: "Figma size variant." },
      { name: "style", type: "Text Only | Icon + Text | Text + Icon | Underline", defaultValue: "Text Only", description: "Figma content construct." },
      { name: "loading", type: "boolean", defaultValue: "false", description: "Shows progress and prevents activation." }
    ],
    links: {
      figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=4021-1652&t=2b3pGoo58LPx32e2-4",
      specification: "/specs/Button.md",
      audit: "/audits/Button.md",
      source: "/storybook/?path=/docs/components-button--docs"
    }
  },
  {
    slug: "stepper",
    name: "Stepper",
    summary: "Adds, reduces, and displays an item quantity.",
    category: "Actions",
    status: "ready",
    storyId: "components-stepper--playground",
    packageName: "@internal/design-system",
    importExample: 'import { Stepper } from "@internal/design-system";',
    anatomy: ["Add action", "Decrease action", "Quantity output", "Increase action"],
    variants: ["Filled", "Outline"],
    sizes: ["Medium", "Large"],
    states: ["Add", "Added number", "Out of stock"],
    usage: { do: ["Use for a bounded item quantity."], dont: ["Use for an unbounded numeric input."] },
    accessibility: ["Uses labelled native buttons.", "Announces quantity changes through a live output."],
    contentGuidance: ["Use the supplied Add and Out of stock labels."],
    api: [
      { name: "quantity", type: "number", defaultValue: "—", description: "Current item quantity." },
      { name: "onQuantityChange", type: "(quantity: number) => void", defaultValue: "—", description: "Receives quantity changes." },
      { name: "type", type: "Filled | Outline", defaultValue: "Filled", description: "Figma visual variant." },
      { name: "state", type: "Add | Added- Text | Added- Number", defaultValue: "derived from quantity", description: "Figma state variant." },
      { name: "outOfStock", type: "boolean", defaultValue: "false", description: "Disables quantity actions." }
    ],
    links: {
      figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=4023-1475&t=2b3pGoo58LPx32e2-4",
      specification: "/specs/Stepper.md", audit: "/audits/Stepper.md", source: "/storybook/?path=/docs/components-stepper--docs"
    }
  },
  {
    slug: "page-header",
    name: "Page Header",
    summary: "A 360px mobile header for location, navigation, and Family Hub contexts.",
    category: "Navigation",
    status: "ready",
    storyId: "components-page-header--playground",
    packageName: "@internal/design-system",
    importExample: 'import { PageHeader } from "@internal/design-system";',
    anatomy: ["Status bar", "Leading navigation or location action", "Title and subtitle", "Contextual actions"],
    variants: ["Floating", "Location", "Dropdown", "HIH", "FamilyHub"],
    sizes: ["360px mobile width"],
    states: ["Solid", "Transparent", "Black heading", "No heading", "You", "Family"],
    usage: {
      do: ["Use Floating or Location on the homepage.", "Use Dropdown for transient pages.", "Use the transparent Dropdown over a non-white surface."],
      dont: ["Do not use this desktop-first or beyond its 360px mobile contract.", "Do not replace the supplied icon assets with arbitrary glyphs."]
    },
    accessibility: ["All actions are labelled native buttons.", "The Family Hub selector exposes tab semantics.", "Keyboard focus uses the Dopamine focus-ring token."],
    contentGuidance: ["Keep the heading brief and the subtitle to a single line.", "Use concise location names and truncate long location detail naturally."],
    api: [
      { name: "usage", type: "Floating | Location | Dropdown | HIH | FamilyHub", defaultValue: "Floating", description: "Figma header composition." },
      { name: "type", type: "Solid | Transparent", defaultValue: "Transparent", description: "Surface treatment used by Location." },
      { name: "textColour", type: "Black | No heading", defaultValue: "Black", description: "Shows or removes the Family Hub heading." },
      { name: "activeTab", type: "You | Family", defaultValue: "You", description: "Current Family Hub tab." }
    ],
    links: {
      figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6391-533&t=2b3pGoo58LPx32e2-4",
      specification: "/specs/PageHeader.md",
      audit: "/audits/PageHeader.md",
      source: "/storybook/?path=/docs/components-page-header--docs"
    }
  },
  {
    slug: "floating-action-button",
    name: "Floating Action Button",
    summary: "A compact action control for add and added states.",
    category: "Actions",
    status: "ready",
    storyId: "components-floating-action-button--playground",
    packageName: "@internal/design-system",
    importExample: 'import { FloatingActionButton } from "@internal/design-system";',
    anatomy: ["Action container", "Icon", "Optional label"],
    variants: ["Add", "Added", "FAB", "Special button"],
    sizes: ["32px action", "40px FAB", "56px labelled action"],
    states: ["Default", "Single added", "Disabled"],
    usage: { do: ["Use a concise accessible label for icon-only actions."], dont: ["Use icon-only actions when the action is ambiguous."] },
    accessibility: ["Provides an accessible name for icon-only variants.", "Uses a native button and visible focus state."],
    contentGuidance: ["Keep the optional label short and action-oriented."],
    api: [
      { name: "type", type: "FAB | Special button | Added | Add", defaultValue: "Add", description: "Figma component variant." },
      { name: "state", type: "Default | Disable | Single Added", defaultValue: "Default", description: "Figma state variant." },
      { name: "label", type: "string", defaultValue: "variant label", description: "Accessible or visible action label." },
      { name: "icon", type: "ReactNode", defaultValue: "+", description: "Optional action icon." }
    ],
    links: {
      figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=4023-2838&t=2b3pGoo58LPx32e2-4",
      specification: "/specs/FloatingActionButton.md", audit: "/audits/FloatingActionButton.md", source: "/storybook/?path=/docs/components-floating-action-button--docs"
    }
  }
];

export const readyComponents = componentManifests.filter(({ status }) => status === "ready");

export function getComponent(slug: string) {
  return componentManifests.find((component) => component.slug === slug);
}

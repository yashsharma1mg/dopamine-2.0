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
  }
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
      { name: "type", type: "fill | outline | ghost", defaultValue: "fill", description: "Visual container treatment." },
      { name: "size", type: "medium | large", defaultValue: "large", description: "Figma size variant." },
      { name: "style", type: "text | icon-leading | icon-trailing | underline", defaultValue: "text", description: "Label and icon composition." },
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
      { name: "type", type: "filled | outline", defaultValue: "filled", description: "Figma visual variant." },
      { name: "outOfStock", type: "boolean", defaultValue: "false", description: "Disables quantity actions." }
    ],
    links: {
      figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=4023-1475&t=2b3pGoo58LPx32e2-4",
      specification: "/specs/Stepper.md", audit: "/audits/Stepper.md", source: "/storybook/?path=/docs/components-stepper--docs"
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
      { name: "type", type: "add | added | fab | special", defaultValue: "add", description: "Figma component variant." },
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

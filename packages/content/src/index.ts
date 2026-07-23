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
    variants: ["Primary", "Secondary", "Ghost", "Danger"],
    sizes: ["Small · 44px", "Medium · 48px", "Large · 52px"],
    states: ["Default", "Hover", "Pressed", "Focus visible", "Loading", "Disabled"],
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
      "Maintains a minimum 44px touch target at every size.",
      "Shows a token-backed focus ring only for keyboard focus.",
      "Loading sets aria-busy and prevents duplicate activation."
    ],
    contentGuidance: [
      "Lead with a clear verb: Save changes, Add patient, Continue.",
      "Prefer one to three words; keep labels below 32 characters.",
      "Avoid vague labels such as Click here, Yes, or Submit when a clearer outcome exists."
    ],
    links: {
      specification: "/specs/Button.md",
      audit: "/audits/Button.md",
      source: "/storybook/?path=/docs/components-button--docs"
    }
  },
  {
    slug: "input",
    name: "Input",
    summary: "Collects a single line of structured or free-form information.",
    category: "Forms",
    status: "draft",
    storyId: "components-input--playground",
    packageName: "@internal/design-system",
    importExample: 'import { Input } from "@internal/design-system";',
    anatomy: [],
    variants: [],
    sizes: [],
    states: [],
    usage: { do: [], dont: [] },
    accessibility: [],
    contentGuidance: [],
    links: {
      specification: "/specs/Input.md",
      audit: "/audits/Input.md",
      source: "#"
    }
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    summary: "Lets people select any number of independent options.",
    category: "Forms",
    status: "draft",
    storyId: "components-checkbox--playground",
    packageName: "@internal/design-system",
    importExample: 'import { Checkbox } from "@internal/design-system";',
    anatomy: [],
    variants: [],
    sizes: [],
    states: [],
    usage: { do: [], dont: [] },
    accessibility: [],
    contentGuidance: [],
    links: {
      specification: "/specs/Checkbox.md",
      audit: "/audits/Checkbox.md",
      source: "#"
    }
  },
  {
    slug: "badge",
    name: "Badge",
    summary: "Communicates a compact status, category, or count.",
    category: "Data display",
    status: "experimental",
    storyId: "components-badge--playground",
    packageName: "@internal/design-system",
    importExample: 'import { Badge } from "@internal/design-system";',
    anatomy: [],
    variants: [],
    sizes: [],
    states: [],
    usage: { do: [], dont: [] },
    accessibility: [],
    contentGuidance: [],
    links: {
      specification: "/specs/Badge.md",
      audit: "/audits/Badge.md",
      source: "#"
    }
  }
];

export const readyComponents = componentManifests.filter(({ status }) => status === "ready");

export function getComponent(slug: string) {
  return componentManifests.find((component) => component.slug === slug);
}

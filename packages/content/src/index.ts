export type ComponentStatus = "ready" | "draft" | "experimental" | "deprecated";

export type ComponentManifest = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  status: ComponentStatus;
  storyId: string;
  /** Storybook story showing every variant. Defaults to `components-<slug>--figma-variants`. */
  galleryStoryId?: string;
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
    packageName: "@dopamine2.0/ui",
    importExample: 'import { Button } from "@dopamine2.0/ui";',
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
    packageName: "@dopamine2.0/ui",
    importExample: 'import { Stepper } from "@dopamine2.0/ui";',
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
    name: "PageHeader",
    summary: "A 360px mobile header for location, navigation, and Family Hub contexts.",
    category: "Navigation",
    status: "ready",
    storyId: "components-page-header--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { PageHeader } from "@dopamine2.0/ui";',
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
    name: "FloatingActionButton",
    summary: "A compact action control for add and added states.",
    category: "Actions",
    status: "ready",
    storyId: "components-floating-action-button--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { FloatingActionButton } from "@dopamine2.0/ui";',
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
  },
  {
    slug: "suggestion-chip",
    name: "SuggestionChip",
    summary: "A compact choice, filter, or timestamp control with a clear selected and disabled state.",
    category: "Selection",
    status: "ready",
    storyId: "components-suggestion-chip--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { SuggestionChip } from "@dopamine2.0/ui";',
    anatomy: ["Optional leading arrow", "Text label", "Optional trailing counter", "Timestamp content"],
    variants: ["Primary", "Default", "disable", "disable+select", "default timestamp", "selected timestamp"],
    sizes: ["Default (108 × 32px)", "small (99 × 28px)", "Timestamp (56 × 76px)"],
    states: ["Primary", "Default", "Disabled", "Disabled selected", "Timestamp selected"],
    usage: {
      do: ["Use a concise label that names a category, filter, or option.", "Use timestamp chips only for date selection."],
      dont: ["Do not use a suggestion chip for a primary page action.", "Do not use the selected treatment when the option cannot be changed."]
    },
    accessibility: ["Uses a native button with a visible keyboard focus ring.", "Disabled variants set the native disabled state.", "Timestamp chips expose their selection through aria-pressed."],
    contentGuidance: ["Keep standard labels to one short phrase.", "Use a single digit counter where possible.", "Keep day, date, and month abbreviations consistent across a date group."],
    api: [
      { name: "size", type: "Default | small | Timestamp", defaultValue: "Default", description: "Figma size variant." },
      { name: "state", type: "Primary | Default | disable | disable+select | default | selected", defaultValue: "Primary", description: "Figma state variant." },
      { name: "showLeadingIcon", type: "boolean", defaultValue: "true", description: "Shows the Figma left-arrow asset." },
      { name: "showTrailingCounter", type: "boolean", defaultValue: "true", description: "Shows the 16px counter on standard chips." },
      { name: "counter", type: "number", defaultValue: "1", description: "Standard-chip counter value." }
    ],
    links: {
      figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6353-389&t=2b3pGoo58LPx32e2-4",
      specification: "/specs/SuggestionChip.md",
      audit: "/audits/SuggestionChip.md",
      source: "/storybook/?path=/docs/components-suggestion-chip--docs"
    }
  },
  {
    slug: "input-field",
    name: "InputField",
    summary: "A labelled text field with a trailing action (APPLY or icon), plus 4- and 6-digit OTP inputs.",
    category: "Forms",
    status: "ready",
    storyId: "components-input-field--playground",
    galleryStoryId: "components-input-field--all-variants",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { InputField } from "@dopamine2.0/ui";',
    anatomy: ["Floating label", "Input box", "Trailing CTA (APPLY text or icon)", "Helper / error text", "OTP cells"],
    variants: ["Field with CTA text", "Field with CTA logo", "4 digit OTP", "6 digit OTP"],
    sizes: ["Single (328px wide)"],
    states: ["Default", "Typing", "Error", "Success", "Disable"],
    usage: {
      do: ["Reserve the helper line for errors so layout does not shift.", "Turn the CTA coral only once the field is engaged."],
      dont: ["Do not use for multi-line entry — use a textarea.", "Do not signal state with border colour alone."]
    },
    accessibility: ["Uses a real input with an associated label.", "Error state exposes aria-invalid and describes the helper text.", "OTP renders a labelled group of single-character inputs."],
    contentGuidance: ["Keep labels in sentence case.", "Error messages state what to fix, not just “invalid”."],
    api: [
      { name: "type", type: "Field with CTA text | Field with CTA logo | 4 digit OTP | 6 digit OTP", defaultValue: "Field with CTA text", description: "Figma type variant." },
      { name: "state", type: "default | typing | error | success | disable", defaultValue: "default", description: "Figma state variant." },
      { name: "label", type: "string", defaultValue: "—", description: "Floating label." },
      { name: "helperText", type: "ReactNode", defaultValue: "—", description: "Helper / error line." },
      { name: "ctaLabel", type: "string", defaultValue: "APPLY", description: "Trailing text CTA." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1340", specification: "/specs/InputField.md", audit: "/audits/InputField.md", source: "/storybook/?path=/docs/components-input-field--docs" }
  },
  {
    slug: "toggle",
    name: "Toggle",
    summary: "A binary on/off switch for an immediate, self-applying setting.",
    category: "Forms",
    status: "ready",
    storyId: "components-toggle--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { Toggle } from "@dopamine2.0/ui";',
    anatomy: ["Track (pill)", "Thumb", "Tick (when on)"],
    variants: ["Default", "Selected", "Disabled", "Disabled+selected"],
    sizes: ["Single (40 × 24px)"],
    states: ["Default", "Selected", "Disabled", "Disabled selected"],
    usage: {
      do: ["Apply the change immediately on toggle.", "Pair with a label describing the setting."],
      dont: ["Do not use where a Save/Cancel step is expected.", "Do not rely on colour alone — thumb position also encodes state."]
    },
    accessibility: ["Renders role=switch with aria-checked.", "Needs an accessible name via label.", "Disabled sets the native disabled attribute."],
    contentGuidance: ["Label the setting, not the action (“Notifications”, not “Turn on”)."],
    api: [
      { name: "checked", type: "boolean", defaultValue: "false", description: "On/off state (controlled)." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the switch." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", defaultValue: "—", description: "Change handler." },
      { name: "state", type: "Default | selected | disabled | disabled+selected", defaultValue: "Default", description: "Gallery convenience; maps the 4 Figma states." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6356-403", specification: "/specs/Toggle.md", audit: "/audits/Toggle.md", source: "/storybook/?path=/docs/components-toggle--docs" }
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    summary: "A square on/off control with a checkmark, for multi-select or single opt-ins. Normal and Small.",
    category: "Forms",
    status: "ready",
    storyId: "components-checkbox--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { Checkbox } from "@dopamine2.0/ui";',
    anatomy: ["Box (radius 6)", "Tick (when checked)"],
    variants: ["Default", "Selected", "Disable", "Disabled selected"],
    sizes: ["Normal (24px)", "Small (20px)"],
    states: ["Default", "Selected", "Disable", "Disabled selected"],
    usage: {
      do: ["Use for independent multi-select; each box toggles on its own.", "Keep disabled+selected grey."],
      dont: ["Do not use where exactly one option must be chosen — that is Radio."]
    },
    accessibility: ["Renders role=checkbox with aria-checked.", "Needs an accessible name.", "Space toggles the box."],
    contentGuidance: ["Pair with a clear label describing the option."],
    api: [
      { name: "checked", type: "boolean", defaultValue: "false", description: "Checked state (controlled)." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the box." },
      { name: "size", type: "Normal | Small", defaultValue: "Normal", description: "Figma size variant." },
      { name: "state", type: "Default | Selected | Disable | Disabled selected", defaultValue: "Default", description: "Gallery convenience." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1536", specification: "/specs/Checkbox.md", audit: "/audits/Checkbox.md", source: "/storybook/?path=/docs/components-checkbox--docs" }
  },
  {
    slug: "radio",
    name: "Radio",
    summary: "A single-select control; selected shows a coral donut or a checkmark. Default and Small.",
    category: "Forms",
    status: "ready",
    storyId: "components-radio--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { Radio } from "@dopamine2.0/ui";',
    anatomy: ["Ring / filled disc", "Indicator (white hole dot, or checkmark)"],
    variants: ["Default", "Selected", "Disable", "Disable+select", "Select with icon", "Disable+select with icon"],
    sizes: ["Default (24px)", "Small (20px)"],
    states: ["Default", "Selected", "Disable", "Disable+select", "Select with icon", "Disable+select with icon"],
    usage: {
      do: ["Use inside a group where exactly one option is selectable.", "Keep disabled-selected grey."],
      dont: ["Do not use a single radio for a yes/no — use Checkbox or Toggle.", "Do not mix dot and check indicators in one group."]
    },
    accessibility: ["Renders role=radio; single-select lives in the consuming radiogroup.", "Arrow keys move selection within the group."],
    contentGuidance: ["Keep option labels parallel in phrasing."],
    api: [
      { name: "checked", type: "boolean", defaultValue: "false", description: "Selected state (controlled)." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the radio." },
      { name: "indicator", type: "dot | check", defaultValue: "dot", description: "Selected indicator style." },
      { name: "size", type: "Default | Small", defaultValue: "Default", description: "Figma size variant." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1573", specification: "/specs/Radio.md", audit: "/audits/Radio.md", source: "/storybook/?path=/docs/components-radio--docs" }
  },
  {
    slug: "search-bar",
    name: "SearchBar",
    summary: "A pill search field whose contents change by state, with an optional entry button.",
    category: "Navigation",
    status: "ready",
    storyId: "components-search-bar--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { SearchBar } from "@dopamine2.0/ui";',
    anatomy: ["Bar (pill)", "Leading back button (engaged states)", "Input / rotating hint", "Trailing search / mic / clear", "Optional entry button"],
    variants: ["Bar Only", "Bar with entry"],
    sizes: ["Single (328 × 52px)"],
    states: ["Default", "selected", "typing"],
    usage: {
      do: ["Show the back arrow only once the bar is engaged.", "Swap the trailing control by state: search → mic → clear."],
      dont: ["Do not show mic and clear at once."]
    },
    accessibility: ["Wrap in role=search with a labelled input.", "Every icon button needs an aria-label."],
    contentGuidance: ["Use short, example-led placeholder hints."],
    api: [
      { name: "state", type: "Default | selected | typing", defaultValue: "Default", description: "Figma state variant." },
      { name: "type", type: "Bar Only | Bar with entry", defaultValue: "Bar Only", description: "Adds a trailing entry button." },
      { name: "placeholder", type: "string", defaultValue: "—", description: "Resting placeholder." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6425-2956", specification: "/specs/SearchBar.md", audit: "/audits/SearchBar.md", source: "/storybook/?path=/docs/components-search-bar--docs" }
  },
  {
    slug: "action-bar",
    name: "ActionBar",
    summary: "A sticky bottom bar that composes Button(s) with an optional billing summary.",
    category: "Actions",
    status: "ready",
    storyId: "components-action-bar--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { ActionBar } from "@dopamine2.0/ui";',
    anatomy: ["Container", "Optional billing summary", "Button(s)"],
    variants: ["CTA with Billing (Pharma)", "CTA with Billing (Diagno)", "One Button", "2 Buttons", "2 Buttons Vertical"],
    sizes: ["Single (360px wide)"],
    states: ["Layout presets (not interaction states)"],
    usage: {
      do: ["Keep the primary (Fill) action visually dominant; secondary is Outline.", "Stack vertically when both labels are long."],
      dont: ["Do not place more than two buttons.", "Do not recolour the composed buttons."]
    },
    accessibility: ["Render as a labelled region or footer.", "Primary action last (right / bottom) matching Figma."],
    contentGuidance: ["One primary action per bar; keep button labels to 1–2 words."],
    api: [
      { name: "billing", type: "ReactNode", defaultValue: "—", description: "Optional left summary block." },
      { name: "orientation", type: "horizontal | vertical", defaultValue: "horizontal", description: "Stack buttons vertically." },
      { name: "children", type: "ReactNode", defaultValue: "—", description: "The Button(s)." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6383-870", specification: "/specs/ActionBar.md", audit: "/audits/ActionBar.md", source: "/storybook/?path=/docs/components-action-bar--docs" }
  },
  {
    slug: "event-banner",
    name: "EventBanner",
    summary: "A promotional card with a hero image, an optional item strip, and an optional message with dots.",
    category: "Display",
    status: "ready",
    storyId: "components-event-banner--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { EventBanner } from "@dopamine2.0/ui";',
    anatomy: ["Hero image area", "Dark overlay panel", "Item thumbnails", "Message row (icon + text + chevron)", "Pagination dots"],
    variants: ["items: none / 1 / 2 / 3 / 4 / >4", "bottom message: none / 1 / 2"],
    sizes: ["328px wide; 248 / 211 / 281px tall"],
    states: ["Content configurations (not interaction states)"],
    usage: {
      do: ["Use the dots when the banner is one of a swipeable set.", "Keep the message to a single line."],
      dont: ["Do not stuff more than 5 thumbnails — use “>4”."]
    },
    accessibility: ["Expose the action via the chevron button.", "Real images must carry meaningful alt text."],
    contentGuidance: ["Title is the hook; the regular text is a short qualifier."],
    api: [
      { name: "items", type: "none | 1 | 2 | 3 | 4 | >4", defaultValue: "none", description: "Thumbnail count." },
      { name: "bottomMessage", type: "none | 1 | 2", defaultValue: "2", description: "Message row + pagination dots." },
      { name: "title", type: "string", defaultValue: "—", description: "Bold message title." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6453-598", specification: "/specs/EventBanner.md", audit: "/audits/EventBanner.md", source: "/storybook/?path=/docs/components-event-banner--docs" }
  },
  {
    slug: "navigation",
    name: "Navigation",
    summary: "A composite top header: location pill, profile/cart, a category tab strip, and a search row.",
    category: "Navigation",
    status: "ready",
    storyId: "components-navigation--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { Navigation } from "@dopamine2.0/ui";',
    anatomy: ["Location pill", "Profile", "Cart with badge", "Category tab strip", "Search row + context CTA"],
    variants: ["labs", "pharmacy", "for you-no scroll", "CP-profile icon", "for you-scroll"],
    sizes: ["361px wide"],
    states: ["Per type: active tab, profile variant, trailing CTA"],
    usage: {
      do: ["Match the trailing CTA to the active surface.", "Keep exactly one active tab."],
      dont: ["Do not show more than one primary trailing CTA.", "Do not recolour the CP avatar."]
    },
    accessibility: ["Tab strip is a tablist with roving arrow-key navigation.", "Location, profile, cart, search and CTA are all labelled buttons."],
    contentGuidance: ["Keep the location detail short; tab labels are single words."],
    api: [
      { name: "type", type: "labs | pharmacy | for you-no scroll | CP-profile icon | for you-scroll", defaultValue: "for you-no scroll", description: "Sets active tab + profile + trailing CTA." },
      { name: "cartCount", type: "number", defaultValue: "3", description: "Cart badge count." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6466-4967", specification: "/specs/Navigation.md", audit: "/audits/Navigation.md", source: "/storybook/?path=/docs/components-navigation--docs" }
  },
  {
    slug: "sticky",
    name: "Sticky",
    summary: "Sticky bottom bars: Redirection (status), Rating, Standard, and a floating Video pill.",
    category: "Feedback",
    status: "ready",
    storyId: "components-sticky--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { Sticky } from "@dopamine2.0/ui";',
    anatomy: ["Rounded-top container", "Leading media", "Title + subtitle", "Trailing chevron / Track / close", "Extras: stars, button, dots, +N more"],
    variants: ["Redirection", "Rating", "Standard", "Video"],
    sizes: ["360px wide (Video 160 × 320px)"],
    states: ["Redirection: Default / Error / Delivery / 2 deliveries / Multiple Delivery"],
    usage: {
      do: ["Use Redirection for actionable status; Rating/Standard for a single dismissible prompt.", "Show “+N more” / dots only when deliveries stack."],
      dont: ["Do not stack multiple sticky bars.", "Do not omit the dismiss on promo bars."]
    },
    accessibility: ["Close/Track/Rate are labelled buttons; the star row is a radiogroup.", "Check text-on-colour contrast for Rating/Standard."],
    contentGuidance: ["Title ≤ ~34 chars; subtitle ellipsises."],
    api: [
      { name: "type", type: "Redirection | Rating | Standard | Video", defaultValue: "Redirection", description: "Figma type." },
      { name: "state", type: "Default | Error | Delivery | 2 deliveries | Multiple Delivery | …", defaultValue: "Default", description: "Redirection state." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6525-593", specification: "/specs/Sticky.md", audit: "/audits/Sticky.md", source: "/storybook/?path=/docs/components-sticky--docs" }
  },
  {
    slug: "horizontal-tabs",
    name: "HorizontalTabs",
    summary: "Horizontal tabs: underline (text or image chips) and highlighted segmented pills.",
    category: "Navigation",
    status: "ready",
    storyId: "components-horizontal-tabs--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { HorizontalTabs } from "@dopamine2.0/ui";',
    anatomy: ["Tab row / segment container", "Optional 64px image chip", "Label", "Underline or highlighted pill"],
    variants: ["underline (text / with images)", "highlighted (2 tabs, optional icon + subtext)"],
    sizes: ["Underline: 80px tabs · Highlighted: 328px"],
    states: ["Active per index"],
    usage: {
      do: ["Use underline tabs for content sections; highlighted for a compact toggle.", "Keep exactly one active tab."],
      dont: ["Do not use highlighted for more than a few short segments."]
    },
    accessibility: ["Renders a tablist of tabs with aria-selected.", "Add arrow-key roving tabindex and a tabpanel in the consumer."],
    contentGuidance: ["Keep tab labels short."],
    api: [
      { name: "type", type: "underline | highlighted", defaultValue: "underline", description: "Tab style." },
      { name: "items", type: "HorizontalTabItem[]", defaultValue: "—", description: "Tabs (label, subtext?, icon?)." },
      { name: "activeIndex", type: "number", defaultValue: "0", description: "Selected tab (controlled)." },
      { name: "withImages", type: "boolean", defaultValue: "false", description: "Underline: show 64px image chips." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6428-2280", specification: "/specs/HorizontalTabs.md", audit: "/audits/HorizontalTabs.md", source: "/storybook/?path=/docs/components-horizontal-tabs--docs" }
  },
  {
    slug: "vertical-tabs",
    name: "VerticalTabs",
    summary: "An 88px vertical category rail; the selected item gets a dark chip, bold label and a right indicator bar.",
    category: "Navigation",
    status: "ready",
    storyId: "components-vertical-tabs--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { VerticalTabs } from "@dopamine2.0/ui";',
    anatomy: ["88px rail", "Per item: image chip + label", "Selected: white bg + dark chip + right bar"],
    variants: ["Selected item (any index)"],
    sizes: ["88px wide"],
    states: ["Active per index"],
    usage: {
      do: ["Use for a category rail beside a content panel.", "Keep exactly one active item."],
      dont: ["Do not use for a long flat list — it is a category switcher."]
    },
    accessibility: ["Renders a vertical tablist; add arrow-key navigation and panel association in the consumer."],
    contentGuidance: ["Labels are short category names (wrap to 2 lines)."],
    api: [
      { name: "items", type: "VerticalTabItem[]", defaultValue: "—", description: "Items (label, icon?)." },
      { name: "activeIndex", type: "number", defaultValue: "0", description: "Selected item (controlled)." },
      { name: "onChange", type: "(index: number) => void", defaultValue: "—", description: "Change handler." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6429-2319", specification: "/specs/VerticalTabs.md", audit: "/audits/VerticalTabs.md", source: "/storybook/?path=/docs/components-vertical-tabs--docs" }
  },
  {
    slug: "swipe-indicator",
    name: "SwipeIndicator",
    summary: "A thin progress / pagination bar: line-filling or staggered, in Normal and Small.",
    category: "Navigation",
    status: "ready",
    storyId: "components-swipe-indicator--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { SwipeIndicator } from "@dopamine2.0/ui";',
    anatomy: ["Track (2px)", "Fill segment"],
    variants: ["Line Filling", "Staggered"],
    sizes: ["Normal (216px)", "Small (48px)"],
    states: ["current step (1-based)"],
    usage: {
      do: ["Use line-filling for progress; staggered for carousel position."],
      dont: ["Do not use for more steps than comfortably fit the width."]
    },
    accessibility: ["Renders role=progressbar with aria-valuemin/max/now."],
    contentGuidance: ["—"],
    api: [
      { name: "type", type: "line-filling | staggered", defaultValue: "line-filling", description: "Fill behaviour." },
      { name: "size", type: "Normal | Small", defaultValue: "Normal", description: "216px or 48px." },
      { name: "total", type: "number", defaultValue: "4", description: "Total steps." },
      { name: "current", type: "number", defaultValue: "1", description: "Current step (1-based)." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6401-1174", specification: "/specs/SwipeIndicator.md", audit: "/audits/SwipeIndicator.md", source: "/storybook/?path=/docs/components-swipe-indicator--docs" }
  },
  {
    slug: "snackbar",
    name: "Snackbar",
    summary: "A single-line transient message bar: White, Warning, Success, Error, Default, and Default + Action.",
    category: "Feedback",
    status: "ready",
    storyId: "components-snackbar--playground",
    packageName: "@dopamine2.0/ui",
    importExample: 'import { Snackbar } from "@dopamine2.0/ui";',
    anatomy: ["Container (rounded, coloured by type)", "Leading help icon", "Message", "Trailing close or action"],
    variants: ["White", "Warning", "Success", "Error", "Default", "Default + Action"],
    sizes: ["328px wide"],
    states: ["Per type surface; close or action trailing"],
    usage: {
      do: ["Use the type that matches the message intent.", "Use Default + Action for an undoable action."],
      dont: ["Do not omit the dismiss on promo/info snackbars.", "Do not stack multiple snackbars."]
    },
    accessibility: ["Renders role=status (polite live region); close is a labelled button.", "Auto-dismiss timing is the consumer's responsibility."],
    contentGuidance: ["Keep the message to a single short line."],
    api: [
      { name: "type", type: "White | Warning | Success | Error | Default", defaultValue: "Default", description: "Surface / intent." },
      { name: "message", type: "ReactNode", defaultValue: "—", description: "The message." },
      { name: "action", type: "string", defaultValue: "—", description: "Trailing action label (replaces close)." },
      { name: "dismissible", type: "boolean", defaultValue: "true", description: "Show the close (×)." }
    ],
    links: { figma: "https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6405-1125", specification: "/specs/Snackbar.md", audit: "/audits/Snackbar.md", source: "/storybook/?path=/docs/components-snackbar--docs" }
  }
];

export const readyComponents = componentManifests.filter(({ status }) => status === "ready");

// Every component tracked in the library (all are fully manifested).
export const trackedComponentCount = componentManifests.length;

export function getComponent(slug: string) {
  return componentManifests.find((component) => component.slug === slug);
}

import type { Meta, StoryObj } from "@storybook/react-vite";
import tokenSource from "./tokens.json";

const entries: Array<{ name: string; value: string; description: string }> = [];

function collect(node: unknown, parts: string[] = []) {
  if (!node || typeof node !== "object") return;
  if ("value" in node) {
    const token = node as { value: string; description?: string };
    entries.push({ name: parts.join("."), value: token.value, description: token.description ?? "" });
    return;
  }
  for (const [key, value] of Object.entries(node)) collect(value, [...parts, key]);
}

collect(tokenSource);

function ColourOverview() {
  const groups = ["base.color", "semantic.color", "component.button"];
  return (
    <div style={{ color: "var(--semantic-color-text-default)", fontFamily: "var(--font-family-sans)", maxWidth: 920 }}>
      <h1 style={{ color: "var(--semantic-color-text-strong)", fontSize: 36, letterSpacing: "-0.04em", marginBottom: 8 }}>
        Colour architecture
      </h1>
      <p style={{ color: "var(--semantic-color-text-muted)", lineHeight: 1.6, marginBottom: 32 }}>
        Base values become semantic intent, then component-specific decisions. Components never consume base colours directly.
      </p>
      <div style={{ display: "grid", gap: 28 }}>
        {groups.map((group) => (
          <section key={group}>
            <h2 style={{ fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>{group}</h2>
            <div style={{ display: "grid", gap: 8 }}>
              {entries
                .filter(({ name }) => name.startsWith(group))
                .map(({ description, name, value }) => (
                  <div
                    key={name}
                    style={{
                      alignItems: "center",
                      background: "var(--semantic-color-surface-default)",
                      border: "1px solid var(--semantic-color-border-subtle)",
                      borderRadius: 10,
                      display: "grid",
                      gap: 12,
                      gridTemplateColumns: "36px minmax(220px, 1fr) minmax(180px, .7fr)",
                      padding: 12
                    }}
                  >
                    <span style={{ background: `var(--${name.replaceAll(".", "-")})`, border: "1px solid rgba(16,19,26,.08)", borderRadius: 7, height: 32 }} />
                    <span>
                      <code>{name}</code>
                      <small style={{ color: "var(--semantic-color-text-muted)", display: "block", marginTop: 3 }}>{description}</small>
                    </span>
                    <code style={{ color: "var(--semantic-color-text-muted)", fontSize: 12 }}>{value}</code>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Colours",
  component: ColourOverview,
  parameters: { layout: "padded" }
} satisfies Meta<typeof ColourOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};

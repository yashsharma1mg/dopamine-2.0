/**
 * Token render helpers for the Foundations docs pages.
 *
 * This is deliberately NOT a `*.stories.tsx` file and exports no CSF `meta`,
 * so Storybook never indexes these as components. The MDX foundation pages
 * import these plain components purely for rendering — keeping token docs as
 * documentation, not phantom entries in the component index.
 */
import tokenSource from "../tokens.json";

type Entry = { name: string; value: string; description: string };

const entries: Entry[] = [];
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

const cssVar = (name: string) => `var(--${name.replaceAll(".", "-")})`;
const rows = (prefix: string) => entries.filter((e) => e.name.startsWith(prefix));

const page: React.CSSProperties = { color: "var(--semantic-color-content-primary)", fontFamily: "var(--font-family-sans)", maxWidth: 960 };
const lead: React.CSSProperties = { color: "var(--semantic-color-content-secondary)", lineHeight: 1.6, marginBottom: 32 };
const groupLabel: React.CSSProperties = { fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 };
const card: React.CSSProperties = {
  alignItems: "center",
  background: "var(--semantic-color-background-primary)",
  border: "1px solid var(--semantic-color-border-subtle)",
  borderRadius: 10,
  display: "grid",
  gap: 12,
  padding: 12
};
const code: React.CSSProperties = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12 };
const muted: React.CSSProperties = { ...code, color: "var(--semantic-color-content-secondary)" };

// ── Colours ──────────────────────────────────────────────────────────────
export function Colours() {
  const groups = ["base.color", "semantic.color", "component.button"];
  return (
    <div style={page}>
      <p style={lead}>Base values become semantic intent, then component-specific decisions. Components never consume base colours directly — they resolve through the semantic layer.</p>
      <div style={{ display: "grid", gap: 28 }}>
        {groups.map((group) => (
          <section key={group}>
            <h2 style={groupLabel}>{group}</h2>
            <div style={{ display: "grid", gap: 8 }}>
              {rows(group).map(({ description, name, value }) => (
                <div key={name} style={{ ...card, gridTemplateColumns: "36px minmax(220px, 1fr) minmax(180px, .7fr)" }}>
                  <span style={{ background: cssVar(name), border: "1px solid rgba(16,19,26,.08)", borderRadius: 7, height: 32 }} />
                  <span>
                    <code style={code}>{name}</code>
                    {description && <small style={{ color: "var(--semantic-color-content-secondary)", display: "block", marginTop: 3 }}>{description}</small>}
                  </span>
                  <code style={muted}>{value}</code>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// ── Spacing ──────────────────────────────────────────────────────────────
export function Spacing() {
  return (
    <div style={page}>
      <p style={lead}>The spacing scale drives every gap, padding and margin. Reference tokens by their pixel step (e.g. <code style={code}>--space-16</code>) rather than hard-coding values.</p>
      <div style={{ display: "grid", gap: 8 }}>
        {rows("space").map(({ name, value }) => (
          <div key={name} style={{ ...card, gridTemplateColumns: "minmax(120px,.4fr) 1fr minmax(60px,auto)" }}>
            <code style={code}>--{name.replace(".", "-")}</code>
            <span style={{ background: "var(--semantic-color-content-cta)", borderRadius: 3, height: 16, width: cssVar(name) }} />
            <code style={muted}>{value}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Radius ───────────────────────────────────────────────────────────────
export function Radius() {
  return (
    <div style={page}>
      <p style={lead}>Corner radii for surfaces and controls. Match the token to the component size — small controls use small radii.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {rows("radius").map(({ description, name, value }) => (
          <div key={name} style={{ textAlign: "center" }}>
            <div style={{ background: "var(--semantic-color-background-primary)", border: "1px solid var(--semantic-color-border-default, #dde2eb)", borderRadius: cssVar(name), boxShadow: "var(--shadow-level-1)", height: 64, width: 64 }} />
            <div style={{ ...code, marginTop: 8 }}>--{name.replace(".", "-")}</div>
            <div style={muted}>{value}</div>
            {description && <div style={{ ...muted, maxWidth: 120 }}>{description}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Typography ───────────────────────────────────────────────────────────
export function Typography() {
  return (
    <div style={page}>
      <p style={lead}>Type is set with three axes: family, size and weight. Sizes pair with the matching line-height token of the same step.</p>

      <h2 style={groupLabel}>Families</h2>
      <div style={{ display: "grid", gap: 8, marginBottom: 28 }}>
        {rows("font.family").map(({ name, value }) => (
          <div key={name} style={{ ...card, gridTemplateColumns: "minmax(160px,.5fr) 1fr" }}>
            <code style={code}>--{name.replace(/\./g, "-")}</code>
            <span style={{ fontFamily: cssVar(name), fontSize: 20 }}>{value} — The quick brown fox</span>
          </div>
        ))}
      </div>

      <h2 style={groupLabel}>Sizes</h2>
      <div style={{ display: "grid", gap: 8, marginBottom: 28 }}>
        {rows("font.size").map(({ name, value }) => (
          <div key={name} style={{ ...card, gridTemplateColumns: "minmax(200px,.5fr) 1fr minmax(56px,auto)" }}>
            <code style={code}>--{name.replace(/\./g, "-")}</code>
            <span style={{ fontSize: cssVar(name), lineHeight: 1.2 }}>Short message</span>
            <code style={muted}>{value}</code>
          </div>
        ))}
      </div>

      <h2 style={groupLabel}>Weights</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {rows("font.weight").map(({ name, value }) => (
          <div key={name} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, fontWeight: Number(value), lineHeight: 1 }}>Aa</div>
            <div style={{ ...code, marginTop: 8 }}>--{name.replace(/\./g, "-")}</div>
            <div style={muted}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Elevation ────────────────────────────────────────────────────────────
export function Elevation() {
  return (
    <div style={page}>
      <p style={lead}>Shadows signal depth and floating surfaces. Level-1 for resting cards, Level-2 for overlays and snackbars; the remaining tokens are component-specific.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
        {rows("shadow").map(({ description, name, value }) => (
          <div key={name} style={{ maxWidth: 160, textAlign: "center" }}>
            <div style={{ background: "var(--semantic-color-background-primary)", borderRadius: 12, boxShadow: cssVar(name), height: 72, width: 120 }} />
            <div style={{ ...code, marginTop: 12 }}>--{name.replace(/\./g, "-")}</div>
            {description && <div style={muted}>{description}</div>}
            <div style={{ ...muted, wordBreak: "break-all" }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

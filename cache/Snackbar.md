# Snackbar — Build Cache

**Built:** 2026-07-27 · **Figma:** node 6405-1125

## Variants
| Property | Values |
|---|---|
| type | White, Warning, Success, Error, Default |
| trailing | close ✕ (default) or action label (Default+Action) |

Node ids: White `6405:1124`, Warning `6405:1120`, Success `6405:1123`, Error `6405:1121`, Default `6405:1122`, Default+Action `6405:1119`.

## Token Police Audit
**All colours resolve cleanly — no missing tokens.**
| Figma | Token |
|---|---|
| Background/Primary (White bg) | `background.primary` |
| Content/Primary (White text; Default bg) | `content.primary` |
| States/Warning #bf9514 | `states.warning` |
| States/Success #308956 | `states.success` |
| States/Error #a3111e | `states.error` |
| Content Inverse/Primary (text on colour) | `content.inverse-primary` |
| Content/Cta #ff5443 (action) | `content.cta` |
| radius 8 / padding 12 / gaps 16, 8 | `radius.8` / `space.12` / `space.16` / `space.8` |

### ⚠️ ADDITION
- **`shadow.level-2`** added to all types (not in the flat Figma spec) so the **White** snackbar is visible on white backgrounds and all read as floating. Confirm — remove if snackbars should be flat.

## Notes
- `type` sets bg; content colour follows (dark on White, white otherwise). `action` (e.g. "Undo") replaces the ✕ with a coral bold label.
- Verified vs Figma via headless screenshot — all 6 match.
- Focus ring N/A (mobile).

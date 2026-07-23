# Button — Token Police audit

- 0 raw colour values in component CSS.
- Focus ring resolves through `semantic.color.focus.ring`.
- Disabled state uses native `disabled` and prevents pointer interaction.
- All Button token references resolve through `packages/tokens/tokens.json`.
- The Figma-authoritative Coral/white pairing is preserved for visual parity. It fails the 4.5:1 text contrast threshold and is explicitly excluded from automated contrast checks pending a Figma token decision.

- Component source verified: [Button](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=4021-1652&t=2b3pGoo58LPx32e2-4).

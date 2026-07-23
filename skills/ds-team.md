# DS Team

DS Team is the only component intake entry point. It coordinates the complete Figma-to-package workflow.

## Workflow

1. Load existing audits, component manifests, and canonical tokens.
2. Run Component God to create the implementation specification.
3. Run Token Police and stop on unresolved release blockers.
4. Implement the typed, accessible React component from the approved spec.
5. Add Storybook playground, variants, supported states, interaction assertions, and accessibility checks.
6. Complete the typed component manifest used by the website and Storybook.
7. Regenerate tokens, build the package and website, run Storybook tests, pack the package, and install it in a minimal consumer.
8. Promote the component manifest to `ready` only after every gate passes.

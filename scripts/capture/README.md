# Capture toolkit

Helpers used by the `blog-screenshots` and `blog-videos` agents to capture the
UI Color Palette web app (https://app.ui-color-palette.com) for blog articles.

| File | Role |
| --- | --- |
| `app.mjs` | Playwright helpers: dismiss dialogs, new palette, source colors, presets, color space, contrast knobs, export, code preview |
| `win.mjs` | A real visible Chromium window (app mode) + page→screen coordinates, for Screen Studio |
| `mousectl.swift` | Moves and clicks the real cursor (needs the Accessibility permission of the host app) |
| `scenario.template.mjs` | Template of a recorded scenario (READY / `go` / DONE protocol) |

## Setup (in a temporary folder, never in the repo)

```sh
WORK=$(mktemp -d) && cd "$WORK"
npm init -y && npm i playwright && npx playwright install chromium
cp <repo>/scripts/capture/* . && swiftc -O mousectl.swift -o mousectl
export UICP_CAPTURE_DIR="$WORK"
```

## Session (/pro test license)

`app.mjs` loads a Playwright storage state from `~/.config/uicp-capture/session.json`
(or `UICP_CAPTURE_SESSION`), outside the repo. If it does not exist, ask the user for
the test license key, then in a throwaway browser: User menu → *Manage license* →
fill *License key* and *License name* → *Activate your license*, and save
`context.storageState({ path: SESSION_PATH })`. Never write the key in a file of the repo,
a log or a report.

## Gotchas learnt the hard way

- Menus render hidden duplicates of their items: use `rectOf` and pick the visible one, or click by coordinates.
- The first load shows a cookie banner and a multi-step "Welcome to the /web beta" dialog: `dismissDialogs`.
- The Contrast ratio section of the Scale panel has two sliders (light and dark foreground), no view switch; a typed value is rounded to 0.1.
- Chrome's "Translate this page?" bubble would be recorded: `openWindow` disables it in the profile.
- Without the Accessibility permission, `mousectl` silently does nothing (check: `swift -e 'import ApplicationServices; print(AXIsProcessTrusted())'`).

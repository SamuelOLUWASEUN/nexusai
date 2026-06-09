# Nexus AI — Browser Extension

Ask Nexus AI anything from any browser tab. Search your connected tools, summarize pages and draft responses without leaving your workflow.

---

## Features

- **Popup chat** — Ask Nexus questions directly from the extension icon
- **Selection toolbar** — Highlight any text on any page and ask Nexus about it
- **Context menu** — Right-click any selected text to search your tools or ask Nexus
- **Quick actions** — Summarize page, find related content, draft replies, extract tasks
- **Keyboard shortcut** — `Ctrl+Shift+N` (Windows/Linux) or `Cmd+Shift+N` (Mac) to open instantly
- **Dark mode** — Matches your system preference or set manually in settings

---

## Install in Chrome / Edge / Brave

### Development (local install)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `browser-extension` folder
5. The Nexus AI icon appears in your toolbar

### Production (Chrome Web Store)
Once published, users can install from the Chrome Web Store with one click.

---

## Install in Firefox

1. Open Firefox and go to `about:debugging`
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select the `manifest.json` file inside `browser-extension`

---

## How to Use

### Sign in
1. Click the Nexus AI icon in your toolbar
2. Click **Sign in to Nexus**
3. Complete sign-in on the Nexus AI website
4. The extension detects your login automatically

### Ask a question
- Click the extension icon and type in the chat
- Press **Enter** to send

### Selection toolbar
- Highlight any text on any webpage
- A small toolbar appears above the selection
- Click **Ask Nexus**, 🔍 or 📄 to interact with the selected text

### Context menu
- Right-click any selected text
- Choose **Ask Nexus AI about "..."** or **Search your tools for "..."**

### Keyboard shortcut
- Press `Ctrl+Shift+N` (or `Cmd+Shift+N` on Mac) from any tab

---

## Publishing to Chrome Web Store

1. Zip the `browser-extension` folder:
   ```bash
   cd nexusai
   zip -r nexusai-extension.zip browser-extension/
   ```
2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. Click **New item** → Upload the zip
4. Fill in store listing details, screenshots and description
5. Submit for review (typically 1-3 business days)

---

## File Structure

```
browser-extension/
├── manifest.json           # Extension config, permissions, shortcuts
├── popup/
│   ├── popup.html          # Popup UI markup
│   ├── popup.css           # Popup styles
│   └── popup.js            # Popup logic — auth, chat, settings
├── background/
│   └── background.js       # Service worker — context menus, shortcuts
├── content/
│   ├── content.js          # Page injection — selection toolbar
│   └── content.css         # Selection toolbar styles
└── icons/
    └── (add your icons here — see README)
```

---

## Adding Icons

You need PNG icons at these sizes: 16, 32, 48, 128px.
Place them in `browser-extension/icons/`:
- `icon-16.png`
- `icon-32.png`
- `icon-48.png`
- `icon-128.png`

The icon should be the Nexus AI hexagon logo on a navy background.
You can generate them from any design tool (Figma, Canva, etc.) or use an online icon generator.

---

## Connecting the Extension to Your Deployed App

Update the `DEFAULT_NEXUS_URL` in `background/background.js` and `popup/popup.js`:

```js
const DEFAULT_NEXUS_URL = "https://your-nexusai-domain.vercel.app";
```

Also update the `host_permissions` in `manifest.json`:

```json
"host_permissions": [
  "https://your-nexusai-domain.vercel.app/*"
]
```

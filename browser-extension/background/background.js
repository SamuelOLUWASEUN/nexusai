// Nexus AI — Background Service Worker
// Handles context menus, keyboard shortcuts and cross-tab messaging

const DEFAULT_NEXUS_URL = "https://nexusai.com";

// ── Install ────────────────────────────────────────────────────────
chrome.runtime.onInstalled.addListener(async (details) => {
  // Create context menu items
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id:       "nexus-ask",
      title:    "Ask Nexus AI about \"%s\"",
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id:       "nexus-summarize",
      title:    "Summarize this page with Nexus",
      contexts: ["page"],
    });

    chrome.contextMenus.create({
      id:       "nexus-search",
      title:    "Search your tools for \"%s\"",
      contexts: ["selection"],
    });
  });

  // Open onboarding on first install
  if (details.reason === "install") {
    const { nexusUrl } = await chrome.storage.local.get("nexusUrl");
    chrome.tabs.create({ url: `${nexusUrl || DEFAULT_NEXUS_URL}/signup?source=extension` });
  }
});

// ── Context menu clicks ────────────────────────────────────────────
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const { nexusUrl } = await chrome.storage.local.get("nexusUrl");
  const base = nexusUrl || DEFAULT_NEXUS_URL;
  const selected = info.selectionText?.trim() || "";

  if (info.menuItemId === "nexus-ask" && selected) {
    // Open popup with pre-filled question
    await chrome.storage.local.set({
      pendingPrompt: `Tell me about: "${selected}"`,
    });
    chrome.action.openPopup();
  }

  if (info.menuItemId === "nexus-summarize") {
    await chrome.storage.local.set({
      pendingPrompt: `Summarize this page: ${tab?.title || ""} (${tab?.url || ""})`,
    });
    chrome.action.openPopup();
  }

  if (info.menuItemId === "nexus-search" && selected) {
    await chrome.storage.local.set({
      pendingPrompt: `Search all my connected tools for information about: "${selected}"`,
    });
    chrome.action.openPopup();
  }
});

// ── Keyboard shortcut ──────────────────────────────────────────────
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "open-nexus") {
    chrome.action.openPopup();
  }
});

// ── Message listener ───────────────────────────────────────────────
// Receives auth tokens from the Nexus web app after login
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "NEXUS_AUTH_SUCCESS") {
    chrome.storage.local.set({
      user:  message.user,
      token: message.token,
    });

    // Notify all extension views
    chrome.runtime.sendMessage({
      type: "USER_LOGGED_IN",
      user: message.user,
    }).catch(() => {});

    sendResponse({ success: true });
  }

  if (message.type === "GET_AUTH") {
    chrome.storage.local.get(["user", "token"]).then(sendResponse);
    return true; // async response
  }

  return true;
});

// ── Tab monitoring ─────────────────────────────────────────────────
// Update extension badge with connected status
chrome.tabs.onActivated.addListener(async () => {
  const { user } = await chrome.storage.local.get("user");
  chrome.action.setBadgeText({ text: user ? "" : "" });
  chrome.action.setBadgeBackgroundColor({ color: "#2563eb" });
});

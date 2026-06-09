// Nexus AI — Content Script
// Handles text selection toolbar and sidebar injection

(function () {
  "use strict";

  // Avoid injecting twice
  if (window.__nexusInjected) return;
  window.__nexusInjected = true;

  let selectionToolbar = null;
  let lastSelection    = "";

  // ── Selection toolbar ──────────────────────────────────────────
  function createSelectionToolbar() {
    const toolbar = document.createElement("div");
    toolbar.id    = "nexus-selection-toolbar";
    toolbar.innerHTML = `
      <div class="nexus-toolbar-inner">
        <div class="nexus-toolbar-logo">
          <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </div>
        <button class="nexus-tb-btn" data-action="ask" title="Ask Nexus about this">Ask Nexus</button>
        <button class="nexus-tb-btn nexus-tb-icon" data-action="search" title="Search your tools">🔍</button>
        <button class="nexus-tb-btn nexus-tb-icon" data-action="summarize" title="Summarize selection">📄</button>
      </div>
    `;

    toolbar.addEventListener("mousedown", (e) => e.stopPropagation());
    toolbar.addEventListener("click",     handleToolbarClick);
    document.body.appendChild(toolbar);
    return toolbar;
  }

  function handleToolbarClick(e) {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const text   = lastSelection;

    const prompts = {
      ask:       `Tell me about: "${text}"`,
      search:    `Search my connected tools for information about: "${text}"`,
      summarize: `Summarize and explain this text: "${text}"`,
    };

    const prompt = prompts[action];
    if (!prompt) return;

    // Send to background to open popup with pre-filled prompt
    chrome.runtime.sendMessage({ type: "QUICK_ASK", text: prompt });
    hideToolbar();
  }

  function showToolbar(rect) {
    if (!selectionToolbar) selectionToolbar = createSelectionToolbar();

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top  = rect.top  + scrollY - 46;
    let left = rect.left + scrollX + rect.width / 2 - 110;

    // Keep within viewport
    left = Math.max(8, Math.min(left, window.innerWidth - 228));
    if (top < scrollY + 8) top = rect.bottom + scrollY + 8;

    selectionToolbar.style.top     = `${top}px`;
    selectionToolbar.style.left    = `${left}px`;
    selectionToolbar.style.display = "block";
  }

  function hideToolbar() {
    if (selectionToolbar) selectionToolbar.style.display = "none";
  }

  // ── Selection detection ────────────────────────────────────────
  document.addEventListener("mouseup", (e) => {
    // Small delay to let selection settle
    setTimeout(() => {
      const selection = window.getSelection();
      const text      = selection?.toString()?.trim() || "";

      if (text.length >= 10 && text.length <= 2000) {
        lastSelection = text;
        const range = selection.getRangeAt(0);
        const rect  = range.getBoundingClientRect();
        showToolbar(rect);
      } else {
        hideToolbar();
      }
    }, 50);
  });

  document.addEventListener("mousedown", (e) => {
    if (selectionToolbar && !selectionToolbar.contains(e.target)) {
      hideToolbar();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideToolbar();
  });

  // ── Auth callback ──────────────────────────────────────────────
  // Listen for auth messages from the Nexus web app
  window.addEventListener("message", (e) => {
    if (e.origin !== "https://nexusai.com" && !e.origin.includes("localhost")) return;

    if (e.data?.type === "NEXUS_AUTH_SUCCESS") {
      chrome.runtime.sendMessage({
        type:  "NEXUS_AUTH_SUCCESS",
        user:  e.data.user,
        token: e.data.token,
      });
    }
  });

})();

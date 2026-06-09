// ── Constants ─────────────────────────────────────────────────────
const DEFAULT_NEXUS_URL = "https://nexusai.com";

// ── State ──────────────────────────────────────────────────────────
let currentUser    = null;
let conversationHistory = [];
let nexusUrl       = DEFAULT_NEXUS_URL;
let currentScreen  = "auth";

// ── DOM refs ───────────────────────────────────────────────────────
const authScreen     = document.getElementById("auth-screen");
const mainScreen     = document.getElementById("main-screen");
const settingsScreen = document.getElementById("settings-screen");
const messagesEl     = document.getElementById("messages");
const chatInput      = document.getElementById("chat-input");
const sendBtn        = document.getElementById("send-btn");
const signinBtn      = document.getElementById("signin-btn");
const settingsBtn    = document.getElementById("settings-btn");
const backBtn        = document.getElementById("back-btn");
const signoutBtn     = document.getElementById("signout-btn");
const openDashboard  = document.getElementById("open-dashboard");
const accountName    = document.getElementById("account-name");
const accountEmail   = document.getElementById("account-email");
const accountAvatar  = document.getElementById("account-avatar");
const nexusUrlInput  = document.getElementById("nexus-url");
const themeBtns      = document.querySelectorAll(".theme-btn");
const quickActions   = document.querySelectorAll(".quick-action");

// ── Init ───────────────────────────────────────────────────────────
async function init() {
  // Load stored settings
  const stored = await chrome.storage.local.get(["user", "nexusUrl", "theme"]);
  nexusUrl  = stored.nexusUrl || DEFAULT_NEXUS_URL;
  if (nexusUrlInput) nexusUrlInput.value = nexusUrl;

  // Apply theme
  applyTheme(stored.theme || "light");

  // Check auth
  if (stored.user) {
    currentUser = stored.user;
    showScreen("main");
    populateAccountInfo(stored.user);
  } else {
    showScreen("auth");
  }
}

// ── Screen management ──────────────────────────────────────────────
function showScreen(name) {
  currentScreen = name;
  authScreen.classList.toggle("hidden", name !== "auth");
  mainScreen.classList.toggle("hidden", name !== "main");
  settingsScreen.classList.toggle("hidden", name !== "settings");
}

// ── Auth ───────────────────────────────────────────────────────────
signinBtn?.addEventListener("click", () => {
  chrome.tabs.create({ url: `${nexusUrl}/login?extension=true` });
});

signoutBtn?.addEventListener("click", async () => {
  await chrome.storage.local.remove(["user", "token"]);
  currentUser = null;
  conversationHistory = [];
  showScreen("auth");
});

// ── Settings ───────────────────────────────────────────────────────
settingsBtn?.addEventListener("click", () => {
  if (currentUser) populateAccountInfo(currentUser);
  showScreen("settings");
});

backBtn?.addEventListener("click", () => showScreen(currentUser ? "main" : "auth"));

nexusUrlInput?.addEventListener("change", async () => {
  nexusUrl = nexusUrlInput.value.trim() || DEFAULT_NEXUS_URL;
  await chrome.storage.local.set({ nexusUrl });
});

openDashboard?.addEventListener("click", () => {
  chrome.tabs.create({ url: `${nexusUrl}/dashboard` });
});

themeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    themeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const theme = btn.id.replace("theme-", "");
    applyTheme(theme);
    chrome.storage.local.set({ theme });
  });
});

function applyTheme(theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", isDark);
  document.body.classList.toggle("dark", isDark);

  // Update active theme button
  themeBtns.forEach(btn => {
    btn.classList.toggle("active", btn.id === `theme-${theme}`);
  });
}

function populateAccountInfo(user) {
  if (!user) return;
  const name  = user.full_name  || user.email?.split("@")[0] || "User";
  const email = user.email      || "";
  if (accountName)   accountName.textContent   = name;
  if (accountEmail)  accountEmail.textContent  = email;
  if (accountAvatar) accountAvatar.textContent = name[0]?.toUpperCase() || "U";
}

// ── Quick actions ──────────────────────────────────────────────────
quickActions.forEach(btn => {
  btn.addEventListener("click", () => {
    const prompt = btn.dataset.prompt;
    chatInput.value = prompt;
    chatInput.dispatchEvent(new Event("input"));
    chatInput.focus();

    // For prompts that need page context, get it automatically
    if (prompt.includes("this page")) {
      getPageContext().then(context => {
        chatInput.value = `${prompt}\n\nPage: ${context.title}\nURL: ${context.url}`;
        chatInput.dispatchEvent(new Event("input"));
      });
    }
  });
});

// ── Chat ───────────────────────────────────────────────────────────
chatInput?.addEventListener("input", () => {
  chatInput.style.height = "auto";
  chatInput.style.height = Math.min(chatInput.scrollHeight, 80) + "px";
  sendBtn.disabled = !chatInput.value.trim();
});

chatInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    if (!sendBtn.disabled) sendMessage();
  }
});

sendBtn?.addEventListener("click", sendMessage);

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = "";
  chatInput.style.height = "auto";
  sendBtn.disabled = true;

  // Add user message to UI
  appendMessage("user", text);

  // Add to history
  conversationHistory.push({ role: "user", content: text });

  // Show typing indicator
  const typingEl = showTyping();

  try {
    // Get page context for richer answers
    const pageContext = await getPageContext();

    const systemContext = `You are Nexus AI, a workspace assistant. The user is browsing: "${pageContext.title}" at ${pageContext.url}.
${pageContext.selectedText ? `Selected text: "${pageContext.selectedText}"` : ""}
Answer concisely and helpfully. Format with markdown when useful.`;

    const response = await fetch(`${nexusUrl}/api/ai`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        messages: conversationHistory,
        context: {
          pageTitle:    pageContext.title,
          pageUrl:      pageContext.url,
          selectedText: pageContext.selectedText,
          systemNote:   systemContext,
        },
      }),
    });

    typingEl.remove();

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `Request failed (${response.status})`);
    }

    const data = await response.json();
    const content = data.content || "Sorry, I couldn't get a response.";

    conversationHistory.push({ role: "assistant", content });
    appendMessage("assistant", content);

  } catch (error) {
    typingEl.remove();
    appendMessage("assistant", `⚠️ ${error.message || "Could not connect to Nexus AI. Check your connection."}`);
  }
}

function appendMessage(role, content) {
  const msgEl = document.createElement("div");
  msgEl.className = `message ${role}`;

  const avatarEl = document.createElement("div");
  avatarEl.className = "msg-avatar";

  if (role === "assistant") {
    avatarEl.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
      </svg>`;
  } else {
    avatarEl.textContent = currentUser?.full_name?.[0]?.toUpperCase() || "U";
  }

  const bubbleEl = document.createElement("div");
  bubbleEl.className = "msg-bubble";

  // Basic markdown rendering
  bubbleEl.innerHTML = renderMarkdown(content);

  msgEl.appendChild(avatarEl);
  msgEl.appendChild(bubbleEl);
  messagesEl.appendChild(msgEl);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTyping() {
  const el = document.createElement("div");
  el.className = "message assistant";
  el.innerHTML = `
    <div class="msg-avatar">
      <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="msg-bubble" style="padding: 10px 14px;">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>`;
  messagesEl.appendChild(el);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return el;
}

// ── Page context ───────────────────────────────────────────────────
async function getPageContext() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return { title: "", url: "", selectedText: "" };

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func:   () => ({
        title:        document.title,
        url:          window.location.href,
        selectedText: window.getSelection()?.toString()?.slice(0, 500) || "",
      }),
    });

    return results?.[0]?.result || { title: tab.title || "", url: tab.url || "", selectedText: "" };
  } catch {
    return { title: "", url: "", selectedText: "" };
  }
}

// ── Simple markdown renderer ───────────────────────────────────────
function renderMarkdown(text) {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code style='background:#f1f5f9;padding:1px 4px;border-radius:3px;font-family:monospace;font-size:11px'>$1</code>")
    .replace(/^• (.*)/gm, "<li>$1</li>")
    .replace(/^- (.*)/gm, "<li>$1</li>")
    .replace(/^\d+\. (.*)/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, "<ul style='padding-left:14px;margin:4px 0'>$1</ul>")
    .replace(/\n\n/g, "</p><p style='margin-top:6px'>")
    .replace(/\n/g, "<br>");
}

// ── Listen for messages from background ───────────────────────────
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "USER_LOGGED_IN" && msg.user) {
    currentUser = msg.user;
    chrome.storage.local.set({ user: msg.user });
    populateAccountInfo(msg.user);
    showScreen("main");
  }
  if (msg.type === "QUICK_ASK" && msg.text) {
    chatInput.value = msg.text;
    chatInput.dispatchEvent(new Event("input"));
    showScreen("main");
    sendMessage();
  }
});

// ── Start ──────────────────────────────────────────────────────────
init();

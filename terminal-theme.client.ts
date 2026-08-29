const STYLE_ELEMENT_ID = "paseo-terminal-256-styles";

const ANSI_COLORS = [
  "#000000", "#800000", "#008000", "#808000",
  "#000080", "#800080", "#008080", "#c0c0c0",
  "#808080", "#ff0000", "#00ff00", "#ffff00",
  "#0000ff", "#ff00ff", "#00ffff", "#ffffff"
] as const;

const COLOR_CUBE_LEVELS = [0, 95, 135, 175, 215, 255] as const;

function hex(value: number): string {
  return value.toString(16).padStart(2, "0");
}

function xtermColor(index: number): string {
  if (index < ANSI_COLORS.length) {
    return ANSI_COLORS[index];
  }

  if (index < 232) {
    const offset = index - 16;
    const red = COLOR_CUBE_LEVELS[Math.floor(offset / 36)];
    const green = COLOR_CUBE_LEVELS[Math.floor(offset / 6) % 6];
    const blue = COLOR_CUBE_LEVELS[offset % 6];
    return `#${hex(red)}${hex(green)}${hex(blue)}`;
  }

  const gray = 8 + (index - 232) * 10;
  return `#${hex(gray)}${hex(gray)}${hex(gray)}`;
}

const paletteProperties = Array.from(
  { length: 256 },
  (_, index) => `--terminal-color-${index}:${xtermColor(index)};`
).join("");

const TERMINAL_STYLES = `
:root.pluginDark {
  ${paletteProperties}
  --terminal-cell-font-size: 16px;
  --terminal-cell-line-height: 22px;
  --terminal-code-font-size: 16px;
  --terminal-code-line-height: 22px;
  --terminal-chat-content-width: 820px;
  --terminal-composer-input-surface: #0c0c0c;
  --terminal-composer-toolbar-surface: #141414;
  --terminal-user-message-surface: #484848;
  --terminal-bottom-panel-height: 36px;
  --terminal-bottom-panel-padding: 2px;
  --terminal-sidebar-surface: #080808;
  --terminal-sidebar-rail-surface: #0d0d0d;
  --terminal-sidebar-hover-surface: #181818;
  --terminal-working-row-surface: #06111b;
  --terminal-complete-row-surface: #0a1a11;
  --terminal-font-stack: ui-monospace, "Cascadia Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

:root.pluginDark,
:root.pluginDark body,
:root.pluginDark #root,
:root.pluginDark body * {
  border: none !important;
  border-radius: 0 !important;
  font-family: var(--terminal-font-stack) !important;
}

:root.pluginDark body *::before,
:root.pluginDark body *::after {
  border: none !important;
}

:root.pluginDark body * {
  font-size: var(--terminal-cell-font-size) !important;
  line-height: var(--terminal-cell-line-height) !important;
  letter-spacing: 0 !important;
  font-variant-ligatures: none !important;
  box-shadow: none !important;
  text-shadow: none !important;
}

:root.pluginDark #root code,
:root.pluginDark #root pre,
:root.pluginDark #root code *,
:root.pluginDark #root pre * {
  font-size: var(--terminal-code-font-size) !important;
  line-height: var(--terminal-code-line-height) !important;
}

:root.pluginDark #root div:has(> div > div > [data-testid="message-input-root"]) {
  padding-right: 0 !important;
  padding-bottom: 0 !important;
  padding-left: 0 !important;
}

:root.pluginDark #root [data-testid="message-input-root"] > div:first-of-type {
  background-color: var(--terminal-composer-input-surface) !important;
  border: none !important;
}

:root.pluginDark #root [data-testid="message-input-root"] > div:first-of-type > div:last-of-type {
  background-color: var(--terminal-composer-toolbar-surface) !important;
  margin-right: -12px !important;
  margin-bottom: -8px !important;
  margin-left: -12px !important;
  padding-right: 6px !important;
  padding-top: 3px !important;
  padding-bottom: 5px !important;
  padding-left: 6px !important;
}

@keyframes terminal-status-pulse {
  0%, 100% {
    transform: scale(0.75);
    opacity: 0.45;
  }

  45% {
    transform: scale(1.5);
    opacity: 1;
  }
}

:root.pluginDark #root :is(
  [data-testid="workspace-status-indicator-running"],
  [data-testid="workspace-status-indicator-loading"]
) > div > div:last-child,
:root.pluginDark #root [data-testid="project-status-badge"] > div > div:last-child {
  animation: terminal-status-pulse 1.8s ease-in-out infinite !important;
  transform-origin: center !important;
}

:root.pluginDark #root [data-testid^="sidebar-workspace-row-"]:is(
  :has([data-testid="workspace-status-indicator-running"]),
  :has([data-testid="workspace-status-indicator-loading"]),
  :has([data-testid="project-status-badge"] > div > div:last-child)
) {
  background-color: var(--terminal-working-row-surface) !important;
}

:root.pluginDark #root [data-testid="sidebar-status-group-rows-attention"] [data-testid^="sidebar-workspace-row-"],
:root.pluginDark #root [data-testid^="sidebar-workspace-row-"]:has([data-testid="workspace-status-indicator-attention"]),
:root.pluginDark #root [data-testid^="sidebar-workspace-row-"]:has([data-testid="project-status-badge"][aria-label="Ready to review"]) {
  background-color: var(--terminal-complete-row-surface) !important;
}

@media (prefers-reduced-motion: reduce) {
  :root.pluginDark #root :is(
    [data-testid="workspace-status-indicator-running"],
    [data-testid="workspace-status-indicator-loading"]
  ) > div > div:last-child,
  :root.pluginDark #root [data-testid="project-status-badge"] > div > div:last-child {
    animation: none !important;
    opacity: 1 !important;
  }

}

:root.pluginDark #root :is(
  [data-testid="sidebar-project-workspace-list-scroll"],
  [data-testid="sidebar-status-list-scroll"]
) {
  background-color: var(--terminal-sidebar-surface) !important;
}

:root.pluginDark #root div:has(> div > [data-testid="sidebar-global-new-workspace"]) {
  background-color: var(--terminal-sidebar-rail-surface) !important;
}

:root.pluginDark #root div:has(> [data-testid="sidebar-add-project"]) {
  background-color: var(--terminal-composer-toolbar-surface) !important;
  box-sizing: border-box !important;
  height: var(--terminal-bottom-panel-height) !important;
  min-height: var(--terminal-bottom-panel-height) !important;
  max-height: var(--terminal-bottom-panel-height) !important;
  padding-top: var(--terminal-bottom-panel-padding) !important;
  padding-bottom: var(--terminal-bottom-panel-padding) !important;
}

:root.pluginDark #root :is(
  [data-testid="sidebar-global-new-workspace"],
  [data-testid="sidebar-sessions"],
  [data-testid="sidebar-schedules"],
  [data-testid="sidebar-add-project"],
  [data-testid^="sidebar-workspace-row-"]
):hover {
  background-color: var(--terminal-sidebar-hover-surface) !important;
}

:root.pluginDark #root :is(
  [data-testid="sidebar-project-workspace-list-scroll"],
  [data-testid="sidebar-status-list-scroll"]
) > div:first-child {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

:root.pluginDark #root [data-testid^="sidebar-workspace-row-"] {
  padding-right: 20px !important;
  padding-left: 16px !important;
}

:root.pluginDark #root [data-testid="sidebar-workspace-trailing-scrim"] {
  background: transparent !important;
}

:root.pluginDark #root [data-testid="sidebar-pinned-section-header"],
:root.pluginDark #root [data-testid^="sidebar-status-group-"]:not([data-testid^="sidebar-status-group-rows-"]):not([data-testid^="sidebar-status-group-show-more-"]) {
  padding-right: 16px !important;
  padding-left: 16px !important;
}

:root.pluginDark #root :is(
  [data-testid="sidebar-project-workspace-list-scroll"],
  [data-testid="sidebar-status-list-scroll"]
) > div:first-child > div:has([data-testid="sidebar-command-center-search"]) {
  padding-right: 12px !important;
  padding-left: 16px !important;
}

:root.pluginDark body :is(
  [data-testid="settings-back-to-workspace"],
  [data-testid="project-settings-back-button"],
  [data-testid="project-settings-back-link"],
  [data-testid="add-project-flow-back"]
):hover {
  background-color: var(--terminal-composer-toolbar-surface) !important;
}

:root.pluginDark #root [data-testid="workspace-tabs-scroll"] > div:first-child {
  height: 100% !important;
  padding-right: 0 !important;
  padding-left: 0 !important;
  align-items: stretch !important;
}

:root.pluginDark #root [data-testid="workspace-tabs-row"] {
  background-color: var(--terminal-sidebar-surface) !important;
}

:root.pluginDark #root [data-testid="workspace-tabs-scroll"],
:root.pluginDark #root [data-testid="workspace-tabs-scroll"] div:has(> [data-testid^="workspace-tab-"]),
:root.pluginDark #root [data-testid="workspace-tabs-scroll"] div:has(> div > [data-testid^="workspace-tab-"]) {
  height: 100% !important;
}

:root.pluginDark #root [data-testid="workspace-tabs-scroll"] div:has(> div > [data-testid^="workspace-tab-"]) {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

:root.pluginDark #root [data-testid="workspace-tabs-scroll"] [data-testid^="workspace-tab-"] {
  height: 100% !important;
}

:root.pluginDark #root [data-testid="agent-chat-scroll"] [data-paseo-markdown-tag="pre"] {
  border: none !important;
}

:root.pluginDark #root [data-testid="sidebar-global-new-workspace"] {
  box-sizing: border-box !important;
  height: 32px !important;
  min-height: 32px !important;
  max-height: 32px !important;
}

:root.pluginDark #root div:has(> [data-testid="changes-primary-cta"]),
:root.pluginDark #root div:has(> div > [data-testid="changes-primary-cta"]),
:root.pluginDark #root div:has(> div > div > [data-testid="changes-primary-cta"]),
:root.pluginDark #root div:has(> div > div > div > [data-testid="changes-primary-cta"]) {
  height: 100% !important;
  align-self: stretch !important;
}

:root.pluginDark #root [data-testid="changes-primary-cta"],
:root.pluginDark #root [data-testid="changes-primary-cta-caret"] {
  height: 100% !important;
}

:root.pluginDark #root [data-testid="agent-chat-scroll"] [data-history-row-id]:has([data-testid="user-message"]) {
  width: calc(100% + 24px) !important;
  margin-right: -12px !important;
  margin-left: -12px !important;
}

:root.pluginDark #root [data-testid="agent-chat-scroll"] [data-history-row-id] > div:first-child {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

:root.pluginDark #root [data-testid="agent-chat-scroll"] [data-history-row-id]:has([data-testid="user-message"]) > div:first-child {
  max-width: none !important;
}

:root.pluginDark #root [data-testid="user-message"] > div:first-child {
  width: 100% !important;
  max-width: calc(var(--terminal-chat-content-width) + 32px) !important;
  margin-right: auto !important;
  margin-left: auto !important;
}

:root.pluginDark #root [data-testid="user-message"] > div:first-child > div:first-child {
  position: relative !important;
  isolation: isolate;
  width: 100% !important;
  background-color: var(--terminal-user-message-surface) !important;
}

:root.pluginDark #root [data-testid="user-message"] > div:first-child > div:first-child::before {
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  background-color: inherit;
  content: "";
  pointer-events: none;
}

:root.pluginDark #root [data-testid="user-message-trailing-row"] {
  margin-right: 12px !important;
}

@media (min-width: 720px) {
  :root.pluginDark {
    --terminal-bottom-panel-height: 44px;
    --terminal-bottom-panel-padding: 6px;
  }

  :root.pluginDark #root [data-testid="message-input-root"] > div:first-of-type > div:last-of-type {
    margin-right: -16px !important;
    margin-bottom: -16px !important;
    margin-left: -16px !important;
    padding-right: 10px !important;
    padding-top: 6px !important;
    padding-bottom: 10px !important;
    padding-left: 10px !important;
  }

  :root.pluginDark #root [data-testid="agent-chat-scroll"] [data-history-row-id]:has([data-testid="user-message"]) {
    width: calc(100% + 32px) !important;
    margin-right: -16px !important;
    margin-left: -16px !important;
  }

  :root.pluginDark #root [data-testid="user-message-trailing-row"] {
    margin-right: 16px !important;
  }
}
`;

function installTerminalStyles(): void {
  if (typeof document === "undefined") {
    console.warn(
      "[paseo-terminal-theme-plugin] DOM styling unavailable; using color tokens only."
    );
    return;
  }

  const existing = document.getElementById(STYLE_ELEMENT_ID);
  const style = existing instanceof HTMLStyleElement
    ? existing
    : document.createElement("style");

  style.id = STYLE_ELEMENT_ID;
  style.textContent = TERMINAL_STYLES;

  if (!style.isConnected) {
    document.head.appendChild(style);
  }
}

installTerminalStyles();

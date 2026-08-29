import type { PluginContext } from "@getpaseo/plugin";
import "./terminal-theme.client";

export default function contribute(plugin: PluginContext) {
  plugin.addTheme({
    id: "terminal-256",
    name: "Terminal 256",
    appearance: "dark",
    colors: {
      background: "#000000",
      foreground: "#d0d0d0",
      raised: "#121212",
      control: "#262626",
      border: "#585858",
      accent: "#00ff00",
      mutedForeground: "#808080",
      ring: "#444444"
    }
  });

  return () => {};
}

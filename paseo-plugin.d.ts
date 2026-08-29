declare module "@getpaseo/plugin" {
  export interface PluginThemeColors {
    background: string;
    foreground: string;
    raised: string;
    control: string;
    border: string;
    accent?: string;
    mutedForeground: string;
    ring: string;
  }

  export interface PluginThemeContribution {
    id: string;
    name: string;
    appearance: "light" | "dark";
    colors: PluginThemeColors;
  }

  export interface PluginContext {
    addTheme(contribution: PluginThemeContribution): void;
  }

  export type PluginCleanup = () => void | Promise<void>;
  export type PluginContribution = (plugin: PluginContext) => PluginCleanup;
}

// import create theme function from the official storybook repository
import { create } from "@storybook/theming/create";
// import the type definitions from the official storybook repository. If the
// API for theme creation changes, this theme extension will automatically
// include the new type definition.
import { ThemeVars } from "@storybook/theming/dist/ts3.9";

const defaultConfig: ThemeVars = {
    // UI
    appBg: "#e6f2f7",
    appContentBg: "white",
    appBorderColor: "lightgrey",
    appBorderRadius: 2,

    // Typography
    fontBase:
        '"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontCode: '"JetBrains Mono", monospace',

    // Toolbar default and active colors
    barTextColor: "#333",

    base: "light",
    brandTitle: "Funda",
    brandUrl: "https://www.funda.nl",
    brandImage:
        "https://assets.fstatic.nl/master_3133/assets/components/logo/fundawonen-logo.svg",
};

const defaultTheme: ThemeVars = create(defaultConfig);

export const themeConfig = {
    theme: defaultTheme,
};

// createTheme function has the Funda theme as a default and allows the user to
// overwrite any config settings they want on a project basis
export const createTheme = (config: Partial<ThemeVars> = {}) => {
    return create({ ...defaultConfig, ...config });
};

import { transparentize, darken, lighten } from "polished";
const PrimaryTheme = "#1546a3";
const PrimaryThemeGrey = "#576574";

const theme = {
    PrimaryColor: PrimaryTheme,
    PrimaryDark: "#222f3e",
    PrimaryGrey: PrimaryThemeGrey,
    PrimaryInputOutline: "#C6CADE",
    PrimaryLight: "#C8D6E5",
    SecondaryWhite: "#FAFAFA",
    PrimaryBorderColor: "#CBD5E4",
    SecondaryBorderColor: "#ECECEC",
    PrimaryRadius: "5px",
    SecondaryRadius: "8px",
    PrimaryRed: "#fb5e9a",
    SecondaryRed: "#FFABAD",
    PrimaryOrange: "#E98B3A",
    PrimaryBlue: "#437DC1",
    PrimaryGreen: "#03C988",
    noLabelUpperCase: true,
    PrimaryFont: "'Nunito', sans-serif",
    SecondaryGrey: "#AAAAAA",

    PrimaryFontSize: "13px",
    PrimaryFontColor: "#262E3D",
    PrimarySpace: 8,

    PrimarySurface: "#F2F4F6",
    SecondarySurface: "#ECEFF8",
    TertiarySurface: "rgba(13, 153, 255, 0.12)",
    PrimaryFade: "#FFF",

    PrimaryBackgroundBlue: "DFEBF6",
    PrimaryBackgroundRed: "F6E4E4",

    PrimaryGreyDark: darken(0.2, PrimaryThemeGrey),
    PrimaryGreyMid: lighten(0.2, PrimaryThemeGrey),
    PrimaryGreyLight: lighten(0.4, PrimaryThemeGrey),

    Elevate: {
        low: `0 1px 3px ${transparentize(0.9, darken(0.2, PrimaryTheme))}`,
        mid: `1px 3px 6px ${transparentize(0.8, darken(0.3, PrimaryTheme))}`,
        high: `1px 6px 15px ${transparentize(0.8, darken(0.3, PrimaryTheme))}`,
        fader: `0px 30px 60px ${transparentize(0.9, darken(0.4, "#576574"))}`,
    },
};
export default theme;

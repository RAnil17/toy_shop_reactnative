export const theme = {
  colors: {
    primary: "#FF6B9D", // Playful pink
    secondary: "#4ECDC4", // Mint green
    accent: "#FFE66D", // Sunny yellow
    success: "#95E1D3", // Soft green
    warning: "#F7DC6F", // Warm yellow
    error: "#F8BBD9", // Soft red
    text: {
      primary: "#2C3E50", // Dark blue-gray
      secondary: "#7F8C8D", // Medium gray
      light: "#BDC3C7", // Light gray
      white: "#FFFFFF",
    },
    background: {
      primary: "#F8F9FA", // Light gray background
      secondary: "#FFFFFF", // White
      card: "#FFFFFF", // White cards
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    border: {
      light: "#E9ECEF",
      medium: "#DEE2E6",
      dark: "#CED4DA",
    },
    shadow: {
      light: "rgba(0, 0, 0, 0.1)",
      medium: "rgba(0, 0, 0, 0.15)",
      dark: "rgba(0, 0, 0, 0.2)",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 50,
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: "800" as const,
      lineHeight: 36,
    },
    h2: {
      fontSize: 24,
      fontWeight: "700" as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600" as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: "400" as const,
      lineHeight: 24,
    },
    bodyBold: {
      fontSize: 16,
      fontWeight: "600" as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: "400" as const,
      lineHeight: 20,
    },
    captionBold: {
      fontSize: 14,
      fontWeight: "600" as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: "400" as const,
      lineHeight: 16,
    },
  },
  shadows: {
    small: {
      shadowColor: "rgba(0, 0, 0, 0.1)",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: "rgba(0, 0, 0, 0.15)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: "rgba(0, 0, 0, 0.2)",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      ease: "ease",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
    },
  },
};



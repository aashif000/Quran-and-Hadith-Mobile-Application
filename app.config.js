export default {
  expo: {
    name: "islamhub",
    slug: "IslamHub",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.islamhub",
      buildNumber: "1.0.0"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.islamhub",
      versionCode: 1
    },
    extra: {
      eas: {
        projectId: "42142635-1044-42b7-9ed6-c5b503c206ed"
      }
    },
    sdkVersion: "51.0.0",
    platforms: [
      "ios",
      "android"
    ]
  }
};

import React from "react";
import { WebView } from "react-native-webview";
import { leafletHTML } from "./config";

export const MapsScreen = () => {
  return <WebView originWhitelist={["*"]} source={{ html: leafletHTML }} />;
};

import React from "react";
import { WebView } from "react-native-webview";
import { leafletHTML } from "./config";

export const MapsScreen: React.FC = () => {
    return (
        <WebView
            originWhitelist={["*"]}
            source={{ html: leafletHTML }}
            style={{ flex: 1 }}
        />
    );
};

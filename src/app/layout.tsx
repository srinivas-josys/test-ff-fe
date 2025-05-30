"use client";

import { useEffect, useState } from "react";
import { featureProvider } from "@josys-src/josys-ff-ui-commons";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const config = {
      url: process.env.NEXT_PUBLIC_UNLEASH_PROXY_URL || "",
      clientKey: process.env.NEXT_PUBLIC_UNLEASH_CLIENT_KEY || "",
      appName: process.env.NEXT_PUBLIC_UNLEASH_APP_NAME || "",
      environment: process.env.NEXT_PUBLIC_UNLEASH_ENVIRONMENT || "development",
      refreshInterval:
        Number(process.env.NEXT_PUBLIC_UNLEASH_REFRESH_INTERVAL) || 10,
    };

    console.log("[FeatureProvider] Initializing with config:", config);

    try {
      featureProvider.init(config);
      featureProvider.on("ready", () => {
        setReady(true);
        console.log("[FeatureProvider] Initialized");
      });
    } catch (err) {
      console.error("[FeatureProvider] Initialization failed", err);
    }
  }, []);

  if (!ready) {
    return (
      <html lang="en">
        <body>
          <p>⏳ Initializing Feature Flags...</p>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

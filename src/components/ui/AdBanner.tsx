"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  className?: string;
  format?: "horizontal" | "vertical" | "square";
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({
  className = "",
  format = "horizontal",
  responsive = true,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  const style: React.CSSProperties = {};
  if (format === "horizontal") {
    style.height = "100px";
  } else if (format === "vertical") {
    style.width = "300px";
    style.height = "600px";
  } else {
    style.width = "300px";
    style.height = "250px";
  }

  return (
    <div className={`ad-container my-6 flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          ...style,
        }}
        data-ad-client="ca-pub-0050898365765606"
        data-ad-slot="auto"
        data-ad-format={responsive ? "auto" : undefined}
        data-full-width-responsive={responsive ? "true" : undefined}
      />
    </div>
  );
}

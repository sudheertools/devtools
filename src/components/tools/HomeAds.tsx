"use client";

import AdBanner from "@/components/ui/AdBanner";

export default function HomeAds() {
  return (
    <>
      {/* Ad after search bar */}
      <AdBanner format="horizontal" />

      {/* Ad between tool cards */}
      <div className="col-span-full">
        <AdBanner format="horizontal" />
      </div>
    </>
  );
}

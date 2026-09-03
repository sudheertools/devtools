import type { Metadata } from "next";
import CronGeneratorPage from "./cron-generator-client";

export const metadata: Metadata = {
  title: "Cron Expression Generator - Free Online Tool",
  description: "Generate and describe cron expressions for task scheduling. Free online cron job generator with presets, human-readable descriptions, and next run times.",
  keywords: "cron expression generator online, free cron expression generator, cron expression generator tool, cron expression generator browser, utility tools, generate cron expression, random cron expression",
  openGraph: {
    title: "Cron Expression Generator - Free Online Tool",
    description: "Generate and describe cron expressions for task scheduling. Free online cron job generator with presets, human-readable descriptions, and next run times.",
    url: "https://sudheertools.github.io/cron-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cron Expression Generator - Free Online Tool",
    description: "Generate and describe cron expressions for task scheduling. Free online cron job generator with presets, human-readable descriptions, and next run times.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/cron-generator",
  },
};

export default function Page() {
  return <CronGeneratorPage />;
}

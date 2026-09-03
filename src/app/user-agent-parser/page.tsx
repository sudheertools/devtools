import type { Metadata } from "next";
import UserAgentParserPage from "./user-agent-parser-client";

export const metadata: Metadata = {
  title: "User Agent Parser - Free Online Tool",
  description: "Parse User Agent strings to extract browser, OS, and device information. Free online user agent parser for developers.",
  keywords: "user agent parser online, free user agent parser, user agent parser tool, user agent parser browser, utility tools",
  openGraph: {
    title: "User Agent Parser - Free Online Tool",
    description: "Parse User Agent strings to extract browser, OS, and device information. Free online user agent parser for developers.",
    url: "https://sudheertools.github.io/user-agent-parser",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "User Agent Parser - Free Online Tool",
    description: "Parse User Agent strings to extract browser, OS, and device information. Free online user agent parser for developers.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/user-agent-parser",
  },
};

export default function Page() {
  return <UserAgentParserPage />;
}

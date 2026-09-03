import type { Metadata } from "next";
import JWTDecoderPage from "./jwt-decoder-client";

export const metadata: Metadata = {
  title: "JWT Decoder - Free Online Tool",
  description: "Decode JSON Web Tokens (JWT) instantly. Free online JWT decoder with header, payload, and signature breakdown. Fast, private, and secure.",
  keywords: "jwt decoder online, free jwt decoder, jwt decoder tool, jwt decoder browser, utility tools, jwt decoder, jwt encode decode",
  openGraph: {
    title: "JWT Decoder - Free Online Tool",
    description: "Decode JSON Web Tokens (JWT) instantly. Free online JWT decoder with header, payload, and signature breakdown. Fast, private, and secure.",
    url: "https://sudheertools.github.io/jwt-decoder",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Decoder - Free Online Tool",
    description: "Decode JSON Web Tokens (JWT) instantly. Free online JWT decoder with header, payload, and signature breakdown. Fast, private, and secure.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/jwt-decoder",
  },
};

export default function Page() {
  return <JWTDecoderPage />;
}

import type { Metadata } from "next";
import TerraformGeneratorPage from "./terraform-generator-client";

export const metadata: Metadata = {
  title: "Terraform Generator - Free Online Tool",
  description: "Generate Terraform configuration for AWS, GCP, and Azure resources. Free, fast, and private. All processing happens in your browser.",
  keywords: "terraform generator, free terraform generator, terraform generator online, devops tools, developer tools",
  openGraph: {
    title: "Terraform Generator - Free Online Tool",
    description: "Generate Terraform configuration for AWS, GCP, and Azure resources. Free, fast, and private. All processing happens in your browser.",
    url: "https://sudheertools.github.io/terraform-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terraform Generator - Free Online Tool",
    description: "Generate Terraform configuration for AWS, GCP, and Azure resources. Free, fast, and private. All processing happens in your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/terraform-generator",
  },
};

export default function Page() {
  return <TerraformGeneratorPage />;
}

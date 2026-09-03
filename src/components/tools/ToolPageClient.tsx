"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import Toast from "@/components/ui/Toast";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ToolInfoSection {
  title: string;
  content: string | React.ReactNode;
}

interface ToolPageClientProps {
  toolSlug: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  infoSections?: ToolInfoSection[];
  children: React.ReactNode;
}

export default function ToolPageClient({
  toolSlug,
  title,
  description,
  breadcrumbs,
  infoSections,
  children,
}: ToolPageClientProps) {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const defaultBreadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/" },
    { label: title },
  ];

  return (
    <>
      <ToolLayout
        title={title}
        description={description}
        breadcrumbs={breadcrumbs || defaultBreadcrumbs}
      >
        {children}
        <RelatedTools currentSlug={toolSlug} />
        {infoSections && <ToolInfo sections={infoSections} />}
      </ToolLayout>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

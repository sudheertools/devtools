"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { copyToClipboard } from "@/lib/utils";

type Runtime = "node" | "python" | "go" | "rust" | "java" | "nginx" | "custom";

const runtimeOptions: { value: Runtime; label: string }[] = [
  { value: "node", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "java", label: "Java" },
  { value: "nginx", label: "Nginx" },
  { value: "custom", label: "Custom" },
];

const runtimeConfigs: Record<Runtime, { base: string; steps: string[] }> = {
  node: {
    base: "node:20-alpine",
    steps: [
      "WORKDIR /app",
      "COPY package*.json ./",
      "RUN npm ci --only=production",
      "COPY . .",
      "RUN npm run build",
      "EXPOSE 3000",
      "CMD [\"npm\", \"start\"]",
    ],
  },
  python: {
    base: "python:3.12-slim",
    steps: [
      "WORKDIR /app",
      "COPY requirements.txt .",
      "RUN pip install --no-cache-dir -r requirements.txt",
      "COPY . .",
      "EXPOSE 8000",
      'CMD ["python", "app.py"]',
    ],
  },
  go: {
    base: "golang:1.22-alpine AS builder",
    steps: [
      "WORKDIR /app",
      "COPY go.mod go.sum ./",
      "RUN go mod download",
      "COPY . .",
      "RUN CGO_ENABLED=0 GOOS=linux go build -o main .",
      "",
      "FROM alpine:latest",
      "RUN apk --no-cache add ca-certificates",
      "WORKDIR /root/",
      "COPY --from=builder /app/main .",
      'CMD ["./main"]',
    ],
  },
  rust: {
    base: "rust:1.77-slim AS builder",
    steps: [
      "WORKDIR /app",
      "COPY Cargo.toml Cargo.lock ./",
      "RUN mkdir src && echo 'fn main() {}' > src/main.rs && cargo build --release && rm -rf src",
      "COPY src ./src",
      "RUN cargo build --release",
      "",
      "FROM debian:bookworm-slim",
      "RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*",
      "COPY --from=builder /app/target/release/myapp /usr/local/bin/",
      'CMD ["myapp"]',
    ],
  },
  java: {
    base: "eclipse-temurin:21-jdk AS builder",
    steps: [
      "WORKDIR /app",
      "COPY . .",
      "./gradlew build",
      "",
      "FROM eclipse-temurin:21-jre",
      "COPY --from=builder /app/build/libs/*.jar /app/app.jar",
      'ENTRYPOINT ["java", "-jar", "/app/app.jar"]',
    ],
  },
  nginx: {
    base: "nginx:alpine",
    steps: [
      "COPY dist/ /usr/share/nginx/html/",
      "COPY nginx.conf /etc/nginx/conf.d/default.conf",
      "EXPOSE 80",
      'CMD ["nginx", "-g", "daemon off;"]',
    ],
  },
  custom: {
    base: "ubuntu:22.04",
    steps: [
      "WORKDIR /app",
      "COPY . .",
      "RUN apt-get update && apt-get install -y curl",
      "EXPOSE 8080",
      'CMD ["./start.sh"]',
    ],
  },
};

export default function DockerfileGeneratorPage() {
  const [runtime, setRuntime] = useState<Runtime>("node");
  const [output, setOutput] = useState("");
  const [multiStage, setMultiStage] = useState(true);
  const [asRoot, setAsRoot] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleGenerate() {
    const config = runtimeConfigs[runtime];
    const lines: string[] = [];
    const runtimeLabel = runtimeOptions.find(function (o) { return o.value === runtime; })?.label || runtime;
    lines.push("# Dockerfile for " + runtimeLabel);
    lines.push(`FROM ${config.base}`);
    const steps = config.steps.filter((s, i) => {
      if (!multiStage && s.startsWith("FROM ")) return false;
      return true;
    });
    steps.forEach((step) => {
      if (step === "") { lines.push(""); return; }
      if (!asRoot && step.startsWith("RUN ")) {
        lines.push(`RUN addgroup -S appgroup && adduser -S appuser -G appgroup`);
        lines.push(`USER appuser`);
        lines.push(step);
        return;
      }
      lines.push(step);
    });
    setOutput(lines.join("\n"));
  }

  async function handleCopy() {
    try { await copyToClipboard(output); setToast({ message: "Copied!", type: "success" }); }
    catch { setToast({ message: "Failed to copy", type: "error" }); }
  }

  const infoSections = [
    { title: "What is a Dockerfile Generator?", content: "Generates optimized Dockerfiles for various runtimes. Choose your stack and get a production-ready Dockerfile with best practices." },
    { title: "Best Practices", content: (<ul className="list-disc space-y-1 pl-5"><li>Multi-stage builds for smaller images</li><li>Non-root user for security</li><li>Layer caching optimization</li><li>Alpine-based images when possible</li></ul>) },
  ];

  return (
    <>
      <ToolLayout
        title="Dockerfile Generator"
        description="Generate optimized Dockerfiles for Node.js, Python, Go, Rust, Java, and Nginx with best practices."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/" }, { label: "Dockerfile Generator" }]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Runtime</label>
              <div className="grid grid-cols-4 gap-2">
                {runtimeOptions.map((opt) => (
                  <button key={opt.value} onClick={() => setRuntime(opt.value)} className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${runtime === opt.value ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input type="checkbox" checked={multiStage} onChange={(e) => setMultiStage(e.target.checked)} className="rounded" />
                Multi-stage build
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input type="checkbox" checked={asRoot} onChange={(e) => setAsRoot(e.target.checked)} className="rounded" />
                Run as root
              </label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleGenerate}>Generate</Button>
              {output && <Button variant="ghost" onClick={handleCopy}>Copy</Button>}
            </div>
            {output && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Dockerfile</label>
                <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-gray-700"><code className="text-gray-900 dark:text-gray-100">{output}</code></pre>
              </div>
            )}
          </div>
        </div>
        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="dockerfile-generator" />
      </ToolLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

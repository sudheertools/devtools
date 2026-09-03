"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { copyToClipboard } from "@/lib/utils";

type ChartType = "deployment" | "service" | "configmap" | "ingress";

const chartTypes: { value: ChartType; label: string }[] = [
  { value: "deployment", label: "Deployment" },
  { value: "service", label: "Service" },
  { value: "configmap", label: "ConfigMap" },
  { value: "ingress", label: "Ingress" },
];

const templates: Record<ChartType, string> = {
  deployment: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-app
  labels:
    app: {{ .Release.Name }}
spec:
  replicas: {{ .Values.replicaCount | default 1 }}
  selector:
    matchLabels:
      app: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}
    spec:
      containers:
        - name: {{ .Release.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default "latest" }}"
          ports:
            - containerPort: {{ .Values.service.targetPort | default 80 }}
          resources:
            limits:
              cpu: {{ .Values.resources.limits.cpu | default "500m" }}
              memory: {{ .Values.resources.limits.memory | default "128Mi" }}
            requests:
              cpu: {{ .Values.resources.requests.cpu | default "100m" }}
              memory: {{ .Values.resources.requests.memory | default "64Mi" }}`,
  service: `apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-svc
  labels:
    app: {{ .Release.Name }}
spec:
  type: {{ .Values.service.type | default "ClusterIP" }}
  ports:
    - port: {{ .Values.service.port | default 80 }}
      targetPort: {{ .Values.service.targetPort | default 80 }}
      protocol: TCP
  selector:
    app: {{ .Release.Name }}`,
  configmap: `apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-config
  labels:
    app: {{ .Release.Name }}
data:
  {{- range $key, $value := .Values.config }}
  {{ $key }}: {{ $value | quote }}
  {{- end }}`,
  ingress: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ .Release.Name }}-ingress
  labels:
    app: {{ .Release.Name }}
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: {{ .Values.ingress.host | default "example.com" }}
      http:
        paths:
          - path: {{ .Values.ingress.path | default "/" }}
            pathType: Prefix
            backend:
              service:
                name: {{ .Release.Name }}-svc
                port:
                  number: {{ .Values.service.port | default 80 }}`,
};

const valuesYaml = `# Default values for Helm chart
replicaCount: 1

image:
  repository: nginx
  tag: "latest"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
  targetPort: 80

resources:
  limits:
    cpu: 500m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 64Mi

config: {}
  # APP_ENV: production
  # LOG_LEVEL: info

ingress:
  host: example.com
  path: /`;

export default function HelmChartGeneratorPage() {
  const [activeType, setActiveType] = useState<ChartType>("deployment");
  const [output, setOutput] = useState("");
  const [showValues, setShowValues] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleGenerate() {
    setOutput(templates[activeType]);
  }

  async function handleCopy() {
    try { await copyToClipboard(output); setToast({ message: "Copied!", type: "success" }); }
    catch { setToast({ message: "Failed to copy", type: "error" }); }
  }

  const infoSections = [
    { title: "What is a Helm Chart Generator?", content: "Generates Kubernetes Helm chart templates (Deployment, Service, ConfigMap, Ingress) with Go template syntax and configurable values." },
    { title: "How to use", content: "Select a resource type, click Generate, and copy the template into your Helm chart's templates/ directory. Use the values.yaml as a starting point." },
  ];

  return (
    <>
      <ToolLayout
        title="Helm Chart Generator"
        description="Generate Kubernetes Helm chart templates for Deployments, Services, ConfigMaps, and Ingress resources."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/" }, { label: "Helm Chart Generator" }]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Resource Type</label>
              <div className="flex gap-2">
                {chartTypes.map((opt) => (
                  <button key={opt.value} onClick={() => { setActiveType(opt.value); setOutput(""); }} className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${activeType === opt.value ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleGenerate}>Generate</Button>
              {output && <Button variant="ghost" onClick={handleCopy}>Copy</Button>}
              <Button variant="ghost" onClick={() => setShowValues(!showValues)}>
                {showValues ? "Hide" : "Show"} values.yaml
              </Button>
            </div>
            {output && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Template</label>
                <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-gray-700"><code className="text-gray-900 dark:text-gray-100">{output}</code></pre>
              </div>
            )}
            {showValues && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">values.yaml</label>
                <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-gray-700"><code className="text-gray-900 dark:text-gray-100">{valuesYaml}</code></pre>
              </div>
            )}
          </div>
        </div>
        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="helm-chart-generator" />
      </ToolLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

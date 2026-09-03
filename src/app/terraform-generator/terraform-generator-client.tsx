"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { copyToClipboard } from "@/lib/utils";

type Provider = "aws" | "gcp" | "azure";
type ResourceType = "vm" | "s3" | "rds" | "vpc";

const providerOptions: { value: Provider; label: string }[] = [
  { value: "aws", label: "AWS" },
  { value: "gcp", label: "GCP" },
  { value: "azure", label: "Azure" },
];

const resourceOptions: Record<Provider, { value: ResourceType; label: string }[]> = {
  aws: [
    { value: "vm", label: "EC2 Instance" },
    { value: "s3", label: "S3 Bucket" },
    { value: "rds", label: "RDS Database" },
    { value: "vpc", label: "VPC" },
  ],
  gcp: [
    { value: "vm", label: "Compute Engine" },
    { value: "s3", label: "Cloud Storage" },
    { value: "rds", label: "Cloud SQL" },
    { value: "vpc", label: "VPC Network" },
  ],
  azure: [
    { value: "vm", label: "Virtual Machine" },
    { value: "s3", label: "Blob Storage" },
    { value: "rds", label: "Azure SQL" },
    { value: "vpc", label: "Virtual Network" },
  ],
};

const templates: Record<string, string> = {
  "aws-vm": 'resource "aws_instance" "example" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = "t3.micro"\n\n  tags = {\n    Name = "example-instance"\n  }\n}',
  "aws-s3": 'resource "aws_s3_bucket" "example" {\n  bucket = "my-example-bucket"\n\n  tags = {\n    Name = "example-bucket"\n  }\n}\n\nresource "aws_s3_bucket_versioning" "example" {\n  bucket = aws_s3_bucket.example.id\n  versioning_configuration {\n    status = "Enabled"\n  }\n}',
  "aws-rds": 'resource "aws_db_instance" "example" {\n  identifier     = "example-db"\n  engine         = "mysql"\n  engine_version = "8.0"\n  instance_class = "db.t3.micro"\n  allocated_storage = 20\n  db_name  = "mydb"\n  username = "admin"\n  password = var.db_password\n\n  skip_final_snapshot = true\n}',
  "aws-vpc": 'resource "aws_vpc" "example" {\n  cidr_block = "10.0.0.0/16"\n\n  tags = {\n    Name = "example-vpc"\n  }\n}\n\nresource "aws_subnet" "public" {\n  vpc_id     = aws_vpc.example.id\n  cidr_block = "10.0.1.0/24"\n\n  tags = {\n    Name = "public-subnet"\n  }\n}',
  "gcp-vm": 'resource "google_compute_instance" "example" {\n  name         = "example-instance"\n  machine_type = "e2-micro"\n  zone         = "us-central1-a"\n\n  boot_disk {\n    initialize_params {\n      image = "debian-cloud/debian-11"\n    }\n  }\n\n  network_interface {\n    network = "default"\n    access_config {}\n  }\n}',
  "gcp-s3": 'resource "google_storage_bucket" "example" {\n  name          = "my-example-bucket"\n  location      = "US"\n  force_destroy = true\n\n  versioning {\n    enabled = true\n  }\n}',
  "gcp-rds": 'resource "google_sql_database_instance" "example" {\n  name             = "example-db"\n  database_version = "MYSQL_8_0"\n  region           = "us-central1"\n\n  settings {\n    tier = "db-f1-micro"\n  }\n}',
  "gcp-vpc": 'resource "google_compute_network" "example" {\n  name                    = "example-network"\n  auto_create_subnetworks = true\n}',
  "azure-vm": 'resource "azurerm_linux_virtual_machine" "example" {\n  name                = "example-vm"\n  resource_group_name = azurerm_resource_group.example.name\n  location            = azurerm_resource_group.example.location\n  size                = "Standard_B1s"\n  admin_username      = "adminuser"\n\n  os_disk {\n    caching              = "ReadWrite"\n    storage_account_type = "Standard_LRS"\n  }\n\n  source_image_reference {\n    publisher = "Canonical"\n    offer     = "UbuntuServer"\n    sku       = "18.04-LTS"\n    version   = "latest"\n  }\n}',
  "azure-s3": 'resource "azurerm_storage_account" "example" {\n  name                     = "examplestorageacc"\n  resource_group_name      = azurerm_resource_group.example.name\n  location                 = azurerm_resource_group.example.location\n  account_tier             = "Standard"\n  account_replication_type = "LRS"\n}',
  "azure-rds": 'resource "azurerm_mssql_server" "example" {\n  name                         = "example-sqlserver"\n  resource_group_name          = azurerm_resource_group.example.name\n  location                     = azurerm_resource_group.example.location\n  version                      = "12.0"\n  administrator_login          = "adminuser"\n  administrator_login_password = var.sql_password\n}',
  "azure-vpc": 'resource "azurerm_virtual_network" "example" {\n  name                = "example-network"\n  address_space       = ["10.0.0.0/16"]\n  location            = azurerm_resource_group.example.location\n  resource_group_name = azurerm_resource_group.example.name\n}',
};

function getClassName(active: boolean): string {
  const base = "rounded-lg border px-3 py-2 text-sm font-medium transition-colors ";
  if (active) {
    return base + "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  }
  return base + "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300";
}

function getProviderLabel(value: Provider): string {
  const found = providerOptions.find(function (p) { return p.value === value; });
  return found ? found.label : value;
}

function getResourceLabel(provider: Provider, value: ResourceType): string {
  const list = resourceOptions[provider];
  const found = list.find(function (r) { return r.value === value; });
  return found ? found.label : value;
}

export default function TerraformGeneratorPage() {
  const [provider, setProvider] = useState<Provider>("aws");
  const [resourceType, setResourceType] = useState<ResourceType>("vm");
  const [output, setOutput] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleGenerate() {
    const key = provider + "-" + resourceType;
    const template = templates[key] || "# Template not available";
    const providerLabel = getProviderLabel(provider);
    const resourceLabel = getResourceLabel(provider, resourceType);
    const header = "# Terraform configuration for " + providerLabel + " " + resourceLabel + "\n\n";
    setOutput(header + template);
  }

  function handleProviderChange(newProvider: Provider) {
    setProvider(newProvider);
    setResourceType(resourceOptions[newProvider][0].value);
  }

  async function handleCopy() {
    try {
      await copyToClipboard(output);
      setToast({ message: "Copied!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  const infoSections = [
    { title: "What is a Terraform Generator?", content: "Generates Terraform HCL configuration for cloud resources on AWS, GCP, and Azure. Start with a template and customize as needed." },
    { title: "Supported Resources", content: (<ul className="list-disc space-y-1 pl-5"><li>VM / Compute instances</li><li>Object storage (S3, GCS, Blob)</li><li>Databases (RDS, Cloud SQL, Azure SQL)</li><li>Virtual networks (VPC, VNet)</li></ul>) },
  ];

  return (
    <>
      <ToolLayout
        title="Terraform Generator"
        description="Generate Terraform HCL configuration for AWS, GCP, and Azure cloud resources."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/" }, { label: "Terraform Generator" }]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Provider</label>
                <div className="flex gap-2">
                  {providerOptions.map(function (opt) {
                    return (
                      <button
                        key={opt.value}
                        onClick={function () { handleProviderChange(opt.value); }}
                        className={getClassName(provider === opt.value)}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Resource Type</label>
                <div className="flex flex-wrap gap-2">
                  {resourceOptions[provider].map(function (opt) {
                    return (
                      <button
                        key={opt.value}
                        onClick={function () { setResourceType(opt.value); }}
                        className={getClassName(resourceType === opt.value)}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleGenerate}>Generate</Button>
              {output && <Button variant="ghost" onClick={handleCopy}>Copy</Button>}
            </div>
            {output && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Terraform Configuration</label>
                <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-gray-700">
                  <code className="text-gray-900 dark:text-gray-100">{output}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="terraform-generator" />
      </ToolLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={function () { setToast(null); }} />}
    </>
  );
}

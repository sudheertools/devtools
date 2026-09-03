"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { copyToClipboard } from "@/lib/utils";

function ipToInt(ip: string): number {
  const parts = ip.split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join(".");
}

function intToBinary(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].map((b) => b.toString(2).padStart(8, "0")).join(".");
}

function getIPClass(ip: string): string {
  const first = parseInt(ip.split(".")[0]);
  if (first >= 1 && first <= 126) return "A";
  if (first >= 128 && first <= 191) return "B";
  if (first >= 192 && first <= 223) return "C";
  if (first >= 224 && first <= 239) return "D (Multicast)";
  return "E (Reserved)";
}

function isPrivate(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts[0] === 10) return true;
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  if (parts[0] === 192 && parts[1] === 168) return true;
  return false;
}

interface SubnetInfo {
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  subnetMaskInt: number;
  wildcardMask: string;
  cidr: number;
  totalHosts: number;
  usableHosts: number;
  firstUsable: string;
  lastUsable: string;
  ipClass: string;
  isPrivate: boolean;
  binaryIP: string;
  binaryMask: string;
}

function calculateSubnet(ip: string, cidr: number): SubnetInfo | null {
  const ipInt = ipToInt(ip);
  if (isNaN(ipInt)) return null;

  const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | ~maskInt) >>> 0;
  const wildcardInt = (~maskInt) >>> 0;

  return {
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    subnetMask: intToIp(maskInt),
    subnetMaskInt: maskInt,
    wildcardMask: intToIp(wildcardInt),
    cidr,
    totalHosts: Math.pow(2, 32 - cidr),
    usableHosts: cidr >= 31 ? (cidr === 32 ? 1 : 0) : Math.pow(2, 32 - cidr) - 2,
    firstUsable: cidr >= 31 ? intToIp(networkInt) : intToIp(networkInt + 1),
    lastUsable: cidr >= 31 ? intToIp(broadcastInt) : intToIp(broadcastInt - 1),
    ipClass: getIPClass(ip),
    isPrivate: isPrivate(ip),
    binaryIP: intToBinary(ipInt),
    binaryMask: intToBinary(maskInt),
  };
}

export default function SubnetCalculatorPage() {
  const [ip, setIp] = useState("");
  const [cidr, setCidr] = useState("24");
  const [result, setResult] = useState<SubnetInfo | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleCalculate() {
    setError("");
    setResult(null);
    const cidrNum = parseInt(cidr);
    if (!ip.trim()) { setError("Please enter an IP address."); return; }
    if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) { setError("CIDR must be between 0 and 32."); return; }
    const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    if (!ipRegex.test(ip)) { setError("Invalid IP address format."); return; }
    const parts = ip.split(".").map(Number);
    if (parts.some((p) => p < 0 || p > 255)) { setError("IP octets must be 0-255."); return; }

    const info = calculateSubnet(ip, cidrNum);
    if (!info) { setError("Could not calculate subnet."); return; }
    setResult(info);
  }

  async function handleCopy(text: string) {
    try { await copyToClipboard(text); setToast({ message: "Copied!", type: "success" }); }
    catch { setToast({ message: "Failed to copy", type: "error" }); }
  }

  const infoSections = [
    { title: "What is a Subnet Calculator?", content: "Calculates network address, broadcast address, usable host range, and other subnet details from an IP address and CIDR prefix." },
    { title: "Common CIDR Ranges", content: (
      <ul className="list-disc space-y-1 pl-5">
        <li>/32 - Single host (255.255.255.255)</li>
        <li>/24 - Class C (255.255.255.0) - 254 hosts</li>
        <li>/16 - Class B (255.255.0.0) - 65,534 hosts</li>
        <li>/8 - Class A (255.0.0.0) - 16M+ hosts</li>
      </ul>
    )},
  ];

  return (
    <>
      <ToolLayout
        title="Subnet Calculator"
        description="Calculate subnet ranges, CIDR notation, network addresses, and IP address information."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/" }, { label: "Subnet Calculator" }]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">IP Address</label>
                <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" placeholder="192.168.1.100" />
              </div>
              <div className="w-24">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">CIDR</label>
                <input type="number" value={cidr} onChange={(e) => setCidr(e.target.value)} min={0} max={32} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" />
              </div>
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <Button onClick={handleCalculate}>Calculate</Button>

            {result && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {[
                    { label: "Network Address", value: result.networkAddress },
                    { label: "Broadcast Address", value: result.broadcastAddress },
                    { label: "Subnet Mask", value: result.subnetMask },
                    { label: "Wildcard Mask", value: result.wildcardMask },
                    { label: "First Usable", value: result.firstUsable },
                    { label: "Last Usable", value: result.lastUsable },
                    { label: "Total Hosts", value: result.totalHosts.toLocaleString() },
                    { label: "Usable Hosts", value: result.usableHosts.toLocaleString() },
                    { label: "IP Class", value: result.ipClass },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
                      <div className="mt-1 flex items-center justify-between font-mono text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.value}
                        <button onClick={() => handleCopy(item.value)} className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400">Copy</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Private IP: {result.isPrivate ? "Yes" : "No"}</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Binary IP</div>
                  <div className="mt-1 font-mono text-xs text-gray-900 dark:text-gray-100">{result.binaryIP}</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Binary Mask</div>
                  <div className="mt-1 font-mono text-xs text-gray-900 dark:text-gray-100">{result.binaryMask}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="subnet-calculator" />
      </ToolLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

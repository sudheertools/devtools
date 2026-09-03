"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { decodeJWT, getJWTExpiry } from "@/lib/tools/jwt";
import { copyToClipboard } from "@/lib/utils";

export default function JWTDecoderPage() {
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [expiry, setExpiry] = useState<{
    isExpired: boolean;
    expiresIn?: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleDecode() {
    setError("");
    setHeader("");
    setPayload("");
    setSignature("");
    setExpiry(null);

    if (!input.trim()) {
      setError("Please enter a JWT token to decode.");
      return;
    }

    const result = decodeJWT(input);

    if (!result.isValid) {
      setError(result.error || "Invalid JWT token");
      return;
    }

    setHeader(JSON.stringify(result.header, null, 2));
    setPayload(JSON.stringify(result.payload, null, 2));
    setSignature(result.signature);
    setExpiry(getJWTExpiry(result.payload));
  }

  function handleClear() {
    setInput("");
    setHeader("");
    setPayload("");
    setSignature("");
    setExpiry(null);
    setError("");
  }

  async function handleCopy(text: string) {
    try {
      await copyToClipboard(text);
      setToast({ message: "Copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  const infoSections = [
    {
      title: "What is a JWT?",
      content:
        "JSON Web Token (JWT) is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. JWTs are commonly used for authentication and authorization in web applications.",
    },
    {
      title: "JWT Structure",
      content:
        "A JWT consists of three parts separated by dots: Header (algorithm and token type), Payload (claims and user data), and Signature (for verification). This tool decodes the header and payload without verifying the signature.",
    },
    {
      title: "Common JWT Claims",
      content: (
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>sub:</strong> Subject (user ID)</li>
          <li><strong>iss:</strong> Issuer (who created the token)</li>
          <li><strong>exp:</strong> Expiration time (Unix timestamp)</li>
          <li><strong>iat:</strong> Issued at (creation time)</li>
          <li><strong>nbf:</strong> Not before (valid from time)</li>
          <li><strong>aud:</strong> Audience (intended recipient)</li>
        </ul>
      ),
    },
    {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Is this tool safe for production tokens?
            </p>
            <p>
              Yes. All decoding happens locally in your browser. No token data
              is sent to any server. However, this tool only decodes — it does
              not verify the signature.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              What if my JWT is expired?
            </p>
            <p>
              The tool will show you when the token expired. An expired token
              is still valid for decoding, but it should not be used for
              authentication.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <ToolLayout
        title="JWT Decoder"
        description="Decode JSON Web Tokens (JWT) instantly. View the header, payload, and signature of any JWT token. Our free online tool shows token expiration status and all claims. All processing happens locally in your browser."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "JWT Decoder" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <TextArea
              label="JWT Token"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JWT token here... (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U)"
              error={error}
            />

            <div className="flex flex-wrap gap-2">
              <Button onClick={handleDecode}>Decode</Button>
              <Button variant="ghost" onClick={handleClear}>
                Clear
              </Button>
            </div>

            {header && (
              <div className="space-y-4">
                {expiry && (
                  <div
                    className={`rounded-lg p-3 text-sm font-medium ${
                      expiry.isExpired
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {expiry.expiresIn}
                  </div>
                )}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Header
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(header)}
                    >
                      Copy
                    </Button>
                  </div>
                  <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-gray-700">
                    <code className="text-gray-900 dark:text-gray-100">
                      {header}
                    </code>
                  </pre>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Payload
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(payload)}
                    >
                      Copy
                    </Button>
                  </div>
                  <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-gray-700">
                    <code className="text-gray-900 dark:text-gray-100">
                      {payload}
                    </code>
                  </pre>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Signature
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(signature)}
                    >
                      Copy
                    </Button>
                  </div>
                  <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-gray-700">
                    <code className="break-all text-gray-900 dark:text-gray-100">
                      {signature}
                    </code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="jwt-decoder" />
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

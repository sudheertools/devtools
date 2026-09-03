"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { copyToClipboard } from "@/lib/utils";

type Model = "gpt-4" | "gpt-4o" | "gpt-3.5-turbo" | "claude-3" | "llama-3" | "custom";

const modelPricing: Record<Model, { inputPer1k: number; outputPer1k: number; tokensPerWord: number }> = {
  "gpt-4": { inputPer1k: 0.03, outputPer1k: 0.06, tokensPerWord: 1.3 },
  "gpt-4o": { inputPer1k: 0.005, outputPer1k: 0.015, tokensPerWord: 1.3 },
  "gpt-3.5-turbo": { inputPer1k: 0.0005, outputPer1k: 0.0015, tokensPerWord: 1.3 },
  "claude-3": { inputPer1k: 0.015, outputPer1k: 0.075, tokensPerWord: 1.3 },
  "llama-3": { inputPer1k: 0.0005, outputPer1k: 0.002, tokensPerWord: 1.3 },
  "custom": { inputPer1k: 0, outputPer1k: 0, tokensPerWord: 1.3 },
};

interface TokenResult {
  characters: number;
  words: number;
  lines: number;
  sentences: number;
  estimatedTokens: number;
  estimatedCost: { input: number; output: number };
}

function countTokens(text: string, model: Model): TokenResult {
  const characters = text.length;
  const words = text.trim() ? text.trim().split(new RegExp("\\s+")).length : 0;
  const lines = text ? text.split("\n").length : 0;
  const sentences = text ? text.split(new RegExp("[.!?]+")).filter(function (s) { return s.trim(); }).length : 0;

  const pricing = modelPricing[model];
  const estimatedTokens = Math.ceil(words * pricing.tokensPerWord);

  return {
    characters,
    words,
    lines,
    sentences,
    estimatedTokens,
    estimatedCost: {
      input: (estimatedTokens / 1000) * pricing.inputPer1k,
      output: (estimatedTokens / 1000) * pricing.outputPer1k,
    },
  };
}

function getModelButtonClass(active: boolean): string {
  var base = "rounded-lg border px-3 py-2 text-sm font-medium transition-colors ";
  if (active) {
    return base + "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  }
  return base + "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300";
}

export default function TokenCounterPage() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<Model>("gpt-4o");
  const [result, setResult] = useState<TokenResult | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleCount() {
    if (!input.trim()) return;
    setResult(countTokens(input, model));
  }

  function handleModelChange(newModel: Model) {
    setModel(newModel);
    if (input.trim()) {
      setResult(countTokens(input, newModel));
    }
  }

  function handleInputChange(value: string) {
    setInput(value);
    if (value.trim()) {
      setResult(countTokens(value, model));
    } else {
      setResult(null);
    }
  }

  async function handleCopy() {
    if (!result) return;
    var text = "Token Count Results\nCharacters: " + result.characters + "\nWords: " + result.words + "\nLines: " + result.lines + "\nSentences: " + result.sentences + "\nEstimated Tokens: " + result.estimatedTokens + "\nModel: " + model;
    try { await copyToClipboard(text); setToast({ message: "Copied!", type: "success" }); }
    catch { setToast({ message: "Failed to copy", type: "error" }); }
  }

  const infoSections = [
    { title: "What is Token Counting?", content: "Tokens are the basic units that language models process. A token is roughly 4 characters or 0.75 words in English. This tool estimates token count based on word count." },
    { title: "Why does it matter?", content: "LLM APIs charge per token. Knowing your token count helps estimate costs and stay within context window limits. Different models have different pricing." },
    { title: "Model Pricing (per 1K tokens)", content: (
      <ul className="list-disc space-y-1 pl-5">
        <li><strong>GPT-4:</strong> $0.03 input / $0.06 output</li>
        <li><strong>GPT-4o:</strong> $0.005 input / $0.015 output</li>
        <li><strong>GPT-3.5 Turbo:</strong> $0.0005 input / $0.0015 output</li>
        <li><strong>Claude 3:</strong> $0.015 input / $0.075 output</li>
        <li><strong>Llama 3:</strong> $0.0005 input / $0.002 output</li>
      </ul>
    )},
  ];

  return (
    <>
      <ToolLayout
        title="Token Counter"
        description="Count tokens, characters, words, and estimate API costs for LLM prompts. Works with GPT-4, Claude, and Llama models."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/" }, { label: "Token Counter" }]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Model</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(modelPricing).map(function (m) {
                  return (
                    <button key={m} onClick={function () { handleModelChange(m as Model); }} className={getModelButtonClass(model === m)}>
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
            <TextArea label="Input Text" value={input} onChange={function (e) { handleInputChange(e.target.value); }} placeholder="Paste your text here to count tokens..." />
            <div className="flex gap-2">
              <Button onClick={handleCount}>Count Tokens</Button>
              {result && <Button variant="ghost" onClick={handleCopy}>Copy Results</Button>}
            </div>

            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Characters", value: result.characters.toLocaleString() },
                    { label: "Words", value: result.words.toLocaleString() },
                    { label: "Lines", value: result.lines.toLocaleString() },
                    { label: "Sentences", value: result.sentences.toLocaleString() },
                  ].map(function (item) {
                    return (
                      <div key={item.label} className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
                        <div className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">{item.value}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-4 dark:from-green-900/20 dark:to-blue-900/20">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Estimated Tokens</div>
                    <div className="mt-1 text-4xl font-bold text-green-700 dark:text-green-300">{result.estimatedTokens.toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Estimated Input Cost</div>
                    <div className="mt-1 font-bold text-gray-900 dark:text-gray-100">${result.estimatedCost.input.toFixed(4)}</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Estimated Output Cost</div>
                    <div className="mt-1 font-bold text-gray-900 dark:text-gray-100">${result.estimatedCost.output.toFixed(4)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="token-counter" />
      </ToolLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={function () { setToast(null); }} />}
    </>
  );
}

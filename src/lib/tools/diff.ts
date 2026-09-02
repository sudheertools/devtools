export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  value: string;
  leftLineNum?: number;
  rightLineNum?: number;
}

function lcsLength(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp;
}

function backtrack(dp: number[][], a: string[], b: string[]): string[] {
  const result: string[] = [];
  let i = a.length;
  let j = b.length;

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  return result;
}

export function computeDiff(text1: string, text2: string): DiffLine[] {
  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");

  const dp = lcsLength(lines1, lines2);
  const lcs = backtrack(dp, lines1, lines2);

  const result: DiffLine[] = [];
  let i = 0;
  let j = 0;
  let leftNum = 1;
  let rightNum = 1;
  let lcsIdx = 0;

  while (i < lines1.length || j < lines2.length) {
    if (lcsIdx < lcs.length && i < lines1.length && lines1[i] === lcs[lcsIdx] && j < lines2.length && lines2[j] === lcs[lcsIdx]) {
      result.push({
        type: "unchanged",
        value: lines1[i],
        leftLineNum: leftNum,
        rightLineNum: rightNum,
      });
      i++;
      j++;
      leftNum++;
      rightNum++;
      lcsIdx++;
    } else if (i < lines1.length && (lcsIdx >= lcs.length || lines1[i] !== lcs[lcsIdx])) {
      result.push({
        type: "removed",
        value: lines1[i],
        leftLineNum: leftNum,
      });
      i++;
      leftNum++;
    } else if (j < lines2.length && (lcsIdx >= lcs.length || lines2[j] !== lcs[lcsIdx])) {
      result.push({
        type: "added",
        value: lines2[j],
        rightLineNum: rightNum,
      });
      j++;
      rightNum++;
    }
  }

  return result;
}

export function getDiffStats(lines: DiffLine[]): {
  added: number;
  removed: number;
  unchanged: number;
} {
  return lines.reduce(
    (acc, line) => {
      if (line.type === "added") acc.added++;
      else if (line.type === "removed") acc.removed++;
      else acc.unchanged++;
      return acc;
    },
    { added: 0, removed: 0, unchanged: 0 }
  );
}

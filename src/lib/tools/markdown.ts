export function htmlToMarkdown(html: string): string {
  const trimmed = html.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter HTML to convert.");
  }

  let markdown = trimmed;

  markdown = markdown.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  markdown = markdown.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  markdown = markdown.replace(/<!--[\s\S]*?-->/g, "");

  markdown = markdown.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n");
  markdown = markdown.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n");
  markdown = markdown.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n");
  markdown = markdown.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n");
  markdown = markdown.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "\n##### $1\n");
  markdown = markdown.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "\n###### $1\n");

  markdown = markdown.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  markdown = markdown.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  markdown = markdown.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*");
  markdown = markdown.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");
  markdown = markdown.replace(/<u[^>]*>([\s\S]*?)<\/u>/gi, "_$1_");
  markdown = markdown.replace(/<s[^>]*>([\s\S]*?)<\/s>/gi, "~~$1~~");
  markdown = markdown.replace(/<del[^>]*>([\s\S]*?)<\/del>/gi, "~~$1~~");
  markdown = markdown.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");

  markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)");

  markdown = markdown.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
    const items = content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
    return "\n" + items + "\n";
  });

  markdown = markdown.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
    let counter = 1;
    return "\n" + content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => {
      return `${counter++}. $1\n`;
    }) + "\n";
  });

  markdown = markdown.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (match, content) => {
    const lines = content.trim().split("\n");
    return "\n" + lines.map((line: string) => `> ${line}`).join("\n") + "\n";
  });

  markdown = markdown.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "\n```\n$1\n```\n");
  markdown = markdown.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, "\n```\n$1\n```\n");

  markdown = markdown.replace(/<hr[^>]*\/?>/gi, "\n---\n");
  markdown = markdown.replace(/<br[^>]*\/?>/gi, "\n");
  markdown = markdown.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n$1\n");

  markdown = markdown.replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, "$1\n");
  markdown = markdown.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, "$1");

  markdown = markdown.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, content) => {
    const rows: string[][] = [];
    const headerMatch = content.match(/<thead[^>]*>([\s\S]*?)<\/thead>/i);
    const bodyMatch = content.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);

    if (headerMatch) {
      const headerRow = headerMatch[1].replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (match: string, cells: string) => {
        return cells.replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi, (match: string, cell: string) => {
          return cell.trim();
        });
      });
      rows.push(headerRow.split(/<t[hd][^>]*>/i).filter(Boolean).map((cell: string) => cell.trim().replace(/<\/t[hd]>/gi, "")));
    }

    const processTableBody = (tbody: string) => {
      tbody.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (match: string, cells: string) => {
        const row = cells.replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi, (match: string, cell: string) => {
          return cell.trim();
        });
        rows.push(row.split(/<t[hd][^>]*>/i).filter(Boolean).map((cell: string) => cell.trim().replace(/<\/t[hd]>/gi, "")));
        return "";
      });
    };

    if (bodyMatch) {
      processTableBody(bodyMatch[1]);
    } else {
      processTableBody(content);
    }

    if (rows.length === 0) return "";

    const maxCols = Math.max(...rows.map((row) => row.length));
    const normalizedRows = rows.map((row) => {
      while (row.length < maxCols) row.push("");
      return row;
    });

    const header = normalizedRows[0];
    const separator = header.map(() => "---");
    const body = normalizedRows.slice(1);

    const table = [header, separator, ...body]
      .map((row) => `| ${row.join(" | ")} |`)
      .join("\n");

    return "\n" + table + "\n";
  });

  markdown = markdown.replace(/<[^>]+>/g, "");

  markdown = markdown.replace(/&amp;/g, "&");
  markdown = markdown.replace(/&lt;/g, "<");
  markdown = markdown.replace(/&gt;/g, ">");
  markdown = markdown.replace(/&quot;/g, '"');
  markdown = markdown.replace(/&#39;/g, "'");
  markdown = markdown.replace(/&nbsp;/g, " ");

  markdown = markdown.replace(/\n{3,}/g, "\n\n");
  markdown = markdown.trim();

  return markdown;
}

export function generateHTMLTag(tag: string, content: string, selfClosing: boolean = false): string {
  const selfClosingTags = [
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
  ];

  if (selfClosingTags.includes(tag.toLowerCase())) {
    return `<${tag} />`;
  }

  return `<${tag}>${content}</${tag}>`;
}

export function generateMetaTag(
  name: string,
  content: string,
  property: boolean = false
): string {
  if (property) {
    return `<meta property="${name}" content="${content}" />`;
  }
  return `<meta name="${name}" content="${content}" />`;
}

export function generateLinkTag(
  rel: string,
  href: string,
  type?: string
): string {
  const typeAttr = type ? ` type="${type}"` : "";
  return `<link rel="${rel}" href="${href}"${typeAttr} />`;
}

export function generateScriptTag(src: string, async: boolean = false): string {
  const asyncAttr = async ? " async" : "";
  return `<script src="${src}"${asyncAttr}></script>`;
}

export function generateStyleTag(css: string): string {
  return `<style>\n${css}\n</style>`;
}

export function generateHTMLBoilerplate(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="container">
    ${content}
  </div>
</body>
</html>`;
}

export function generateFormHTML(
  action: string,
  method: string,
  fields: Array<{ name: string; type: string; label: string }>
): string {
  const fieldsHTML = fields
    .map(
      (field) => `    <div>
      <label for="${field.name}">${field.label}</label>
      <input type="${field.type}" id="${field.name}" name="${field.name}" />
    </div>`
    )
    .join("\n");

  return `<form action="${action}" method="${method}">
${fieldsHTML}
  <button type="submit">Submit</button>
</form>`;
}

export function validateHTML(html: string): {
  valid: boolean;
  errors: string[];
  tags: number;
} {
  const errors: string[] = [];
  const tags = (html.match(/<[^>]+>/g) || []).length;

  // Check for unclosed tags
  const openTags = html.match(/<([a-z]+)[^>]*>/gi) || [];
  const closeTags = html.match(/<\/([a-z]+)>/gi) || [];

  const openTagNames = openTags.map((t) => t.replace(/<([a-z]+).*/i, "$1").toLowerCase());
  const closeTagNames = closeTags.map((t) => t.replace(/<\/([a-z]+)>/i, "$1").toLowerCase());

  const selfClosingTags = [
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
  ];

  for (const tag of openTagNames) {
    if (!selfClosingTags.includes(tag)) {
      const openCount = openTagNames.filter((t) => t === tag).length;
      const closeCount = closeTagNames.filter((t) => t === tag).length;
      if (openCount !== closeCount) {
        errors.push(`Tag <${tag}> appears ${openCount} times but is closed ${closeCount} times.`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    tags,
  };
}

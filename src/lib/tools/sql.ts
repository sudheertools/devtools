export type SQLDialect = "standard" | "mysql" | "postgresql" | "sqlite";

const SQL_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "IN", "IS", "NULL",
  "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE",
  "TABLE", "ALTER", "DROP", "INDEX", "VIEW", "AS", "ON", "JOIN",
  "LEFT", "RIGHT", "INNER", "OUTER", "CROSS", "GROUP", "BY",
  "ORDER", "ASC", "DESC", "HAVING", "LIMIT", "OFFSET", "UNION",
  "ALL", "DISTINCT", "EXISTS", "BETWEEN", "LIKE", "CASE", "WHEN",
  "THEN", "ELSE", "END", "IF", "PRIMARY", "KEY", "FOREIGN", "REFERENCES",
  "CONSTRAINT", "DEFAULT", "AUTO_INCREMENT", "NOT", "EMPTY", "WITH",
  "RECURSIVE", "FETCH", "NEXT", "ROWS", "ONLY", "FIRST", "LAST",
  "TOP", "PERCENT", "TIES", "OVER", "PARTITION", "ROW_NUMBER",
  "RANK", "DENSE_RANK", "LAG", "LEAD", "FIRST_VALUE", "LAST_VALUE",
  "NTH_VALUE", "UNION", "INTERSECT", "EXCEPT", "MINUS",
  "GRANT", "REVOKE", "COMMIT", "ROLLBACK", "BEGIN", "TRANSACTION",
  "SAVEPOINT", "TRIGGER", "FUNCTION", "PROCEDURE", "RETURN",
  "DECLARE", "CURSOR", "OPEN", "CLOSE", "DEALLOCATE", "PREPARE",
  "EXECUTE", "REPLACE", "TRUNCATE", "DATABASE", "SCHEMA", "USE",
  "SHOW", "DESCRIBE", "EXPLAIN", "ANALYZE", "VACUUM", "REINDEX",
  "CLUSTER", "COMMENT", "ENABLE", "DISABLE", "ROW", "ROWS",
  "TEMPORARY", "TEMP", "RECURSIVE", "MATERIALIZED", "REFRESH",
  "CONCURRENTLY", "OPTION", "CASCADE", "RESTRICT", "NO", "ACTION",
  "DEFERRABLE", "INITIALLY", "DEFERRED", "IMMEDIATE", "LOCAL",
  "GLOBAL", "SESSION", "ISOLATION", "LEVEL", "READ", "WRITE",
  "COMMITTED", "UNCOMMITTED", "REPEATABLE", "SERIALIZABLE",
  "SNAPSHOT", "CURRENT", "FOR", "UPDATE", "OF", "WAIT", "NOWAIT",
  "SKIP", "LOCKED", "LOCKED", "SHARE", "MODE", "NO", "KEY",
];

const DIALECT_KEYWORDS: Record<SQLDialect, string[]> = {
  standard: [],
  mysql: ["AUTO_INCREMENT", "ENGINE", "CHARSET", "COLLATE", "IFNULL", "IF", "LIMIT"],
  postgresql: ["RETURNING", "ILIKE", "SIMILAR", "ARRAY", "JSONB", "JSON", "GENERATED", "ALWAYS", "IDENTITY", "SERIAL", "BIGSERIAL", "BOOLEAN"],
  sqlite: ["AUTOINCREMENT", "PRAGMA", "VACUUM", "REINDEX", "AUTOINCREMENT"],
};

export function formatSQL(input: string, dialect: SQLDialect = "standard"): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter SQL to format.");
  }

  const allKeywords = [...SQL_KEYWORDS, ...DIALECT_KEYWORDS[dialect]];
  const majorKeywords = ["SELECT", "FROM", "WHERE", "AND", "OR", "ON", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "CROSS", "GROUP", "ORDER", "HAVING", "LIMIT", "OFFSET", "UNION", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "ALTER", "DROP", "INDEX", "VIEW", "WITH"];

  let formatted = trimmed
    .replace(/\s+/g, " ")
    .trim();

  for (const keyword of allKeywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    formatted = formatted.replace(regex, keyword.toUpperCase());
  }

  for (const keyword of majorKeywords) {
    const regex = new RegExp(`(\\s)${keyword}(\\s)`, "gi");
    formatted = formatted.replace(regex, `$1\n${keyword}$2`);
  }

  formatted = formatted
    .replace(/,/g, ",\n  ")
    .replace(/\(\s*/g, "(\n  ")
    .replace(/\s*\)/g, "\n)")
    .replace(/\n\s*\n/g, "\n")
    .replace(/^\n+/, "")
    .replace(/\n+$/, "\n");

  return formatted.trim();
}

export function minifySQL(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter SQL to minify.");
  }

  return trimmed
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([(),=<>])\s*/g, "$1")
    .trim();
}

export function validateSQL(input: string): {
  valid: boolean;
  errors: string[];
} {
  const trimmed = input.trim();
  const errors: string[] = [];

  if (!trimmed) {
    return { valid: false, errors: ["Input is empty."] };
  }

  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    errors.push(`Mismatched parentheses: ${openParens} opening vs ${closeParens} closing.`);
  }

  const openQuotes = (trimmed.match(/'/g) || []).length;
  if (openQuotes % 2 !== 0) {
    errors.push("Unmatched single quotes.");
  }

  const openBrackets = (trimmed.match(/\[/g) || []).length;
  const closeBrackets = (trimmed.match(/]/g) || []).length;
  if (openBrackets !== closeBrackets) {
    errors.push("Mismatched square brackets.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

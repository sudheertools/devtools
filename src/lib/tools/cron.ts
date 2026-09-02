export function generateCronExpression(
  minute: string,
  hour: string,
  dayOfMonth: string,
  month: string,
  dayOfWeek: string
): string {
  const parts = [minute, hour, dayOfMonth, month, dayOfWeek];
  const valid = parts.every((p) => {
    const trimmed = p.trim();
    return trimmed !== "" && /^[\d\*\/\-\,\*]+$/.test(trimmed);
  });

  if (!valid) {
    throw new Error("Invalid cron expression. Please check your input.");
  }

  return parts.join(" ");
}

export function describeCronExpression(expression: string): string {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    throw new Error("Cron expression must have exactly 5 parts.");
  }

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  const descriptions: string[] = [];

  // Minute
  if (minute === "*") {
    descriptions.push("every minute");
  } else if (minute.includes("/")) {
    const interval = minute.split("/")[1];
    descriptions.push(`every ${interval} minutes`);
  } else {
    descriptions.push(`at minute ${minute}`);
  }

  // Hour
  if (hour === "*") {
    descriptions.push("every hour");
  } else if (hour.includes("/")) {
    const interval = hour.split("/")[1];
    descriptions.push(`every ${interval} hours`);
  } else {
    descriptions.push(`at ${hour}:00`);
  }

  // Day of month
  if (dayOfMonth !== "*") {
    descriptions.push(`on day ${dayOfMonth}`);
  }

  // Month
  if (month !== "*") {
    const monthNames = [
      "", "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    if (month.includes(",")) {
      const months = month.split(",").map((m) => monthNames[parseInt(m)]).filter(Boolean);
      descriptions.push(`in ${months.join(", ")}`);
    } else {
      descriptions.push(`in ${monthNames[parseInt(month)] || month}`);
    }
  }

  // Day of week
  if (dayOfWeek !== "*") {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (dayOfWeek.includes(",")) {
      const days = dayOfWeek.split(",").map((d) => dayNames[parseInt(d)]).filter(Boolean);
      descriptions.push(`on ${days.join(", ")}`);
    } else {
      descriptions.push(`on ${dayNames[parseInt(dayOfWeek)] || dayOfWeek}`);
    }
  }

  return descriptions.join(", ");
}

export function generateNextRuns(expression: string, count: number = 5): Date[] {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    throw new Error("Cron expression must have exactly 5 parts.");
  }

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  const runs: Date[] = [];
  const now = new Date();
  let current = new Date(now);

  for (let i = 0; i < count && runs.length < count; i++) {
    current.setMinutes(current.getMinutes() + 1);
    current.setSeconds(0);
    current.setMilliseconds(0);

    if (matchCronField(minute, current.getMinutes()) &&
        matchCronField(hour, current.getHours()) &&
        matchCronField(dayOfMonth, current.getDate()) &&
        matchCronField(month, current.getMonth() + 1) &&
        matchCronField(dayOfWeek, current.getDay())) {
      runs.push(new Date(current));
    }
  }

  return runs;
}

function matchCronField(field: string, value: number): boolean {
  if (field === "*") return true;

  if (field.includes(",")) {
    return field.split(",").some((f) => matchCronField(f.trim(), value));
  }

  if (field.includes("-")) {
    const [start, end] = field.split("-").map(Number);
    return value >= start && value <= end;
  }

  if (field.includes("/")) {
    const [, interval] = field.split("/");
    return value % parseInt(interval) === 0;
  }

  return parseInt(field) === value;
}

export const cronPresets: Array<{ name: string; expression: string }> = [
  { name: "Every minute", expression: "* * * * *" },
  { name: "Every hour", expression: "0 * * * *" },
  { name: "Every day at midnight", expression: "0 0 * * *" },
  { name: "Every day at noon", expression: "0 12 * * *" },
  { name: "Every Monday", expression: "0 0 * * 1" },
  { name: "Every Friday", expression: "0 0 * * 5" },
  { name: "First of every month", expression: "0 0 1 * *" },
  { name: "Every 15 minutes", expression: "*/15 * * * *" },
  { name: "Every 6 hours", expression: "0 */6 * * *" },
  { name: "Weekdays only", expression: "0 9 * * 1-5" },
];

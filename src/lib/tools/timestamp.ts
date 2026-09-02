export function timestampToDate(timestamp: string): {
  date: string;
  iso: string;
  utc: string;
  relative: string;
} {
  const trimmed = timestamp.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter a timestamp.");
  }

  let ts = parseInt(trimmed, 10);
  if (isNaN(ts)) {
    throw new Error("Invalid timestamp. Please enter a valid Unix timestamp.");
  }

  // Auto-detect seconds vs milliseconds
  if (ts > 9999999999) {
    // Milliseconds
    ts = ts;
  } else {
    // Seconds
    ts = ts * 1000;
  }

  const date = new Date(ts);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid timestamp. Please enter a valid Unix timestamp.");
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  let relative = "";
  if (diffMs < 0) {
    relative = `in ${Math.abs(diffDay)} days`;
  } else if (diffSec < 60) {
    relative = "just now";
  } else if (diffMin < 60) {
    relative = `${diffMin} minutes ago`;
  } else if (diffHour < 24) {
    relative = `${diffHour} hours ago`;
  } else if (diffDay < 30) {
    relative = `${diffDay} days ago`;
  } else if (diffDay < 365) {
    relative = `${Math.floor(diffDay / 30)} months ago`;
  } else {
    relative = `${Math.floor(diffDay / 365)} years ago`;
  }

  return {
    date: date.toLocaleString(),
    iso: date.toISOString(),
    utc: date.toUTCString(),
    relative,
  };
}

export function dateToTimestamp(dateStr: string): {
  seconds: number;
  milliseconds: number;
} {
  const trimmed = dateStr.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter a date.");
  }

  const date = new Date(trimmed);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date. Please enter a valid date string.");
  }

  return {
    seconds: Math.floor(date.getTime() / 1000),
    milliseconds: date.getTime(),
  };
}

export function getCurrentTimestamp(): {
  seconds: number;
  milliseconds: number;
} {
  const now = new Date();
  return {
    seconds: Math.floor(now.getTime() / 1000),
    milliseconds: now.getTime(),
  };
}

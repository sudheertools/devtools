export interface UserAgentInfo {
  browser: {
    name: string;
    version: string;
  };
  os: {
    name: string;
    version: string;
  };
  device: {
    type: string;
    vendor: string;
    model: string;
  };
  engine: {
    name: string;
    version: string;
  };
}

const BROWSER_REGEX: Array<{ regex: RegExp; name: string }> = [
  { regex: /Edg\/(\d+)/, name: "Edge" },
  { regex: /OPR\/(\d+)/, name: "Opera" },
  { regex: /Chrome\/(\d+)/, name: "Chrome" },
  { regex: /Safari\/(\d+)/, name: "Safari" },
  { regex: /Firefox\/(\d+)/, name: "Firefox" },
  { regex: /MSIE (\d+\.\d+)/, name: "IE" },
  { regex: /Trident\/.*rv:(\d+\.\d+)/, name: "IE" },
  { regex: /Brave\/(\d+)/, name: "Brave" },
  { regex: /Vivaldi\/(\d+)/, name: "Vivaldi" },
  { regex: /SamsungBrowser\/(\d+)/, name: "Samsung Browser" },
  { regex: /UCBrowser\/(\d+)/, name: "UC Browser" },
  { regex: /Opera\/(\d+)/, name: "Opera" },
];

const OS_REGEX: Array<{ regex: RegExp; name: string }> = [
  { regex: /Windows NT 10\.0/, name: "Windows 10" },
  { regex: /Windows NT 6\.3/, name: "Windows 8.1" },
  { regex: /Windows NT 6\.2/, name: "Windows 8" },
  { regex: /Windows NT 6\.1/, name: "Windows 7" },
  { regex: /Windows NT 6\.0/, name: "Windows Vista" },
  { regex: /Windows NT 5\.1/, name: "Windows XP" },
  { regex: /Windows/, name: "Windows" },
  { regex: /Mac OS X (\d+[._]\d+(?:[._]\d+)?)/, name: "macOS" },
  { regex: /Android (\d+(?:\.\d+)?)/, name: "Android" },
  { regex: /iPhone OS (\d+_\d+(?:_\d+)?)/, name: "iOS" },
  { regex: /iPad.*OS (\d+_\d+(?:_\d+)?)/, name: "iPadOS" },
  { regex: /CrOS \w+ (\d+\.\d+)/, name: "Chrome OS" },
  { regex: /Linux/, name: "Linux" },
  { regex: /Ubuntu/, name: "Ubuntu" },
  { regex: /Debian/, name: "Debian" },
  { regex: /CentOS/, name: "CentOS" },
  { regex: /Fedora/, name: "Fedora" },
];

const DEVICE_REGEX: Array<{ regex: RegExp; type: string }> = [
  { regex: /Mobile|Android.*Mobile|iPhone|iPod|BlackBerry|Opera Mini|IEMobile/i, type: "Mobile" },
  { regex: /iPad|Android(?!.*Mobile)|Tablet|PlayBook|Silk/i, type: "Tablet" },
];

const ENGINE_REGEX: Array<{ regex: RegExp; name: string }> = [
  { regex: /AppleWebKit\/(\d+)/, name: "WebKit" },
  { regex: /Gecko\/(\d+)/, name: "Gecko" },
  { regex: /Trident\/(\d+)/, name: "Trident" },
  { regex: /Presto\/(\d+)/, name: "Presto" },
  { regex: /Blink\/(\d+)/, name: "Blink" },
];

function extractVersion(ua: string, regex: RegExp): string {
  const match = ua.match(regex);
  if (!match) return "Unknown";
  return match[1] || "Unknown";
}

export function parseUserAgent(ua: string): UserAgentInfo {
  if (!ua || !ua.trim()) {
    return {
      browser: { name: "Unknown", version: "Unknown" },
      os: { name: "Unknown", version: "Unknown" },
      device: { type: "Desktop", vendor: "Unknown", model: "Unknown" },
      engine: { name: "Unknown", version: "Unknown" },
    };
  }

  let browserName = "Unknown";
  let browserVersion = "Unknown";
  for (const { regex, name } of BROWSER_REGEX) {
    const match = ua.match(regex);
    if (match) {
      browserName = name;
      browserVersion = match[1] || "Unknown";
      break;
    }
  }

  let osName = "Unknown";
  let osVersion = "Unknown";
  for (const { regex, name } of OS_REGEX) {
    const match = ua.match(regex);
    if (match) {
      osName = name;
      osVersion = match[1]?.replace(/_/g, ".") || "Unknown";
      break;
    }
  }

  let deviceType = "Desktop";
  for (const { regex, type } of DEVICE_REGEX) {
    if (regex.test(ua)) {
      deviceType = type;
      break;
    }
  }

  let engineName = "Unknown";
  let engineVersion = "Unknown";
  for (const { regex, name } of ENGINE_REGEX) {
    const match = ua.match(regex);
    if (match) {
      engineName = name;
      engineVersion = match[1] || "Unknown";
      break;
    }
  }

  return {
    browser: { name: browserName, version: browserVersion },
    os: { name: osName, version: osVersion },
    device: { type: deviceType, vendor: "Unknown", model: "Unknown" },
    engine: { name: engineName, version: engineVersion },
  };
}

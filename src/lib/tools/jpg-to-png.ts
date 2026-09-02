export interface ConversionResult {
  blob: Blob;
  sizeFormatted: string;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export async function convertJpgToPng(file: File): Promise<ConversionResult> {
  return new Promise((resolve, reject) => {
    if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
      reject(new Error("File is not a JPG image."));
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create PNG blob"));
            return;
          }
          resolve({
            blob,
            sizeFormatted: formatBytes(blob.size),
          });
        },
        "image/png"
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load JPG image"));
    };

    img.src = url;
  });
}

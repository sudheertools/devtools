export interface ResizeResult {
  blob: Blob;
  width: number;
  height: number;
  sizeFormatted: string;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  maintainAspect: boolean
): Promise<ResizeResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let newWidth = targetWidth;
      let newHeight = targetHeight;

      if (maintainAspect) {
        const aspectRatio = img.width / img.height;
        if (targetWidth / targetHeight > aspectRatio) {
          newWidth = Math.round(targetHeight * aspectRatio);
          newHeight = targetHeight;
        } else {
          newWidth = targetWidth;
          newHeight = Math.round(targetWidth / aspectRatio);
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create image blob"));
            return;
          }
          resolve({
            blob,
            width: newWidth,
            height: newHeight,
            sizeFormatted: formatBytes(blob.size),
          });
        },
        file.type || "image/png",
        0.92
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

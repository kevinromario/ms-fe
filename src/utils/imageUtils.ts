import imageCompression from "browser-image-compression";

export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    const compressed = await imageCompression(file, options);
    return compressed;
  } catch (err) {
    throw new Error(`Gagal kompres gambar: ${err}`);
  }
}

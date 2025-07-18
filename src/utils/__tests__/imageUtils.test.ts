import { describe, expect, test, vi, Mock } from "vitest";
import { compressImage } from "../imageUtils";
import imageCompression from "browser-image-compression";

vi.mock("browser-image-compression", () => ({
  default: vi.fn(),
}));

describe("compressImage", () => {
  const mockFile = new File(["dummy content"], "test.png", {
    type: "image/png",
  });

  test("should call imageCompression with correct options and return compressed file", async () => {
    const mockedCompressedFile = new File(["compressed"], "compressed.png", {
      type: "image/png",
    });
    (imageCompression as unknown as Mock).mockResolvedValue(
      mockedCompressedFile
    );

    const result = await compressImage(mockFile);

    expect(imageCompression).toHaveBeenCalledWith(mockFile, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    });

    expect(result).toBe(mockedCompressedFile);
  });

  test("should throw error if imageCompression fails", async () => {
    (imageCompression as unknown as Mock).mockRejectedValue(
      new Error("Compression failed")
    );

    await expect(compressImage(mockFile)).rejects.toThrow(
      "Gagal kompres gambar: Error: Compression failed"
    );
  });
});

import { beforeEach, describe, expect, test, vi } from "vitest";
import { saveFormData, getDbData, clearFormData } from "src/utils/dbUtils";
import type { PortfolioType } from "src/types/portfolioType";

const mockPut = vi.fn();
const mockGet = vi.fn();
const mockDelete = vi.fn();

vi.mock("idb", () => {
  return {
    openDB: vi.fn(() =>
      Promise.resolve({
        put: mockPut,
        get: mockGet,
        delete: mockDelete,
      })
    ),
  };
});

const sampleData: PortfolioType = {
  backgroundImage: null,
  profileImage: null,
  profile: {
    name: "John Doe",
    title: "Frontend Developer",
    description: "Builds things with React",
  },
  portfolios: [
    {
      position: "Engineer",
      company: "Company X",
      startDate: "2021-01",
      endDate: "2022-01",
      description: "Did cool stuff",
    },
  ],
};

describe("dbUtils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("saveFormData stores data to IndexedDB", async () => {
    await saveFormData(sampleData);
    expect(mockPut).toHaveBeenCalledWith(
      "portfolio-data",
      sampleData,
      "portfolio"
    );
  });

  test("getDbData retrieves data from IndexedDB", async () => {
    mockGet.mockResolvedValueOnce(sampleData);
    const result = await getDbData();
    expect(mockGet).toHaveBeenCalledWith("portfolio-data", "portfolio");
    expect(result).toEqual(sampleData);
  });

  test("clearFormData deletes data from IndexedDB", async () => {
    await clearFormData();
    expect(mockDelete).toHaveBeenCalledWith("portfolio-data", "portfolio");
  });
});

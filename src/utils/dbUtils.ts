import { openDB } from "idb";
import { PortfolioType } from "src/types/portfolioType";

const DB_NAME = "portfolio-builder";
const STORE_NAME = "portfolio-data";

export const getDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const saveFormData = async (data: PortfolioType) => {
  const db = await getDB();
  await db.put(STORE_NAME, data, "portfolio");
};

export const getDbData = async () => {
  const db = await getDB();
  return await db.get(STORE_NAME, "portfolio");
};

export const clearFormData = async () => {
  const db = await getDB();
  return await db.delete(STORE_NAME, "portfolio");
};

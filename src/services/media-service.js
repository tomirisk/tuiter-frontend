import { v4 as uuidv4 } from 'uuid';
import * as storage from "../firebase/storage";

/**
 * Uploads a file on cloud
 * @param file file to upload
 * @returns {Promise<*|string>} unique key identifier for the file
 */
export const upload = async (file) => {
  const key = uuidv4();
  const snapshot = await storage.upload(key, file);
  return key;
}

/**
 * Gets a file using its unique key identifier
 * @param key unique key identifier
 * @returns {Promise<string>} returns a downloadable url of the file
 */
export const getURL = async (key) => {
  return await storage.getURL(key);
}
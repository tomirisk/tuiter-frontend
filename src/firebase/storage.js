import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseConfig from "./config";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Uploads a file on firebase cloud storage
 * @param key unique key identifier
 * @param file file blob
 * @returns {Promise<UploadResult>} that returns snapshot of the stored file on successful upload
 */
export const upload = (key, file) => {
  const storageRef = ref(storage, key);
  return uploadBytes(storageRef, file);
}

/**
 * Gets a downloadable url of the file stored on firebase cloud storage
 * @param key unique key identifier
 * @returns {Promise<string>} that returns a downloadable url when completed successfully
 */
export const getURL = (key) => {
  const storageRef = ref(storage, key);
  return getDownloadURL(storageRef);
}
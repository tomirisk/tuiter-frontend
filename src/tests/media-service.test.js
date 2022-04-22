import {upload, getURL} from "../services/media-service";
import * as storage from "../firebase/storage";

jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

describe('Upload Media', () => {
  test("Upload a media using API", async () => {
    const key = '00000000-0000-0000-0000-000000000000';
    const file = "Some file Blob";
    const storageApiMock = jest.spyOn(storage, 'upload');
    storageApiMock.mockImplementation(() => {
      return Promise.resolve({});
    })

    const resp = await upload(file);
    expect(resp).toEqual(key);
    expect(storageApiMock).toBeCalledWith(key, file);
    storageApiMock.mockRestore();
  });
});

describe('Get Media', () => {
  test("Get a media using API", async () => {
    const key = '00000000-0000-0000-0000-000000000000';
    const file = "Some file Blob";
    const storageApiMock = jest.spyOn(storage, 'getURL');
    storageApiMock.mockImplementation(() => {
      return Promise.resolve(file);
    })

    const resp = await getURL(key);
    expect(resp).toEqual(file);
    expect(storageApiMock).toBeCalledWith(key);
    storageApiMock.mockRestore();
  });
});
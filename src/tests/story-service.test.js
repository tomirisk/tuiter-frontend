import {
  api,
  createStory,
  findStoryById,
  findStoriesVisibleToUser,
  findStoriesByUser
} from "../services/story-service";
import * as mediaService from "../services/media-service";

const MEDIA_MAPPING = [
  {
    image: "Some Image Blob",
    key: "111",
  },
  {
    image: "Some Different Image Blob",
    key: "112",
  }
];

const MOCK_STORIES = [
  {
    description: "The Chamber of Secrets!",
    viewers: [],
    image: MEDIA_MAPPING[0].image
  },
  {
    description: "The Order of Phoenix!",
    viewers: [1, 2],
    image: MEDIA_MAPPING[1].image
  }
];

const MOCK_STORIES_FROM_SERVER = [
  {
    ...MOCK_STORIES[0],
    _id: "11",
    user: 1,
    image: MEDIA_MAPPING[0].key
  },
  {
    ...MOCK_STORIES[1],
    _id: "12",
    user: 1,
    image: MEDIA_MAPPING[1].key
  }
];

describe('Create Story', () => {
  test("Create Story using API", async () => {
    const apiResponse = JSON.parse(JSON.stringify(MOCK_STORIES_FROM_SERVER[0]));
    const storyApiMock = jest.spyOn(api, 'post');
    storyApiMock.mockImplementation(() => {
      return Promise.resolve({ data: apiResponse })
    });

    const mediaMock = jest.spyOn(mediaService, 'upload');
    mediaMock.mockImplementation((image) => {
      return MEDIA_MAPPING.find(media => media.image === image).key;
    });

    const story = MOCK_STORIES[0];
    const storyFromServer = apiResponse;
    const resp = await createStory(1, story.viewers, story.description, story.image);
    expect(resp).toEqual(storyFromServer);
    expect(mediaMock).toBeCalledWith(story.image);
    story.image = storyFromServer.image;
    expect(storyApiMock).toBeCalledWith(`${process.env.REACT_APP_BASE_URL}/api/users/${storyFromServer.user}/stories`, story);
    storyApiMock.mockRestore();
    mediaMock.mockRestore();
  });
});

describe('Find Story', () => {
  test("Find a story by ID using API", async () => {
    const apiResponse = JSON.parse(JSON.stringify(MOCK_STORIES_FROM_SERVER[0]))
    const storyApiMock = jest.spyOn(api, 'get');
    storyApiMock.mockImplementation(() => {
      return Promise.resolve({ data: apiResponse });
    });

    const mediaMock = jest.spyOn(mediaService, 'getURL');
    mediaMock.mockImplementation((key) => {
      return MEDIA_MAPPING.find(media => media.key === key).image;
    });

    const resp = await findStoryById(MOCK_STORIES_FROM_SERVER[0]._id);
    expect(resp).toEqual(apiResponse);
    expect(mediaMock).toBeCalledWith(MOCK_STORIES_FROM_SERVER[0].image);
    expect(storyApiMock).toBeCalledWith(`${process.env.REACT_APP_BASE_URL}/api/stories/${MOCK_STORIES_FROM_SERVER[0]._id}`);
    storyApiMock.mockRestore();
    mediaMock.mockRestore();
  });
});

describe('Find Visible Stories', () => {
  test("Find all stories visible to user using API", async () => {
    const apiResponse = JSON.parse(JSON.stringify(MOCK_STORIES_FROM_SERVER))
    const storyApiMock = jest.spyOn(api, 'get');
    storyApiMock.mockImplementation(() => {
      return Promise.resolve({ data: apiResponse });
    });

    const mediaMock = jest.spyOn(mediaService, 'getURL');
    mediaMock.mockImplementation((key) => {
      return MEDIA_MAPPING.find(media => media.key === key).image;
    });

    const userId = '1', params = { hours: 24 };
    const resp = await findStoriesVisibleToUser(userId, params.hours);
    expect(resp).toEqual(apiResponse);
    expect(mediaMock).toBeCalledWith(MOCK_STORIES_FROM_SERVER[0].image);
    expect(mediaMock).toBeCalledWith(MOCK_STORIES_FROM_SERVER[1].image);
    expect(storyApiMock).toBeCalledWith(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}/stories`, {params});
    storyApiMock.mockRestore();
    mediaMock.mockRestore();
  });
});

describe('Find Stories of User', () => {
  test("Find all stories created by user using API", async () => {
    // Second story created by current user
    const apiResponse = JSON.parse(JSON.stringify([MOCK_STORIES_FROM_SERVER[1]]));
    const storyApiMock = jest.spyOn(api, 'get');
    storyApiMock.mockImplementation(() => {
      return Promise.resolve({ data: apiResponse });
    });

    const mediaMock = jest.spyOn(mediaService, 'getURL');
    mediaMock.mockImplementation((key) => {
      return MEDIA_MAPPING.find(media => media.key === key).image;
    });

    const userId = '1';
    const resp = await findStoriesByUser(userId);
    expect(resp).toEqual(apiResponse);
    expect(mediaMock).toBeCalledWith(MOCK_STORIES_FROM_SERVER[1].image);
    expect(storyApiMock).toBeCalledWith(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}/my-stories`);
    storyApiMock.mockRestore();
    mediaMock.mockRestore();
  });
});
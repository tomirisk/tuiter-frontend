import {
  api,
  sendGroupMessage,
  getGroupMessages,
  deleteGroupMessage,
} from "../services/messages-service";

const MOCK_MESSAGES = [
  {
    message: "The Chamber of Secrets!",
    sender: 1,
    group: 2,
  },
  {
    message: "Hello there",
    sender: 2,
    group: 2,
  },
];

const MOCK_MESSAGES_FROM_SERVER = [
  {
    ...MOCK_MESSAGES[0],
    _id: "11",
    sender: 1,
    group: 2,
  },
  {
    ...MOCK_MESSAGES[1],
    _id: "12",
    sender: 2,
    group: 2,
  },
];

describe("Find group messages", () => {
  test("Find group messages of a particular group using API", async () => {
    const apiResponse = JSON.parse(JSON.stringify(MOCK_MESSAGES_FROM_SERVER));
    const messageApiMock = jest.spyOn(api, "get");
    messageApiMock.mockImplementation(() => {
      return Promise.resolve({ data: apiResponse });
    });

    const groupId = "2";
    const resp = await getGroupMessages(groupId);
    expect(resp).toEqual(apiResponse);
    expect(messageApiMock).toBeCalledWith(
      `${process.env.REACT_APP_BASE_URL}/api/groups/${groupId}/messages`
    );
    messageApiMock.mockRestore();
  });
});

describe("Send group message", () => {
  test("Send group message using API", async () => {
    const apiResponse = JSON.parse(
      JSON.stringify(MOCK_MESSAGES_FROM_SERVER[0])
    );
    const messageApiMock = jest.spyOn(api, "post");
    messageApiMock.mockImplementation(() => {
      return Promise.resolve({ data: apiResponse });
    });

    const message = MOCK_MESSAGES[0];
    const messageFromServer = apiResponse;
    const resp = await sendGroupMessage(
      message.sender,
      message.group,
      message.message,
      null
    );
    expect(resp).toEqual(messageFromServer);
    expect(messageApiMock).toBeCalledWith(
      `${process.env.REACT_APP_BASE_URL}/api/groups/${messageFromServer.group}/users/${messageFromServer.sender}/messages`,
      { message: message.message }
    );
    messageApiMock.mockRestore();
  });
});

describe("Delete group messages", () => {
  test("Delete a group message using API", async () => {
    const apiResponse = JSON.parse(
      JSON.stringify(MOCK_MESSAGES_FROM_SERVER[0])
    );
    const messageApiMock = jest.spyOn(api, "delete");
    messageApiMock.mockImplementation(() => {
      return Promise.resolve({ data: apiResponse });
    });

    const groupId = "2";
    const messageId = "11";
    const resp = await deleteGroupMessage(groupId, messageId);
    expect(resp).toEqual(apiResponse);
    expect(messageApiMock).toBeCalledWith(
      `${process.env.REACT_APP_BASE_URL}/api/groups/${groupId}/messages/${messageId}`
    );
    messageApiMock.mockRestore();
  });
});

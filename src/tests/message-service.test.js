import {createUser, deleteUser} from "../services/users-service";
import {deleteMessage, sendMessage} from "../services/messages-service";

describe('can send with REST API', () => {
  // sample user: the sender of the message
  const test_user1 = {
    _id: '6250af9334a1c846721967f9',
    username: 'test_user1',
    password: 'test123',
    email: 'user1@test.com'
  };

  // sample user: the recipient of the message
  const test_user2 = {
    _id: '6251c3e6e83dfdcb6dd3a661',
    username: 'test_user2',
    password: 'test123',
    email: 'user2@test.com'
  };

  // sample story to insert
  const message = "Hi! How are you?";

  let messageID = "";

  // setup test before running test
  beforeAll(async () => {
    // remove users and stories to make sure we create it in the test
    //await deleteMessage(messageID);
    await deleteUser(test_user1._id);
    return await deleteUser(test_user2._id);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteMessage(messageID);
    await deleteUser(test_user1._id);
    return await deleteUser(test_user2._id);
  });

  test('can send message with REST API', async () => {
    const sender = await createUser(test_user1);
    const recipient = await createUser(test_user2);
    const messageSent = await sendMessage(sender._id, recipient._id, message);
    messageID = messageSent._id;
    expect(messageSent.message).toEqual(message);
  });
});
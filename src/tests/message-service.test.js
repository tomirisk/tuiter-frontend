import {createUser, deleteUser} from "../services/users-service";
import {deleteMessage, sendMessage} from "../services/messages-service";

describe('can send with REST API', () => {
  // sample user: the sender of the message
  const test_user1 = {
    _id: '6254809012c1e7ba29312909',
    username: 'test_user1',
    password: 'test123',
    email: 'user1@test.com'
  };

  // sample user: the recipient of the message
  const test_user2 = {
    _id: '6254ac15d28b40132d8aded8',
    username: 'test_user2',
    password: 'test123',
    email: 'user2@test.com'
  };

  // sample message body to insert
  const message = "Hi! How are you?";
  //store the ID of the message created to delete after the test
  let messageID = "";

  // setup test before running test
  beforeAll(async () => {
    // remove users and messages to make sure we create it in the test
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
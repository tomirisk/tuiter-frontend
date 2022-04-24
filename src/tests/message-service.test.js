import {createUser, deleteUser} from "../services/users-service";
import {
  deleteMessage,
  getMessages,
  sendMessage
} from "../services/messages-service";


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
    // remove users to make sure we create it in the test
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


describe('can delete message with REST API', () => {
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

  // sample message body to delete
  const message = "Hi! How are you?";
  //store the ID of the message created to delete
  let messageID = "";

  // setup test before running test
  beforeAll(async () => {
    // remove users to make sure we create it in the test
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

  test('can delete message with REST API', async () => {
    const sender = await createUser(test_user1);
    const recipient = await createUser(test_user2);
    const messageSent = await sendMessage(sender._id, recipient._id, message);
    messageID = messageSent._id;
    const status = await deleteMessage(messageID);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});



describe('can retrieve the list of messages exchanged between two users'
    + ' with REST API', () => {

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

  const messages = [
    "Hi! How are you?", "Shall we discuss our project plan today?",
    "What time would you like to meet?"
  ];
  let messageIDs = [];

  // setup test before running test
  beforeAll(async () => {
    // remove users to make sure we create it in the test
    await deleteUser(test_user1._id);
    return await deleteUser(test_user2._id);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await Promise.all(messageIDs.map(messageID => deleteMessage(messageID)));
    await deleteUser(test_user1._id);
    return await deleteUser(test_user2._id);
  });

  test('can retrieve the list of messages exchanged between two users'
      + ' with REST API', async () => {
    const sender = await createUser(test_user1);
    const recipient = await createUser(test_user2);

    await Promise.all(messages.map(async (message) =>
      await sendMessage(sender._id, recipient._id, message))).then((newMessages) => {
        messageIDs = newMessages.map(message => message._id);
    });

    const sentMessages = await getMessages(sender._id, recipient._id);
    expect(sentMessages.length).toBeGreaterThanOrEqual(messages.length);

    const messagesWeSent = sentMessages.filter(
        message => message.sender._id === test_user1._id);

    messagesWeSent.forEach(messageSent => {
      const messageBody = messages.find(message => message === messageSent.message);
      expect(messageSent.message).toEqual(messageBody);
      expect(messageSent.sender).toEqual(test_user1);
    });

  });
});
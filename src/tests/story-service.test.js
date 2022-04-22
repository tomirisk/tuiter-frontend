import {createTuit, deleteTuit} from "../services/tuits-service";
import {createUser, deleteUser} from "../services/users-service";

describe('can create private story with REST API', () => {
  // sample user: the creator of the story
  const test_user1 = {
    _id: '456kjhghi8989fg',
    username: 'test_user1',
    password: 'test123',
    email: 'user1@test.com'
  };

  //sample users: viewers of the story
  const test_user2 = {
    _id: 'oo87u5ijtngbf78as',
    username: 'test_user2',
    password: 'test123',
    email: 'user2@test.com'
  };

  const test_user3 = {
    _id: '8756550hbff786d',
    username: 'test_user3',
    password: 'test123',
    email: 'user3@test.com'
  };

  // sample tuit to insert
  const test_story = {
    _id: '34567diyjipllosa',
    image: "dd1f9108-de8e-49cd-a6bc-dafc8a56f964",
    viewers: User[],
    description?: String,
    postedOn: Date,
    postedBy: User
  };

  // setup test before running test
  beforeAll(async () => {
    // remove users and tuits to make sure we create it in the test
    await deleteTuit(tuit._id);
    return await deleteUser(harry._id);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteTuit(tuit._id);
    return await deleteUser(harry._id);
  });

  test('can create tuit with REST API', async () => {
    const user = await createUser(harry);
    const tuitCreated = await createTuit(user._id, tuit);

    expect(tuitCreated.tuit).toEqual(tuit.tuit);
  });
});
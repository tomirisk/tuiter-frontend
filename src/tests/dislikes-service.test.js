import {findAllUsersThatDislikedTuit, userTogglesTuitDislikes} from '../services/dislikes-service';
import {userTogglesTuitLikes} from '../services/likes-service';
import {createTuit, deleteTuit, findTuitById} from '../services/tuits-service';
import {createUser, deleteUser} from "../services/users-service";

const cleanUp = async (uids, tid) => {
  // remove users and tuits to make sure we create it in the test
  const tuitRetrieved = await findTuitById(tid);
  await Promise.all(uids.map(async (uid) => {
    if (tuitRetrieved && tuitRetrieved.stats.likes > 0) {
      await userTogglesTuitLikes(uid, tuitRetrieved._id);
    }
    if (tuitRetrieved && tuitRetrieved.stats.dislikes > 0) {
      await userTogglesTuitDislikes(uid, tuitRetrieved._id);
    }
  }));

  await deleteTuit(tid);
  await Promise.all(uids.map(async (uid) => await deleteUser(uid)));
}

describe('can dislike a tuit with REST API', () => {
  // sample user
  const harry = {
    _id: '622adeabf921c0052a058d41',
    username: 'harry_potter',
    password: 'not0sum',
    email: 'harry@hogwarts.com'
  };

  // sample tuit to insert
  const tuit = {
    _id: '622adeabf921c0052a058d61',
    tuit: 'What\'s up doc?'
  };

  // setup test before running test
  beforeAll(async () => await cleanUp([harry._id], tuit._id));

  // clean up after test runs
  afterAll(async () => await cleanUp([harry._id], tuit._id));

  test('can dislike a tuit with REST API', async () => {
    const user = await createUser(harry);
    const tuitCreated = await createTuit(user._id, tuit);
    const response = await userTogglesTuitDislikes(user._id, tuitCreated._id);
    expect(response).toEqual("OK");
    const tuitRetrieved = await findTuitById(tuitCreated._id);
    expect(tuitRetrieved.stats.dislikes).toEqual(1);
  });
});

describe('can remove dislike on a tuit with REST API', () => {
  // sample user
  const harry = {
    _id: '622adeabf921c0052a058d42',
    username: 'harry_potter',
    password: 'not0sum',
    email: 'harry@hogwarts.com'
  };

  // sample tuit to insert
  const tuit = {
    _id: '622adeabf921c0052a058d62',
    tuit: 'What\'s up doc?'
  };

  // setup test before running test
  beforeAll(async () => await cleanUp([harry._id], tuit._id));

  // clean up after test runs
  afterAll(async () => await cleanUp([harry._id], tuit._id));

  test('can remove dislike on a tuit with REST API', async () => {
    const user = await createUser(harry);
    const tuitCreated = await createTuit(user._id, tuit);
    let response = await userTogglesTuitDislikes(user._id, tuitCreated._id);
    expect(response).toEqual("OK");
    let tuitRetrieved = await findTuitById(tuitCreated._id);
    expect(tuitRetrieved.stats.dislikes).toEqual(1);
    response = await userTogglesTuitDislikes(user._id, tuitCreated._id);
    expect(response).toEqual("OK");
    tuitRetrieved = await findTuitById(tuitCreated._id);
    expect(tuitRetrieved.stats.dislikes).toEqual(0);
  });
});

describe('can dislike a tuit and remove like with REST API', () => {
  // sample user
  const harry = {
    _id: '622adeabf921c0052a058d43',
    username: 'harry_potter',
    password: 'not0sum',
    email: 'harry@hogwarts.com'
  };

  // sample tuit to insert
  const tuit = {
    _id: '622adeabf921c0052a058d63',
    tuit: 'What\'s up doc?'
  };

  // setup test before running test
  beforeAll(async () => await cleanUp([harry._id], tuit._id));

  // clean up after test runs
  afterAll(async () => await cleanUp([harry._id], tuit._id));

  test('can dislike a tuit and remove like with REST API', async () => {
    const user = await createUser(harry);
    const tuitCreated = await createTuit(user._id, tuit);
    expect(tuitCreated.stats.likes).toEqual(0);
    expect(tuitCreated.stats.dislikes).toEqual(0);

    let response = await userTogglesTuitDislikes(user._id, tuitCreated._id);
    expect(response).toEqual("OK");
    let tuitRetrieved = await findTuitById(tuitCreated._id);
    expect(tuitRetrieved.stats.likes).toEqual(0);
    expect(tuitRetrieved.stats.dislikes).toEqual(1);

    response = await userTogglesTuitLikes(user._id, tuitCreated._id);
    expect(response).toEqual("OK");
    tuitRetrieved = await findTuitById(tuitCreated._id);
    expect(tuitRetrieved.stats.likes).toEqual(1);
    expect(tuitRetrieved.stats.dislikes).toEqual(0);

    response = await userTogglesTuitDislikes(user._id, tuitCreated._id);
    expect(response).toEqual("OK");
    tuitRetrieved = await findTuitById(tuitCreated._id);
    expect(tuitRetrieved.stats.likes).toEqual(0);
    expect(tuitRetrieved.stats.dislikes).toEqual(1);

    response = await userTogglesTuitDislikes(user._id, tuitCreated._id);
    expect(response).toEqual("OK");
    tuitRetrieved = await findTuitById(tuitCreated._id);
    expect(tuitRetrieved.stats.likes).toEqual(0);
    expect(tuitRetrieved.stats.dislikes).toEqual(0);
  });
});

describe('can retrieve list of users that disliked a tuit with REST API', () => {
  // sample user
  const harry = {
    _id: '622adeabf921c0052a058d44',
    username: 'harry_potter',
    password: 'not0sum',
    email: 'harry@hogwarts.com'
  };

  const ron = {
    _id: '622adeabf921c0052a058d45',
    username: 'ron_weasley',
    password: 'not0sum',
    email: 'ron@hogwarts.com'
  };

  // sample tuit to insert
  const tuit = {
    _id: '622adeabf921c0052a058d64',
    tuit: 'What\'s up doc?'
  };

  // setup test before running test
  beforeAll(async () => {
    await cleanUp([harry._id, ron._id], tuit._id);
  });

  // clean up after test runs
  afterAll(async () => {
    await cleanUp([harry._id, ron._id], tuit._id);
  });

  test('can retrieve list of users that disliked a tuit with REST API', async () => {
    const userHarry = await createUser(harry);
    const userRon = await createUser(ron);
    const tuitCreated = await createTuit(userHarry._id, tuit);
    let response = await userTogglesTuitDislikes(userHarry._id, tuitCreated._id);
    expect(response).toEqual("OK");
    let tuitRetrieved = await findTuitById(tuitCreated._id);
    expect(tuitRetrieved.stats.dislikes).toEqual(1);

    response = await userTogglesTuitDislikes(userRon._id, tuitCreated._id);
    expect(response).toEqual("OK");
    tuitRetrieved = await findTuitById(tuitCreated._id);
    expect(tuitRetrieved.stats.dislikes).toEqual(2);

    const usersThatDisliked = await findAllUsersThatDislikedTuit(tuitCreated._id);
    const users = usersThatDisliked.map((user) => user.dislikedBy);
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({_id: harry._id}), expect.objectContaining({_id: ron._id})]
      )
    );
  });
});

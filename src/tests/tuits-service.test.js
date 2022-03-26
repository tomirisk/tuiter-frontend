import {createTuit, deleteTuit, findTuitById, findAllTuits} from '../services/tuits-service';
import {createUser, deleteUser} from "../services/users-service";

describe('can create tuit with REST API', () => {
  // sample user
  const harry = {
    _id: '622adeabf921c0052a058d11',
    username: 'harry_potter',
    password: 'not0sum',
    email: 'harry@hogwarts.com'
  };

  // sample tuit to insert
  const tuit = {
    _id: '622adeabf921c0052a058d51',
    tuit: 'What\'s up doc?'
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

describe('can delete tuit wtih REST API', () => {
  // sample user
  const harry = {
    _id: '622adeabf921c0052a058d12',
    username: 'harry_potter',
    password: 'not0sum',
    email: 'harry@hogwarts.com'
  };

  // sample tuit to delete
  const tuit = {
    _id: '622adeabf921c0052a058d52',
    tuit: 'What\'s up doc?'
  };

  // setup test before running test
  beforeAll(async () => {
    // remove user and tuit to delete in test
    await deleteTuit(tuit._id);
    await await deleteUser(harry._id);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteTuit(tuit._id);
    return await deleteUser(harry._id);
  });

  test('can delete tuit with REST API', async () => {
    const user = await createUser(harry);
    await createTuit(user._id, tuit);
    const status = await deleteTuit(tuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // sample user
  const harry = {
    _id: '622adeabf921c0052a058d13',
    username: 'harry_potter',
    password: 'not0sum',
    email: 'harry@hogwarts.com'
  };

  // sample tuit to retrieve
  const tuit = {
    _id: '622adeabf921c0052a058d53',
    tuit: 'What\'s up doc?'
  };

  // setup test before running test
  beforeAll(async () => {
    // remove user and tuit to delete in test
    await deleteTuit(tuit._id);
    return await deleteUser(harry._id);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteTuit(tuit._id);
    return await deleteUser(harry._id);
  });

  test('can retrieve a tuit by id with REST API', async () => {
    const user = await createUser(harry);
    await createTuit(user._id, tuit);

    const retrievedTuit = await findTuitById(tuit._id);
    expect(retrievedTuit.tuit).toEqual(tuit.tuit);
    expect(retrievedTuit.postedBy).toEqual(user);
  });
});

describe('can retrieve all tuits with REST API', () => {
  // sample user
  const harry = {
    _id: '622adeabf921c0052a058d14',
    username: 'harry_potter',
    password: 'not0sum',
    email: 'harry@hogwarts.com'
  };

  const tuits = [
    {
      _id: '622adeabf921c0052a058d54',
      tuit: 'Welcome to Gryffindor!'
    },
    {
      _id: '622adeabf921c0052a058d55',
      tuit: 'Welcome to Hufflepuff!'
    },
    {
      _id: '622adeabf921c0052a058d56',
      tuit: 'Welcome to Ravenclaw!'
    },
    {
      _id: '622adeabf921c0052a058d57',
      tuit: 'Welcome to Slytherin!'
    }
  ];

  // setup test before running test
  beforeAll(async () => {
    // remove user and tuits to delete in test
    await Promise.all(tuits.map(async (tuit) => await deleteTuit(tuit._id)));
    return await deleteUser(harry._id);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await Promise.all(tuits.map(async (tuit) => await deleteTuit(tuit._id)));
    return await deleteUser(harry._id);
  });

  test('can retrieve all tuits with REST API', async () => {
    const user = await createUser(harry);
    await Promise.all(tuits.map(async (tuit) => {
      return await createTuit(user._id, tuit);
    }));

    const retrievedTuits = await findAllTuits();
    expect(retrievedTuits.length).toBeGreaterThanOrEqual(tuits.length);
    const tuitsWeInserted = retrievedTuits.filter(
      tuit => tuit.postedBy._id === user._id);

    tuitsWeInserted.forEach(tuitInserted => {
      const tuit = tuits.find(tuit => tuit._id === tuitInserted._id);
      expect(tuitInserted.tuit).toEqual(tuit.tuit);
      expect(tuitInserted.postedBy).toEqual(user);
    });
  });
});
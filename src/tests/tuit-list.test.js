import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {api, findAllTuits} from "../services/tuits-service";

const MOCKED_USERS = [
  {username: 'alice', password: 'lv426', email: 'alice@hogwarts.com', _id: '111'},
  {username: 'bob', password: 'lv426', email: 'bob@hogwarts.com', _id: '112'},
  {username: 'charlie', password: 'lv426', email: 'charlie@hogwarts.com', _id: '113'}
];

const MOCKED_TUITS = [
  {
    _id: '11111',
    postedBy: MOCKED_USERS[0],
    tuit: "alice's tuit"
  },
  {
    _id: '11112',
    postedBy: MOCKED_USERS[1],
    tuit: "bob's tuit"
  },
  {
    _id: '11113',
    postedBy: MOCKED_USERS[2],
    tuit: "charlie's tuit"
  }
];

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS}/>
    </HashRouter>
  );
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>
  );
  const linkElement = screen.getByText(/In 2021, our @NASAPersevere Mars rover landed and our Ingenuity helicopter took flight/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders mocked', async () => {
  const mock = jest.spyOn(api, 'get');
  mock.mockImplementation(() =>
                            Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>
  );
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
  mock.mockRestore();
});

import {api, createGroup, deleteGroup} from "../services/groups-service";

const MOCK_GROUPS = [
    {
        _id: "11",
        name: "Group 1",
        owner: 4,
        users: [2, 3, 4, 5]
    },
    {
        _id: "12",
        name: "Group 2",
        owner: 1,
        users: [1, 2]
    }
];


describe('Create Group', () => {
    test("Create Group using API", async () => {
        const groupApiMock = jest.spyOn(api, 'post');
        groupApiMock.mockImplementation(() => {
            return Promise.resolve({ data: MOCK_GROUPS[0] })
        });

        const group = {
            _id: "11",
            name: "Group 1",
            owner: 4,
            users: [3, 4, 5]
        };

        const resp = await createGroup(group.owner, group.users, group);
        expect(resp).toEqual(MOCK_GROUPS[0]);
        const params = {users: group.users, group: group};
        expect(groupApiMock).toBeCalledWith(`${process.env.REACT_APP_BASE_URL}/api/users/4/groups`, params);
        groupApiMock.mockRestore();
    });
});


describe("Delete group", () => {
    test("Delete a group using API", async () => {
        const apiResponse = JSON.parse(
            JSON.stringify(MOCK_GROUPS[1])
        );
        const groupApiMock = jest.spyOn(api, "delete");
        groupApiMock.mockImplementation(() => {
            return Promise.resolve({ data: apiResponse });
        });

        const groupId = "12";
        const resp = await deleteGroup(groupId);
        expect(resp).toEqual(apiResponse);
        expect(groupApiMock).toBeCalledWith(`${process.env.REACT_APP_BASE_URL}/api/groups/${groupId}`);
        groupApiMock.mockRestore();
    });
});
import React, {useEffect, useState} from "react";
import * as service from "../../services/auth-service";
import * as userService from "../../services/users-service";
import {useNavigate} from "react-router-dom";
import "./index.css";
import MultiSelectUsers from "../multi-select-users";
import * as groupService from "../../services/groups-service";


/**
 * Component to represent Group creation screen
 * @returns {JSX.Element} React component
 * @constructor
 */
const CreateGroup = () => {
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [group, setGroup] = useState(null);


    useEffect(() => {
        service.profile().then(me => {
            userService.findAllUsers().then(userList => {
                setAllUsers(userList.filter(user => user._id !== me._id));
            });
        }).catch(e => {
            navigate('/login', {
                state: {
                    redirect: '/messages',
                }
            });
        })
    }, []);


    /**
     * Handler for user selection change
     * @param users array of selected users
     */
    const handleChange = (users) => {
        setSelectedUsers(users);
    }

    const handleGroupName = (e) => {
        setGroup({...group, name: e.target.value});
    }

    const createGroup = () => {
        if(selectedUsers.length < 1){
            alert("Please select one or more users to add to your group.");
            return;
        }
        groupService.createGroup("me", selectedUsers.map(selectedUser => selectedUser._id), group)
            .then(() => navigate('/messages'))
            .catch(e => alert("That name has already been taken."));
    }

    return(
        <>
            <div className="d-flex m-2 justify-content-between">
                <h2>Create A Group</h2>
                <button onClick={createGroup} className="btn btn-primary">Create Group</button>
            </div>

            <h4 className="name-box m-2 mt-4">Your Group Name</h4>
            <div className="m-2">
                <input className="w-100 form-control bg-secondary bg-opacity-25 resize-none"
                       onChange={handleGroupName}>
                </input>
            </div>

            <h4 className="m-2 mt-4">Select Users For Your Group</h4>
            {
                allUsers && <MultiSelectUsers users={allUsers} onChange={handleChange} />
            }
        </>
    );
}

export default CreateGroup;
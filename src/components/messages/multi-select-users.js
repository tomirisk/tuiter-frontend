import React from "react";

const MultiSelectUsers = ({users, checkHandler, uncheckHandler}) => {
  const toggleSelect = (checked, id) => {
    if (checked) {
      checkHandler(id);
    } else {
      uncheckHandler(id);
    }
  }

  return(
    <>
      <ul className="list-group m-2">
        {
          users && users.map(user =>
            <li className="list-group-item" key={user._id}>
             <div className="w-100 d-flex align-items-center">
               <input type="checkbox" onChange={(event) => toggleSelect(event.target.checked, user._id)} />
               <img className="avatar mx-2 bg-secondary bg-opacity-50" src={`https://avatars.dicebear.com/api/adventurer/${user.username}.svg`} alt=""/>
               <div className="text-break overflow-auto">
                 <span>@{user.username} - {user.firstName} {user.lastName}</span>
               </div>
             </div>
            </li>
          )
        }
      </ul>
    </>
  );
}

export default MultiSelectUsers;
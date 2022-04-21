import React from "react";
import Select from "react-select";

/**
 * Component that provides a way to multi-select users
 * @param users users to select from
 * @param groups groups to select from
 * @param onChange handler to execute when selection changes
 * @returns {JSX.Element} React component
 * @constructor
 */
const MultiSelectUsers = ({users, groups, onChange}) => {

  /**
   * Builds a label for user object
   * @param user the user object
   * @returns {string} label
   */
  const getLabel = (user) => `@${user.username} - ${user.firstName ? user.firstName : ''} ${user.lastName ? user.lastName : ''}`;

  /**
   * Returns the list of options to populate
   */
  const options = [];
  if (users) {
    options.push(...users.map(user => { return {value: user, label: getLabel(user)}}));
  }
  if (groups) {
    options.push(...groups.map(group => { return {value: group, label: group.name}}));
  }

  /**
   * Executes the onChange handler when selection changes
   * @param selectedOptions selected Options
   */
  const handleChange = (selectedOptions) => {
    const selectedUsers = selectedOptions.filter(selectedOption => selectedOption.value.username).map(selectedOption => selectedOption.value);
    const selectedGroups = selectedOptions.filter(selectedOption => selectedOption.value.users).map(selectedOption => selectedOption.value);
    selectedGroups.map(group => {
      group.users.map(user => {
        if (!selectedUsers.find(selectedUser => selectedUser._id === user._id)) {
          selectedUsers.push(user);
        }
      })
    })
    onChange(selectedUsers);
  }

  return(
    <>
      <Select options={options} isMulti className="mx-2" onChange={handleChange} />
    </>
  );
}

export default MultiSelectUsers;
import React from "react";
import Select from "react-select";

/**
 * Component that provides a way to multi-select users
 * @param users users to select from
 * @param onChange handler to execute when selection changes
 * @returns {JSX.Element} React component
 * @constructor
 */
const MultiSelectUsers = ({users, onChange}) => {

  /**
   * Builds a label for user object
   * @param user the user object
   * @returns {string} label
   */
  const getLabel = (user) => `@${user.username} - ${user.firstName ? user.firstName : ''} ${user.lastName ? user.lastName : ''}`;

  /**
   * Returns the list of options to populate
   */
  const options = users.map(user => { return {value: user, label: getLabel(user)}});

  /**
   * Executes the onChange handler when selection changes
   * @param selectedOptions selected Options
   */
  const handleChange = (selectedOptions) => {
    const selectedUsers = selectedOptions.map(selectedOption => selectedOption.value);
    onChange(selectedUsers);
  }

  return(
    <>
      <Select options={options} isMulti className="mx-2" onChange={handleChange} />
    </>
  );
}

export default MultiSelectUsers;
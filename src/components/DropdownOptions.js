import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";
import styles from "../styles/DropdownOptions.module.css";

const OptionsToggle = React.forwardRef(({ onClick }, ref) => (
  <i
    className={`fas fa-ellipsis-v ${styles.Toggle}`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const DropdownOptions = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-2" drop="left">
      <Dropdown.Toggle as={OptionsToggle} className={styles.Toggle} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownIcon}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="far fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownIcon}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export function EditProfileDropdown({ id }) {
  const history = useHistory();

  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={OptionsToggle} />
      <Dropdown.Menu>
      <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
          className={styles.ProfileDropdown}
        >
          <i className="fas fa-edit" />
          Edit Profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
          className={styles.ProfileDropdown}
        >
          <i className="far fa-id-card" />
          Change Username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
          className={styles.ProfileDropdown}
        >
          <i className="fas fa-key" />
          Change Password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
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

export const DropdownOptions = ({handleEdit}) => {
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
          onClick={() => {}}
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

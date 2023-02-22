import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/DropdownOptions.module.css";

const OptionsToggle = React.forwardRef(({ onClick }, ref) => (
  <i
    className="far fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const DropdownOptions = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Orange
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

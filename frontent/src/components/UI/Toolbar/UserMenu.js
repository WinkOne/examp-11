import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, NavbarBrand, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
     <UncontrolledDropdown nav inNavbar>
       <DropdownToggle nav caret>
         Hello, {user.username}!
       </DropdownToggle>
       <DropdownMenu right>
         <DropdownItem>
           View profile
         </DropdownItem>
           <NavbarBrand tag={RouterNavLink} to="/add">
               <DropdownItem>
                   Add new goods
               </DropdownItem>
              </NavbarBrand>
         <DropdownItem divider />
         <DropdownItem onClick={logout}>
           Logout
         </DropdownItem>
       </DropdownMenu>
     </UncontrolledDropdown>
  );
};

export default UserMenu;
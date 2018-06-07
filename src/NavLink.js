import React from 'react';
import { Link } from 'react-router-dom'
import cx from 'classnames';

function NavLink(props){
  let link = props.link;
      return(
      <li className={cx("nav-item", { 'active': location.pathname === link.href })}>
        <Link className={cx("nav-link", { 'active': location.pathname === link.href })} to={link.href}> {link.title}</Link>
      </li>);
}
export default NavLink;

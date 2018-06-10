import React from 'react';
import { Link } from 'react-router-dom'
import cx from 'classnames';

function NavLink(props){
  let link = props.link;
  let base = "/2017-2018/dcs/dev_39/client_app";
      return(
      <li className={cx("nav-item", { 'active': location.pathname === `${base}${link.href}` })}>
        <Link className={cx("nav-link", { 'active': location.pathname === `${base}${link.href}` })} to={link.href}> {link.title}</Link>
      </li>);
}
export default NavLink;

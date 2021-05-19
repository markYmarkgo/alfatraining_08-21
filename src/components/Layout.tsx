import React, {ReactElement} from 'react';
import {NavLink} from 'react-router-dom';
import Routes from './Routes';

interface Props {
  children: ReactElement
}

function Layout(props: Props): ReactElement {
  return (
    <>
      <div className="ui menu">
        <NavLink to="/class-counter" className="item">Class Counter</NavLink>
        <NavLink to="/functional-counter" className="item">Functional Counter</NavLink>
        <NavLink to="/projects" className="item">Projects</NavLink>
        <NavLink exact to="/" className="item">Home</NavLink>
      </div>
      <div className="ui container">
        {props.children}
      </div>
    </>
  )
}

export default Layout

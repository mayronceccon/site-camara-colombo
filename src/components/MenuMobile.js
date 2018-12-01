import React from 'react';
import { Link} from 'react-router-dom'

class SimpleMenu extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
            Home
        </Link>
        <Link to="/sobre">
            Sobre
        </Link>
      </div>
    );
  }
}

export default SimpleMenu;

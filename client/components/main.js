import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import browser from '../../images/login.png'
import navOpenIcon from '../../images/arrow-point-to-right.png'
import user from '../../images/profile.png'
import home from '../../images/home_copy.png'
import exit from '../../images/exit.png'
import listing from '../../images/list.png'
import gitHub from '../../images/GitHub-Mark-32px.png'
import linkedIn from '../../images/In-2C-34px-R.png'
import screenCast from '../../images/youtube-symbol.png'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
    this.hoverMenu = this.hoverMenu.bind(this);
  }

  hoverMenu = () => {
    this.setState({show: !this.state.show});
    if (this.state.show) {
      document.getElementById('navigation-bar').style.visibility = 'hidden';
    } else {
      document.getElementById('navigation-bar').style.visibility = 'visible';
    }
  };

  render() {
    const {children, handleClick, isLoggedIn} = this.props;
    let navBar = null;

    if (isLoggedIn) {
      navBar = (
        <div>
         <Link to="/list"><img src={listing} className="navigation-icons" alt="Home" /></Link>
         <a href="#" onClick={handleClick}><img src={exit} className="navigation-icons" alt="Logout" /></a>
        </div>
      )
     } else {
       navBar = (
        <div>
          <Link to="/welcome"><img src={home} className="navigation-icons" alt="Home" /></Link>
          <Link to="/login"><img src={browser} className="navigation-icons" alt="Login" /></Link>
          <Link to="/signup"><img src={user} className="navigation-icons" alt="Sign Up" /></Link>
          <hr />
          <div className="external-icons"><a href="https://github.com/mbetances805/toDO"><img src={gitHub} alt="github" /></a></div>
          <div className="external-icons"><a href="https://www.linkedin.com/in/mariabetances/"><img src={linkedIn} alt="linkedIn" /></a></div>
          <div className="external-icons"><a href="https://youtu.be/OXuQUxuyuFo"><img src={screenCast} alt="screencast" /></a></div>
        </div>
      )
     }

    return (
      <div>
          <div id="navigation-open-button"><img src={navOpenIcon} alt="nav" onMouseEnter={this.hoverMenu} onClick={this.hoverMenu}/></div>
          <nav id="navigation-bar">
          {
            navBar
          }
        </nav>
        {children}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
};

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

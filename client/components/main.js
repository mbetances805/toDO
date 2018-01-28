import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import browser from '../../images/login.png'
import navOpenIcon from '../../images/menu.png'
import user from '../../images/profile.png'
import home from '../../images/home_copy.png'
import exit from '../../images/exit.png'
import listing from '../../images/list.png'
import gitHub from '../../images/GitHub-Mark-32px.png'
import linkedIn from '../../images/In-2C-34px-R.png'
import screenCast from '../../images/youtube-symbol.png'
import navCloseIcon from '../../images/left-arrow.png'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
      width: 0,
      height: 0
    }
    this.hoverMenu = this.hoverMenu.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.selectNavBarIcons = this.selectNavBarIcons.bind(this);
    this.selectNavBarStyle = this.selectNavBarStyle.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }
  
  componentWillUnmount() {
    window.removeEventLister('resize', this.updateWindowDimensions)
  }

  hoverMenu = () => {
    this.setState({show: !this.state.show});
    if (this.state.show) {
      document.getElementById('navigation-bar').style.visibility = 'hidden';
      document.getElementById('navigation-open-button').style.visibility = 'visible';
    } else {
      document.getElementById('navigation-bar').style.visibility = 'visible';
      document.getElementById('navigation-open-button').style.visibility = 'hidden';
    }
  };
  
  updateWindowDimensions = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight})
  };
  
  selectNavBarIcons = () => {
    if (this.props.isLoggedIn) {
      return (
        <div>
         <Link to="/list"><img src={listing} className="navigation-icons-logged" alt="Home" /></Link>
         <a href="#" onClick={this.props.handleClick}><img src={exit} className="navigation-icons-logged" alt="Logout" /></a>
        </div>
      )
     } else {
       return (
        <div>
          <Link to="/welcome"><img src={home} onClick={this.hoverMenu} className="navigation-icons" alt="Home" /></Link>
          <Link to="/login"><img src={browser} onClick={this.hoverMenu} className="navigation-icons" alt="Login" /></Link>
          <Link to="/signup"><img src={user} onClick={this.hoverMenu} className="navigation-icons" alt="Sign Up" /></Link>
        </div>
      )
     }
  }
  
  selectNavBarStyle = () => {
    let navBar = null;
    if (this.state.width <= 750) {
      if (this.props.isLoggedIn) {
        navBar = document.getElementsByClassName("mobile-navigation-bar");
        // navBar[0].id = "top-right-logged";
        console.log('navBar', navBar)
        return (
          <div>
            {
              this.selectNavBarIcons()
            }
          </div>
        )
      }
    } else {
      if (document.getElementById("top-right-logged")) {
        navBar = document.getElementById("navigation-icons-logged");
        navBar.remove();
      }
      return (
        <div>
          <div id='top-right-corner-icons'>
            <a href="https://github.com/mbetances805/toDO"><img src={gitHub} className="navigation-icons" style={{padding: '10px'}} alt="github" /></a>
            <a href="https://www.linkedin.com/in/mariabetances/"><img src={linkedIn} className="navigation-icons" style={{padding: '10px'}} alt="linkedIn" /></a>
            <a href="https://youtu.be/OXuQUxuyuFo"><img src={screenCast} className="navigation-icons" style={{padding: '10px'}} alt="screencast" /></a>
          </div>
          <div id="navigation-open-button">
            <span><img src={navOpenIcon} alt="nav" onClick={this.hoverMenu} /></span>
          </div>
          <nav id='navigation-bar'>
            <span><img src={navCloseIcon} style={{paddingTop: '10px'}} onClick={this.hoverMenu} className="navigation-icons" alt="close"/></span>
            {
              this.selectNavBarIcons()
            }
          </nav>
        </div>
      )
    }
  }

  render() {
    const {children, handleClick, isLoggedIn} = this.props;
    
    return (
      <div>
        <nav className="mobile-navigation-bar">
          {
            this.selectNavBarStyle()
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

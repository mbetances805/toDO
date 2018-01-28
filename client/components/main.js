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
    } else {
      document.getElementById('navigation-bar').style.visibility = 'visible';
    }
  };
  
  updateWindowDimensions = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight})
  };
  
  selectNavBarIcons = () => {
    if (this.props.isLoggedIn) {
      return (
        <div>
         <Link to="/list"><img src={listing} className="navigation-icons" alt="Home" /></Link>
         <a href="#" onClick={this.handleClick}><img src={exit} className="navigation-icons" alt="Logout" /></a>
        </div>
      )
     } else {
       return (
        <div>
          <Link to="/welcome"><img src={home} className="navigation-icons" alt="Home" /></Link>
          <Link to="/login"><img src={browser} className="navigation-icons" alt="Login" /></Link>
          <Link to="/signup"><img src={user} className="navigation-icons" alt="Sign Up" /></Link>
        </div>
      )
     }
  }
  
  selectNavBarStyle = () => {
    if (this.state.width <= 750) {
      return (
        <nav id='mobile-navigation-bar'>
        {
          this.selectNavBarIcons()
        }
        </nav>
      )
    } else {
      return (
        <div>
          <div id='top-left-corner-icons'>
            <a href="https://github.com/mbetances805/toDO"><img src={gitHub} className="navigation-icons" alt="github" /></a>
            <a href="https://www.linkedin.com/in/mariabetances/"><img src={linkedIn} className="navigation-icons" alt="linkedIn" /></a>
            <a href="https://youtu.be/OXuQUxuyuFo"><img src={screenCast} className="navigation-icons" alt="screencast" /></a>
          </div>
          <div id="navigation-open-button">
            <img src={navOpenIcon} alt="nav" onMouseEnter={this.hoverMenu} onClick={this.hoverMenu} />
          </div>
          <nav id='navigation-bar'>
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
          {
            this.selectNavBarStyle()
          }
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

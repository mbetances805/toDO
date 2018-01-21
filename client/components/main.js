import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import browser from '../../images/browser.png'
import navOpenIcon from '../../images/arrow-point-to-right.png'
import navCloseIcon from '../../images/scroll-arrow-to-left.png'
import gitHub from '../../images/GitHub-Mark-32px.png'
import linkedIn from '../../images/In-2C-34px-R.png'
import user from '../../images/user.png'
import home from '../../images/home.png'
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }
  render() {
    const {children, handleClick, isLoggedIn} = this.props
    let navBar = null

    const clickMenu = () => {
      this.setState({show: !this.state.show});
      if (this.state.show) {
        document.getElementById('navigation-bar').style.display = 'inline'
        document.getElementById('navigation-close-button').style.display = 'inline-block'
        document.getElementById('navigation-open-button').style.display = 'none'
      } else {
        document.getElementById('navigation-bar').style.display = 'none'
        document.getElementById('navigation-close-button').style.display = 'none'
        document.getElementById('navigation-open-button').style.display = 'inline-block'
      }
    }

    if (isLoggedIn) {
      navBar = (
        <div>
         <Link to="/home">HOME</Link>
         <Link to="/new">ADD ACTIVITY</Link>
         <Link to="/list">TO DO LIST</Link>
         <a href="#" onClick={handleClick}>LOGOUT</a>
        </div>
      )
     } else {
       navBar = (
        <div>
          <Link to="/welcome"><img src={home} alt="Home" /></Link>
          <Link to="/login"><img src={browser} alt="Login" /></Link>
          <Link to="/signup"><img src={user} alt="Sign Up" /></Link>
          <hr />
          <div><a href="https://github.com/mbetances805/toDO"><img src={gitHub} alt="github" /></a></div>
          <div><a href="https://www.linkedin.com/in/mariabetances/"><img src={linkedIn} alt="linkedIn" /></a></div>
        </div>
      )
     }

    return (
      <div>
          <button id="navigation-open-button"><img src={navOpenIcon} alt="nav" onClick={clickMenu} /></button>
          <nav id="navigation-bar">
          <button id="navigation-close-button"><img src={navCloseIcon} alt="nav" onClick={clickMenu} /></button>
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
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

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
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

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
    if (this.state.width <= 750) {
      this.setState({show: true})
    } else {
      this.setState({show: !this.state.show});
      if (this.state.show) {
        document.getElementById("navigation-bar").style.visibility = "hidden";
        document.getElementById("navigation-open-button").style.visibility = "visible";
      } else {
        document.getElementById("navigation-bar").style.visibility = "visible";
        document.getElementById("navigation-open-button").style.visibility = "hidden";
      }
    }
  };

  updateWindowDimensions = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight})
  };

  selectNavBarIcons = () => {
    if (this.props.isLoggedIn) {
      return (
        <div>
         <Link to="/list"><img width="25" height="25" src={'https://image.flaticon.com/icons/svg/151/151917.svg'} className="navigation-icons-logged" alt="Home" /></Link>
         <a href="#" onClick={this.props.handleClick}><img width="25" height="25" src={'https://image.flaticon.com/icons/svg/157/157938.svg'} className="navigation-icons-logged" alt="Logout" /></a>
        </div>
      )
     } else {
       return (
        <div>
          <Link to="/welcome"><img width="25" height="25" src={'https://image.flaticon.com/icons/svg/263/263115.svg'} onClick={this.hoverMenu} className="navigation-icons" alt="Home" /></Link>
          <Link to="/login"><img width="25" height="25" src={'https://image.flaticon.com/icons/svg/54/54815.svg'} onClick={this.hoverMenu} className="navigation-icons" alt="Login" /></Link>
          <Link to="/signup"><img width="25" height="25" src={'https://image.flaticon.com/icons/svg/134/134105.svg'} onClick={this.hoverMenu} className="navigation-icons" alt="Sign Up" /></Link>
        </div>
      )
     }
  }

  selectNavBarStyle = () => {
    if (this.state.width <= 750) {
      return (
        <nav>
          {
            this.selectNavBarIcons()
          }
        </nav>
      )
    } else {
      return (
        <div>
          <div id="navigation-open-button">
            <span><img width="25" height="25" src={'https://image.flaticon.com/icons/svg/60/60510.svg'} onClick={this.hoverMenu} alt="nav" /></span>
          </div>
          <nav id="navigation-bar">
            <span><img width="25" height="25" src={'https://image.flaticon.com/icons/svg/109/109618.svg'} onClick={this.hoverMenu} className="navigation-icons" alt="close" /></span>
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
        <div id="top-right-corner-icons">
          <a href="https://github.com/mbetances805/toDO"><img width="25" height="25" src={'https://image.flaticon.com/icons/svg/25/25231.svg'} className="navigation-icons" style={{padding: '10px'}} alt="github" /></a>
          <a href="https://www.linkedin.com/in/mariabetances/"><img width="25" height="25" src={'https://image.flaticon.com/icons/svg/25/25320.svg'} className="navigation-icons" style={{padding: '10px'}} alt="linkedIn" /></a>
          <a href="https://youtu.be/OXuQUxuyuFo"><img width="25" height="25" src={'https://image.flaticon.com/icons/svg/152/152810.svg'} className="navigation-icons" style={{padding: '10px'}} alt="screencast" /></a>
        </div>
        <nav className="navigation-bar">
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

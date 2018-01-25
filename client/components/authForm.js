import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
class AuthForm  extends Component {
  constructor () {
    super()
    this.state = {
      validSignUp: false,
      emailTest: false,
      passwordTest: false
    }
    this.validateFields = this.validateFields.bind(this);
    this.validateSignUp = this.validateSignUp.bind(this);
    this.showPasswordMin = this.showPasswordMin.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.passwordTest !== this.state.passwordTest) || prevState.emailTest !== this.state.emailTest) {
      this.validateSignUp();
    }
  }

  validateFields = (evt) => {
    if (evt.target.name === 'email') {
      this.setState({emailTest: (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(evt.target.value))})
    }
    if (evt.target.name === 'password' && evt.target.value.length >= 6) {
      this.setState({passwordTest: true})
    } else if (evt.target.name === 'password' && evt.target.value.length < 6){
      this.setState({passwordTest: false})
    }
  };

  validateSignUp = () => {
    if (this.state.emailTest && this.state.passwordTest) {
      this.setState({validSignUp: true})
    } else {
      this.setState({validSignUp: false})
    }
  };

  showPasswordMin = (evt) => {
    const passMessage = document.getElementById(`${evt.target.name}-message`);
    if (this.props.displayName === 'Sign Up') {
      if (passMessage.style.display === 'inline-block') {
        passMessage.style.display = 'none'
      } else {
        passMessage.style.display = 'inline-block'
      }
    }
  };

  render () {
    const {name, displayName, handleSubmit, error} = this.props;

    return (
      <div className="login-form">
      <div className="login-title">Welcome.</div>
      {
        displayName === 'Login' ? <div className="login-title">Please Log In.</div> : <div className="login-title">Please Sign Up.</div>
      }
        <form onSubmit={handleSubmit} name={name}>
          <div className="login-field">
            <label htmlFor="email"><small>Email</small></label>
            <input
              id="email-field"
              name="email"
              type="text"
              onChange={this.validateFields}
              onMouseEnter={this.showPasswordMin}
              onMouseLeave={this.showPasswordMin}
            />
          </div> <br />
          <div className="login-field">
            <label htmlFor="password"><small>Password</small></label>
            <input
              name="password"
              type="password"
              onChange={this.validateFields}
              onMouseEnter={this.showPasswordMin}
              onMouseLeave={this.showPasswordMin}
              />
          </div>
          <br />
          <span id="email-message">Please enter a valid email address.</span>
          <span id="password-message">Min Password Length: 6 characters.</span>
          <br />
          <div>
          {
            this.state.validSignUp  ?
              <button className="login-button" type="submit">{displayName}</button>
              : <button className="login-button" type="submit" disabled>{displayName}</button>
          }
          </div><br />
          <div>
            {error && error.response && <div> {error.response.data} </div>}
          </div>
        </form>
      </div>
    )
  }
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};

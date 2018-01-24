import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import gitHub from '../../images/GitHub-Mark-32px.png'
import linkedIn from '../../images/In-2C-34px-R.png'

const Footer = () => {
  return (
    <div id='footer'>
      <p>Website created by Maria Betances, Full Stack Developer.
        <span id="external-icons"><a href="https://github.com/mbetances805/toDO"><img src={gitHub} alt="github" /></a></span>
        <span id="external-icons"><a href="https://www.linkedin.com/in/mariabetances/"><img src={linkedIn} alt="linkedIn" /></a></span>
      </p>
        <div>Icons from <a href="https://www.flaticon.com/"
          title="Flaticon">www.flaticon.com</a> are licensed by <a href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </div>
    </div>
  )
}

const mapState = null;

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(Footer))

import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const propTypes = {
  picture: PropTypes.string,
  displayName: PropTypes.string,
  username: PropTypes.string.isRequired,
  emailAdress: PropTypes.string,
}

function Profile ({ picture, displayName, username, emailAdress }) {
  return (
    <div className={styles.root}>

      <div className="col-md-4 col-md-offset-4">
        <img className={styles.avatar} src={picture || ''} />
        <span className={styles.name}> {displayName}</span>
        <ul className={styles.data}>
          <li>
            <span className='fa fa-user'></span> {username}
          </li>
          <li>
            <span className='fa fa-envelope'></span> {emailAdress}
          </li>
        </ul>
      </div>

    </div>
  )
}

Profile.propTypes = propTypes

export default Profile

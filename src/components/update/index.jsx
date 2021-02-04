import React, {useState, Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import InputText from '../InputText';

const propTypes = {
    onSendText: PropTypes.func.isRequired,
    onCloseText: PropTypes.func.isRequired,
    userNameToReply: PropTypes.string.isRequired
  }

const Update = ({ onSendText, onCloseText, userNameToReply }) => {
  
  const [inputs, setInputs] = useState({text:'', images: []});

  return (
    <div>
      <div>
        <InputText
          onSendText={onSendText}
          onCloseText={onCloseText}
          userNameToReply={userNameToReply}
        />
      </div>
      <div>
        <i className="fa fa-plus-circle" className={styles.addFiles}></i>
      </div>
    </div>
  )

}

export default Update;
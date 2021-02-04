import React from 'react'
import PropTypes from 'prop-types'

import Message from '../message'
import styles from './styles.css'

const propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRetweet: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onReplyTweet: PropTypes.func.isRequired
}

function MessageList ({ messages, onRetweet, onFavorite, onReplyTweet }) {
  return (
    <div className={styles.root}>
      {messages.map(msg => {
        // msg.id = msg.id?  msg.id : Math.floor(Math.random() * 10000) + 1;
        return (
          <Message
            key={msg.id}
            text={msg.text || '...'}
            picture={msg.picture}
            displayName={msg.displayName}
            username={msg.username || 'unknown'}
            date={msg.date || Date.now()}
            numRetweets={msg.retweets || 0}
            numFavorites={msg.favorites || 0}
            onRetweet={() => onRetweet(msg.id)}
            onFavorite={() => onFavorite(msg.id)}
            onReplyTweet={() => onReplyTweet(msg.id, msg.username)}
          />
        )
      }).reverse()}
      <div className="col-md-8 col-md-offset-2">
        Message list should appear here...
      </div>
    </div>
    
  )
}

MessageList.propTypes = propTypes

export default MessageList

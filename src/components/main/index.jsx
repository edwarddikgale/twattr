import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as uuid from 'uuid'
import firebase from 'firebase'
import MessageList from '../messageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'
import Update from '../update';

const propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}

class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: Object.assign({}, this.props.user, { retweets: [] }, { favorites: [] }),
      openText: false,
      userNameToReply: '',
      messages: []
    }

    this.handleSendText = this.handleSendText.bind(this)
    this.handleCloseText = this.handleCloseText.bind(this)
    this.handleOpenText = this.handleOpenText.bind(this)
    this.handleRetweet = this.handleRetweet.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.handleReplyTweet = this.handleReplyTweet.bind(this)
  }

  componentDidMount () {
    const messagesRef = firebase.database().ref().child('messages');

    messagesRef.on('value', snapshot => {
      
      console.log('loading messages now...');
      var messageList = [];
      snapshot.forEach(child => {
        var msg = child.val();
        messageList.push(msg);
        //console.log(JSON.stringify(msg));
      });
      console.log(JSON.stringify(messageList));

      this.setState(prevState => ({
        messages: [].concat(messageList),
        openText: false
      }))

    });

    /*
    messagesRef.on('child_added', snapshot => {
      this.setState(prevState => ({
        messages: prevState.messages.concat(snapshot.val()),
        openText: false
      }))
    })*/
  }

  handleSendText (event) {
    event.preventDefault()
    let newMessage = {
      id: uuid.v4(),
      username: this.props.user.email.split('@')[0],
      displayName: this.props.user.displayName,
      picture: this.props.user.photoURL,
      date: Date.now(),
      text: event.target.text.value,
      favorites: 0,
      retweets: 0
    }

    const messageRef = firebase.database().ref().child('messages')
    const messageID = messageRef.push()
    messageID.set(newMessage)

    this.setState({
      messages: this.state.messages.concat([newMessage]),
      openText: false
    })
  }

  handleCloseText (event) {
    event.preventDefault()
    this.setState({ openText: false })
  }

  handleReplyTweet (msgId, userNameToReply) {
    this.setState({
      openText: true,
      userNameToReply
    })
  }

  handleOpenText (event) {
    event.preventDefault()
    this.setState({ openText: true })
  }

  renderOpenText () {
    if (this.state.openText) {
      return (
        <Update
          onSendText={this.handleSendText}
          onCloseText={this.handleCloseText}
          userNameToReply={this.state.userNameToReply}
        />
      )
    }
  }

  handleRetweet (msgId) {
    let alreadyRetweeted = this.state.user.retweets.filter(rt => rt === msgId)
    if (alreadyRetweeted.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) msg.retweets++
        return msg
      })

      let user = Object.assign({}, this.state.user)
      user.retweets.push(msgId)

      this.setState({
        messages,
        user
      })
    }
  }

  handleFavorite (msgId) {
    let alreadyFavorited = this.state.user.favorites.filter(fav => fav === msgId)
    if (alreadyFavorited.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) msg.favorites++
        return msg
      })

      let user = Object.assign({}, this.state.user)
      user.favorites.push(msgId)

      this.setState({
        messages,
        user
      })
    }
  }

  render () {
    return (
      <div className="col-md-8 col-md-offset-2">
        <ProfileBar
          picture={this.props.user.photoURL}
          username={this.props.user.email.split('@')[0]}
          onOpenText={this.handleOpenText}
          onLogout={this.props.onLogout}
        />
        {this.renderOpenText()}
        <MessageList
          messages={this.state.messages}
          onRetweet={this.handleRetweet}
          onFavorite={this.handleFavorite}
          onReplyTweet={this.handleReplyTweet}
        />
      </div>
      
    )
  }
}

Main.propTypes = propTypes

export default Main

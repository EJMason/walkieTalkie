import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Input, Divider, Dimmer, Loader } from 'semantic-ui-react';

import ChatMenu from './ChatMenu';
import ChatTop from './ChatTop';

import { setRoom } from '../../actions/chatActions';
import { sendInfo } from '../../actions/socketActions';

import '../App.css';

@connect(store => ({
  roomname: store.chat.roomname,
  auth_info: store.login,
}))
class Chat extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch(setRoom('red'));
    }, 1000);
  }

  render() {
    if (this.props.roomname === '') {
      return (
        <Dimmer active>
          <Loader>Finding Random Room...</Loader>
        </Dimmer>
      );
    }

    return (
      <div className="pad-it safe-zone">
        <Divider fitted hidden />

        <ChatMenu />

        <Segment color={this.props.roomname} padded>
          <ChatTop />
          <Divider hidden fitted />
          <Input
            action={{ color: 'teal', labelPosition: 'right', icon: 'send', content: 'Send' }} 
            fluid placeholder="Search..."
          />
        </Segment>
      </div>

    );
  }
}

export default Chat;

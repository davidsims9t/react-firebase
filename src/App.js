import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';

// Firebase configuration
const base = Rebase.createClass({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    base.post('messages', {
      data: ['start'],
      context: this,
      then: () => {
        console.log('POSTED')
      }
    })

    base.bindToState('messages', {
      context: this,
      state: 'messages',
      asArray: true
    });
  }

  newMessage = e => {
    e.preventDefault();

    base.post('messages', {
      data: this.state.messages.concat(ReactDOM.findDOMNode(this.refs.message).value),
      context: this,
      then: () => {
        console.log('POSTED')
      }
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.messages.map(message => <li>{message}</li>)}
        </ul>
        <form onSubmit={this.newMessage}>
          <textarea ref='message' placeholder='Message'></textarea>
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));

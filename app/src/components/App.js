import React from 'react'
import axios from 'axios'

import ChatBody from './chats/ChatBody'
import LoginSignupView from './login/LoginSignupView'
import ViewNavBar from './topBar/ViewNavbar'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userId : null,
      name : null,
      roomId : null,
      roomSearch : null,
      login_signup_view : true,
      chat_view : false,
      mounted : false
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleUserSignupLogin = this.handleUserSignupLogin.bind(this);
    this.handleUserLogout = this.handleUserLogout.bind(this);
    this.handleChatSelection = this.handleChatSelection.bind(this);
    this.handleChatExit = this.handleChatExit.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
  }

//===========================================================
//              Top Bar Methods
//===========================================================
 handleUserLogout(){
   var self = this;
   axios.post('/logout', {id :this.state.userId})
   .then(res => {
     self.setState({
       userId : null,
       roomId : null,
       name : null,
       chat_view : false,
       login_signup_view : true
     })
   })
   .catch(err => {
     console.log(err);
   })
 }

  handleChatExit(){
   var self = this;
   if (this.state.roomId) {
    axios.post('/exitChat', {id : this.state.userId})
    .then(res => {
      self.setState({
        chat_view : false,
        roomId : null
      })
    })
    .catch(err => {
      console.log(err);
    })
   }
 }

//===========================================================
//              Login Methods
//===========================================================
 handleUserSignupLogin(res){
   this.setState({
     userId : res.id,
     name : res.firstname,
     login_signup_view  : false
   })
 }

//===========================================================
//              Chatroom Methods
//===========================================================
 handleRoomChange(newRoom) {
   this.setState({
     roomId : newRoom,
   })
 }

//===========================================================
//              ChatSelection Methods
//===========================================================
 handleChatSelection(inputRoomId, searchOptions, result){
   this.setState({
     roomId : inputRoomId,
     roomSearch : {'option' : searchOptions, 'res' : result},
     chat_view : true
   })
 }

//===========================================================
//              Lifecycle Methods
//===========================================================
  componentWillMount(){
   axios.get('/checkSession')
   .then(res => {
     if (res.data.id) {
      if (res.data.roomId) {
        this.setState({
          userId : res.data.id,
          name : res.data.firstname,
          roomId : res.data.roomId,
          mounted : true,
          login_signup_view : false,
          chat_view : true
        })
      } else { 
        this.setState({
          userId : res.data.id,
          name : res.data.firstname,
          mounted : true,
          login_signup_view : false
        })
      }
     } else {
       this.setState({
         mounted : true
       })
     }
   })
   .catch(err => {
     console.log(err);
   })
  }

  render() {
    let navBarProps =  {
      logout : this.handleUserLogout,
      home : this.handleChatExit,
      userId : this.state.userId
    }

    let chatProps = {
      roomChange : this.handleRoomChange,
      userId : this.state.userId,
      roomId : this.state.roomId, 
      name : this.state.name,
      searchResults : this.state.roomSearch,
      selectRoom : this.handleChatSelection,
      chat_view :  this.state.chat_view
    }

    let NavBar = <ViewNavBar {...navBarProps}/>
    let Login = <LoginSignupView userSignupLogin = {this.handleUserSignupLogin} />
    let Chat = <ChatBody {...chatProps}/>
 
    if (this.state.mounted) {
      return (
        <div>
          {NavBar}
          {(this.state.login_signup_view) ? Login : Chat}
        </div>
      )
    } else {
      return null;
    }
  }
}

export default App

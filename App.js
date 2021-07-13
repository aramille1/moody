import * as React from 'react';
import { Component } from 'react';
import 'react-native-gesture-handler';
import Navigation from './src/navigation/navigation'
import auth from '@react-native-firebase/auth';
import userImg from './src/assets/images/user.png'
export const MoodContext = React.createContext();
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      imgPickerModal: false,
      modalVisible: false,
      showAvatarMessageModal: false,
      otpConfirmed: false,
      moodObj:{
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        message: 'message is empty',
        sliderValues: 5,
        leftSideMessage: 'sad',
        rightSideMessage: 'happy',
        username: 'username',
        user:{}
      },
      initializing: true,
      
    };
  }
  


  
  setImgPickerModal = (newVal) => this.setState({imgPickerModal: newVal})

  setModalVisible = (newVal) => this.setState({modalVisible: newVal})

  setShowAvatarMessageModal = (newVal) => this.setState({showAvatarMessageModal: newVal})

  setMoodObj = (obj) => this.setState(prevState =>({
    moodObj:{
      ...prevState.moodObj,
      image: obj.image,
      message: obj.message,
      sliderValues: obj.sliderValues,
      leftSideMessage: obj.leftSideMessage,
      rightSideMessage: obj.rightSideMessage,
      username: obj.username,
    }
  }))
  
  setUsername = (newVal) => this.setState(prevState =>({
    moodObj:{
      ...prevState.moodObj,
      username: newVal
    }
  }))

  setImg = (newVal) => this.setState(prevState =>({
    moodObj:{
      ...prevState.moodObj,
      image: newVal
    }
  }))

  setOtpConfirmed = (newVal) => this.setState({otpConfirmed: newVal})

  setUser = (newVal) => {
    // console.log(newVal.phoneNumber)
    this.setState(prevState =>({
      moodObj:{
        ...prevState.moodObj,
        user: newVal
      }
    }))
    console.log(this.state.moodObj.user)
  }

render(){
  return (
    <MoodContext.Provider 
        value={{

          imgPickerModal: this.state.imgPickerModal,
          setImgPickerModal: this.setImgPickerModal,

          modalVisible: this.state.modalVisible,
          setModalVisible: this.setModalVisible,

          showAvatarMessageModal:this.state.showAvatarMessageModal,
          setShowAvatarMessageModal: this.setShowAvatarMessageModal,

          moodObj: this.state.moodObj,
          setMoodObj: this.setMoodObj,

          username: this.state.username,
          setUsername: this.setUsername,

          setImg: this.setImg,
          
          otpConfirmed: this.state.otpConfirmed,
          setOtpConfirmation: this.setOtpConfirmed,

          user: this.state.moodObj.user,
          setUser: this.setUser
        }}>
          <Navigation/>
    </MoodContext.Provider>
  );
}
}


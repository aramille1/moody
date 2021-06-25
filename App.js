import * as React from 'react';
import { Component } from 'react';
import 'react-native-gesture-handler';
import Navigation from './src/navigation/navigation'
import auth from '@react-native-firebase/auth';

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
        image: '',
        message: '',
        sliderValues: 5,
        leftSideMessage: 'sad',
        rightSideMessage: 'happy',
        username: 'username'
      },
      initializing: true,
      user:{}
    };
  }
  


  
  setImgPickerModal = (newVal) => this.setState({imgPickerModal: newVal})

  setModalVisible = (newVal) => this.setState({modalVisible: newVal})

  setShowAvatarMessageModal = (newVal) => this.setState({showAvatarMessageModal: newVal})

  setMoodObj = (obj) => this.setState({moodObj: obj}) 

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
    this.setState({user:newVal})
    console.log(this.state.user)
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

          user: this.state.user,
          setUser: this.setUser
        }}>
          <Navigation/>
    </MoodContext.Provider>
  );
}
}


import * as React from 'react';
import { Component } from 'react';
import 'react-native-gesture-handler';
import Navigation from './src/navigation/navigation'
import auth from '@react-native-firebase/auth';
import userImg from './src/assets/images/user.png'
export const MoodContext = React.createContext();
import firestore from '@react-native-firebase/firestore'
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      imgPickerModal: false,
      modalVisible: false,
      showAvatarMessageModal: false,
      otpConfirmed: false,
      match: 0,
      moodObj: {
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        message: 'message is empty',
        sliderValues: [5],
        leftSideMessage: 'sad',
        rightSideMessage: 'happy',
        username: 'username',
        user: {
          uid: '',
          phoneNumber: null
        },
        updated: false
      },
      initializing: true,

    };
  }

  componentDidMount() {
    this.userInit()
  }


  userInit = () => {
    let match = 0;
    const subscriber = auth().onAuthStateChanged(user => {
      if (user._auth._authResult) {
        console.log('user is signed in')

        firestore().collection('users').get().then(data => {
          data.docs.forEach(el => {
            if (el._data.user.phoneNumber === user.phoneNumber) {
              match++
            }
          })
          console.log(match) // if match = 1 it means that user is logged in and doesnt need re init
          if (match >= 1) {
            console.log('already initialized, no need another one!');
          }
          else if (match == 0) {
            console.log(match)
            firestore().collection('users').add({
              username: this.state.moodObj.username,
              image: this.state.moodObj.image,
              message: this.state.moodObj.message,
              sliderValues: this.state.moodObj.sliderValues,
              leftSideMessage: this.state.moodObj.leftSideMessage,
              rightSideMessage: this.state.moodObj.rightSideMessage,
              user: {
                uid: auth()._user._user.uid,
                phoneNumber: auth()._user._user.phoneNumber
              },
              updated: this.state.moodObj.updated
            }).then((data) => {
              console.log('User fields initialized', data)
            })
          }
        })
      } else {
        console.log('user is NOT signed in')
      }
    })

    subscriber()

  }

  setImgPickerModal = (newVal) => this.setState({ imgPickerModal: newVal })

  setModalVisible = (newVal) => this.setState({ modalVisible: newVal })

  setShowAvatarMessageModal = (newVal) => this.setState({ showAvatarMessageModal: newVal })

  setMoodObj = (obj) => this.setState(prevState => ({
    moodObj: {
      ...prevState.moodObj,
      image: obj.image,
      message: obj.message,
      sliderValues: obj.sliderValues,
      leftSideMessage: obj.leftSideMessage,
      rightSideMessage: obj.rightSideMessage,
      username: obj.username,
      updated:obj.updated
    }
  }))

  setUsername = (newVal) => this.setState(prevState => ({
    moodObj: {
      ...prevState.moodObj,
      username: newVal
    }
  }))

  setImg = (newVal) => this.setState(prevState => ({
    moodObj: {
      ...prevState.moodObj,
      image: newVal
    }
  }))

  setOtpConfirmed = (newVal) => this.setState({ otpConfirmed: newVal })

  setUser = (newVal) => {
    this.setState(prevState => ({
      moodObj: {
        ...prevState.moodObj,
        user: newVal
      }
    }))
  }

  setSliderVal = (newVal) => {
    (this.setState(prevState => ({
      moodObj: {
        ...prevState.moodObj,
        sliderValues: newVal
      }
    }))

    )
    console.log(this.state.moodObj.sliderValues)
  }

  setLeftSideMessage = (newVal) => {
    this.setState(prevState => ({
      moodObj: {
        ...prevState.moodObj,
        leftSideMessage: newVal
      }
    }))
  }

  setRightSideMessage = (newVal) => {
    this.setState(prevState => ({
      moodObj: {
        ...prevState.moodObj,
        rightSideMessage: newVal
      }
    }))
  }

  render() {
    if (this.initializing) { return null }
    return (
      <MoodContext.Provider
        value={{

          imgPickerModal: this.state.imgPickerModal,
          setImgPickerModal: this.setImgPickerModal,

          modalVisible: this.state.modalVisible,
          setModalVisible: this.setModalVisible,

          showAvatarMessageModal: this.state.showAvatarMessageModal,
          setShowAvatarMessageModal: this.setShowAvatarMessageModal,

          moodObj: this.state.moodObj,
          setMoodObj: this.setMoodObj,

          username: this.state.username,
          setUsername: this.setUsername,

          setImg: this.setImg,

          otpConfirmed: this.state.otpConfirmed,
          setOtpConfirmation: this.setOtpConfirmed,

          user: this.state.moodObj.user,
          setUser: this.setUser,

          setSliderVal: this.setSliderVal,
          setLeftSideMessage: this.setLeftSideMessage,
          setRightSideMessage: this.setRightSideMessage
        }}>
        <Navigation />
      </MoodContext.Provider>
    );
  }
}


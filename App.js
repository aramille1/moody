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
      moodObj:{
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        message: 'message is empty',
        sliderValues: [5],
        leftSideMessage: 'sad',
        rightSideMessage: 'happy',
        username: 'username',
        user:{
          uid: '',
          phoneNumber: null
        }
      },
      initializing: true,
      
    };
  }
  
    componentDidMount(){
      firestore().collection('users').get().then(data=>{
        console.log(data.empty)

      })
    // const subscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
    // this.setState(prevState =>({
    //   moodObj:{
    //     ...prevState.moodObj,
    //     user: {
    //       uid: auth()._user._user.uid,
    //       phoneNumber: auth()._user._user.phoneNumber
    //     }
    //   }
    // }))

    this.userInit()
    

    // console.log(auth()._user._user.phoneNumber)
    //   firestore()
    // .collection('users')
    // .onSnapshot(snapshots =>{
    //   snapshots.forEach(doc =>{
    //       this.setState(prevState =>({
    //         moodObj:{
    //           ...prevState.moodObj,
    //           image:doc._data.image,
    //           message: doc._data.message,
    //           sliderValues: doc._data.sliderValues,
    //           leftSideMessage: doc._data.lMessage,
    //           rightSideMessage: doc._data.rMessage,
    //           username: doc._data.username
    //         }
    //       }))
    //   })
    // });
    console.log(this.state)
    // return subscriber; // unsubscribe on unmount

  }


   userInit = async () => {
     const subscriber = auth().onAuthStateChanged(user=>{
       if(user){
         console.log('user is signed in')
         firestore().collection('users').get().then(data=>{
          if(data.empty){
            firestore().collection('users').add({
              username: mood.moodObj.username,
              image: mood.moodObj.image,
              message: mood.moodObj.message,
              sliderValues: mood.moodObj.sliderValues,
              leftSideMessage: mood.moodObj.leftSideMessage,
              rightSideMessage: mood.moodObj.rightSideMessage,
              user:{
                uid: auth()._user._user.uid,
                phoneNumber: auth()._user._user.phoneNumber
              }
            }).then(()=>{
              console.log('User fields initialized')
            })
          }else{
            console.log('already initialized, no need another one!')
          }
        })
       }else{
         console.log('user is NOT signed in')
       }
     })

     subscriber()

  }  


    // Handle user state changes
    //  onAuthStateChanged = (userData) => {
    //   console.log(userData);
    //   console.log(2)

    //   this.setState(prevState =>({
    //     moodObj:{
    //       ...prevState.moodObj,
    //       user:userData
    //     }
    //   }))
    //   if (this.state.initializing) this.setState(prevState =>({
    //     ...prevState.moodObj,
    //     initializing: false
    //   }));
    // }
  

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
    this.setState(prevState =>({
      moodObj:{
        ...prevState.moodObj,
        user: newVal
      }
    }))
  }

  setSliderVal = (newVal) =>{
(    this.setState(prevState =>({
      moodObj:{
        ...prevState.moodObj,
        sliderValues: newVal
      }
    }))
    
  )
  console.log(this.state.moodObj.sliderValues)
}

setLeftSideMessage = (newVal) =>{
  this.setState(prevState =>({
    moodObj:{
      ...prevState.moodObj,
      leftSideMessage: newVal
    }
  }))
}

setRightSideMessage = (newVal) =>{
  this.setState(prevState =>({
    moodObj:{
      ...prevState.moodObj,
      rightSideMessage: newVal
    }
  }))
}

render(){
  if(this.initializing){return null}
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
          setUser: this.setUser,

          setSliderVal: this.setSliderVal,
          setLeftSideMessage: this.setLeftSideMessage,
          setRightSideMessage: this.setRightSideMessage
        }}>
          <Navigation/>
    </MoodContext.Provider>
  );
}
}


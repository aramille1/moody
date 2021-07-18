import React, { useContext, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Emoji from 'react-native-emoji';
import FlashMessage, { showMessage } from "react-native-flash-message";
// import CustomMarker from './CustomMarker/CustomMarker.js';
import SetAvatarMessageModal from '../components/Modal/SetAvatarMessageModal';
import LeftSideMessageModal from '../components/Modal/LeftSideMessageModal';
import RightSideMessageModal from '../components/Modal/RightSideMessageModal';
import { MoodContext } from '../../App';
import AvatarImagePicker from '../components/Modal/AvatarImagePicker'
import gradient from '../assets/images/gradient.png';
import bg from '../assets/images/css-gradient.png';
// import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore'
import userImg from '../assets/images/user.png'

import CustomLabel from '../components/CustomLabel';

export default function MyMoodSettings() {
  const [image, setImage] = React.useState()
  const [message, setMessage] = React.useState()
  const [tempSliderValues, setTempSliderValues] = React.useState([8])
  const [leftSideMessage, setleftSideMessage] = React.useState('sad')
  const [rightSideMessage, setrightSideMessage] = React.useState('happy')
  const [user, setUser] = React.useState([])
  const [userId, setUserId] = React.useState()
  const [phoneNum, setPhoneNum] = React.useState()
  const [phoneUid, setPhoneUid] = React.useState()
  const mood = useContext(MoodContext)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount

}, [])

  // Handle user state changes
  // userData is data from phone OTP registr
   function onAuthStateChanged(userData) {
    if(userData){
      setPhoneNum(userData.phoneNumber)
      setPhoneUid(userData.uid)
       firestore()
      .collection('users')
      .onSnapshot(docs =>{
        let users = [];
        if(docs){
          docs.forEach(doc =>{
            if(doc._data.phoneNumber === userData.phoneNumber){
              setUserId(doc.id) // recording user's id
              users.push(doc.data())
            }
            else{
              console.log('there is no match with users phonenumber')
            }
          })
        }
        setUser(users)
      });
      userInit() // initializing empty fields
    }
  }

  const justChecking = () =>{
    console.log(mood.moodObj)
  }

  // const updateMoodState = async() =>{
  //   console.log(user)
  //   // let obj = {
  //   //   image: user[0].image,
  //   //   message: user[0].message,
  //   //   sliderValues: user[0].sliderValues,
  //   //   leftSideMessage: user[0].lMessage,
  //   //   rightSideMessage: user[0].rMessage,
  //   //   username: user[0].username
  //   // }
  //   // mood.setMoodObj(obj)
  // }
  const submit = () =>{
     firestore()
    .collection('users')
    .doc(userId)
    .update({
      image: image,
      message: message,
      sliderValues: tempSliderValues,
      lMessage: leftSideMessage,
      rMessage: rightSideMessage,
      username: mood.moodObj.username
    })
    .then(() => {
    //   mood.setMoodObj({
    //     image: image,
    //     message: message,
    //     leftSideMessage: leftSideMessage,
    //     rightSideMessage: rightSideMessage,
    //     username: mood.moodObj.username
    // })
      console.log('User updated!');
    });

    showMessage({
      message: "Saved!",
      type: "success",
    });
  }


  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }


  const userInit = async () => {
    firestore().collection('users').get().then(data=>{
      if(data._docs.length == 0){
        firestore().collection('users').add({
          username: mood.moodObj.username,
          image: mood.moodObj.image,
          phoneNumber: phoneNum,
          message: mood.moodObj.message,
          sliderValues: mood.moodObj.sliderValues,
          lMessage: mood.moodObj.leftSideMessage,
          rMessage: mood.moodObj.rightSideMessage,
          uid: phoneUid
        }).then(()=>{
          console.log('User fields initialized')
        })
      }else{
        console.log('already initialized, no need another one!')
      }
    })
  }  


  const customMarker = () => {
    return <Image
    source={{uri: mood.moodObj.image}}
    style={{borderRadius: 45, height: 90, width: 70 }}>
    </Image>
  }
  // const customMarker = () => {
  //   let sliderValues = mood.moodObj.sliderValues
  //   return sliderValues == 0 ? <Emoji name="rage" style={{ fontSize: 40 }} />
  //     : sliderValues == 1 ? <Emoji name="cry" style={{ fontSize: 40 }} />
  //       : sliderValues == 2 ? <Emoji name="disappointed" style={{ fontSize: 40 }} />
  //         : sliderValues == 3 ? <Emoji name="worried" style={{ fontSize: 40 }} />
  //           : sliderValues == 4 ? <Emoji name="unamused" style={{ fontSize: 40 }} />
  //             : sliderValues == 5 ? <Emoji name="neutral_face" style={{ fontSize: 40 }} />
  //               : sliderValues == 6 ? <Emoji name="slightly_smiling_face" style={{ fontSize: 40 }} />
  //                 : sliderValues == 7 ? <Emoji name="smiley" style={{ fontSize: 40 }} />
  //                   : sliderValues == 8 ? <Emoji name="blush" style={{ fontSize: 40 }} />
  //                     : sliderValues == 9 ? <Emoji name="heart_eyes" style={{ fontSize: 40 }} />
  //                       : sliderValues == 10 ? <Emoji name="star-struck" style={{ fontSize: 40 }} />
  //                         : <Emoji name="smiley" style={{ fontSize: 40 }} />
  // }

  return (
    <>
      <View
        // source={bg}
        style={{
          backgroundColor: '#fff',
          flexDirection: 'column',
          flex: 1,
          // resizeMode: 'cover',
          justifyContent: 'space-around',
          alignItems: 'center'
          // height: '100%',
        }}>
        <StatusBar backgroundColor='#fff' barStyle="dark-content" />
        <TouchableOpacity  onPress={logout}>
          <Text style={{borderWidth: 1, borderColor: 'grey', borderRadius: 10,padding: 7,}}>Logout</Text>
        </TouchableOpacity>

        <AvatarImagePicker setImageProp={(image) => setImage(image)} />

        {/* mood slider */}
        <View style={styles.container}>
          <Animatable.View animation="fadeIn">
            <ImageBackground source={gradient} style={styles.trackBgImage}>
              <MultiSlider
                selectedStyle={{
                  backgroundColor: 'transparent',
                }}
                unselectedStyle={{
                  backgroundColor: 'transparent',
                }}
                values={mood.moodObj.sliderValues}
                min={0}
                max={10}
                step={1}
                containerStyle={{
                  height: 30,
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                trackStyle={{
                  height: 50,
                  backgroundColor: 'red',
                }}
                touchDimensions={{
                  height: 100,
                  width: 100,
                  borderRadius: 20,
                  slipDisplacement: 200,
                }}
                markerOffsetY={20}
                markerSize={0}
                customLabel={CustomLabel}
                customMarker={customMarker}
                sliderLength={300}
                // pressedMarkerStyle={{backgroundColor:'#D3D3D3'}}
                markerStyle={{ height: 50, width: 50 }}
                onValuesChangeFinish={(values) => setTempSliderValues(values)}/>
            </ImageBackground>


            {/* sad and happy indicators */}
            <View style={styles.leftAndRightContainer}>
              <View
                style={{
                  flex: 1,
                  width: 100,
                  height: '100%',
                  alignItems: 'flex-start',
                  marginLeft: 0,
                  marginTop: 10
                }}>
                <LeftSideMessageModal leftSideMessage={leftSideMessage} setLeftsideMessageProp={(value) => mood.setLeftSideMessage(value)} />
              </View>
              {/* <View><Text onPress={justChecking}>something</Text></View> */}
              <View
                style={{
                  flex: 1,
                  width: 100,
                  height: '100%',
                  alignItems: 'flex-end',
                  marginTop: 10,
                  marginRight: 0,
                }}>
                <RightSideMessageModal rightSideMessage={rightSideMessage} setRightsideMessageProp={(value) => mood.setRightSideMessage(value)} />
              </View>
            </View>
            {/* end of sad and happy indicators */}
          </Animatable.View>
        </View>
        {/* end of mood slider */}
        <FlashMessage position="top" floating />

        <Animatable.View animation="fadeIn">

          <View style={{ borderRadius: 10, backgroundColor: '#009387' }}>
            <TouchableOpacity style={{ paddingHorizontal: 140, paddingVertical: 15 }}
              onPress={submit}
            >
              <Text style={{ fontSize: 18, color: '#fff', }}>Save</Text>
            </TouchableOpacity>
          </View>

        </Animatable.View>
        <View style={{
          position: "absolute", top: 270, left: tempSliderValues == 10 ? "80%" :
            tempSliderValues == 0 ? "10%" : tempSliderValues == 9 ? "80%" : (tempSliderValues * 10) + "%"
        }}>
          <SetAvatarMessageModal setMessage={(message) => setMessage(message)} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 200,
  },
  leftAndRightContainer: {
    // marginBottom: 320,
    flexDirection: 'row',
    height: 80,
    // paddingHorizontal: 30,
  },
  trackBgImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 300,
    height: 30,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    paddingVertical: 10,
    marginTop: 30,
  },
  image: {
    height: 120,
    width: 80,
    borderRadius: 50,
  },
});

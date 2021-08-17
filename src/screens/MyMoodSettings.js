import React, { useContext, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import auth, { firebase } from '@react-native-firebase/auth';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Emoji from 'react-native-emoji';
import FlashMessage, { showMessage } from 'react-native-flash-message';
// import CustomMarker from './CustomMarker/CustomMarker.js';
import SetAvatarMessageModal from '../components/Modal/SetAvatarMessageModal';
import LeftSideMessageModal from '../components/Modal/LeftSideMessageModal';
import RightSideMessageModal from '../components/Modal/RightSideMessageModal';
import { MoodContext } from '../../App';
import AvatarImagePicker from '../components/Modal/AvatarImagePicker';
import gradient from '../assets/images/gradient.png';
import bg from '../assets/images/css-gradient.png';
// import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import userImg from '../assets/images/user.png';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import storage from '@react-native-firebase/storage';

import CustomLabel from '../components/CustomLabel';

export default function MyMoodSettings() {
  const [image, setImage] = React.useState();
  const [message, setMessage] = React.useState('empty message');
  const [tempSliderValues, setTempSliderValues] = React.useState([8]);
  const [leftSideMessage, setleftSideMessage] = React.useState('sad');
  const [rightSideMessage, setrightSideMessage] = React.useState('happy');
  const [user, setUser] = React.useState([]);
  const [userId, setUserId] = React.useState();
  const [phoneNum, setPhoneNum] = React.useState();
  const [phoneUid, setPhoneUid] = React.useState();
  const mood = useContext(MoodContext);
  const [username, setUsername] = React.useState('username');
  const [visible, setVisible] = React.useState(false);
  const [uploading, setUploading] = React.useState(false)
  const [imageIsUploaded, setImageIsUploaded] = React.useState(false)
  const [transferred, setTransferred] = React.useState(0)

  useEffect(() => {

    firestore()
      .collection('users')
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
          if (doc.data().user.phoneNumber === auth()._user._user.phoneNumber) {
            setUserId(doc.id); // recording user's id
            let users = user.slice();
            users.push(doc.data());
            setUser(users);
            users.forEach((user) => {
              setTempSliderValues(user.sliderValues),
                setUsername(user.username),
                setImage(user.image),
                setleftSideMessage(user.leftSideMessage),
                setrightSideMessage(user.rightSideMessage);
            });
          } 
        });
      });
  }, []);

  // Handle user state changes
  // userData is data from phone OTP registr
  // function onAuthStateChanged(userData) {
  //   if (userData) {
  //     console.log('user exists', userData);
  //     setPhoneNum(userData.phoneNumber);
  //     setPhoneUid(userData.uid);
  //     firestore()
  //       .collection('users')
  //       .onSnapshot((docs) => {
  //         // console.log(docs)
  //         let users = [];
  //         if (docs) {
  //           docs.forEach((doc) => {
  //             // console.log(doc)
  //             if (doc._data.user.phoneNumber === userData.phoneNumber) {
  //               setUserId(doc.id); // recording user's id
  //               users.push(doc.data());
  //             } else {
  //               console.log('there is no match with users phonenumber');
  //             }
  //           });
  //         }
  //         setUser(users);
  //       });
  //   }
  //   console.log('userData doesnt exists');
  // }

  const justChecking = () => { }

  const submit = async () => {

    if (imageIsUploaded) {
      uploadImageToCloudStorage()
      setImageIsUploaded(false)

    } else {
      let userObject = {
        image: image,
        message: message,
        sliderValues: tempSliderValues,
        leftSideMessage: leftSideMessage,
        rightSideMessage: rightSideMessage,
        username: username,
      };
      console.log(userObject);
      firestore().collection('users').doc(userId).update(userObject);
      showMessage({
        message: 'Saved!',
        type: 'success',
      });
    }
  };


  const uploadImageToCloudStorage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

    setUploading(true)
    setTransferred(0)

    const task = storage().ref(filename).putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      )
    });

    try {
      await task
      setUploading(false)
      showMessage({
        message: 'Saved!',
        type: 'success',
      });
    } catch (error) {
      console.log(error)
    }

    let imgRef = firebase.storage().ref(filename)

    imgRef
      .getDownloadURL()
      .then((url) => {
        console.log(url)
        setImage(url)
        let userObject = {
          image: url,
          message: message,
          sliderValues: tempSliderValues,
          leftSideMessage: leftSideMessage,
          rightSideMessage: rightSideMessage,
          username: username,
        };
        firestore().collection('users').doc(userId).update(userObject);
      })
  }

  // const logout = () => {
  //   auth()
  //     .signOut()
  //     .then(() => console.log('User signed out!'));
  // };

  const onSignIn = () => {
    mood.setUsername(username);
    setVisible(false);
  };

  const customMarker = () => {
    return (
      <Image
        source={{ uri: image }}
        style={{ borderRadius: 45, height: 90, width: 70 }}></Image>
    );
  };

  const setImageFunc = (img) => {
    setImage(img)
    setImageIsUploaded(true)
  }

  return (
    <>
      <View
        // source={bg}
        style={{
          backgroundColor: '#fff',
          flexDirection: 'column',
          flex: 1,
          // resizeMode: 'cover',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          // height: '100%',
        }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />


        {/* <View style={{flexDirection:'row',}}> */}
        {/* <TouchableOpacity onPress={logout}>
          <Text
            style={{
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius: 10,
              padding: 7,
            }}>
            Logout
          </Text>
        </TouchableOpacity> */}

        <AvatarImagePicker setImageProp={(image) => setImageFunc(image)} />
        {/* </View> */}


        {/* username */}
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text
            style={{
              // marginTop: 10,
              fontSize: 38,
              fontWeight: 'bold',
              color: '#4f6367',
              marginBottom: 50
            }}>
            {username}
          </Text>
        </TouchableOpacity>
        {/* username */}

        <Modal
          backdropTransitionOutTiming={0}
          onBackdropPress={() => setVisible(false)}
          isVisible={visible}
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            position: 'absolute',
            top: '25%',
          }}>
          <View style={{ marginLeft: 20, marginTop: 30, marginBottom: 0 }}>
            <Text style={{ color: '#05375a', fontSize: 30 }}>
              What's your name?
            </Text>
          </View>
          <View style={styles.footer}>
            <ScrollView>
              <View style={styles.actionInModal}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Username"
                  style={styles.textInputinModal}
                  autoCapitalize="none"
                  onChangeText={(val) => setUsername(val)}
                />
              </View>
            </ScrollView>
          </View>

          <View style={styles.buttonSave}>
            <TouchableOpacity style={styles.btnSave} onPress={onSignIn}>
              <Text style={styles.textSign}>Save</Text>

              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSkip}
              onPress={() => setVisible(false)}>
              <Text
                style={{ color: '#4f6367', fontWeight: 'bold', display: 'flex' }}>
                Skip
              </Text>

              <MaterialIcons name="navigate-next" color="#4f6367" size={20} />
            </TouchableOpacity>
          </View>
        </Modal>

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
                values={tempSliderValues}
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
                onValuesChangeFinish={(values) => setTempSliderValues(values)}
              />
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
                  marginTop: 10,
                }}>
                <LeftSideMessageModal
                  leftSideMessage={leftSideMessage}
                  setLeftsideMessageProp={(value) => setleftSideMessage(value)}
                />
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
                <RightSideMessageModal
                  rightSideMessage={rightSideMessage}
                  setRightsideMessageProp={(value) =>
                    setrightSideMessage(value)
                  }
                />
              </View>
            </View>
            {/* end of sad and happy indicators */}
          </Animatable.View>
        </View>
        {/* end of mood slider */}


        {uploading ? (
          <View>
            <Text>{transferred}% complted</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            <FlashMessage position="top" floating />

            <Animatable.View animation="fadeIn">
              <View style={{ borderRadius: 10, backgroundColor: '#009387' }}>
                <TouchableOpacity
                  style={{ paddingHorizontal: 140, paddingVertical: 15 }}
                  onPress={submit}>
                  <Text style={{ fontSize: 18, color: '#fff' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </>
        )
        }

        <View
          style={{
            position: 'absolute',
            top: 175,
            left:
              tempSliderValues == 10
                ? '80%'
                : tempSliderValues == 0
                  ? '10%'
                  : tempSliderValues == 9
                    ? '80%'
                    : tempSliderValues * 10 + '%',
          }}>
          <SetAvatarMessageModal
            setMessage={(message) => setMessage(message)}
          />
        </View>
      </View>
    </>
  );
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

  footer: {
    // flex: Platform.OS === 'ios' ? 3 : 9,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // marginHorizontal: 15,
  },
  actionInModal: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInputinModal: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  btnSave: {
    backgroundColor: '#009387',
    paddingHorizontal: 140,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    margin: 10,
  },
  textSign: {
    color: '#fff',
    fontWeight: 'bold',
  },

  btnSkip: {
    backgroundColor: '#fff',
    paddingHorizontal: 140,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
});

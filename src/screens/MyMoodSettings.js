import React, {useContext, useEffect} from 'react';
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
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import auth, {firebase} from '@react-native-firebase/auth';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import LeftSideMessageModal from '../components/Modal/LeftSideMessageModal';
import RightSideMessageModal from '../components/Modal/RightSideMessageModal';
import SetAvatarMessageModal from '../components/Modal/SetAvatarMessageModal';
import {MoodContext} from '../../App';
import AvatarImagePicker from '../components/Modal/AvatarImagePicker';
import gradient from '../assets/images/gradient.png';
import firestore from '@react-native-firebase/firestore';
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
  const mood = useContext(MoodContext);
  const [username, setUsername] = React.useState('username');
  const [visible, setVisible] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [imageIsUploaded, setImageIsUploaded] = React.useState(false);
  const [transferred, setTransferred] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [updated, setUpdated] = React.useState(false)

  useEffect(() => {
    const subscriber = firestore()
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
              setMessage(user.message);
              setleftSideMessage(user.leftSideMessage),
              setrightSideMessage(user.rightSideMessage);
              setIsLoading(false)
              setUpdated(user.updated)
            });
          }
        });
      });
      return() => subscriber();
  }, []);

  const submit = () => {
    if (imageIsUploaded) {
      uploadImageToCloudStorage();
      setImageIsUploaded(false);
    } else {
      let userObject = {
        image: image,
        message: message,
        sliderValues: tempSliderValues,
        leftSideMessage: leftSideMessage,
        rightSideMessage: rightSideMessage,
        username: username,
        updated: true
      };
      firestore().collection('users').doc(userId).update(userObject);
      showMessage({
        message: 'Changes Saved!',
        type: 'success',
      });
    }
  };

  const uploadImageToCloudStorage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(filename).putFile(uploadUri);

    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;
      setUploading(false);
      showMessage({
        message: 'Saved!',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
    }

    let imgRef = firebase.storage().ref(filename);

    imgRef.getDownloadURL().then((url) => {
      console.log(url);
      setImage(url);
      let userObject = {
        image: url,
        message: message,
        sliderValues: tempSliderValues,
        leftSideMessage: leftSideMessage,
        rightSideMessage: rightSideMessage,
        username: username,
        updated: true
      };
      firestore().collection('users').doc(userId).update(userObject);
    });
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const onSignIn = () => {
    mood.setUsername(username);
    setVisible(false);
  };

  const customMarker = () => {
    return (
      <Image
        source={{uri: image}}
        style={styles.customMarkerStyles}>
      </Image>
    );
  };

  const setImageFunc = (img) => {
    setImage(img);
    setImageIsUploaded(true);
  };

  return (
    <>
      <View style={styles.containerStyle}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Modal
          backdropTransitionOutTiming={0}
          onBackdropPress={() => setVisible(false)}
          isVisible={visible}
          style={styles.modalStyles}>
          <View style={{marginLeft: 20, marginTop: 30, marginBottom: 0}}>
            <Text style={{color: '#05375a', fontSize: 30}}>
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

            <TouchableOpacity style={styles.btnSave} onPress={onSignIn}>
              <Text style={styles.textSign}>Save</Text>

              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </TouchableOpacity>

        </Modal>

        {isLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
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
                {/* {updated ? (
                  <Text>true</Text>
                ): (
                  <Text>false</Text>
                )} */}
                
            {/* username */}
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text style={styles.username}>{username}</Text>
            </TouchableOpacity>

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
                      // borderColor: 'black',
                      // borderWidth: 1,
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
                    markerStyle={{height: 50, width: 50}}
                    onValuesChangeFinish={(values) => setTempSliderValues(values)}
                  />
                </ImageBackground>

                {/* sad and happy indicators */}
                <View style={styles.leftAndRightContainer}>
                  <View style={styles.leftsideMsg}>
                    <LeftSideMessageModal
                      leftSideMessage={leftSideMessage}
                      setLeftsideMessageProp={(value) =>  setleftSideMessage(value)}/>
                  </View>

                  <View style={styles.rightsideMsg}>
                    <RightSideMessageModal
                      rightSideMessage={rightSideMessage}
                      setRightsideMessageProp={(value) => setrightSideMessage(value)}/>
                  </View>
                  
                </View>
                {/* end of sad and happy indicators */}
              </Animatable.View>
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
                  <View style={{borderRadius: 10, backgroundColor: '#009387'}}>
                    <TouchableOpacity
                      style={{paddingHorizontal: 140, paddingVertical: 15}}
                      onPress={submit}>
                      <Text style={{fontSize: 18, color: '#fff'}}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </Animatable.View>
              </>
            )}


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
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modalStyles: {
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    top: '25%',
  },
  leftAndRightContainer: {
    flexDirection: 'row',
    height: 80,
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
  spinner: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
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
  username:{
    fontSize: 38,
    fontWeight: 'bold',
    color: '#4f6367',
    marginBottom: 50,
  },
  leftsideMsg:{
    flex: 1,
    width: 100,
    height: '100%',
    alignItems: 'flex-start',
    marginLeft: 0,
    marginTop: 10,
  },
  rightsideMsg:{
    flex: 1,
    width: 100,
    height: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 0,
  },
  customMarkerStyles:{
    borderRadius: 45,
    height: 90,
    width: 90,
    borderWidth: 1,
    borderColor: '#05375a',
  }
});

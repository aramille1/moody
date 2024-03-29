import React, {useContext} from 'react';
import {
  ImageBackground,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {MoodContext} from '../../../App';
import uploadImg from '../../assets/images/camera-icon.png';

export default function AvatarImagePicker({setImageProp, imageIsUploaded}) {
  const [image, setImage] = React.useState();
  const mood = useContext(MoodContext);
  const [username, setUsername] = React.useState('username');

  // const cleanupImages = () => {
  //     ImagePicker.clean()
  //         .then(() => {
  //             console.log('removed tmp images from tmp directory');
  //         })
  //         .catch((e) => {
  //             alert(e);
  //         });
  // }

  // const deleteImage = () => {
  //     ImagePicker.cleanSingle(image ? image.uri : null)
  //         .then(() => {
  //             console.log(`removed tmp image ${image.uri} from tmp directory`);
  //         })
  //         .catch((e) => {
  //             alert(e);
  //         });
  // }

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then((image) => {
        console.log(image);
        const imageUrl = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUrl);
        setImageProp(imageUrl);
        sheetRef.current.snapTo(1);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      const imageUrl = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUrl);
      setImageProp(imageUrl);
      sheetRef.current.snapTo(1);
    });
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => sheetRef.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  const sheetRef = React.useRef();
  const fall = new Animated.Value(1);

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[335, -200]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        callbackNode={fall}
        initialSnap={1}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          // marginBottom: 40,
          alignSelf:'flex-end',
          marginTop: 11,
          marginRight: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
          <Icon name="camera-outline" size={30} />
          {/* <Image style={{width: 40, height: 40}} source={uploadImg} /> */}
          {/* <Text style={{borderWidth: 1, borderColor: 'grey', borderRadius: 10,padding: 7,}}>upload photo</Text> */}
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //     flex: 1,

  // },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderRightColor: 'black',
    borderLeftColor: 'black',

    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#009387',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});

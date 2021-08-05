// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { MoodContext } from '../../App';

const CustomSidebarMenu = (props) => {
  const mood = React.useContext(MoodContext)
  const [user, setUser] = React.useState([])
  const [image, setImage] = React.useState()
  const [username, setUsername] = React.useState('username')
      useEffect(() => {
        firestore()
        .collection('users')
        .onSnapshot(docs =>{
          docs.forEach(doc =>{
            if(doc.data().user.phoneNumber === auth()._user._user.phoneNumber){
              let users = user.slice()
              users.push(doc.data())
              setUser(users)
              users.forEach(user=>{
                setImage(user.image),
                setUsername(user.username)
              })
          }})
        })
    
    }, [])
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';
  let theuser = user[0]
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      {/* <Image
        source={{ uri: BASE_PATH + proileImage }}
        style={styles.sideMenuProfileIcon}
      /> */}
      <ImageBackground
                            source={{
                                uri: image,
                            }}
                            style={{ height: 100, width: 100, alignSelf: 'center' }}
                            imageStyle={{ borderRadius: 15 }}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                {!image ? <Icon
                                    name="camera"
                                    size={35}
                                    color="#4f6367"
                                    style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#4f6367',
                                        borderRadius: 10,
                                        padding: 30
                                    }}
                                /> : null}
                            </View>
                        </ImageBackground>
      <Text style={{alignSelf:"center", marginVertical: 10}}>{username}</Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;

// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { MoodContext } from '../../App';
const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';
  mood = React.useContext(MoodContext)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      {/* <Image
        source={{ uri: BASE_PATH + proileImage }}
        style={styles.sideMenuProfileIcon}
      /> */}
      <ImageBackground
                            source={{
                                uri: mood.moodObj.image,
                            }}
                            style={{ height: 100, width: 100, alignSelf: 'center' }}
                            imageStyle={{ borderRadius: 15 }}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                {!mood.moodObj.image ? <Icon
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
      <Text style={{alignSelf:"center", marginVertical: 10}}>{mood.moodObj.username}</Text>
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

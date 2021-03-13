// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import MyMoodSettings from '../MyMoodSettings/MyMoodSettings.js'
const EditMood = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View >


        <MyMoodSettings/>
         

      </View>
    </SafeAreaView>
  );
};

export default EditMood;

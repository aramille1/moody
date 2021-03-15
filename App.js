// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from './src/components/pages/Main/Main';
import SecondPage from './src/components/SecondPage';
import MyMoodSettings from './src/components/pages/MyMoodSettings/MyMoodSettings'
import OtherMood from './src/components/pages/OtherMood/OtherMood';

// Import Custom Sidebar
import CustomSidebarMenu from './src/components/CustomSidebarMenu/CustomSidebarMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//Structure for the navigatin Drawer
const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

function mainScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="main">
      <Stack.Screen
        name="main"
        component={Main}
        options={{
          title: 'Main', 
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: 'green', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          title: 'Second Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function moodScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="MyMoodSettings">
      <Stack.Screen
        name="MyMoodSettings"
        component={MyMoodSettings}
        options={{
          title: 'My Mood Settings', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: 'brown', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}


function otherMoodScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="OtherMood">
      <Stack.Screen
        name="OtherMood"
        component={OtherMood}
        options={{
          title: 'Other Mood', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: 'brown', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 }, //item style in the drawer
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="main"
          options={{ drawerLabel: 'Main' }}
          component={mainScreenStack}
        />
        <Drawer.Screen
          name="SecondPage"
          options={{ drawerLabel: 'Second page Option' }}
          component={secondScreenStack}
        />
        <Drawer.Screen
          name="EditMood"
          options={{ drawerLabel: 'My Mood Settings' }}
          component={moodScreenStack}
        />
        <Drawer.Screen
          name="OtherMood"
          options={{ drawerLabel: 'Other Mood' }}
          component={otherMoodScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

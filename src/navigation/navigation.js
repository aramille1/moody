import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';


import Main from '../screens/Main';
import MyMoodSettings from '../screens/MyMoodSettings'
import OtherMood from '../screens/OtherMood';
import CustomSidebarMenu from '../components/CustomSidebarMenu';

import PhoneNumScreen from '../screens/PhoneNumScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OTPScreen from '../screens/OtpScreen';

const RootStack = createStackNavigator();
const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="PhoneNumScreen" component={PhoneNumScreen}/>
        <RootStack.Screen name="OtpScreen" component={OTPScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="main" component={AppDrawerScreen}/>

    </RootStack.Navigator>
);

//Structure for the navigatin Drawer
const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row', marginLeft: 5 }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        {/* <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        /> */}
      <Icon name="menu-outline" size={30} color="#373737"  />

      </TouchableOpacity>
    </View>
  );
};

const MainStack = createStackNavigator();
const mainScreenStack = ({ navigation }) =>(
  <MainStack.Navigator initialRouteName="main">
  <MainStack.Screen
    name="main"
    component={Main}
    options={{
      title: '', 
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#fff',//Set Header color
        height: 30
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
        fontSize: 12
      },
    }}
  />
</MainStack.Navigator>
)


const MyMoodStack = createStackNavigator();
const moodScreenStack = ({ navigation }) =>(
  <MyMoodStack.Navigator initialRouteName="MyMoodSettings" >
  <MyMoodStack.Screen
    name="MyMoodSettings"
    component={MyMoodSettings}
    options={{
      title: '', //Set Header Title
      // headerShown: false,
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#fff',//Set Header color
        height: 30,
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
        fontSize: 12
      },
      // headerShown: false 
    }}
  />
</MyMoodStack.Navigator>
)

const otherScreenStack = createStackNavigator();
const otherMoodScreenStack = ({ navigation }) => (
  <otherScreenStack.Navigator initialRouteName="OtherMood">
      <otherScreenStack.Screen
        name="OtherMood"
        component={OtherMood}
        options={{
          title: '', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#fff', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </otherScreenStack.Navigator>
)
const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
    <AppDrawer.Navigator
    drawerContentOptions={{
      activeTintColor: '#2596BE',
      inactiveTintColor: 'black',
      itemStyle: { marginVertical: 5 }, //item style in the drawer
    }}
    drawerContent={(props) => <CustomSidebarMenu {...props} />}>

    <AppDrawer.Screen
      name="main"
      options={{ drawerLabel: 'Main' }}
      component={mainScreenStack}
    />
    <AppDrawer.Screen
      name="EditMood"
      options={{ drawerLabel: 'My Mood Settings', }}
      component={moodScreenStack}
    />
    <AppDrawer.Screen
      name="OtherMood"
      options={{ drawerLabel: 'Other Mood' }}
      component={otherMoodScreenStack}
    />
  </AppDrawer.Navigator>
)

export default () => {
  const [isLoggedIn, setLog] = React.useState(true)
    return (
            <NavigationContainer>
              <AppDrawerScreen/>
                {/* {isLoggedIn ? <RootStackScreen/> :  <AppDrawerScreen/>} */}
            </NavigationContainer>
    )
}

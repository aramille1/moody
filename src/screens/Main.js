// import React, {useEffect} from 'react';
import * as React from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  BackHandler
} from 'react-native';
import Contacts from 'react-native-contacts';

import Icon from 'react-native-vector-icons/Ionicons';
// import {MoodContext} from '../../App';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import OtherMood from './OtherMood';
import MyMoodSettings from './MyMoodSettings';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Main({navigation}) {
  // const mood = React.useContext(MoodContext);

  const [contacts, setContacts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [username, setUsername] = React.useState('username');
  const [users, setUsers] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userId, setUserId] = React.useState();
  const [usersWithId, setUsersWithId] = React.useState([]);

  React.useEffect(() => {
    // const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    // setTimeout(function(){
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
        }).then(() => getUsers());
      } else {
        getUsers();
      }
    // }, 1000)
    // return () => backHandler.remove()
  }, [refreshing]);

  const getUsers = () => {
    let numbers = [];
    Contacts.getAll()
      .then((kontakts) => {
        kontakts.forEach((contact) => {
          contact.phoneNumbers.forEach((num) => {
            let trimmedNum = num.number.replace(/\s/g, '');
            numbers.push(trimmedNum);
          });
        });
        setContacts(numbers);
        const subscriber = firestore()
          .collection('users')
          .onSnapshot((docs) => {
            let tempUsers = [];
            let tempUsersWithId = [];
            docs.forEach((user) => {
              tempUsersWithId.push(user);
              if (
                user.data().user.phoneNumber ===
                auth()._user._user.phoneNumber
              ) {
                setUserId(user.id);
              }
              if (
                numbers.includes(user.data().user.phoneNumber) 
                &&
                user.data().user.phoneNumber !=
                  auth()._user._user.phoneNumber
              ) {
                tempUsers.push(user.data());
                console.log('includes!', user.id);
              }
            });
            setUsersWithId(tempUsersWithId);
            setUsers(tempUsers);
            setLoading(false);
          });
        return () => subscriber();
      })
      .catch((e) => {
        setLoading(false);
      });

    // Contacts.checkPermission();
  };

  const onSignIn = () => {
    mood.setUsername(username);
    // mood.setImg(profileImg)
    console.log(mood.moodObj, 'moodObj');
    setVisible(false);
  };

  const getAvatarInitials = (textString) => {
    if (!textString) return '';

    const text = textString.trim();

    const textSplit = text.split(' ');

    if (textSplit.length <= 1) return text.charAt(0);

    const initials =
      textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

    return initials;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const updateMood = (user) => {
    usersWithId.forEach((u) => {
      if (user.user.phoneNumber === u.data().user.phoneNumber) {
        const subscribe = firestore().collection('users').doc(u.id).update({
          updated: false,
        });
        return () => subscribe();
      }
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.viewContainer}></View>

        {/* this is my users from FireBase */}
        {loading === true ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <ScrollView
            style={{backgroundColor:'#fff'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {users.map((user, index) => (
              <TouchableOpacity
                style={
                  user.updated
                    ? styles.userTouchableUpdated
                    : styles.userTouchable
                }
                key={index}
                onPress={() => {
                  navigation.navigate('home', {
                    screen: 'OtherMood',
                    params: {user},
                  });
                  updateMood(user);
                }}>
                <Image
                  source={{uri: user.image}}
                  style={styles.userProfileImage}></Image>
                <Text style={styles.userUsername}>{user.username}</Text>
                {user.updated ? (
                  <Text
                    style={{
                      color: '#ff2121',
                      position: 'relative',
                      marginLeft: 10
                    }}>
                    {' '}
                    new mood!
                  </Text>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
{/* 
        <View style={styles.editMoodView}>
          <Icon
            onPress={() => navigation.navigate('Settings')}
            name="create-outline"
            size={50}
            color="#373737"
          />
        </View> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
  },
  container3: {
    flex: 1,
    backgroundColor: '#009387',
    justifyContent: 'center',
  },
  footer: {
    // flex: Platform.OS === 'ios' ? 3 : 9,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // marginHorizontal: 15,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
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
  btnSkip: {
    backgroundColor: '#fff',
    paddingHorizontal: 140,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  textSign: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#d3dbd4',
  },
  userTouchableUpdated: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#d3dbd4',
    backgroundColor: '#f3f3f3',
  },
  viewContainer: {
    paddingLeft: 100,
    paddingRight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editMoodView: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 50,
    marginRight: 30,
  },
  userProfileImage: {borderRadius: 45, height: 50, width: 50},
  userUsername: {marginLeft: 20, fontSize: 15},
});

import React, { Component, useEffect } from "react";
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ListItem,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Contacts from "react-native-contacts";
import * as Animatable from 'react-native-animatable';
import Avatar from "../components/Avatar/index"
import SearchBar from '../components/SearchBar/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MoodContext } from '../../App';
import ProfileImagePicker from '../components/Modal/ProfileImagePicker'
import firestore from '@react-native-firebase/firestore'
import { firebase } from "@react-native-firebase/auth";
import auth from '@react-native-firebase/auth';

export default function Main({ navigation }) {
  mood = React.useContext(MoodContext)



  const [profileImg, setProfileImg] = React.useState()
  const [contacts, setContacts] = React.useState([])
  const [searchPlaceholder, setSearchPlaceholder] = React.useState('Search')
  const [typeText, setTypeText] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [visible, setVisible] = React.useState(false)
  const [username, setUsername] = React.useState('username')

  const [users, setUsers] = React.useState([])
  // if you want to read/write the contact note field on iOS, this method has to be called
  // WARNING: by enabling notes on iOS, a valid entitlement file containing the note entitlement as well as a separate
  //          permission has to be granted in order to release your app to the AppStore. Please check the README.md
  //          for further information.
  // Contacts.iosEnableNotesUsage(false);


  //  async componentDidMount() {
  //    if (Platform.OS === "android") {
  //      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //        title: "Contacts",
  //        message: "This app would like to view your contacts."
  //      }).then(() => {
  //        this.loadContacts();
  //      });
  //    } else {
  //      this.loadContacts();
  //    }
  //  }

  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts."
      }).then(() => {
        loadContacts();
      });
    } else {
      loadContacts();
    }
  }, [])

  const getUser = async () => {
    const userDocument = await firestore().collection("users").doc('TpZwxmTlnmbzQSaeRQk3').get()
    console.log(userDocument)
  }
  const getUsers = async () => {
    const users = await firestore()
      .collection("users")
      .where('age', '<', 18)
      .get()
    console.log(users)
  }


  // here we compare numbers in phone contant list and in database list

  const loadContacts = () => {
    let contactArr = []
    let tempUsers = []
    Contacts.getAll()
      .then(allContacts => {
        console.log(allContacts, '[contacts]')
        // this.setState({ contacts, loading: false });
        // setContacts(allContacts);
        allContacts.forEach(contact => {
          // console.log(contact)
          contact.phoneNumbers.forEach(numberEl => {
            let trimmedNumber = numberEl.number.replaceAll(' ', '')
            firestore()
              .collection('users')
              .onSnapshot(docs => {
                docs.forEach(user => {
                  // console.log(user.data().user.phoneNumber, 'userPhoneNumber')
                  // console.log(trimmedNumber, 'trimmedNumber');
                  if (user.data().user.phoneNumber === trimmedNumber) {
                    console.log('matched! this contact => ', contact)
                    // store in contacts all the contacts from phone that matched
                    contactArr.push(contact)
                    // store in users all the contacts from database that matched
                    tempUsers.push(user.data())
                    // filtering through contacts in database and excluding my number
                    const result = tempUsers.filter(data => data.user.phoneNumber != auth()._user._user.phoneNumber)
                    setUsers(result)
                    setLoading(false)
                  }
                })
              })
          })
        })
        // reorderContacts()
      })
      .catch(e => {
        // this.setState({ loading: false });
        setLoading(false)
      });

    setContacts(contactArr)

    Contacts.getCount().then(count => {
      // this.setState({ searchPlaceholder: `Search ${count} contacts` });
      setSearchPlaceholder(`Search ${count} contacts`)
    });

    Contacts.checkPermission();
  }

  const search = (text) => {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === "" || text === null) {
      this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contacts => {
        // this.setState({ contacts });
        setContacts(contacts)
      });
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(text).then(contacts => {
        // this.setState({ contacts });
        setContacts(contacts)
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contacts => {
        // this.setState({ contacts });
        setContacts(contacts)
      });
    }
  }

  const onPressContact = (contact) => {
    var text = typeText;
    // this.setState({ typeText: null });
    setTypeText(null)
    if (text === null || text === '')
      Contacts.openExistingContact(contact)
    else {
      var newPerson = {
        recordID: contact.recordID,
        phoneNumbers: [{ label: 'mobile', number: text }]
      }
      Contacts.editExistingContact(newPerson).then(contact => {
        //contact updated
      });
    }
  }

  // const addNew = () => {
  //   Contacts.openContactForm({}).then(contact => {
  //     // Added new contact
  //     // this.setState(({ contacts }) => ({
  //     //   contacts: [contact, ...contacts],
  //     //   loading: false
  //     // }));
  //     setContacts([contact, ...contacts]),
  //       setLoading(false)
  //   })
  // }

  const onSignIn = () => {
    mood.setUsername(username)
    // mood.setImg(profileImg)
    console.log(mood.moodObj, "moodObj")
    setVisible(false)

  }

  const onUserPress = (user) => {
    console.log(user)

  }

  const getAvatarInitials = textString => {
    if (!textString) return "";

    const text = textString.trim();

    const textSplit = text.split(" ");

    if (textSplit.length <= 1) return text.charAt(0);

    const initials =
      textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

    return initials;
  };

  const test = () => {

    console.log(contacts)
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#fff' barStyle="dark-content" />
        <View
          style={{
            paddingLeft: 100,
            paddingRight: 100,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
        </View>
        {/* <Button title="Add new" onPress={() => addNew()} /> */}


        <SearchBar
          searchPlaceholder={searchPlaceholder}
          onChangeText={search}
        />
        {/* 
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <TextInput
            keyboardType='number-pad'
            style={styles.inputStyle}
            placeholder='Enter number to add to contact'
            onChangeText={text => setTypeText(text)}
            value={typeText}
          />
        </View> */}

        {/* this is my users from FireBase */}
        {
          loading === true ?
            (
              <View style={styles.spinner}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) :
            (
              <View>{users.map((user, index) =>
                <TouchableOpacity style={styles.userTouchable} key={index} onPress={() => navigation.navigate('OtherMood', { screen: 'OtherMood', params: { user } })}>
                  <Image
                    source={{ uri: user.image }}
                    style={styles.userProfileImage}>
                  </Image>
                  <Text style={styles.userUsername}>{user.username}</Text>
                </TouchableOpacity>
              )}</View>
            )
        }
        {/* this is the end my users from FireBase */}



        {/* {
           loading === true ?
             (
               <View style={styles.spinner}>
                 <ActivityIndicator size="large" color="#0000ff" />
               </View>
             ) : (
               <ScrollView style={{ flex: 1 }}>
                 {contacts.map(contact => {
                   return (
                     <ListItem
                       leftElement={
                         <Avatar
                           img={
                             contact.hasThumbnail
                               ? { uri: contact.thumbnailPath }
                               : undefined
                           }
                           placeholder={getAvatarInitials(
                             `${contact.givenName} ${contact.familyName}`
                           )}
                           width={40}
                           height={40}
                         />
                       }
                       key={contact.recordID}
                       title={`${contact.givenName} ${contact.familyName}`}
                       description={`${contact.company}`}
                       onPress={() => onPressContact(contact)}
                       onDelete={() =>
                         Contacts.deleteContact(contact).then(() => {
                           loadContacts();
                         })
                       }
                     />
                   );
                 })}
               </ScrollView>
             )
         } */}



        <View style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flex: 1,
          marginBottom: 50,
          marginRight: 30
        }}>
          <Icon onPress={() => navigation.navigate('EditMood')} name="create-outline" size={50} color="#373737" />
          {/* <Button title="check" onPress={test} /> */}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    alignContent: "center",
    justifyContent: "center"
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: "center"
  },
  container3: {
    flex: 1,
    backgroundColor: '#009387',
    justifyContent: 'center'
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
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
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
    margin: 10
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
  userTouchable: { flexDirection: 'row', alignItems: 'center', marginLeft: 20 },
  userProfileImage: { borderRadius: 45, height: 50, width: 50 },
  userUsername: { marginLeft: 20, fontSize: 15 },
});



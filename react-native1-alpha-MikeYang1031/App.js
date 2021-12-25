// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import { createStackNavigator } from 'react-navigation';
// import { NavigationContainer } from 'react-navigation';

// import Login from './Login';
// import Signup from './Signup';
// import Profile from './Profile';

// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       accessToken: undefined,
//       username: undefined
//     }

//     this.login = this.login.bind(this);
//     this.revokeAccessToken = this.revokeAccessToken.bind(this);

//     this.SignoutButton = this.SignoutButton.bind(this);
//   }

//   /**
//    * Store the username and accessToken here so that it can be
//    * passed down to each corresponding child view.
//    */
//   login(username, accessToken) {
//     this.setState({
//       username: username,
//       accessToken: accessToken
//     });
//   }

//   /**
//    * Revokes the access token, effectively signing a user out of their session.
//    */
//   revokeAccessToken() {
//     this.setState({
//       accessToken: undefined
//     });
//   }

//   /**
//    * Defines a signout button... Your first TODO!
//    */
//   SignoutButton = () => {
//     return <>
//       <View style={{ flexDirection: 'row', marginRight: 25 }}>
//         <TouchableOpacity onPress={() => alert("We should probably change this to log us out! An icon would be nice too!")}>
//           <Text> X</Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   }


//   render() {

//     let AuthStack = createStackNavigator();

//     return (
//       <NavigationContainer>
//         <AuthStack.Navigator>
//           {!this.state.accessToken ? (
//             <>
//               <AuthStack.Screen
//                 name="SignIn"
//                 options={{
//                   title: 'Fitness Tracker Welcome',
//                 }}
//               >
//                 {(props) => <Login {...props} login={this.login} />}
//               </AuthStack.Screen>

//               <AuthStack.Screen
//                 name="SignUp"
//                 options={{
//                   title: 'Fitness Tracker Signup',
//                 }}
//               >
//                 {(props) => <Signup {...props} />}
//               </AuthStack.Screen>
//             </>
//           ) : (
//               <>
//                 <AuthStack.Screen name="FitnessTracker" options={{
//                   headerLeft: this.SignoutButton
//                 }}>
//                   {(props) => <Profile {...props} username={this.state.username} accessToken={this.state.accessToken} revokeAccessToken={this.revokeAccessToken} />}
//                 </AuthStack.Screen>
//               </>

//             )}
//         </AuthStack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }

// export default App;

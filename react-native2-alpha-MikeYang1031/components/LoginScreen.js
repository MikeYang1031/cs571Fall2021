import React from 'react';
import { StyleSheet, TextInput, Text, Button, Image, View, Alert } from 'react-native';
import base64 from 'base-64';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Username",
      password: "Password",
      errors: false
    }
  }
  //Check if login and user exist in the system
  validateLogin(password, user) {


    fetch('http://cs571.cs.wisc.edu:5000/login/', {
      method: 'GET',
      headers: { 'Authorization': 'Basic ' + base64.encode(user + ":" + password) }
    })
      .then(response => response.json())
      .then(json => this.errorCheck(json))
      .catch((error) => {
        // console.log("ERROR:")
        console.log(error)
        // alert("Username or password is incorrect")
        Alert.alert(
          "Incorrect Username or Password",
          'Fix username or password and try again.'
        );
      });
  }
  errorCheck(json) {
    if (json["message"] == "No auth found!" || json["message"] == "Could not verify") {
      this.setState({ errors: true });

      Alert.alert(
        "Incorrect Username or Password",
        'Fix username or password and try again'
      );
    }
    else {
      this.setState({ errors: false });
      var token = json["token"];
      this.props.route.params.login(this.state.username, token);
    }
  }

  ////////////signup////////////
  validateSignup(password, user) {

    fetch('http://cs571.cs.wisc.edu:5000/users/', {
      method: 'POST', headers: {
        'Accept': 'application/json', 'Connection': 'Keep-Alive', 'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: user, password: password })
    })
      .then(response => response.json())
      .then(json => this.errorCheck2(json))
      .catch((error) => {
        console.log(error)
      });
  }

  errorCheck2(json) {
    if (json["message"] == "Field password must be 5 characters or longer." || json["message"] == "Username already taken!") {
      this.setState({ errors: true });
      // alert(json["message"]);
      Alert.alert(
        json["message"],
        'Fix username or password and try again.'
      );
    }
    else {
      this.setState({ errors: false });
      Alert.alert(
        "Account created!",
        'Going to Login Screen'
      );
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Text style={styles.bigText}>FitnessTracker</Text>
          <View style={styles.space}></View>
          <View style={styles.space} />

          <TextInput style={styles.input}
            placeholder="Username"
            onChangeText={(username) => this.setState({ username: username })}
            autoCapitalize="none" />

          <TextInput style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password: password })}
            autoCapitalize="none" />

          <View style={styles.space} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Button style={styles.buttonInline} title="Login" onPress={() => this.validateLogin(this.state.password, this.state.username)} />
            <Text>  </Text>
            <Button style={styles.buttonInline} title="Signup" onPress={() => this.validateSignup(this.state.password, this.state.username)} />

          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bigText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 5,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  spaceHorizontal: {
    display: "flex",
    width: 20,
  },
  buttonInline: {
    display: "flex",
  },
  input: {
    width: 200,
    padding: 10,
    margin: 5,
    height: 40,
    borderColor: "#c9392c",
    borderWidth: 1,
  },
});

import React from 'react';
import { StyleSheet, TextInput, Text, Button, View, Alert } from 'react-native';
//add icon
import { Icon } from 'react-native-elements'


export default class ExerciseScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: props.route.params.duration, calories: props.route.params.calories, name: props.route.params.name
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSave() {
    if (this.state.name === '' || this.state.duration === 0) {
      Alert.alert(
        "Missing Fields",
        'Please address missing fields and try again'
      );
      return;
    }
    this.props.route.params.updateExercise(this.props.route.params.id, this.state.name, this.state.duration, this.state.calories);
    this.props.navigation.navigate('Today');
  }

  async handleDelete() {
    this.props.route.params.deleteExercise(this.props.route.params.id);
    this.props.navigation.navigate('Today');
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container} accessibilityLabel="Please edit your activity infomation in the middle of screen">
        <View style={styles.space}></View>
        <Icon name='arrow-up' type ='evilicon' />
        <View style={styles.space}></View>

        <Button accessibleRole = "button"
            accessibilityLabel="Activity name text entry"
            accessibilityHint="please enter the name of activity" color='#ed0000' style={{ marginTop: 5 }}
            onPress={() => this.togglePicker()} title="                Name               " />

          <View style={styles.space}></View>

          <Button accessibleRole = "button"
          accessibilityLabel="Activity duration text entry"
          accessibilityHint="please enter how long the activity takes" color='#ed0000' style={{ marginTop: 5 }}
            onPress={() => this.togglePicker()} title="                Time                  " />

          <View style={styles.space}></View>

          <Button accessibleRole = "button"
          accessibilityLabel="Activity calories text entry"
          accessibilityHint="Please enter total calories" color='#ed0000' style={{ marginTop: 5 }}
            onPress={() => this.togglePicker()} title="                Calories                  " />

        <View style={styles.space}></View>

        <Button accessibleRole = "button" title="             Delete Activity             " onPress={this.handleDelete}></Button>
        <View style={styles.space}></View>


        <Button accessibleRole = "button" title="             Save Activity               " onPress={() => this.handleSave()}></Button>
        <View style={styles.space}></View>

        <Button accessibleRole = "button" title="                  Finish                " onPress={() => this.props.navigation.navigate('Today')}></Button>

        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 5,
  },
  spaceHorizontal: {
    display: "flex",
    width: 20,
  },
  space: {
    width: 20,
    height: 40,
  },
  buttonInline: {
    display: "flex"
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
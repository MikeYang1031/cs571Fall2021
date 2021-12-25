import React from 'react';
import { StyleSheet, TextInput, Text, Button, View, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Menu from './Menu';
//add icon
import { Icon } from 'react-native-elements'


export default class NewExerciseScreen extends React.Component {

  constructor(props) {
    super(props);
    var d = new Date();
    this.state = { mode: "time", message: "Switch to Date Mode", date: d, duration: 0, calories: 0, name: 'Example: Walking' }
    this.onChange = this.onChange.bind(this);
  }

  showDatepicker = () => {
    showMode('date');
  };

  showTimepicker = () => {
    showMode('time');
  };
  togglePicker() {
    if (this.state.mode === "date") {
      this.setState({ mode: "time", message: "Switch to Date Mode" })
    }
    if (this.state.mode === "time") {
      this.setState({ mode: "date", message: "Switch to Time Mode" })
    }
  }

  onChange(event, selectedDate) {
    this.setState({ date: selectedDate },);
  };

  showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  handlePress() {
    if (this.state.name === '' || this.state.duration === 0) {
      Alert.alert(
        "Missing Fields",
        'Please fill all the fields'
      );
      return;
    }

    this.props.createNewExercise(this.state.name, this.state.duration, this.state.calories, this.state.date.toString());
    var d = new Date();

    this.setState({ mode: "time", message: "Switch to Date Mode", date: d, duration: 0, calories: 0, name: 'Example: Walking' }, () => this.props.navigation.navigate("Home"));
    this.nameInput.clear();
    this.durationInput.clear();
    this.calorieInput.clear();

  }
  render() {
    return (
      <React.Fragment>
        <Menu navigation={this.props.navigation} title="Add an Activity" />
        <View style={styles.container}>

          <View style={styles.space}></View>
          <Icon name='arrow-up' type='evilicon' />

          <Text>Activity Name</Text>
          <TextInput style={styles.input}
            onChangeText={text => this.setState({ name: text })}
            placeholder={this.state.name}
            ref={input => { this.nameInput = input }}
          />
          <View style={styles.space}></View>

          <Text >Activity Duration (minutes)</Text>
          <TextInput style={styles.input}
            onChangeText={text => this.setState({ duration: text })}
            placeholder={this.state.duration.toString() + " minutes"}
            ref={input => { this.durationInput = input }}
          />
          <View style={styles.space}></View>

          <Text >Calories Burned</Text>
          <TextInput style={styles.input}
            onChangeText={text => this.setState({ calories: text })}
            placeholder={this.state.calories.toString() + " calories"}
            ref={input => { this.calorieInput = input }}
          />
          <View style={styles.space}></View>

          <Text >Activity Date</Text><DateTimePicker
            style={styles.input}
            //timeZoneOffsetInSeconds={3600}
            value={this.state.date}
            mode={this.state.mode}
            onChange={this.onChange}
          />
          <Button color='#ed0000' style={{ marginTop: 5 }}
            onPress={() => this.togglePicker()} title={this.state.message} />
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Button title="Save Activity"
              onPress={() => this.handlePress()}></Button>
            <View style={styles.spaceHorizontal}></View>
            <Button title="Finish" onPress={() => this.props.navigation.navigate("Today")}></Button>
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


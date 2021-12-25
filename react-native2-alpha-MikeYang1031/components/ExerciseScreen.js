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
        <View style={styles.container}>
          <View style={styles.space}></View>
          <Icon name='arrow-up' type='evilicon' />
          <Text>Activity Name</Text><TextInput
            style={styles.input}
            onChangeText={text => this.setState({ name: text })}
            placeholder={this.props.route.params.name}
          />
          <Text>Activity Duration (minutes)</Text><TextInput
            style={styles.input}
            onChangeText={text => this.setState({ duration: text })}
            placeholder={this.props.route.params.duration.toString() + " minutes"} />

          <Text>Calories Burned</Text><TextInput
            style={styles.input}
            onChangeText={text => this.setState({ calories: text })}
            placeholder={this.props.route.params.calories.toString() + " calories"}
          />
          <Text>Activity Date</Text>
          <View style={styles.space}></View>

          <Button title="Delete Activity" onPress={this.handleDelete}></Button>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>

            <Button title="Save Activity" onPress={() => this.handleSave()}></Button>
            <View style={styles.spaceHorizontal}></View>

            <Button title="Go Back" onPress={() => this.props.navigation.navigate('Today')}></Button>

          </View>
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
    height: 20,
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
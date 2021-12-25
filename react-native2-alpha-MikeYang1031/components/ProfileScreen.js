import React from 'react';
import { StyleSheet, TextInput, Text, Button, View } from 'react-native';
import Menu from './Menu';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      goalDailyCalories: 0.0,
      goalDailyProtein: 0.0,
      goalDailyCarbohydrates: 0.0,
      goalDailyFat: 0.0,
      goalDailyActivity: 0.0
    }
  }

  async handleSave() {
    await this.props.updateUserData();
    this.props.navigation.navigate('Today')
  }
  render() {
    return (
      <React.Fragment>
        <Menu navigation={this.props.navigation} />
        <View style={styles.container}>

          <Text style={styles.bigText}>Profile</Text>
          <View style={styles.space}></View>

          <Text>First Name</Text><TextInput
            style={styles.input}
            onChangeText={text => this.setState({ firstName: text })}
            placeholder={this.props.firstName}
          />
          <Text>Last Name</Text><TextInput
            style={styles.input}
            onChangeText={text => this.setState({ lastName: text })}
            placeholder={this.props.lastName}
          />

          <Text>Daily Calorie Goal</Text><TextInput
            style={styles.input}
            onChangeText={text => this.props.updateDailyGoal('calories', text)}
            placeholder={this.props.goalDailyCalories.toString()}
          />

          <Text>Daily Protein Goal (grams)</Text><TextInput
            style={styles.input}
            onChangeText={text => this.props.updateDailyGoal('protein', text)}
            placeholder={this.props.goalDailyProtein.toString()}
          />

          <Text>Daily Fats Goal (grams)</Text><TextInput
            style={styles.input}
            onChangeText={text => this.props.updateDailyGoal('fat', text)}
            placeholder={this.props.goalDailyFat.toString()}
          />

          <Text>Daily Carbs Goal (grams)</Text><TextInput
            style={styles.input}
            onChangeText={text => this.props.updateDailyGoal('carbs', text)}
            placeholder={this.props.goalDailyCarbohydrates.toString()}
          />

          <Text>Daily Activity Goal (minutes)</Text><TextInput
            style={styles.input}
            onChangeText={text => this.props.updateDailyGoal('activity', text)}
            placeholder={this.props.goalDailyActivity.toString()}
          />

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Button title="Save" onPress={() => this.handleSave()}></Button>
            <View style={styles.spaceHorizontal}></View>
            <Button title="Back" onPress={() => this.props.navigation.navigate('Today')}></Button>
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
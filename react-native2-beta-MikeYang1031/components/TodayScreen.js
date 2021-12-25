import React from 'react';
import { StyleSheet, TextInput, Text, Button, View, ScrollView } from 'react-native';
import ExerciseView from "./ExerciseView";
import Menu from './Menu';

export default class TodayScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { totalCalories: 0, totalCarbs: 0, totalProtein: 0, totalFat: 0, numMeals: 0, macroDetails: [], meals: [] };
    this.updateExercise = this.updateExercise.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  updateExercise(id, name, duration, calories, date) {

    fetch('http://cs571.cs.wisc.edu:5000/activities/' + id, {
      method: 'PUT', headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token
      },
      body: JSON.stringify({
        name: name,
        duration: duration,
        calories: calories,
        date: date,
      })
    }).then(this.props.fetchTodayData()).catch(error => console.log(error));
  }

  getActivities() {

    let activities = [];
    var arr = Object.values(this.props.activities)[0];

    var counter = 1;
    var currentDate = new Date();
    for (var key in arr) {
      if (arr.hasOwnProperty(key)) {
        var activityDate = new Date(arr[key].date);
        if (activityDate.toDateString() === currentDate.toDateString()) {
          activities.push(<ExerciseView key={counter} 
            navigation={this.props.navigation} 
            deleteExercise={(id) => this.deleteExercise(id)} 
            updateExercise={(id, name, duration, calories, date) => this.updateExercise(id, name, duration, calories, date)} 
            name={arr[key].name} 
            id={arr[key].id} 
            duration={arr[key].duration} 
            date={arr[key].date} 
            calories={arr[key].calories} />)
        }
        counter++;
      }
    }

    return activities;
  }
  // bug TODO !!
  deleteExercise(id) {
    fetch('http://cs571.cs.wisc.edu:5000/activities/' + id, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token } })
      .then(json => console.log(json["message"])).then(this.props.fetchTodayData()).catch(error => console.log(error));
  }



  render() {
    return (
      <ScrollView>
        <Menu navigation={this.props.navigation} title={"Home"} />
        <View style={styles.container}>
        </View>
        <View style={styles.space}></View>

        <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 20 }}>Today's Activity: (click to edit)</Text>
        <View style={styles.space}></View>

          {this.getActivities()}</View>
          <View style={styles.space}></View>
          <View style={styles.space}></View>
          <View style={styles.space}></View>

        <View>
          <Text> ---------------------------  </Text>
          <Text style={styles.container}> Percentage of todays goal: (Not finish)</Text>
        </View>

      </ScrollView>
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
    height: 50,
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
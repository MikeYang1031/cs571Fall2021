import React from 'react';
import { Text, View } from 'react-native';

export default class ExerciseView extends React.Component {

  formatDate(date) {
    var formattedDate = new Date(date).toLocaleTimeString();
    return formattedDate;
  }
  render() {
    return (

      <View accessibilityLabel="Activity Run, 15 oclock 19 minutes, 9 minutes, 9 calories" accessibilityHint="double click to modify"
        style={{ width: 400, alignItems: 'center', maxWidth: 350, marginBottom: 30, marginTop: 30, backgroundColor: 'rgba(161, 202, 252, 0.8)' }}
        onStartShouldSetResponder={() =>
          this.props.navigation.navigate('Exercise', {
            id: this.props.id, name: this.props.name,
            duration: this.props.duration, 
            updateExercise: this.props.updateExercise,
            deleteExercise: this.props.deleteExercise, 
            date: this.props.date.toLocaleString(), 
            calories: this.props.calories
          })}>
        <Text >{this.props.name} - {this.formatDate(this.props.date)}</Text>
        <Text>{this.props.duration} minutes, {this.props.calories} calories </Text>
      </View>
    );
  }
}

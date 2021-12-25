import React from 'react';
import { Text, View } from 'react-native';

export default class ExerciseView extends React.Component {

  formatDate(date) {
    var formattedDate = new Date(date).toLocaleTimeString();
    return formattedDate;
  }
  render() {
    return (

      <View
        style={{ width: 400, alignItems: 'center', maxWidth: 350, marginBottom: 10, marginTop: 10, borderWidth: 10, borderColor:'#ffee6e' }}
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

import React from 'react';
import TodayScreen from './TodayScreen';
import ExerciseScreen from './ExerciseScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { StackItemList, StackContentScrollView } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }} stackContent={props => <StackContentScrollView {...props}>
          <StackItemList {...props} />
        </StackContentScrollView>}>
        <Stack.Screen name="Today">{props => <TodayScreen {...props} meals={this.props.meals} 
        fetchTodayData={() => this.props.fetchTodayData}
          todaysActivity={this.props.todaysActivity} 
          todaysCalories={this.props.todaysCalories} 
          activities={this.props.activities}
          updateUserData={this.props.updateUserData} 
          updateDailyGoal={this.props.updateDailyGoal}
          logout={this.props.logout} 
          username={this.props.username} 
          token={this.props.token}
          goalDailyCalories={this.props.goalDailyCalories} 
          goalDailyProtein={this.props.goalDailyProtein}
          goalDailyFat={this.props.goalDailyFat} 
          goalDailyCarbohydrates={this.props.goalDailyCarbohydrates}
          goalDailyActivity={this.props.goalDailyActivity} 
          fetchUserData={this.props.fetchUserData}
          firstName={this.props.firstName} 
          lastName={this.props.lastName} />}</Stack.Screen>

        <Stack.Screen name="Exercise">{props => <ExerciseScreen {...props} />}</Stack.Screen>
      </Stack.Navigator>
    );
  }
}

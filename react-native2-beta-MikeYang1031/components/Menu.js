import React from 'react';
import { Header } from 'react-native-elements';

export default function Menu(props) {

  return (
    <Header
      leftComponent={{ icon: 'menu', color: '#ffffff', onPress: () => props.navigation.openDrawer() }}
      centerComponent={{ text: props.title, style: { color: '#ffffff' } }}
    />
  );
}


import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile, Register, Pro, Dashboard, newBets, activeBets, betDetail, tabsBets, tabDetail} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack} initialRouteName='Dashboard'>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />
            
      <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen 
        name="Dashboard"
        component={Dashboard}        
        options={{title: t('dashboard.title')}}
      />

      <Stack.Screen
        name="newBets"
        component={newBets}        
        options={screenOptions.newBets}
      />
      <Stack.Screen
        name="activeBets"
        component={activeBets}        
        options={{title: t('activeBets.title')}}
      />

      <Stack.Screen
        name="betDetail"
        component={betDetail}        
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="tabDetail"
        component={tabDetail}        
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="tabsBets"
        component={tabsBets}        
        options={{title: t('tabsBets.title')}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

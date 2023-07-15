import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Dashboard, newBets, activeBets, betDetail, tabsBets, tabDetail, settledBets, setDetail, IRC, giveAways, Customers, Transaction} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack} initialRouteName='Dashboard'>      
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
        name="settledBets"
        component={settledBets}        
        options={{title: t('settledBets.title')}}
      />

      <Stack.Screen
        name="betDetail"
        component={betDetail}        
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="setDetail"
        component={setDetail}        
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
        options={screenOptions.tabLists}        
      />
      <Stack.Screen
        name="IRC"
        component={IRC}        
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Customers"
        component={Customers}        
        options={screenOptions.customLists}        
      />

      <Stack.Screen
        name="giveAways"
        component={giveAways}        
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Transaction"
        component={Transaction}        
        options={{title: t('Transaction.title')}}
      />
    </Stack.Navigator>
  );
};

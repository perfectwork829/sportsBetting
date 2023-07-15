import React, {useCallback, useContext, useEffect, useState} from 'react';
import Storage from '@react-native-async-storage/async-storage';

import {
  IUser,
  IUseData,
  ITheme,
  IBet
} from '../constants/types';

import {
  USERS, 
  BETS
} from '../constants/mocks';
import {light} from '../constants';

export const DataContext = React.createContext({});

export const DataProvider = ({children}: {children: React.ReactNode}) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<ITheme>(light);
  const [user, setUser] = useState<IUser>(USERS[0]);
  const [users, setUsers] = useState<IUser[]>(USERS);
  const [bets, setBets] = useState<IBet[]>(BETS);
  const [bet, setBet] = useState<IBet>({});
  const [dashboardUpdated, setDashboardUpdated] = useState(false);
  const [splitterUpdated, setSplitterUpdated] = useState(false);
  const [newBetUpdated, setNewBetUpdated] = useState(false);

  
  // get isDark mode from storage
  const getIsDark = useCallback(async () => {
    // get preferance gtom storage
    const isDarkJSON = await Storage.getItem('isDark');

    if (isDarkJSON !== null) {
      // set isDark / compare if has updated
      setIsDark(JSON.parse(isDarkJSON));
    }
  }, [setIsDark]);

  // handle isDark mode
  const handleIsDark = useCallback(
    (payload: boolean) => {
      // set isDark / compare if has updated
      setIsDark(payload);
      // save preferance to storage
      Storage.setItem('isDark', JSON.stringify(payload));
    },
    [setIsDark],
  );

  

  // handle user
  const handleUser = useCallback(
    (payload: IUser) => {
      // set user / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(user)) {
        setUser(payload);
      }
    },
    [user, setUser],
  );

 
  // handle Bet
  const handleBet = useCallback(
    (payload: IBet) => {
      // set bet / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(bet)) {
        setBet(payload);
      }
    },
    [bet, setBet],
  );

  // get initial data for: isDark & language
  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  // change theme based on isDark updates
  useEffect(() => {
    setTheme(isDark ? light : light);
  }, [isDark]);

  const contextValue = {
    isDark,
    handleIsDark,
    theme,
    setTheme,
    user,
    users,    
    bets,
    setBets,
    bet,
    handleBet,
    dashboardUpdated,
    setDashboardUpdated,
    splitterUpdated,
    setSplitterUpdated,
    newBetUpdated, 
    setNewBetUpdated,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;

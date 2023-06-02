import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import apiClient from "../constants/http-common";
import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';

const isAndroid = Platform.OS === 'android';

interface IRC {
  amount: number;
}
interface IRCValidation {
  amount: boolean;
}

const IRC = () => {  
  const {user, isDark, setDashboardUpdated} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  
  const [isValid, setIsValid] = useState<IRCValidation>({
    amount: false
  });
  const [registration, setRegistration] = useState<IRC>({
    amount: ''
  });
  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback(
    (value) => {      
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );
  
   //create new NET money.
   async function storeIRCMoney(money_type) {
    console.log('money type===>', money_type);
    const newNetData = {
      amount: registration.amount,
      money_type:  money_type     
    };
    console.log('newNETDAta', newNetData);
    try {
      const res = await apiClient.post("/customers/storeIRCMoney", newNetData, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,        
      };          
      navigation.navigate('Dashboard');             
    } catch (err) {
      console.log(err.response?.data || err);
      //setNewBetResult(fortmatResponse(err.response?.data || err));
      //console.log(fortmatResponse(err.response?.data || err));
    }
  }

  const handleSignUp = useCallback((value: string) => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      console.log('handleIRC', registration);
    }
  }, [isValid, registration]);

  const setNetIrc = (currency_type:number) => {
    storeIRCMoney(currency_type);      
  }

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      amount: regex.amount.test(registration.amount),
    }));
  }, [registration, setIsValid]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.3}>
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s}>
                {t('common.goBack')}
              </Text>
            </Button>

            <Text h4 center white marginBottom={sizes.md}>
              {t('IRC.title_description')}
            </Text>
          </Image>
        </Block>
        {/* amount form */}
        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.xxl)}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}> 
              <Text p semibold center>
                {t('IRC.namePlaceholder')}
              </Text>             
              {/* social buttons */}
              <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <Button outlined shadow={!isAndroid} gradient={gradients.primary} onPress={() => {                  
                  navigation.navigate('Dashboard');
                }}>
                  <Image
                    source={assets.home}
                    height={sizes.m}
                    width={sizes.m}
                    color={colors.light}
                  />
                </Button>
                <Button outlined shadow={!isAndroid} gradient={gradients.primary} onPress={() => {                
                  navigation.navigate('newBets');
                  
                }}> 
                  <Image
                    source={assets.apple}
                    height={sizes.m}
                    width={sizes.m}
                    color={colors.light}
                  />
                </Button>
                <Button outlined shadow={!isAndroid} gradient={gradients.primary} onPress={() => {                  
                  navigation.navigate('activeBets');
                }}>
                  <Image
                    source={assets.bell}
                    height={sizes.m}
                    width={sizes.m}
                    color={colors.light}
                  />
                </Button>
              </Block>
              
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('IRC.amount')}
                  placeholder={t('IRC.namePlaceholder')}
                  success={Boolean(registration.amount && isValid.amount)}
                  danger={Boolean(registration.amount && !isValid.amount)}
                  onChangeText={(value) => handleChange({amount: value})}
                />                
              </Block>
              <Button  
                onPress={()=> {                  
                  setNetIrc(1);
                  setDashboardUpdated(true);
                }}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                >
                <Text bold white transform="uppercase">
                  {t('IRC.currency_dollar')}
                </Text>
              </Button>
              <Block
                row
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[1, 0]}
                  start={[0, 1]}
                  gradient={gradients.divider}
                />
                <Text center marginHorizontal={sizes.s}>
                  {t('common.or')}
                </Text>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[0, 1]}
                  start={[1, 0]}
                  gradient={gradients.divider}
                />
              </Block>
              <Button
                primary
                outlined
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={()=> {                  
                  setNetIrc(2);
                  setDashboardUpdated(true);
                }}>
                <Text bold primary transform="uppercase">
                  {t('IRC.currency_game')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default IRC;

import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import apiClient from "../constants/http-common"

const isAndroid = Platform.OS === 'android';

interface MoneySum {
  sports?: number;
  net?: number;
  irc?: number;
}

const Dashboard = () => {
  const {user, dashboardUpdated, setDashboardUpdated} = useData();
  
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [moneySum, setMoneySum] = useState<MoneySum>();

  const {assets, colors, sizes, gradients} = useTheme();  

   //get the all Stepper' net profit.
   async function getTotalNetProfitList() {      
    try {
      const res = await apiClient.get("/home");

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };            
      //setSportsSum(res.data['total']);         
      setMoneySum({'sports' : res.data['total'], 'net' : res.data['net'], 'irc' : res.data['irc']})      

    } catch (err) {            
      
    }    
  }
 
  useEffect(()=> {  
    getTotalNetProfitList();       
  }, []);
  
  useEffect(() => {    
    getTotalNetProfitList();      
    setDashboardUpdated(false);
  }, [dashboardUpdated])

  return (
    <Block safe marginTop={sizes.xs}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}>
            
            <Block flex={0} align="center" marginTop={sizes.sm}>
              <Image
                width={64}
                height={64}
                marginBottom={sizes.sm}
                source={{uri: user?.avatar?.toString()}}
                resizeMode={'cover'}
              />
              <Text h5 center white>
                {user?.name}
              </Text>
              <Text p center white style={{
                    marginBottom: 20                  
                }}>
                {user?.department}
              </Text>                            
            </Block>
          </Image>

          {/* Dashboard: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginBottom={sizes.sm}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center">
                <Text h5>{moneySum?.sports}$</Text>
                <Text>{t('dashboard.sports')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{moneySum?.net}$</Text>
                <Text>{t('dashboard.net')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{moneySum?.irc}$</Text>
                <Text>{t('dashboard.irc')}</Text>
              </Block>
            </Block>
          </Block>
        
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.info} marginBottom={sizes.xs} onPress={() => navigation.navigate('newBets')}>
                <Text white bold transform="uppercase">
                    New Bet
                </Text>
            </Button>
        </Block>
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.warning} marginBottom={sizes.xs} onPress={() => navigation.navigate('activeBets')}>
                <Text white bold transform="uppercase">
                    Active bets
                </Text>
            </Button>
        </Block>
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.danger} marginBottom={sizes.xs} onPress={() => navigation.navigate('settledBets')}>
                <Text white bold transform="uppercase">
                    settled bets
                </Text>
            </Button>
        </Block>
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.success} marginBottom={sizes.xs} onPress={() => navigation.navigate('tabsBets')}>
                <Text white bold transform="uppercase">
                    tabs
                </Text>
            </Button>
        </Block>
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.secondary} marginBottom={sizes.xs} onPress={() => navigation.navigate('IRC')}>
                <Text white bold transform="uppercase">
                    IRC
                </Text>
            </Button>
        </Block>    
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.primary} marginBottom={sizes.xs} onPress={() => navigation.navigate('Customers')}>
                <Text white bold transform="uppercase">
                    Customers
                </Text>
            </Button>
        </Block>   
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.info} marginBottom={sizes.xs} onPress={() => navigation.navigate('giveAways')}>
                <Text white bold transform="uppercase">
                  Misc
                </Text>
            </Button>
        </Block> 
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.success} marginBottom={sizes.xs} onPress={() => navigation.navigate('Transaction')}>
                <Text white bold transform="uppercase">
                  Transaction
                </Text>
            </Button>
        </Block>     
        </Block>
      </Block>
    </Block>
  );
};

export default Dashboard;

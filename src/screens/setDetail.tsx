import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import dayjs from 'dayjs';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import apiClient from "../constants/http-common"
import {IBet} from '../constants/types';

const isAndroid = Platform.OS === 'android';

const setDetail = ({route}) => {
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes, fonts, gradients,icons} = useTheme();
  // const [setGetResult] = useState(null);
  const [bet, setBet] = useState<IBet>();

  const fortmatResponse = (res:any) => {
    return JSON.stringify(res, null, 2);
  };

  const goDashboard = () => {
    navigation.navigate('Dashboard');
  }
  const { betID } = route.params;  
    
  //get the special bet data  
  async function getBetData(id:number) {  
    try {
      const res = await apiClient.get("/new_bets/all_bets/"+id);

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };                 
      setBet(res.data);            
    } catch (err) {            
      //setGetResult(fortmatResponse(err.response?.data || err));
      console.log(err);
    }
  }

  useEffect(()=> {        
    getBetData(betID);
  }, [betID]);
  
  return (
    <Block safe marginTop={sizes.md}>
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
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s}>
                Back 
              </Text>
            </Button>
            <Block flex={0} align="center">
              <Text h5 center white>
                Stepper
              </Text>
              <Text p center white>
                Sprots Betting Manager
              </Text>
            </Block>
          </Image>

          <Block card padding={sizes.sm} marginTop={sizes.sm} > 
              <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
                <Block justify="center" center> 
                  <Text p semibold paddingTop={15} flex={1} center>
                    {!bet ? "": bet["customerName"]}
                  </Text>
                </Block>                
                <Block justify="center"flex={2}>
                  <Text p bold center primary>                    
                    {(!bet || bet["0"]["live"]==0) ? "": "  LIVE"}    
                  </Text>
                  <Text info center>
                    {dayjs(!bet ? "": bet["0"]["created_at"]).format('DD MMMM')}
                  </Text> 
                  <Text p center white bold style={{backgroundColor: ((!bet ? "": bet["netProfit"])>0)? '#FFA726': '#EC407A'}}>
                    {!bet ? "": bet["netProfit"]}$                
                  </Text>        
                </Block>
                <Block justify="center" center marginLeft={5}> 
                  <Text p semibold paddingTop={15}>
                  {!bet ? "": bet["0"]["slip"]}
                  </Text>                   
                </Block>                
              </Block>                                                    
          </Block>  
          <Block card row flex={0} align="center" justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info bold>Slip</Text>
            <Text size={sizes.sm} h5 font={fonts?.medium}>{!bet ? "": bet["0"]["slip"]}</Text>
          </Block>
          <Block card row flex={0} align="center" justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info bold>Amount</Text>
            <Text size={sizes.sm} h5 font={fonts?.medium}>{!bet ? "" : bet["0"]["amount"]}$</Text>
          </Block>
          <Block card row flex={0} align="center" justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info bold>Currency</Text>
            <Text size={sizes.sm} h5 font={fonts?.medium}>{!bet ? "": bet["0"]["currency"]}</Text>
          </Block>
          <Block card row flex={0} align="center" justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info bold>Odds</Text>
            <Text size={sizes.sm} h5 font={fonts?.medium}>{!bet ? "": bet["0"]["odds"]}</Text>
          </Block>
          <Block card row flex={0} align="center" justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info bold>Live</Text>
            <Text size={sizes.sm} h5 font={fonts?.medium}>{!bet ? "": bet["0"]["live"]}</Text>
          </Block>
          <Block card row flex={0} align="center" justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info bold>Status</Text>
            <Text size={sizes.sm} h5 font={fonts?.medium}>{!bet ? "": (parseInt(bet["0"]["status"])==1)? "Win": "Lose"}</Text>
          </Block>
          <Block card flex={0} justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info bold>Note</Text>            
            <Text size={sizes.sm} h5 font={fonts?.medium}>{!bet ? "": bet["0"]["notes"]}</Text>
          </Block> 
          <Text
            h5
            bold
            transform="uppercase"          
            gradient={gradients.primary}
            marginTop={sizes.sm}
            align="center"
            >
            Splitter Users
          </Text>
          
          {bet && (bet["0"]["arrSplitters"]).map((item, idx)=>(                              
            <Block key={idx} card style={{flex: 1, flexDirection: 'row'}} justify="space-between"  padding={sizes.sm} marginTop={sizes.xs}>
              <Text key={idx} size={sizes.sm} h4 info >{item.name}</Text>
              <Text key={idx+ 'amount'} size={sizes.sm} h4 >${item.amount}</Text>
            </Block>  
          ))}
          {            
            !bet? <Block card style={{flex: 1, flexDirection: 'row'}} justify="space-between"  padding={sizes.sm} marginTop={sizes.xs}>
                    <Text  size={sizes.sm} h4 warning>{!bet ? "": "There is no any splitter Users at the moment"}</Text>
                  </Block> : null
          }
          <Button
                primary
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.xs}
                marginTop={sizes.md}
                onPress={() => goDashboard()}>
                <Text bold white transform="uppercase">
              {t('settledBets.btn_dashabord')}
            </Text>
          </Button>    
        </Block>
      </Block>
    </Block>
  );
};

export default setDetail;

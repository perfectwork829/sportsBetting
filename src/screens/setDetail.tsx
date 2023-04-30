import React, {useCallback, useEffect, useState} from 'react';
import {Platform, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';
import dayjs from 'dayjs';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import apiClient from "../constants/http-common"
import {ICategory, IBet} from '../constants/types';

const isAndroid = Platform.OS === 'android';

const betDetail = ({route}) => {
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes, fonts, gradients,icons} = useTheme();
  const [getResult, setGetResult] = useState(null);
  const [bet, setBet] = useState<IBet>();
  
  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const handleSocialLink = useCallback(
    (type: 'twitter' | 'dribbble') => {
      const url =
        type === 'twitter'
          ? `https://twitter.com/${user?.social?.twitter}`
          : `https://dribbble.com/${user?.social?.dribbble}`;

      try {
        Linking.openURL(url);
      } catch (error) {
        alert(`Cannot open URL: ${url}`);
      }
    },
    [user],
  );
  const fortmatResponse = (res:any) => {
    return JSON.stringify(res, null, 2);
  };

  const goDashboard = () => {
    navigation.navigate('Dashboard');
  }
  const { betID } = route.params;  
  //const { panelData } = this.props.navigation.getParam('betID');
  
  
  //get the special bet data  
  async function getBetData(id:number) {  
    try {
      const res = await apiClient.get("/new_bets/all_bets/"+id);

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };           
      console.log("settled bet start~~~~~~~~~~ ", res.data); 
      setBet(res.data);      
      console.log("settled bet is ");
    } catch (err) {      
      console.log(err);      
      setGetResult(fortmatResponse(err.response?.data || err));
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
                  <Text p semibold paddingTop={15} flex={1}>
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
                  <Text p center white bold style={{tintColor: colors.icon, backgroundColor: '#E293D3'}}>
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
            <Text size={sizes.sm} h5 font={fonts?.medium}>{!bet ? "": (bet["0"]["status"]==1)? "Win": "Lose"}</Text>
          </Block>
          <Block card flex={0} justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info bold>Note</Text>            
            <Text size={sizes.sm} h5 font={fonts?.medium}>{!bet ? "": bet["0"]["notes"]}</Text>
          </Block> 
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

export default betDetail;

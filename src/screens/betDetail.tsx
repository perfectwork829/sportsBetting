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
  const {assets, colors, sizes, gradients,icons} = useTheme();
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
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };
  const { betID } = route.params;
  //set the special bet's status  
  async function setBetStatus(id, winId) {  
    try {      
      const newStatus = {
        status: winId        
      };      

      const res = await apiClient.post("/new_bets/"+ id + "/updateStatus/", newStatus);
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };            
      setGetResult(fortmatResponse(result));            
    } catch (err) {      
      console.log(err);      
      setGetResult(fortmatResponse(err.response?.data || err));
    }
  }
  //const { panelData } = this.props.navigation.getParam('betID');
  
  
  //get the special bet data  
  async function getBetData(id) {  
    try {
      const res = await apiClient.get("/new_bets/all_bets/"+id);

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };            
      setBet(res.data);      
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
                width={10}
                height={18}
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
                {user?.name}
              </Text>
              <Text p center white>
                {user?.department}
              </Text>
            </Block>
          </Image>


          <Block card padding={sizes.sm} marginTop={sizes.sm} > 
            {/* user details */}
            {user?.name && (
              <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
                <Text p semibold>
                  ManCh
                </Text>
                <Block justify="center" marginLeft={sizes.s}>
                  <Text p bold center primary>
                    Live
                  </Text>
                  <Text p gray center semibold>
                    April 20
                  </Text>                  
                </Block>
                <Text p semibold>
                  Tottemham
                </Text>          
              </Block>            
            )}                                                     
          </Block>  
          <Block card row flex={0} align="center" justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info>Slip</Text>
            <Text size={sizes.sm} h5 >{!bet ? "": bet["0"]["slip"]}</Text>
          </Block>
          <Block card row flex={0} align="center" justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info>Amount</Text>
            <Text size={sizes.sm} h5 >{!bet ? "" : bet["0"]["amount"]}</Text>
          </Block>
          <Block card row flex={0} align="center" justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info>Currency</Text>
            <Text size={sizes.sm} h5 >{!bet ? "": bet["0"]["currency"]}</Text>
          </Block>
          <Block card row flex={0} align="center" justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info>Odds</Text>
            <Text size={sizes.sm} h5 >{!bet ? "": bet["0"]["odds"]}</Text>
          </Block>
          <Block card row flex={0} align="center" justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info>Live</Text>
            <Text size={sizes.sm} h5 >{!bet ? "": bet["0"]["live"]}</Text>
          </Block>
          <Block card flex={0} justify="space-between" padding={sizes.sm} marginTop={sizes.xs}>
            <Text size={sizes.sm} h5 info>Note</Text>            
            <Text size={sizes.sm} h5 >{!bet ? "": bet["0"]["notes"]}</Text>
          </Block>
          <Block row flex={0} align="center" justify="space-between" marginTop={sizes.md}>
            <Button gradient={gradients.primary} marginHorizontal={sizes.s} onPress={(status) => setBetStatus(betID, 1)}>
              <Text white bold transform="uppercase" marginHorizontal={sizes.s}>
                <Image source={icons.winner} marginRight={sizes.l} /> Win
              </Text>
            </Button>
            <Button gradient={gradients.primary} onPress={(status) => setBetStatus(betID, 0)}>
              <Text white bold transform="uppercase" marginHorizontal={sizes.sm}>
              <Image source={icons.cancel} marginRight={sizes.l} /> Void
              </Text>
            </Button>
            <Button gradient={gradients.primary} onPress={(status) => setBetStatus(betID, 2)}>
              <Text white bold transform="uppercase" marginHorizontal={sizes.sm}>
              <Image source={icons.loser} marginRight={sizes.l} /> Lose
              </Text>
            </Button>
          </Block>          
        </Block>
      </Block>
    </Block>
  );
};

export default betDetail;

import React, {useCallback, useEffect, useRef, useState} from 'react';
import dayjs from 'dayjs';
import {TouchableWithoutFeedback, Linking} from 'react-native';

import Text from './Text';
import Block from './Block';
import Image from './Image';
import {useTheme, useTranslation} from '../hooks/';
import {IBet} from '../constants/types';
import { Button} from '../components/';
import {useNavigation} from '@react-navigation/core';
import apiClient from "../constants/http-common"


const Bet = ({
  id,
  slip,
  odds,
  amount,
  live,
  bsplitter,
  notes,
  currency,
  splitters,
  status,
  created_at,
  onPress,
}: IBet) => {
    const {t} = useTranslation();
    const {assets, colors, gradients, icons, sizes} = useTheme();
    const navigation = useNavigation();
    const [bet, setBet] = useState<IBet>({});

    const viewDetail = (bet_id) => {
      
    navigation.navigate('betDetail', {betID: bet_id});
  }
  return (      
    <TouchableWithoutFeedback onPress={() => viewDetail(id) }>
      <Block card padding={sizes.sm} marginTop={sizes.sm} >
        <Block row marginTop={sizes.sm}>
          <Block justify="center" center>            
            <Text p semibold>
              Stepper Manager
            </Text>
          </Block>
          <Block center marginRight={25}>
              <Text p bold center primary>
                {(live==1)? "Live": "Local"}
              </Text>
              <Text p gray center info>
                {dayjs(created_at).format('DD MMMM')}
              </Text>              
          </Block>
          <Block justify="center" center>            
            <Text p semibold>
              Totemism 
            </Text>
          </Block>
        </Block>
        <Block row  marginTop={sizes.m} paddingLeft={10}>
          <Button flex={1}  paddingVertical={0} gradient={gradients.primary} style={{minHeight: sizes.xs}} marginRight={sizes.md}> 
              <Text white bold size={13} transform="uppercase" padding={sizes.xs}>
                  {odds}
              </Text>                    
          </Button>
          <Button flex={1} gradient={gradients.primary}>
              <Text white bold size={13}  transform="uppercase" >
                  {currency}
              </Text>                    
          </Button>
        </Block>                                        
      </Block>        
    </TouchableWithoutFeedback>
  );
  
};

export default Bet;

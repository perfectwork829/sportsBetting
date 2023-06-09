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
import { backgroundColorNames } from 'chalk';


const BetSet = ({
  id,
  slip,
  odds,
  amount,
  live,
  customer_name,
  bsplitter,
  notes,
  currency,
  splitters,
  status,
  created_at,
  netProfit,
  onPress,
}: IBet) => {
    const {t} = useTranslation();
    const {assets, colors, gradients, icons, sizes} = useTheme();
    const navigation = useNavigation();
    const [bet, setBet] = useState<IBet>({});

    const viewDetail = (bet_id:any) => {
      navigation.navigate('setDetail', {betID: bet_id});
    }
  return (      
    <TouchableWithoutFeedback onPress={() => viewDetail(id) }>
      <Block card padding={sizes.sm} marginTop={sizes.sm} >
        <Block row marginTop={sizes.sm}>
          <Block justify="center" center>            
            <Text p semibold>
              {customer_name}
            </Text>
          </Block>
          <Block justify="center" marginRight={25}>
              <Text p bold center primary>
                {(live==1)? "LIVE": ""}
              </Text>
              <Text info center>
                {dayjs(created_at).format('DD MMMM')}
              </Text>     
              <Text p center white bold style={{backgroundColor: (netProfit>0)? '#FFA726': '#EC407A'}}>
                {netProfit}$
              </Text>          
          </Block>
          <Block justify="center" center>            
            <Text p semibold>
              {slip}
            </Text>
          </Block>
        </Block>
        <Block row  marginTop={sizes.m} paddingLeft={10}>
          <Button flex={1}  paddingVertical={0} gradient={gradients.info} style={{minHeight: sizes.xs}} marginRight={sizes.md}> 
              <Text white bold size={16} transform="uppercase" padding={sizes.xs}>
                  {odds}
              </Text>                    
          </Button>
          <Button flex={4} gradient={gradients.primary}>
              <Text white bold size={16}  transform="uppercase" >
                  {amount}$-{currency}
              </Text>                    
          </Button>
        </Block>                                        
      </Block>        
    </TouchableWithoutFeedback>
  );
  
};

export default BetSet;

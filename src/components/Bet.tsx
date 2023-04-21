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

const Bet = ({
  title,
  description,
  image,
  category,
  rating,
  location,
  timestamp,
  user,  
  onPress,
}: IBet) => {
  const {t} = useTranslation();
  const {assets, colors, gradients, icons, sizes} = useTheme();
  const navigation = useNavigation();

  return (      
    <TouchableWithoutFeedback onPress={() => navigation.navigate('betDetail')}>
      <Block card padding={sizes.sm} marginTop={sizes.sm} >
        <Block row marginTop={sizes.sm}>
          <Block justify="center" center>            
            <Text p semibold>
              Tottemham
            </Text>
          </Block>
          <Block center marginRight={25}>
              <Text p bold center primary>
                Live
              </Text>
              <Text p gray center info>
                {dayjs(timestamp).format('DD MMMM')}
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
                  2.99
              </Text>                    
          </Button>
          <Button flex={1} gradient={gradients.primary}>
              <Text white bold size={13}  transform="uppercase" >
                  Applepay
              </Text>                    
          </Button>
        </Block>                                        
      </Block>        
    </TouchableWithoutFeedback>
  );
  
};

export default Bet;

import React, {useCallback, useEffect, useRef, useState} from 'react';
import dayjs from 'dayjs';
import {TouchableWithoutFeedback, Linking} from 'react-native';

import Text from './Text';
import Block from './Block';
import Image from './Image';
import {useTheme, useTranslation} from '../hooks';
import {ITransaction} from '../constants/types';
import { Button} from '.';
import {useNavigation} from '@react-navigation/core';


const Tran = ({
  id,
  type_money,
  amount,
  customer_name,
  type_net,
  created_at,
  description,
  updated_at,
  onPress,
}: ITransaction) => {
    const {t} = useTranslation();
    const {assets, colors, gradients, icons, sizes} = useTheme();
    const navigation = useNavigation();
    const [bet, setBet] = useState<IBet>({});

    const viewDetail = (bet_id) => {
      navigation.navigate('betDetail', {betID: bet_id});
    }
  return (      
    <TouchableWithoutFeedback>
      <Block card padding={sizes.sm} marginTop={sizes.sm} >
        <Block row  marginTop={sizes.m} paddingLeft={10}>
          <Button flex={1}  paddingVertical={0} gradient={gradients.info} style={{minHeight: sizes.xs}}> 
              <Text white bold size={16} transform="uppercase" padding={sizes.xs}>
                {dayjs(created_at).format('H:m DD MMMM')}
              </Text>                    
          </Button>          
        </Block>
        <Block row marginTop={sizes.sm}>
          <Block justify="center" center>   
            <Text bold size={18} padding={sizes.xs} color={colors.facebook}>                
                {description}
            </Text>                      
          </Block>
        </Block>        
      </Block>        
    </TouchableWithoutFeedback>
  );  
};

export default Tran;

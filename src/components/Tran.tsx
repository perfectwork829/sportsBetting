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
    const {colors, gradients, sizes} = useTheme();    
  return (      
    <TouchableWithoutFeedback>
      <Block card marginTop={sizes.sm} >
        <Block row  paddingLeft={10}>
          {/* <Button flex={1}  paddingVertical={0} gradient={gradients.info} style={{minHeight: sizes.xs}}> 
              <Text white bold size={16} transform="uppercase" padding={sizes.xs}>
                {dayjs(created_at).format('H:mm:ss DD MMMM')}
              </Text>                    
          </Button>           */}
        </Block>
        <Block row>
          <Block justify="center" center>  
            <Text green bold size={16} paddingLeft={15} transform="uppercase" padding={sizes.xs}>
                {dayjs(created_at).format('H:mm:ss DD MMMM')}
            </Text>  
            <Text bold size={18} paddingLeft={15} color={colors.facebook}>                
                {description}
            </Text>                      
          </Block>
        </Block>        
      </Block>        
    </TouchableWithoutFeedback>
  );  
};

export default Tran;

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

const Tab = ({
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
    <TouchableWithoutFeedback onPress={() => navigation.navigate('tabDetail')}>
      <Block card padding={sizes.sm} marginTop={sizes.sm} >
        <Block justify='center' flex={1}>
            <Image
              radius={100}                  
              width={sizes.xl}
              height={sizes.xl}
              source={{uri: user?.avatar}}
              marginLeft={sizes.sm}
            />
            <Text p semibold>
              Tottemham
            </Text>
        </Block>
        <Block row  marginTop={sizes.m} paddingLeft={10}>
          <Button flex={1}  paddingVertical={0} gradient={gradients.primary} style={{minHeight: sizes.xs}} marginRight={sizes.md}> 
              <Text white bold size={15} transform="uppercase" padding={sizes.xs}>
                  Net(-$340)
              </Text>                    
          </Button>
          <Button flex={1} gradient={gradients.primary}>
              <Text white bold size={15}  transform="uppercase" >
                  Total($600)
              </Text>                    
          </Button>
        </Block>                                        
      </Block>        
    </TouchableWithoutFeedback>
  );

};

export default Tab;

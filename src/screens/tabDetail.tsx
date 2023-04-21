import React, {useCallback} from 'react';
import {Platform, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';
import dayjs from 'dayjs';

import {Block, Button, Image, Text, Input} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
const isAndroid = Platform.OS === 'android';

const tabDetail = () => {
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes, gradients,icons} = useTheme();
  
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

  return (
    <Image
      background
      source={assets.tabback}
      padding={sizes.padding}
      style={{flex: 1}}>
      <Block safe justify="center">
        <Block safe marginTop={sizes.xxl}>
          <Block        
            paddingHorizontal={sizes.s}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: sizes.padding}}>
            <Block>
              <Image
                background
                resizeMode="cover"            
                paddingBottom={sizes.l}
                radius={sizes.cardRadius}
                source={assets.card6}>
                <Button
                  row
                  flex={0}
                  justify="flex-start"
                  onPress={() => navigation.goBack()}>
                  <Image
                    radius={0}
                    width={10}
                    height={18}
                    color={colors.primary}
                    source={assets.arrow}
                    transform={[{rotate: '180deg'}] }
                  />
                  <Text p primary marginLeft={sizes.s}>
                    Back
                  </Text>
                </Button>
                <Block flex={0} align="center">
                  <Text h2 center primary>
                    Luncy
                  </Text>              
                </Block>
              </Image> 
              <Block  row flex={0} align="center" justify="space-between" padding={sizes.sm} >
                <Text primary size={sizes.sm} h5 bold>a(Applepay) </Text>
                <Input primary style={{width: '60%', fontSize: 30, color: 'white', fontWeight: "bold"}} />
              </Block>
              <Block  row flex={0} align="center" justify="space-between" padding={sizes.sm} >
                <Text primary size={sizes.sm} h5 bold>ca(cashapp) </Text>
                <Input primary  style={{width: '60%'}} />
              </Block>
              <Block  row flex={0} align="center" justify="space-between" padding={sizes.sm} >
                <Text primary size={sizes.sm} h5 bold>e(ethereum) </Text>
                <Input primary style={{width: '60%'}} />
              </Block>
              <Block  row flex={0} align="center" justify="space-between" padding={sizes.sm} >
                <Text primary size={sizes.sm} h5 bold>z(zelle) </Text>
                <Input primary  style={{width: '60%'}} />
              </Block>
              <Block  row flex={0} align="center" justify="space-between" padding={sizes.sm} >
                <Text primary size={sizes.sm} h5 bold>L(litecoin) </Text>
                <Input primary style={{width: '60%'}} />
              </Block>
              <Block  row flex={0} align="center" justify="space-between" padding={sizes.sm} >
                <Text primary size={sizes.sm} h5 bold>U(usdt/usdc) </Text>
                <Input primary  style={{width: '60%'}} />
              </Block>
              <Block  row flex={0} align="center" justify="space-between" padding={sizes.sm} >
                <Text primary size={sizes.sm} h5 bold>M(OSRS) </Text>
                <Input primary style={{width: '60%'}} />
              </Block>              
            </Block>
          </Block>
        </Block>
      </Block>
    </Image>
    
  );
};

export default tabDetail;

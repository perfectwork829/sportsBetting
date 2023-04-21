import React, {useCallback} from 'react';
import {Platform, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';

const isAndroid = Platform.OS === 'android';

const Dashboard = () => {
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes, gradients} = useTheme();  
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
    <Block safe marginTop={sizes.xs}>
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
            
            <Block flex={0} align="center" marginTop={sizes.sm}>
              <Image
                width={64}
                height={64}
                marginBottom={sizes.sm}
                source={{uri: user?.avatar?.toString()}}
                resizeMode={'cover'}
              />
              <Text h5 center white>
                {user?.name}
              </Text>
              <Text p center white style={{
                    marginBottom: 20                  
                }}>
                {user?.department}
              </Text>                            
            </Block>
          </Image>

          {/* Dashboard: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginBottom={sizes.sm}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center">
                <Text h5>${user?.stats?.sports}</Text>
                <Text>{t('dashboard.sports')}</Text>
              </Block>
              <Block align="center">
                <Text h5>${(user?.stats?.net || 0) / 1000}</Text>
                <Text>{t('dashboard.net')}</Text>
              </Block>
              <Block align="center">
                <Text h5>${(user?.stats?.irc || 0) / 1000}</Text>
                <Text>{t('dashboard.irc')}</Text>
              </Block>
            </Block>
          </Block>
        
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.info} marginBottom={sizes.xs} onPress={() => navigation.navigate('newBets')}>
                <Text white bold transform="uppercase">
                    New Bet
                </Text>
            </Button>
        </Block>
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.warning} marginBottom={sizes.xs} onPress={() => navigation.navigate('activeBets')}>
                <Text white bold transform="uppercase">
                    Active bets
                </Text>
            </Button>
        </Block>
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.danger} marginBottom={sizes.xs} onPress={() => navigation.navigate('activeBets')}>
                <Text white bold transform="uppercase">
                    settled bets
                </Text>
            </Button>
        </Block>
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.success} marginBottom={sizes.xs} onPress={() => navigation.navigate('tabsBets')}>
                <Text white bold transform="uppercase">
                    tabs
                </Text>
            </Button>
        </Block>
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.secondary} marginBottom={sizes.xs}>
                <Text white bold transform="uppercase">
                    IRC
                </Text>
            </Button>
        </Block>    
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.primary} marginBottom={sizes.xs}>
                <Text white bold transform="uppercase">
                    Customers
                </Text>
            </Button>
        </Block>   
        <Block paddingHorizontal={sizes.base}>
            <Button flex={1} gradient={gradients.info} marginBottom={sizes.xs}>
                <Text white bold transform="uppercase">
                  GIVEAWAYS
                </Text>
            </Button>
        </Block>     
        </Block>
      </Block>
    </Block>
  );
};

export default Dashboard;

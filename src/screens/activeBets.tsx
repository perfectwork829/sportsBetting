import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useData, useTheme,useTranslation} from '../hooks/';
import {ICategory, IBet} from '../constants/types';
import {Block, Button, Article, Input, Text, Bet} from '../components/';
import Image from '../components/Image';

const activeBets = () => {
  const {t} = useTranslation();
  const data = useData();
  const [selected, setSelected] = useState<ICategory>();
  const [bets, setBets] = useState<IBet[]>([]);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const {assets, colors, gradients, sizes, icons} = useTheme();  
  // init articles
  useEffect(() => {    
    setBets(data?.bets);
    setCategories(data?.categories);
    setSelected(data?.categories[0]);
  }, [data.bets, data.categories]);

  // update articles on category change
  useEffect(() => {
    const category = data?.categories?.find(
      (category) => category?.id === selected?.id,
    );

    const newBets = data?.bets?.filter(
        (bet) => bet?.category?.id === selected?.id,
      );
    setBets(newBets);

  }, [data, selected, setBets]);

  return (
    <Block marginTop={sizes.xs}>
      <Image
        background
        source={assets.card4}        
        style={{flex: 1}}>
        {/* search input */}
        <Block color={colors.card} flex={0} padding={sizes.padding} >
            <Input search placeholder={t('common.search')} />
        </Block>
          {/* categories list */}      
          <Block color={colors.card} row flex={0} paddingVertical={sizes.padding} >
            <Block row>
              {categories?.map((category) => {
                const isSelected = category?.id === selected?.id;
                return (
                    <Button flex={1}
                      radius={sizes.m}
                      marginHorizontal={sizes.s}
                      key={`category-${category?.id}}`}
                      onPress={() => setSelected(category)}
                      gradient={gradients?.[isSelected ? 'primary' : 'light']}                  
                      >      
                      <Text                  
                        bold={isSelected}
                        white={isSelected}
                        black={!isSelected}
                        transform="capitalize"
                        marginHorizontal={sizes.s}
                        padding={sizes.s}
                        style={{fontSize: sizes.xs}}>                    
                          <Image source={isSelected ? icons.check : icons.betting} marginRight={sizes.l} />   {category?.name}
                      </Text>                        
                    </Button>
                  );           
              })}
            </Block>
          </Block>

          <FlatList
            data={bets}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item?.id}`}
            style={{paddingHorizontal: sizes.padding}}
            contentContainerStyle={{paddingBottom: sizes.l}}
            renderItem={({item}) => <Bet {...item}/>}
          />
      </Image>
    </Block>
  );
};

export default activeBets;

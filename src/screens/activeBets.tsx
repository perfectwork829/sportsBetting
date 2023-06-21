import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useData, useTheme,useTranslation} from '../hooks/';
import {ICategory, IBet} from '../constants/types';
import {Block, Button, Article, Input, Text, Bet} from '../components/';
import Image from '../components/Image';
import apiClient from "../constants/http-common"

const activeBets = () => {
  const {t} = useTranslation();
  const data = useData();
  const [selected, setSelected] = useState<ICategory>();
  const [bets, setBets] = useState<IBet[]>([]);
  const [getResult, setGetResult] = useState(null);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const {assets, colors, gradients, sizes, icons} = useTheme();  
  
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  //get the all customers' data  
   async function getActiveBetsData() {  
    try {
      const res = await apiClient.get("/all_bets/3");

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };            
      setBets(res.data[0]);         
    } catch (err) {             
      setGetResult(fortmatResponse(err.response?.data || err));
    }
  }

  // init articles
  // useEffect(() => {    
  //   setBets(data?.bets);
  //   setCategories(data?.categories);
  //   setSelected(data?.categories[0]);
  // }, [data.bets, data.categories]);

  // // update articles on category change
  // useEffect(() => {
  //   const category = data?.categories?.find(
  //     (category) => category?.id === selected?.id,
  //   );

  //   const newBets = data?.bets?.filter(
  //       (bet) => bet?.category?.id === selected?.id,
  //     );
  //   setBets(newBets);

  // }, [data, selected, setBets]);

  useEffect(()=> {    
    getActiveBetsData();
  }, []);

  return (
    <Block marginTop={sizes.xs}>
      <Image
        background
        source={assets.card4}        
        style={{flex: 1}}>
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

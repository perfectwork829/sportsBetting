import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useData, useTheme,useTranslation} from '../hooks/';
import { IBet} from '../constants/types';
import {Block, Bet} from '../components/';
import Image from '../components/Image';
import apiClient from "../constants/http-common"

const activeBets = () => {
  const {t} = useTranslation();
  const data = useData();
  
  const [bets, setBets] = useState<IBet[]>([]);
  // const [getResult, setGetResult] = useState(null);
  
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
      //setGetResult(fortmatResponse(err.response?.data || err));
      console.log(err);
    }
  }

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

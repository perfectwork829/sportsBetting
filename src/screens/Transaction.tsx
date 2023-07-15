import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useData, useTheme,useTranslation} from '../hooks';
import { ITransaction} from '../constants/types';
import {Block, Tran} from '../components';
import Image from '../components/Image';
import apiClient from "../constants/http-common"

const Transaction = () => {
  const {t} = useTranslation();
  const data = useData();
  
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  // const [getResult, setGetResult] = useState(null);
  
  const {assets, colors, gradients, sizes, icons} = useTheme();  
  
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  //get the all customers' data  
   async function getTransactions() {  
    try {
      const res = await apiClient.get("/all_transactions");

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };   
      console.log('transaction data:>>>>>>>>>>>>>>>>',res.data[0]);
      setTransactions(res.data[0]);         
    } catch (err) {             
      //setGetResult(fortmatResponse(err.response?.data || err));
      console.log(err);
    }
  }

  useEffect(()=> {    
    getTransactions();
  }, []);

  return (
    <Block marginTop={sizes.xs}>
      <Image
        background
        source={assets.card4}        
        style={{flex: 1}}>
          <FlatList
            data={transactions}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item?.id}`}
            style={{paddingHorizontal: sizes.padding}}
            contentContainerStyle={{paddingBottom: sizes.l}}
            renderItem={({item}) => <Tran {...item}/>}
          />
      </Image>
    </Block>
  );
};

export default Transaction;

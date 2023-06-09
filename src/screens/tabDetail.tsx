import React, {useCallback, useEffect, useState} from 'react';
import {Platform, Linking, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';
import dayjs from 'dayjs';

import {Block, Button, Image, Text, Input} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import {ICustomer} from '../constants/types';
import apiClient from "../constants/http-common"

const isAndroid = Platform.OS === 'android';

const tabDetail = ({route}) => {
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
  const [customer, setCustomer] = useState<ICustomer>();
  var temp = {};

  const { customerID, customerName } = route.params;
  const [registration, setRegistration] = useState<ICustomer>({    
    id: 0,
    a_apply_pay: 0,
    b_bitcoin: 0,
    e_ethereum: 0,
    z_zelle: 0,    
    u_usdt: 0,
    m_game_currency: 0
  });

  const handleChange = (key: any, value: any) => {
    if(key == "a_apply_pay"){
      setCustomer(customer => ({
        ...customer, a_apply_pay: value
      }));
      return;
    }
    if(key == "b_bitcoin"){
      setCustomer(customer => ({
        ...customer, b_bitcoin: value
      }));
      return;
    }
    if(key == "e_ethereum"){
      setCustomer(customer => ({
        ...customer, e_ethereum: value
      }));
      return;
    }
    if(key == "z_zelle"){
      setCustomer(customer => ({
        ...customer, z_zelle: value
      }));
      return;
    }
    if(key == "u_usdt"){
      setCustomer(customer => ({
        ...customer, u_usdt: value
      }));
      return;
    }
    if(key == "m_game_currency"){
      setCustomer(customer => ({
        ...customer, m_game_currency: value
      }));
      return;
    }
  }

  //save customer's money individually.
  async function saveCustomerMoney() {
    console.log('customer id ====>', customerID);
    const customerMoneyData = {
      id: customerID,
      a_apply_pay: customer?.a_apply_pay,
      b_bitcoin: customer?.b_bitcoin,
      e_ethereum: customer?.e_ethereum,
      z_zelle: customer?.z_zelle,
      l_litecoin: customer?.l_litecoin,
      u_usdt: customer?.u_usdt,
      m_game_currency: customer?.m_game_currency
    };
    console.log('customerMoneyData is~~~~~~~', customerMoneyData);
    try {
      const res = await apiClient.post("/customer/update", customerMoneyData, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };                  
      // setNewBetResult(fortmatResponse(result));
      navigation.navigate('Dashboard');
    } catch (err) {
      // setNewBetResult(fortmatResponse(err.response?.data || err));
    }
  }
  //get the special customer data  
  async function getCustomerData(id, customerName:any) {   
    if(customerName!=""){
      temp= {
        "a_apply_pay": 0,
        "b_bitcoin": 0,
        "e_ethereum": 0,
        "m_game_currency": 0,
        "name": customerName,
        "u_usdt": 0,
        "z_zelle": 0,
      }
      setCustomer(temp);   
    }else{
      try {      
        const res = await apiClient.get("/customers/"+id);
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };                 
        setCustomer(res.data.single);            
      } catch (err) {      
        console.log(err);            
      }
    }
    
  }
  useEffect(()=> {       
    if(customerID==0)     
      getCustomerData(0, customerName);    
    else
      getCustomerData(customerID, '');    
  }, []);

  useEffect(()=>{
    console.log(customer);
  }, [customer])  

  return (
    <Image
      background
      source={assets.tabback}
      padding={sizes.padding}
      style={{flex: 1}}>
      <Block safe justify="center">
        <Block safe marginTop={sizes.sm}>
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
                    {!customer ? "": customer.name}
                    
                  </Text>              
                </Block>
              </Image> 
              <Block  row flex={0} align="center" justify="space-between" paddingBottom={sizes.m} >
                <Text primary size={sizes.sm} h5 bold>a(Applepay) </Text>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 20}} defaultValue={!customer ? "0": (customer.a_apply_pay.toString()=="0")? '': customer.a_apply_pay.toString()}
                  onChangeText={(value) => handleChange('a_apply_pay', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}} defaultValue={!customer ? "0": (customer.a_apply_pay.toString()=="0")? '': customer.a_apply_pay.toString()}
                  onChangeText={(value) => handleChange('a_apply_pay', value)}/>
              </Block>
              <Block  row flex={0} align="center" justify="space-between" paddingBottom={sizes.m} >
                <Text primary size={sizes.sm} h5 bold>b(bitcoin) </Text>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 35}} defaultValue={!customer ? "0": (customer.b_bitcoin.toString()=="0")?'': customer.b_bitcoin.toString()}
                onChangeText={(value) => handleChange('b_bitcoin', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}} defaultValue={!customer ? "0": (customer.b_bitcoin.toString()=="0")?'': customer.b_bitcoin.toString()}
                onChangeText={(value) => handleChange('b_bitcoin', value)}/>
              </Block>
              <Block  row flex={0} align="center" justify="space-between" paddingBottom={sizes.m} >
                <Text primary size={sizes.sm} h5 bold>e(ethereum) </Text>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 12}} defaultValue={!customer ? "0": (customer.e_ethereum.toString()=="0")? '':customer.e_ethereum.toString()}
                onChangeText={(value) => handleChange('e_ethereum', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}} defaultValue={!customer ? "0": (customer.e_ethereum.toString()=="0")? '':customer.e_ethereum.toString()}
                onChangeText={(value) => handleChange('e_ethereum', value)}/>
              </Block>
              <Block  row flex={0} align="center" justify="space-between" paddingBottom={sizes.m} >
                <Text primary size={sizes.sm} h5 bold>z(zelle) </Text>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 55}} defaultValue={!customer ? "0": (customer.z_zelle.toString()=="0")? '': customer.z_zelle.toString()}
                onChangeText={(value) => handleChange('z_zelle', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}} defaultValue={!customer ? "0": (customer.z_zelle.toString()=="0")? '': customer.z_zelle.toString()}
                onChangeText={(value) => handleChange('z_zelle', value)}/>
              </Block>              
              <Block  row flex={0} align="center" justify="space-between" paddingBottom={sizes.m} >
                <Text primary size={sizes.sm} h5 bold>u(usdt) </Text>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 55}} defaultValue={!customer ? "0": (customer.u_usdt.toString()=="0")?'': customer.u_usdt.toString()}
                onChangeText={(value) => handleChange('u_usdt', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}} defaultValue={!customer ? "0": (customer.u_usdt.toString()=="0")?'': customer.u_usdt.toString()}
                onChangeText={(value) => handleChange('u_usdt', value)}/>
              </Block>
              <Block  row flex={0} align="center" justify="space-between" paddingBottom={sizes.m} >
                <Text primary size={sizes.sm} h5 bold>m(OSRS) </Text>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 45}} defaultValue={!customer ? "0": (customer.m_game_currency.toString()=="0")?'': customer.m_game_currency.toString()}
                onChangeText={(value) => handleChange('m_game_currency', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}} defaultValue={!customer ? "0": (customer.m_game_currency.toString()=="0")?'': customer.m_game_currency.toString()}
                onChangeText={(value) => handleChange('m_game_currency', value)}/>
              </Block>
              <Button
                primary
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => saveCustomerMoney()}>
                <Text bold white transform="uppercase">
                  {t('tabsBets.btn_save')}
                </Text>
              </Button>              
            </Block>
          </Block>
        </Block>
      </Block>
    </Image>    
  );
};

export default tabDetail;

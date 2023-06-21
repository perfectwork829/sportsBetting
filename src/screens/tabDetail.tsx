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
  const {user, setSplitterUpdated} = useData();
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
    a_apply_pay1: 0,
    b_bitcoin1: 0,
    e_ethereum1: 0,
    z_zelle1: 0,    
    u_usdt1: 0,
    m_game_currency1: 0,
    a_apply_pay2: 0,
    b_bitcoin2: 0,
    e_ethereum2: 0,
    z_zelle2: 0,    
    u_usdt2: 0,
    m_game_currency2: 0
  });

  const handleChange = (key: any, value: any) => {
    if(key == "a_apply_pay1"){
      setCustomer(customer => ({
        ...customer, a_apply_pay1: value
      }));
      return;
    }
    if(key == "a_apply_pay2"){      
      setCustomer(customer => ({
        ...customer, a_apply_pay2: value
      }));
      return;
    }
    if(key == "b_bitcoin1"){
      setCustomer(customer => ({
        ...customer, b_bitcoin1: value
      }));
      return;
    }
    if(key == "b_bitcoin2"){
      setCustomer(customer => ({
        ...customer, b_bitcoin2: value
      }));
      return;
    }
    if(key == "e_ethereum1"){
      setCustomer(customer => ({
        ...customer, e_ethereum1: value
      }));
      return;
    }
    if(key == "e_ethereum2"){
      setCustomer(customer => ({
        ...customer, e_ethereum2: value
      }));
      return;
    }
    if(key == "z_zelle1"){
      setCustomer(customer => ({
        ...customer, z_zelle1: value
      }));
      return;
    }
    if(key == "z_zelle2"){
      setCustomer(customer => ({
        ...customer, z_zelle2: value
      }));
      return;
    }
    if(key == "u_usdt1"){
      setCustomer(customer => ({
        ...customer, u_usdt1: value
      }));
      return;
    }
    if(key == "u_usdt2"){
      setCustomer(customer => ({
        ...customer, u_usdt2: value
      }));
      return;
    }
    if(key == "m_game_currency1"){
      setCustomer(customer => ({
        ...customer, m_game_currency1: value
      }));
      return;
    }
    if(key == "m_game_currency2"){
      setCustomer(customer => ({
        ...customer, m_game_currency2: value
      }));
      return;
    }
  }

  //save customer's money individually.
  async function saveCustomerMoney() {
    const customerMoneyData = {
      id: customerID,
      a_apply_pay: parseFloat(customer?.a_apply_pay1) + parseFloat(customer?.a_apply_pay2),
      b_bitcoin: parseFloat(customer?.b_bitcoin1) + parseFloat(customer?.b_bitcoin2),
      e_ethereum: parseFloat(customer?.e_ethereum1) + parseFloat(customer?.e_ethereum2),
      z_zelle: parseFloat(customer?.z_zelle1) + parseFloat(customer?.z_zelle2),      
      u_usdt: parseFloat(customer?.u_usdt1) + parseFloat(customer?.u_usdt2),
      m_game_currency: parseFloat(customer?.m_game_currency1) + parseFloat(customer?.m_game_currency2)
    };        
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
      navigation.navigate('tabsBets');
    } catch (err) {
      // setNewBetResult(fortmatResponse(err.response?.data || err));
    }
  }
  //get the special customer data  
  async function getCustomerData(id, customerName:any) {   
    if(customerName!=""){
      temp= {
        "name": customerName,
        "a_apply_pay1": 0,
        "b_bitcoin1": 0,
        "e_ethereum1": 0,
        "m_game_currency1": 0,        
        "u_usdt1": 0,
        "z_zelle1": 0,
        "a_apply_pay2": 0,
        "b_bitcoin2": 0,
        "e_ethereum2": 0,
        "m_game_currency2": 0,        
        "u_usdt2": 0,
        "z_zelle2": 0,
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
                  onPress={() => {
                    setSplitterUpdated(true);
                    navigation.goBack(); 
                  }}
                  >
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
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 20}} 
                  defaultValue={!customer ? "0": (customer.a_apply_pay1.toString()=="0")? '': customer.a_apply_pay1.toString()}
                  onChangeText={(value) => handleChange('a_apply_pay1', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}}
                  onChangeText={(value) => handleChange('a_apply_pay2', value)}/>
              </Block>
              <Block  row flex={0} align="center" justify="space-between" paddingBottom={sizes.m} >
                <Text primary size={sizes.sm} h5 bold>b(bitcoin) </Text>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 35}} defaultValue={!customer ? "0": (customer.b_bitcoin1.toString()=="0")?'': customer.b_bitcoin1.toString()}
                onChangeText={(value) => handleChange('b_bitcoin1', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}}
                onChangeText={(value) => handleChange('b_bitcoin2', value)}/>
              </Block>
              <Block  row flex={0} align="center" justify="space-between" paddingBottom={sizes.m} >
                <Text primary size={sizes.sm} h5 bold>e(ethereum) </Text>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 12}} defaultValue={!customer ? "0": (customer.e_ethereum1.toString()=="0")? '':customer.e_ethereum1.toString()}
                onChangeText={(value) => handleChange('e_ethereum1', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}} 
                onChangeText={(value) => handleChange('e_ethereum2', value)}/>
              </Block>
              <Block  row flex={0} align="center" justify="space-between" paddingBottom={sizes.m} >
                <Text primary size={sizes.sm} h5 bold>z(zelle) </Text>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 55}} defaultValue={!customer ? "0": (customer.z_zelle1.toString()=="0")? '': customer.z_zelle1.toString()}
                onChangeText={(value) => handleChange('z_zelle1', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}} 
                onChangeText={(value) => handleChange('z_zelle2', value)}/>
              </Block>              
              <Block  row flex={0} align="center" justify="space-between" paddingBottom={sizes.m} >
                <Text primary size={sizes.sm} h5 bold>u(usdt) </Text>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 55}} defaultValue={!customer ? "0": (customer.u_usdt1.toString()=="0")?'': customer.u_usdt1.toString()}
                onChangeText={(value) => handleChange('u_usdt1', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}}
                onChangeText={(value) => handleChange('u_usdt2', value)}/>
              </Block>
              <Block  row flex={0} align="center" justify="space-between" paddingBottom={sizes.m} >
                <Text primary size={sizes.sm} h5 bold>m(OSRS) </Text>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold", marginLeft: 45}} defaultValue={!customer ? "0": (customer.m_game_currency1.toString()=="0")?'': customer.m_game_currency1.toString()}
                onChangeText={(value) => handleChange('m_game_currency1', value)}/>
                <Input primary style={{width: '30%', fontSize: 30, color: 'white', fontWeight: "bold"}}
                onChangeText={(value) => handleChange('m_game_currency2', value)}/>
              </Block>
              <Button
                primary
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                
                onPress={() => {
                  setSplitterUpdated(true);
                  saveCustomerMoney();
                }}
                >
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

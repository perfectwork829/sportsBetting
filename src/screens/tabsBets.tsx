import React, {useCallback, useLayoutEffect, useEffect, useState, useRef} from 'react';

import {Linking, Platform, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Switch, Modal, Text, Checkbox} from '../components/';
import {useHeaderHeight} from '@react-navigation/stack';
import apiClient from "../constants/http-common"

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
}

interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const tabBests = () => {
  const {isDark, setNewBetUpdated} = useData();  
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    email: '',
    password: '',
    agreed: false,
  });
  const {assets, colors, gradients, sizes, icons} = useTheme();
  const headerHeight = useHeaderHeight();
  const [newCustomerResult, setNewCustomerResult] = useState(null);
  const [allCustomer, setAllCustomer] = useState<IRegistration[]>([]);  

  const [inputList, setInputList] = useState([]);  
  const fortmatResponse = (res:any) => {
    return JSON.stringify(res, null, 2);
  };

  //display all the Customers.
  async function displayAllCustomer() {  
    try {
      const res = await apiClient.get("/all_customers");

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data
      };      
      setAllCustomer(res.data);               
      result['data'].map((customer:any)=>{
        console.log('customer ====>>>', customer);
        setInputList([...inputList, { name: customer.name, id: customer.id}]);               
      });
      console.log('inputList list====>', inputList);
    } catch (err) {      
      console.log(err);            
    }
  }

  useEffect(() => {
    displayAllCustomer();
  }, []);
  // handle input change
 
  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];    
    list.splice(index, 1);
    setInputList(list);
    setNewBetUpdated(true);
    deleteCustomer(inputList[index]['name']);
  };
 
  //create new Customer.
  async function createNewCustomer() {
    console.log('registration.name==>', registration.name);
    const newCustomer = {
      name: registration.name,      
    };

    try {
      const res = await apiClient.post("/customer/store", newCustomer, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };  
      console.log('created', res.data);
      setNewCustomerResult(fortmatResponse(result));
    } catch (err) {
      setNewCustomerResult(fortmatResponse(err.response?.data || err));
    }
  }

  //delete Customer.
  async function deleteCustomer(del_customer_name: any) {
    
    const delCustomer = {
      name: del_customer_name,      
    };    
    try {      
      const res = await apiClient.post("/customer/destroy", delCustomer, {
        headers: {
          "x-access-token": "token-value",
        },
      });      
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };          
      console.log('removed correctly', res.data);
      setNewCustomerResult(fortmatResponse(result));
    } catch (err) {
      setNewCustomerResult(fortmatResponse(err.response?.data || err));
    }
    console.log('removed end!');
  }
  // handle click event of the Add button
  const handleAddClick = () => {       
    //registration.name
    createNewCustomer();
    setNewBetUpdated(true);
    setInputList([...inputList, { id: 0, name: registration.name}]);    
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          radius={0}
          resizeMode="cover"
          width={sizes.width}
          height={headerHeight}
          source={assets.header}
        />
      ),
    });
  }, [assets.header, navigation, sizes.width, headerHeight]);

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },    
    [setRegistration],
  );

  const [switch1, setSwitch1] = useState(true);
  const [showModal, setModal] = useState(false);  

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name)
    }));
  }, [registration, setIsValid]);

  const viewDetail = (customer_id, customer_name) => {
    navigation.navigate('tabDetail', {customerID: customer_id, customerName: customer_name});
  }

  return (
    <Block safe>
      <Block blur
        scroll marginTop={sizes.sm}
        showsVerticalScrollIndicator={false}
        >
        {/* register form */}
        <Block
              card
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Text h5 semibold center marginBottom={sizes.md} marginTop={sizes.xxl} paddingTop={sizes.md}>
                {t('tabsBets.register')}
              </Text>              
              <Block row paddingHorizontal={sizes.sm} marginBottom={sizes.md}>
                  <Input
                    autoCapitalize="none"                    
                    placeholder={t('tabsBets.namePlaceholder')}                    
                    style={{width: '85%'}}    
                    success={Boolean(registration.name && isValid.name)}
                    danger={Boolean(registration.name && !isValid.name)}
                    onChangeText={(value) => handleChange({name: value})}            
                  />
                  <Button                                        
                    onPress={(value) => handleAddClick()}>
                      <Image source={icons.plus} marginRight={sizes.s} />
                  </Button>   
              </Block>
        </Block>
        
        <Block   
              card         
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}
              marginTop={sizes.sm}>
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                {inputList.map((x, i) => {
                    return (
                      <Block row center justify="space-evenly" flex={0}>                        
                        <Button flex={1} gradient={gradients.info} marginBottom={sizes.xs} 
                                onPress={() => viewDetail(x['id'], x['name'])}>                                  
                            <Text white bold transform="uppercase">
                                {x['name']}-{x['total']}$
                            </Text>
                        </Button>
                        <Button             
                          onPress={() => handleRemoveClick(i)}>
                            <Image source={icons.remove} />
                        </Button>
                      </Block>
                    );
                  })}            
              </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default tabBests;

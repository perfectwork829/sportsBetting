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
  slip: string;
  odds: number;
  amount: number;  
  notes: string;
}
interface IRegistrationValidation {  
  name: boolean;
  slip: boolean;
  odds: boolean;
  amount: boolean;  
  notes: boolean;
}

const newBets = () => {

  const bet_slip = useRef(null);
  const bet_odds = useRef(null);
  const bet_amount = useRef(null);
  const {isDark, newBetUpdated, setNewBetUpdated} = useData();
  
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    slip: false,
    odds: false,
    amount: false,
    notes: false
  });
  const [registration, setRegistration] = useState<IRegistration>({    
    name: '',
    slip: '',
    odds: 0,
    amount: '',
    notes: ''
  });
  const {assets, colors, gradients, sizes, icons} = useTheme();
  const [getResult, setGetResult] = useState(null);
  const [newBetResult, setNewBetResult] = useState(null);
  const [quantity, setQuantity] = useState('a-(applepay)');
  const [customerName, setCustomerName] = useState('');
  const [customerNames, setCustomerNames] = useState([]);
  const [hostNames, setHostNames] = useState([]);
  
  const [customerID, setCustomerID] = useState();
  const [splitters, setSplitter] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const headerHeight = useHeaderHeight();
  
  const [inputList, setInputList] = useState([]);
  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };
  
  //get the all customers' data  
   async function getCustomersData() {  
      try {
        const res = await apiClient.get("/getCustomers");
  
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
                
        setCustomerNames(res['data'][0]);
        setGetResult(fortmatResponse(result));
      } catch (err) {                 
        setGetResult(fortmatResponse(err.response?.data || err));
      }

      try {
        const res = await apiClient.get("/all_splitters");
  
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setHostNames(res["data"]['hosts']);
        setGetResult(fortmatResponse(result));
      } catch (err) {                
        setGetResult(fortmatResponse(err.response?.data || err));
      }
  }

  //create new bet.
  async function createNewBet() {    
    const newBetData = {
      slip: registration.slip,
      odds: registration.odds,
      amount: registration.amount,      
      live: switch1,
      bsplitter: 1,
      notes: registration.notes,
      currency: quantity,
      splitters1: splitters,
      status: 3,
      customer_id: customerID
    };
        
    try {
      const res = await apiClient.post("/new_bets/store", newBetData, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };                  
      setNewBetResult(fortmatResponse(result));
      navigation.navigate('Dashboard');
    } catch (err) {
      setNewBetResult(fortmatResponse(err.response?.data || err));
    }
  }
  
  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { customer_id: 0, name: "", amount: "" }]);
  };

  useEffect(()=>{    
    setSplitter(inputList)
  }, [inputList])

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

  const addInputBox = useCallback(()=>{
      alert(99);
  }, []);

  const handleSignUp = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */      
    }
  }, [isValid, registration]);
  
  const [switch1, setSwitch1] = useState(true);
  const [showModal, setModal] = useState(false);  
  const [showCustomerModal, setCustomerModal] = useState(false);
  const [isSplitters, setIsSplitters] = useState(false);
  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      slip: regex.slip.test(registration.slip),
      odds: regex.odds.test(registration.odds),
      amount: regex.amount.test(registration.amount),
      notes: regex.note.test(registration.notes),      
    }));
    getCustomersData();
    setNewBetUpdated(false);
  }, [registration, setIsValid, newBetUpdated]);

  return (
    <Block safe>
      <Block 
        card
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: sizes.padding}}>
        {/* register form */}
        <Block 
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          >
          <Block
            flex={0}            
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block              
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Text p semibold center marginTop={sizes.xxl} marginBottom={sizes.xs}>
                {t('newBets.register')}
              </Text>              
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Text  color={colors.input} size={15} bold marginBottom={5}>Name</Text>     
                <Button
                  flex={1}
                  row
                  gradient={gradients.primary}
                  onPress={() => {
                    setCustomerModal(true)
                    setIsSplitters(false)
                    setCurrentIndex(-1)
                  }}
                  marginBottom={sizes.xs}
                  >
                  <Block
                    row
                    align="center"
                    justify="space-between"
                    paddingHorizontal={sizes.sm}>
                    <Text white bold transform="uppercase" marginRight={sizes.sm}>
                      {customerName}
                    </Text>
                    <Image
                      source={assets.arrow}
                      color={colors.white}
                      transform={[{rotate: '90deg'}]}
                    />
                  </Block>
                </Button>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('newBets.slip')}
                  placeholder={t('newBets.slipPlaceholder')}
                  success={Boolean(registration.slip && isValid.slip)}
                  danger={Boolean(registration.slip && !isValid.slip)}
                  onChangeText={(value) => handleChange({slip: value})}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('newBets.odds')}
                  placeholder={t('newBets.oddsPlaceholder')}
                  success={Boolean(registration.odds && isValid.odds)}
                  danger={Boolean(registration.odds && !isValid.odds)}
                  onChangeText={(value) => handleChange({odds: value})}
                /> 
                <Block row flex={0} align="center" justify="space-between" marginBottom={sizes.xs}>
                  <Text color={colors.input} size={15} bold marginBottom={5}>Live</Text>                           
                  <Switch
                    checked={switch1}
                    onPress={(checked) => setSwitch1(checked)}
                  />
                </Block>                
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('newBets.amount')}
                  placeholder={t('newBets.amountPlaceholder')}
                  success={Boolean(registration.amount && isValid.amount)}
                  danger={Boolean(registration.amount && !isValid.amount)}       
                  onChangeText={(value) => handleChange({amount: value})}     
                />
                <Button
                  flex={1}
                  row
                  gradient={gradients.primary}
                  onPress={() => setModal(true)}
                  marginBottom={sizes.xs}
                  >
                  <Block
                    row
                    align="center"
                    justify="space-between"
                    paddingHorizontal={sizes.sm}>
                    <Text white bold transform="uppercase" marginRight={sizes.sm}>
                      {quantity}
                    </Text>
                    <Image
                      source={assets.arrow}
                      color={colors.white}
                      transform={[{rotate: '90deg'}]}
                    />
                  </Block>
                </Button>
                <Block row flex={0} align="center" marginBottom={sizes.xs}>
                  <Text semibold color={colors.input} h5 marginRight={sizes.xs}>Splitters</Text> 
                  <Button                                        
                    onPress={() => handleAddClick()}>
                      <Image source={icons.plus} marginRight={sizes.s} />
                  </Button>                                         
                </Block>                
                {inputList.map((x, i) => {
                    return (                      
                      <Block row center justify="space-between" flex={1} key={i} >
                        <Button                        
                          row flex={2} marginTop={14} marginRight={5}
                          gradient={gradients.primary}
                          onPress={() => {
                            setCustomerModal(true)
                            setIsSplitters(true)
                            setCurrentIndex(i)
                          }}
                          >                           
                          <Block
                            row 
                            align="center"
                            justify="space-between"
                            paddingHorizontal={sizes.sm}>                            
                            <Text white bold transform="uppercase" marginRight={sizes.sm}>
                              {x.name}
                            </Text>
                            <Image
                              source={assets.arrow}
                              color={colors.white}
                              transform={[{rotate: '90deg'}]}
                            />
                          </Block>
                        </Button>
                        <Input      
                            row flex={1}                            
                              
                            autoCapitalize="none"                          
                            label=" "
                            placeholder={t('newBets.amountPlaceholder')}
                            success={Boolean(registration.amount && isValid.amount)}
                            danger={Boolean(registration.amount && !isValid.amount)}                          
                            style={{width: '30%'}}
                            defaultValue={x.amount.toString()}                            
                            onChangeText={(value)=>{
                              setInputList([
                                ...inputList.slice(0, i),
                                {
                                  customer_id: inputList[i]['customer_id'],
                                  name: inputList[i]['name'],
                                  amount:  value
                                },
                                ...inputList.slice(i + 1)
                              ])
                            }}
                        />                        
                        <Button paddingTop={sizes.md}               
                          onPress={() => handleRemoveClick(i)}>
                            <Image source={icons.remove} />
                        </Button>
                      </Block>
                    );
                  })}
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('newBets.note')}
                  placeholder={t('newBets.notePlaceholder')}
                  success={Boolean(registration.notes && isValid.notes)}
                  danger={Boolean(registration.notes && !isValid.notes)}  
                  onChangeText={(value) => handleChange({notes: value})}                     
                />                
              </Block>
              <Modal visible={showModal} onRequestClose={() => setModal(false)}>
                <FlatList
                  keyExtractor={(index) => `${index}`}
                  data={["a-(applepay)", "b-(bitcoin)", "e-(ethereum)", "z-(zelle)", "u-(usdt)", "m-(OSRS)"]}
                  renderItem={({item}) => (
                    <Button
                      marginBottom={sizes.sm}
                      onPress={() => {
                        setQuantity(item);
                        setModal(false);
                      }}>
                      <Text p white semibold transform="uppercase">
                        {item}
                      </Text>
                    </Button>
                  )}
                />
              </Modal>    
              <Modal visible={showCustomerModal} onRequestClose={() => setCustomerModal(false)}>
                <FlatList
                  keyExtractor={(item) => `${item.id}`}
                  data={isSplitters? hostNames: customerNames}
                  renderItem={({item}) => (
                    <Button
                      marginBottom={sizes.sm} 
                      key={item.id}                     
                      onPress={() => {                        
                        if(isSplitters == true) { // When user click splitters namebox.                          
                          setInputList([
                            ...inputList.slice(0, currentIndex),
                            {
                              customer_id: item.id,
                              name: item.name,
                              amount:  inputList[currentIndex]['amount']
                            },
                            ...inputList.slice(currentIndex + 1)
                          ])
                          setCustomerModal(false);
                        } else { // When user click the top name box                          
                          setCustomerName(item.name);
                          setCustomerID(item.id);
                          setCustomerModal(false);
                        }
                      }}>
                      <Text p white semibold transform="uppercase">
                        {item.name}
                      </Text>
                    </Button>
                  )}
                />
              </Modal>                                      
              <Button
                primary
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => createNewBet()}>
                <Text bold white transform="uppercase">
                  {t('newBets.btn_register')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default newBets;

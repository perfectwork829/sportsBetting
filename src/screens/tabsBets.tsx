import React, {useCallback, useLayoutEffect, useEffect, useState, useRef} from 'react';

import {Linking, Platform, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Switch, Modal, Text, Checkbox} from '../components/';
import {useHeaderHeight} from '@react-navigation/stack';

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
  const {isDark} = useData();
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
  const [quantity, setQuantity] = useState('a(applepay)');
  const headerHeight = useHeaderHeight();
  
  const [inputList, setInputList] = useState([]);
   const inputRef = useRef();
  // handle input change
 
  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {   
    setInputList([...inputList, { host_name:  ''}])
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

  const addInputBox = useCallback(()=>{
      alert(99);
  }, []);

  const handleSignUp = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      console.log('handleSignUp', registration);
    }
  }, [isValid, registration]);
  const [switch1, setSwitch1] = useState(true);
  const [showModal, setModal] = useState(false);  

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

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
              <Text h5 semibold center marginBottom={sizes.md}>
                {t('tabsBets.register')}
              </Text>              
              <Block row marginBottom={sizes.md}>
                  <Input
                    autoCapitalize="none"                    
                    placeholder={t('newBets.namePlaceholder')}                    
                    style={{width: '85%'}}    
                    ref={inputRef}              
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
                        <Button flex={1} gradient={gradients.info} marginBottom={sizes.xs} onPress={() => navigation.navigate('tabDetail')}>
                            <Text white bold transform="uppercase">
                                Lunch
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

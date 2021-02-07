import React, { useState, useEffect, useRef} from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Otp } from "app/components";
import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import RBSheet from "react-native-raw-bottom-sheet";
import Images from 'app/config/images';

const Login: React.FC = () => {
  const { icons } = Images;
  const refRBSheet = useRef();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => { 
    if (mobile.length === 10) {
      setError(false)
    }
  }, [mobile])

  const dispatch = useDispatch();
  const onLogin = () => { 
    if (mobile.length !== 10) {
      setError(true);
    } else { 
      setError(false);
      dispatch(loginActions.requestLogin('1234'));

      refRBSheet?.current?.open();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image source={icons.logo} style={styles.logo}/>
        <Text style={styles.headerText}>Welcome to Ayu.Health</Text>
        <Text style={styles.login}>Enter your details below to access your medical reports and hospital</Text>
        <View style={error? styles.loginErrorView : styles.loginView}>
          <View style={styles.leftLoginView}>
            <Image source={icons.call} style={styles.callIcon}/>
            <TextInput
              style={styles.inputText}
              placeholder='Enter mobile number'
              value={mobile}
              onChangeText={text => setMobile(text)}
              maxLength={10}
            />
          </View>
          
          <TouchableOpacity style={styles.loginButtonView} onPress={onLogin}>
            <Image source={icons.arrow} style={styles.arrowIcon}/>
          </TouchableOpacity>
        </View>
        {
          error && <Text
          style={styles.errorText}
          >
          ⚠ Please enter 10 digit number
        </Text>
        }

        <Text
          style={styles.otpDescription}
          >
          OTP will be sent to this number
        </Text>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={600}
        >
        <Otp
          number={mobile}
          otp={'1234'}
          sheetRef={refRBSheet}
        />
        </RBSheet>
    </View>
  );
};

export default Login;

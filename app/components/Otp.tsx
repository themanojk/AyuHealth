import React, { useState} from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { IOtpData } from '../models/actions/otp';
import AppStyles from '../config/styles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import * as loginActions from 'app/store/actions/loginActions';
import Images from 'app/config/images';


const CELL_COUNT = 4;

const Otp: React.FC<IOtpData> = ({ number, otp, sheetRef }) => {
  const { icons } = Images;
  const [value, setValue] = useState('');
  const[error, setError] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const dispatch = useDispatch();

  const closeBottomSheet = () => { 
    sheetRef?.current?.close();
  }

  const generateRandomString = () => {
    return Math.random().toString(36).substr(2);
  }
  const onSubmit = () => { 
    const token = generateRandomString() + generateRandomString();
    if (value.length != 4 || value !== otp) {
      setError(true)
    } else { 
      setError(false);
      dispatch(loginActions.onLoginResponse({ token }))
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Verify phone number</Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <Image source={icons.close} style={styles.cloceIcon}/>
        </TouchableOpacity>
      </View>

      <View style={styles.subView}>
        <Text style={styles.heading}>Enter OTP code</Text>
        <Text style={styles.subHeading}>Please verify your number with 4 didgit OTP code sent to ********{number.substr(8,2)}</Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell, error ? { borderColor: AppStyles.color.COLOR_RED, color: AppStyles.color.COLOR_RED } : {borderColor: '#00000030',color: AppStyles.color.COLOR_GREY}]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {
          error ? <Text
            style={styles.errorText}
          >
            {'⚠ Invalid OTP. Please try again'}
          </Text> : null
        }
        <View style={styles.resendView}>
          <Text style={styles.subHeading}>Didn't receive code?</Text>
          <Text style={styles.resentText}> Resend</Text>
        </View>
        <TouchableOpacity style={styles.submitButtonView} onPress={onSubmit}>
          <Text style={styles.submitText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.COLOR_WHITE
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    height: 55,
    paddingHorizontal: 20,
    backgroundColor: AppStyles.color.COLOR_SECONDARY,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: AppStyles.color.COLOR_DARK_BLUE,
    borderWidth: 0.5
  },
  headerText: {
    color: AppStyles.color.COLOR_WHITE,
    fontWeight: '800'
  },
  cloceIcon: {
    width: 15,
    height: 15,
    tintColor: AppStyles.color.COLOR_WHITE
  },
  subView: {
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 20
  },
  subHeading: {
    fontSize: 14
  },
  resendView: {
    marginTop: 10,
    flexDirection: 'row'
  },
  resentText: {
    fontSize: 14,
    color: AppStyles.color.COLOR_ORANGE,
    fontWeight: '600'
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 60,
    height: 50,
    lineHeight: 40,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: AppStyles.color.COLOR_PRIMARY,
  },
  errorText: {
    marginTop: 2,
    marginBottom: 10,
    fontSize: 12,
    color: AppStyles.color.COLOR_RED
  },
  submitButtonView: {
    display: 'flex',
    width: 140,
    height: 50,
    borderRadius: 5,
    backgroundColor: AppStyles.color.COLOR_LIGHT_ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  submitText: {
    color: AppStyles.color.COLOR_WHITE
  }
});

export default Otp;

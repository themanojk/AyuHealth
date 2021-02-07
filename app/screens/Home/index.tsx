import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import { ILoginState } from 'app/models/reducers/login';

interface IState {
  loginReducer: ILoginState;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());
  const token = useSelector((state: IState) => state.loginReducer.token);

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login Token : {token}</Text>
      <Button icon="logout" mode="outlined" onPress={onLogout}>
        Logout
      </Button>
    </View>
  );
};

export default Home;

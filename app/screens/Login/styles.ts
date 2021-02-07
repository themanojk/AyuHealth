import { StyleSheet } from 'react-native';
import AppStyles from 'app/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.COLOR_WHITE,
    padding: 20
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 140,
    resizeMode: 'cover'
  },
  headerText: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: '700'
  },
  login: {
    marginTop: 10,
  },
  loginView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginTop: 20,
    borderRadius: 5,
    borderColor: AppStyles.color.COLOR_PRIMARY,
    borderWidth: 1,
    paddingHorizontal: 15
  },
  loginErrorView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginTop: 20,
    borderRadius: 5,
    borderColor: AppStyles.color.COLOR_RED,
    borderWidth: 1,
    paddingHorizontal: 15
  },
  leftLoginView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callIcon: {
    width: 15,
    height: 15,
    tintColor: AppStyles.color.COLOR_GREY
  },
  inputText: {
    width: 200,
    height: 50,
    marginHorizontal: 10
  },
  loginButtonView: {
    width: 25,
    height: 25,
    backgroundColor: AppStyles.color.COLOR_PRIMARY,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowIcon: {
    width: 12,
    height: 12,
    tintColor: AppStyles.color.COLOR_WHITE
  },
  otpDescription: {
    marginTop: 2,
    fontSize: 12,
    color: AppStyles.color.COLOR_GREY
  },
  errorText: {
    marginTop: 2,
    marginBottom: 10,
    fontSize: 12,
    color: AppStyles.color.COLOR_RED
  },
});

export default styles;

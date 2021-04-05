import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, LogBox} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MealsNavigator from './navigation/MealNavigator';
import {enableScreens} from 'react-native-screens';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import mealsReducer from './store/reducers/meals';

enableScreens ();

const rootReducer = combineReducers ({
  meals: mealsReducer,
});

const store = createStore (rootReducer);
//hàm sử dụng font chữ
const fletchFont = () => {
  return Font.loadAsync ({
    //chúng ta ta phải return trong hàm loadAsyns vì hàm này phải trả về cái gì đó
    'open-sans': require ('./assets/font/OpenSans-Regular.ttf'),
    'open-sans-bold': require ('./assets/font/OpenSans-Bold.ttf'),
  });
};

export default function App () {
  /**và tôi sẽ đặt tên cho phông chữ trạng thái 
   * này được tải và đặt phông chữ được tải và gọi
   *  useState và ban đầu, điều đó là sai
   * bởi vì ban đầu, phông chữ chưa được tải */
  const [fontLoaded, setFontLoaded] = useState (false);
  // console.disableYellowBox = true;

  LogBox.ignoreAllLogs (true);
  //ở đây tôi kiểm tra xem font đã được load chưa=> thuộc tính
  //startAsync trỏ vào tìm nạp phông chữ để khởi động chức năng này
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fletchFont}
        onFinish={() => setFontLoaded (true)}
        onError={console.warn}
      />
    );
  }

  return <Provider store={store}><MealsNavigator /></Provider>;
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

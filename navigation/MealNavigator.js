import {Platform} from 'react-native';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {
  createMaterialBottomTabNavigator,
} from 'react-navigation-material-bottom-tabs';
import CategoriesScreens from '../screens/CategoriesScreens';
import CategoryMealsScreen from '../screens/CategoryMealScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import FilterScreen from '../screens/FilterScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Color';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitleStyle: {
    fontFamily: 'open-sans',
  },
};

const MealsNavigator = createStackNavigator (
  {
    Categories: {
      screen: CategoriesScreens,
    },
    CategoryMeal: {
      screen: CategoryMealsScreen,
    },
    MealDetail: {
      screen: MealDetailScreen,
    },
  },
  {
    mode: 'card',
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const FavoriteNavigator = createStackNavigator (
  {
    Favorite: FavoriteScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const tabConfig = {
  Home: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={23} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
    },
  },
  Favorite: {
    screen: FavoriteNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="star-outline" size={23} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.accentColor,
    },
  },
};

const Tab = Platform.OS === 'android'
  ? createMaterialBottomTabNavigator (tabConfig, {
      activeTintColor: Colors.accentColor,
      shifting: true,
      barStyle: {
        backgroundColor: Colors.primaryColor,
      },
    })
  : createBottomTabNavigator (tabConfig, {
      tabBarOptions: {
        activeTintColor: Colors.accentColor,
      },
    });

const filterNavigator = createStackNavigator (
  {Filter: FilterScreen},
  {
    defaultNavigationOptions: defaultNavigationOptions,
  }
);
const drawer = createDrawerNavigator (
  {
    MealsFavs: {
      screen: Tab,
      navigationOptions: {
        drawerLabel: 'Meals',
      },
    },
    Filter: filterNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold',
      },
    },
  }
);

//cần tạo vùng chứa ứng dụng đó là createAppContainer
export default createAppContainer (drawer);

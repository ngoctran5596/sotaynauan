import React from 'react';
import MealList from '../components/MealList';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Color from '../constants/Color';

const FavoriteScreen = props => {
  const FavMeal = useSelector (state => state.meals.favoriteMeals);

  return <MealList listData={FavMeal} navigation={props.navigation} />;
};

FavoriteScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Favorite Meal',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer ();
          }}
        />
      </HeaderButtons>
    ),
    tabBarColor: Color.accentColor,
  };
};

export default FavoriteScreen;

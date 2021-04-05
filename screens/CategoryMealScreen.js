import React from 'react';
import {useSelector} from 'react-redux';

import {CATEGORIES} from '../data/dummy-data';

import MealList from '../components/MealList';

const CategoryMealsScreen = props => {
  const catId = props.navigation.getParam ('categoryId');

  const availableMeals = useSelector (state => state.meals.filterMeals);

  // const selectedCategory = CATEGORIES.find (cat => cat.id === catId);
  const distPlayerMeals = availableMeals.filter (
    meal => meal.categoryIds.indexOf (catId) >= 0
  );

  return <MealList listData={distPlayerMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam ('categoryId');

  const selectedCategory = CATEGORIES.find (cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;

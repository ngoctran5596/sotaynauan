import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import headerButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailSceen = props => {
  const availableMeals = useSelector (state => state.meals.meals);
  const mealId = props.navigation.getParam ('mealId');
  const selectedMeal = availableMeals.find (meal => meal.id === mealId);
  // console.log (selectMeal);

  // useEffect (
  //   () => {
  //     props.navigation.setParams ({mealTitle: selectedMeal.title});
  //   },
  //   [selectedMeal]
  // );

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUri}} style={styles.img} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase ()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase ()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map (ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}

      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map (step => <ListItem key={step}>{step}</ListItem>)}
    </ScrollView>
  );
};

MealDetailSceen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam ('mealId');
  const mealTitle = navigationData.navigation.getParam ('mealTitle');
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={headerButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log ('chuan');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default MealDetailSceen;

const styles = StyleSheet.create ({
  img: {width: '100%', height: 200},
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
});

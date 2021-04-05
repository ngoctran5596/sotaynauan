import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import MealItem from '../components/MealItem';

const MealList = props => {
  const renderMealItem = itemData => {
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        onSelectMeal={() => {
          props.navigation.navigate ({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
            },
          });
        }}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUri}
      />
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{width: '100%'}}
      />

    </View>
  );
};

export default MealList;

const styles = StyleSheet.create ({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

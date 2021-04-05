import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Switch, Platform, Text, View} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Color from '../constants/Color';

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.laber}</Text>
      <Switch
        trackColor={{true: Color.primaryColor}}
        thumbColor={Platform.OS === 'android' ? Color.primaryColor : ''}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FilterScreen = props => {
  const {navigation} = props;

  const [isGlutenFree, setIsGlutenFree] = useState (false);
  const [isLactoseFree, setIsLactoseFree] = useState (false);
  const [isVegan, setIsVegan] = useState (false);
  const [isVegetarian, setIsVegetarian] = useState (false);

  const saveFilters = useCallback (
    () => {
      const appliedFilters = {
        glutenFree: isGlutenFree,
        lactoseFree: isLactoseFree,
        vegan: isVegan,
        isVegetarian: isVegetarian,
      };

      console.log (appliedFilters);
    },
    [isGlutenFree, isLactoseFree, isVegan, isVegetarian]
  );

  useEffect (
    () => {
      navigation.setParams ({save: saveFilters});
    },
    [saveFilters]
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Filter</Text>
      <FilterSwitch
        laber="Gluten-free"
        state={isGlutenFree}
        onChange={newValue => {
          setIsGlutenFree (newValue);
        }}
      />
      <FilterSwitch
        laber="Luctose-free"
        state={setIsLactoseFree}
        onChange={newValue => {
          setIsLactoseFree (newValue);
        }}
      />
      <FilterSwitch
        laber="Vegan"
        state={isVegan}
        onChange={newValue => {
          setIsVegan (newValue);
        }}
      />
      <FilterSwitch
        laber="Vegetarian"
        state={isVegetarian}
        onChange={newValue => {
          setIsVegetarian (newValue);
        }}
      />

    </View>
  );
};

FilterScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filter meal',
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam ('save')}
        />
      </HeaderButtons>
    ),
  };
};

export default FilterScreen;

const styles = StyleSheet.create ({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
});

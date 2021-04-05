import {MEAL} from '../../data/dummy-data';

const initialState = {
  meals: MEAL,
  filterMeals: MEAL,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  return state;
};

export default mealsReducer;

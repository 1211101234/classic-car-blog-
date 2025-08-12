import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { CarState } from './car.state';

export function localStorageMetaReducer(
  reducer: ActionReducer<CarState>
): ActionReducer<CarState> {
  return (state, action) => {
    const nextState = reducer(state, action);

    // Save on every action (except INIT/UPDATE)
    if (action.type !== INIT && action.type !== UPDATE) {
      localStorage.setItem('cars', JSON.stringify(nextState.cars));
    }

    return nextState;
  };
}
// This meta-reducer saves the state to localStorage on every action,

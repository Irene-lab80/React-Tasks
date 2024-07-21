import {
  Reducer,
  Store,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { starWarsApi } from './mainApi';
import { selectSlice } from './selectPeopleSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const reducers = {
  [selectSlice.reducerPath]: selectSlice.reducer,
  [starWarsApi.reducerPath]: starWarsApi.reducer,
};

export const rootReducer: Reducer = combineReducers(reducers);

export const store: Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(starWarsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = typeof store;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

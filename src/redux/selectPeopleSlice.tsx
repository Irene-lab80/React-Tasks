import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPerson } from '../utils/types';

interface IPayload {
  entity: IPerson;
}

export interface ISelectState {
  selectedEntities: IPerson[];
}

const initialState: ISelectState = {
  selectedEntities: [],
};

export const selectSlice = createSlice({
  name: 'selectPeople',
  initialState,
  reducers: {
    setSelectedValue(state, { payload }: PayloadAction<IPayload>) {
      if (
        !state.selectedEntities
          .map((el) => el.name)
          .includes(payload.entity.name)
      ) {
        state.selectedEntities = [...state.selectedEntities, payload.entity];
      } else {
        state.selectedEntities = state.selectedEntities.filter(
          (el) => el.name !== payload.entity.name,
        );
      }
    },
    unselectAll(state) {
      state.selectedEntities = [];
    },
  },
});

export const { setSelectedValue, unselectAll } = selectSlice.actions;
export const selectSliceReducer = selectSlice.reducer;

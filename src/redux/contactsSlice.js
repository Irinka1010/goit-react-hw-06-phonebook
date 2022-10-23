import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContacts: {
      reducer: (store, { payload }) => {
        store.push(payload);
      },
      prepare: data => {
        return {
          payload: {
            ...data,
            id: nanoid(),
          },
        };
      },
    },
    removeContacts: (store, { payload }) =>
      store.filter(({ id }) => id !== payload),
  },
});
export const { addContacts, removeContacts } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialsState';
import { nanoid } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    createContact: (state, { payload }) => {
      state.contacts.push({
        name: payload.nameData,
        number: payload.numberData,
        id: nanoid(),
      });
      localStorage.setItem('localContacts', JSON.stringify(state.contacts));
    },
    filterName: (state, { payload }) => {
      state.filter = payload.value;
    },
    delContact: (state, { payload }) => {
      state.contacts = state.contacts.filter(contact => {
        return contact.id !== payload.contactId;
      });
      localStorage.setItem('localContacts', JSON.stringify(state.contacts));
    },
  },
});
export const reducer = slice.reducer;
export const { delContact, createContact, filterName } = slice.actions;

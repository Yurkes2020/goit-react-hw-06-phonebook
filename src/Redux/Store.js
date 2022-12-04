import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  FLUSH,
  persistStore,
  persistReducer,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const sliceContact = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  },
  reducers: {
    addContact(state, action) {
      state.contacts.unshift(action.payload);
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

const sliceFilter = createSlice({
  name: 'filter',
  initialState: {
    filter: '',
  },
  reducers: {
    filter(state, action) {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, sliceContact.reducer);

export const { addContact, deleteContact } = sliceContact.actions;
export const { filter } = sliceFilter.actions;

export const store = configureStore({
  reducer: {
    contacts: persistedReducer,
    filter: sliceFilter.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

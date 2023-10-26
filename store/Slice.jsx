import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const emailSlice = createSlice({
  name: "emailMessages",
  initialState: {
    emailMessages: [],
    loading: false,
    readMessages: [],
    favoriteMessages: [],
    readMessage: null,
  },
  reducers: {
    setEmailMessages: (state, action) => {
      const messages = [...action.payload];
      state.emailMessages = messages.map((msg) => {
        return { ...msg, current: false, favorite: false, read: false };
      });
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    handleRead: (state, action) => {
      state.emailMessages = state.emailMessages.map((msg) => {
        if (msg.id === action.payload) {
          return { ...msg, read: true, current: true };
        } else {
          return { ...msg, current: false };
        }
      });
      state.readMessages = state.emailMessages.filter(
        (msg) => msg?.read === true,
      );
      state.favoriteMessages = state.emailMessages.filter(msg => msg.favorite === true);
      if (state.readMessage && state.readMessage.id === action.payload) {
        return;
      }
      const messageFound = state.emailMessages.find(
        (msg) => msg.id === action.payload,
      );
      state.readMessage = { ...messageFound, body: null }
    },
    setReadMessage: (state, action) => {
      state.readMessage = action.payload;
    },
    testFunction: (state, action) => {
      console.log("test function");
    },
    handleFavorite: (state, action) => {
      state.emailMessages = state.emailMessages.map((msg) => {
        if (msg.id === action.payload) {
          return { ...msg, favorite: !msg.favoritefalse };
        }
        return msg;
      });
      state.favoriteMessages = state.emailMessages.filter((msg) => msg.favorite === true);
      if (action.payload === state.readMessage.id) {
        state.readMessage = {
          ...state.readMessage,
          favorite: state.readMessage.favorite ? false : true,
        };
      }
    },
  },
});



// For Local Storage configuration

const persistConfig = {
  key: 'emailSlice',
  blacklist: ['loading', 'readMessage'],
  storage,
}


// const persistedEmailReducer = persistReducer(persistConfig, emailSlice.reducer);



const store = configureStore({
  reducer: {
    emailSlice: persistReducer(persistConfig, emailSlice.reducer),
  },
  middleware: [thunk]
});

export const {
  setEmailMessages,
  handleRead,
  setReadMessage,
  handleFavorite,
  setLoading,
  testFunction
} = emailSlice.actions;

export default store;


export const persistor = persistStore(store);
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const emailSlice = createSlice({
  name: "emailMessages",
  initialState: {
    emailMessages: [],
    loading: false,
    emailLoading: false,
    readMessages: [],
    favoriteMessages: [],
    readMessage: null,
  },
  reducers: {

    // sets the initial state of main unread messages
    setEmailMessages: (state, action) => {
      const messages = [...action.payload];
      state.emailMessages = messages.map((msg) => {
        return { ...msg, current: false, favorite: false, read: false };
      });
    },


    // sets the Loading 
    setLoading: (state, action) => {
      state.loading = action.payload;
    },


    // sets the loading state for messages
    setEmailLoading: (state, action) => {
      state.emailLoading = action.payload
    },

    // handles the read state when we click on message & add it to read messages state
    handleRead: (state, action) => {
      state.emailMessages = state.emailMessages.map((msg) => {
        if (msg.id === action.payload) {
          return { ...msg, read: true, current: true };
        } else {
          return { ...msg, current: false };
        }
      });
      const newReadMessages = state.emailMessages.filter(msg => msg?.read === true);
      state.readMessages = newReadMessages;
      state.favoriteMessages = state.emailMessages.filter(msg => msg.favorite === true);
      if (state.readMessage && state.readMessage.id === action.payload) {
        return;
      }
      const messageFound = state.emailMessages.find(
        (msg) => msg.id === action.payload,
      );
      state.readMessage = { ...messageFound, body: null }
    },


    // sets the read message state on which we click on
    setReadMessage: (state, action) => {
      state.readMessage = action.payload;
    },

    // function to handle Favorite button functionality
    handleFavorite: (state, action) => {
      state.emailMessages = state.emailMessages.map((msg) => {
        if (msg.id === action.payload) {
          return { ...msg, favorite: !msg.favorite };
        }
        return msg;
      });
      state.readMessages = state.emailMessages.filter(msg => msg.read === true);
      const newFavoriteMessages = state.emailMessages.filter((msg) => msg.favorite === true);
      state.favoriteMessages = newFavoriteMessages;
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
  blacklist: ['loading', 'readMessage', 'emailLoading'],
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
  setEmailLoading,
} = emailSlice.actions;

export default store;


export const persistor = persistStore(store);
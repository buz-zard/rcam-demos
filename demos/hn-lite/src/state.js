import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import api from 'redux-cached-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'hn-lite-1',
  storage,
};

const apiNormalizer = store => next => action => {
  const result = next(action);
  if (action.type === 'persist/REHYDRATE') {
    store.dispatch(api.actions.invalidateCache());
  }
  return result;
};

export const store = createStore(
  persistCombineReducers(persistConfig, {
    [api.constants.NAME]: api.reducer,
  }),
  composeWithDevTools(applyMiddleware(thunk, apiMiddleware, apiNormalizer))
);

export const persistor = persistStore(store);

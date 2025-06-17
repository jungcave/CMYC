import React, {createContext, useContext} from 'react';
import {AppStore} from './AppStore';

let AppStoreContext;

export const AppStoreProvider = ({children, ...props}) => {
  const appStore = new AppStore(props);
  AppStoreContext = createContext(appStore);
  return <AppStoreContext.Provider value={appStore}>{children}</AppStoreContext.Provider>;
};

export const useAppStore = () => {
  const store = useContext(AppStoreContext);
  if (!store) throw new Error('Use app store within provider!');
  return store;
};

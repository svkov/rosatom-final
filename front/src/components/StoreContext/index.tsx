import React, { createContext, useContext } from 'react'

import Store from '../../store'

const RootStoreContext = createContext<Store | null>(null)

export const StoreProvider = ({ children }: any) => {
  const store = new Store()
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  )
}

export const useStore = () => useContext(RootStoreContext)

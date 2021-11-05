import React from 'react'

const WatchContext = React.createContext({
  watchList: [],
  addWatchListItem: () => {},
  isDark: true,
  ToogleTheme: () => {},
})
export default WatchContext

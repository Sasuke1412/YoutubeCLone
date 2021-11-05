import {Component} from 'react'

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'

import NotFound from './components/NotFound'

import Login from './components/Login'

import Header from './components/Header'

import Trending from './components/Trending'

import Gaming from './components/Gaming'

import SavedVideos from './components/SavedVideos'

import ProtectedRoute from './components/ProtectedRoute'

import WatchContext from './components/Context/watchContext'

import VideoItemDetails from './components/VideoItemDetails'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    watchList: [],
    isDark: true,
    ToogleTheme: () => {},
    addWatchListItem: () => {},
  }

  ToogleTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  addWatchListItem = item => {
    const {watchList} = this.state
    console.log(item)
    this.setState(prevState => ({watchList: [...prevState.watchList, item]}))
  }

  render() {
    const {watchList, isDark} = this.state
    return (
      <>
        <BrowserRouter>
          <WatchContext.Provider
            value={{
              isDark,
              watchList,
              ToogleTheme: this.ToogleTheme,
              addWatchListItem: this.addWatchListItem,
            }}
          >
            <Header />
            <Switch>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/trending" component={Trending} />
              <ProtectedRoute exact path="/gaming" component={Gaming} />
              <ProtectedRoute
                exact
                path="/saved-videos"
                component={SavedVideos}
              />
              <ProtectedRoute path="/videos/:id" component={VideoItemDetails} />

              <Route path="/bad-path" component={NotFound} />
              <Redirect to="/bad-path" />
            </Switch>
          </WatchContext.Provider>
        </BrowserRouter>
      </>
    )
  }
}

export default App

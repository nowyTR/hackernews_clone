import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import Header from '../Header'
import LinkList from '../LinkList'
import CreateLinkForm from '../CreateLinkForm'
import Login from '../Login'
import Search from '../Search'
import './App.css'
import ResetCss from '../ResetCss'

function App() {
  return (
    <div className="App">
      <ResetCss />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/new/1" />} />
          <Route exact path="/create" component={CreateLinkForm} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/top" component={LinkList} />
          <Route exact path="/new/:page" component={LinkList} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

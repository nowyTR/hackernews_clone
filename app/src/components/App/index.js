import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Header from '../Header'
import LinkList from '../LinkList'
import CreateLinkForm from '../CreateLinkForm'
import Login from '../Login'
import './App.css'
import ResetCss from '../ResetCss'

function App() {
  return (
    <div className="App">
      <ResetCss />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLinkForm} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

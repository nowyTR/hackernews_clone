import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Header from '../Header'
import LinkList from '../LinkList'
import CreateLinkForm from '../CreateLinkForm'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLinkForm} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

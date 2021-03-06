import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Main, Login, Navbar, Register, EditOrCreateNew } from './components'
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/main/:userId" component={Main} />
          <Route exact path="/main/:userId/add-todo" component={(props) => <EditOrCreateNew type="create" {...props} />} />
          <Route exact path="/main/:userId/todo/:todoId" component={(props) => <EditOrCreateNew type="edit" {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

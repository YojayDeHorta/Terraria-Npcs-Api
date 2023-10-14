import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NpcDetails from './pages/NpcDetails';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/npc/:id' element={<NpcDetails />} name="details" />
        </Routes>
    );
  }
}

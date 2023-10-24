import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NpcDetails from './pages/NpcDetails';
import NavbarTerraria from './components/Navbar';

export default class App extends Component {
  static displayName = App.name;

  render() {
      return (
          <>
              <NavbarTerraria/>
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/npc/:id' element={<NpcDetails />} name="details" />
              </Routes>
        </>
        
    );
  }
}

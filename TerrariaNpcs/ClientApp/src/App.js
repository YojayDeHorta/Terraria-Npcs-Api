import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NpcDetails from './pages/NpcDetails';
import NavbarTerraria from './components/Navbar';
import { AuthProvider } from './auth/AuthProvider';
import { UtilitiesProvider } from './auth/UtilitiesProvider';
import UserNpcs from './pages/UserNpcs';

export default class App extends Component {
  static displayName = App.name;

  render() {
      return (
          <AuthProvider>
              <UtilitiesProvider>
              <NavbarTerraria/>
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/usernpcs' element={<UserNpcs />} />

                  <Route path='/npc/:id' element={<NpcDetails />} name="details" />
                  </Routes>
              </UtilitiesProvider>
          </AuthProvider>
        
    );
  }
}

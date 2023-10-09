import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NpcCard from './components/NpcCard';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/npc/:id' element={<NpcCard />} name="details" />
        </Routes>
    );
  }
}

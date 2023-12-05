import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomeBody from './components/HomePage/HomeBody'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'
import NewDoc from './components/NewDoc/NewDoc'
import Editor from './components/Editor/Editor'
import SavedDoc from './components/SavedDoc/SavedDoc'
import AccountDelete from './components/Account/AccountDelete';

import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeBody />} /> 
        <Route path="/login" element={ !user ? <Login /> : <Navigate to='/codes' /> } /> 
        <Route path="/register" element={ !user ? <Register /> : <Navigate to='/codes' /> } /> 
        <Route path="/codes" element={ user ? <Dashboard /> : <Navigate to='/login' /> } />
        <Route path='/new' element={ user ? <NewDoc /> : <Navigate to='/login' /> } />
        <Route path='/:id' element={<SavedDoc />} />
        <Route path='/editor' element={<Editor />} />
        <Route path='/delete' element={ user ? <AccountDelete /> : <Navigate to='/login' /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

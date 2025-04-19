import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {DialogContextProvider, Header, UserContextProvider} from './index.jsx'
import { Toaster } from './components/ui/sonner'
function Layout() {
  const [dialog, setDialog] = useState(false);
  const [user, setUser] = useState(null);


  const openDialog= () => {
    setDialog(true)
  }
  const closeDialog= () => {
    setDialog(false)
  }
  const storeUser = (user)=>{
    setUser(JSON.parse(localStorage.getItem('user')))

    
  }

  useEffect(() => {
    storeUser();
  }, [])
  const deleteUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <UserContextProvider value={{user, storeUser, deleteUser}}>
      <DialogContextProvider value={{dialog, openDialog, closeDialog}}>
        <Toaster/>
        <Header/>
        <Outlet/>
      </ DialogContextProvider>
    </UserContextProvider>
  )
}

export default Layout
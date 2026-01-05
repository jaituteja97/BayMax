import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/navigation/Navigation'
import { clearBadge, setupNotifeePermissions } from './src/notifications/notificationPermission'



const App = () => {
  useEffect(() => {
    setupNotifeePermissions();

    // Clear badge when app opens
    clearBadge();
  }, []);


  return (
    <Navigation></Navigation>
  )
}


export default App
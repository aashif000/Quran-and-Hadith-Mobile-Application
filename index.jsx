// index.jsx
import React, { useState, useEffect } from 'react';
import { registerRootComponent } from 'expo';
import App from './App'; // Ensure this points to your App component
import Loading from './Loading'; // Import the Loading component

const Root = () => {
  const [isReady, setIsReady] = useState(false);

  // Simulate an async operation (e.g., fetching data, loading assets)
  useEffect(() => {
    const loadApp = async () => {
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
      setIsReady(true);
    };

    loadApp();
  }, []);

  if (!isReady) {
    return <Loading />; // Show loading page while app is not ready
  }

  return <App />; // Show main app once ready
};

// Register the main app component
registerRootComponent(Root);

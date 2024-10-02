

import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Router from "./router/router";
import './index.css';
import { ThemeProvider } from './components/NumTrip/components/ThemeProvider.jsx'


import ReactDOM from "react-dom/client";
import { AuthProvider } from "./Login/context/AuthProvider";



const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <AuthProvider>
    <ThemeProvider>
      
        <QueryClientProvider client={queryClient}>
        
            {/* <App/> */}
    <Router/>
    {/* <BgAudioFx/> */}
        </QueryClientProvider>
    </ThemeProvider>

        </AuthProvider>
  </React.StrictMode>
);

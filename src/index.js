import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './contexts/UserContext';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContext>
    <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </UserContext>
    <ToastContainer position="top-center" />
  </React.StrictMode>
);

reportWebVitals();

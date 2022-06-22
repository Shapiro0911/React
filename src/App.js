import React from "react";
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import './App.css'
import { store, persistor } from './store'
import { CircularProgress } from "@mui/material";
import { Router } from "./components/Routes/Routes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<CircularProgress />}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;

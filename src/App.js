import React from "react";
import Main from './components/Main';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react'
import configurationSetting, { setAxiosBase} from "./api/httpClient"
const { store, persistor } = ConfigureStore();

function App() {
  configurationSetting(store)
  const baseURL = "http://localhost:2000"
  setAxiosBase({baseURL})
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

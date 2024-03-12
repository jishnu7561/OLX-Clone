import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseContext , Context } from './Store/context';
import {Firebase} from './Firebase/config'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{Firebase}}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);



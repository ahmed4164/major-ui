import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { AuthContextProvider } from './routes/GlobalStateContext.jsx'
import configureStore from './store/configureStore.jsx';
import {Loader} from './components/index.jsx'; // Import your Loader component

const store = configureStore();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <div className="dark: bg-gray-darker ">
      <Provider store={store}>
        {/* <Loader /> */}
        <App />
      </Provider>
      </div>
    </AuthContextProvider>
  </React.StrictMode>,
)

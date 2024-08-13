
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {CssBaseline} from '@mui/material'
import { Provider } from 'react-redux'
import {store} from './app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <CssBaseline/>
    <App />
    </Provider>

)

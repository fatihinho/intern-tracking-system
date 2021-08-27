import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render((
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();

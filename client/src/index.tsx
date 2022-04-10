import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { AuthProvider } from './app/hooks/useAuthContext';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);

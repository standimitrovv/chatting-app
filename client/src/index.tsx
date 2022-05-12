import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app/App';
import { AuthProvider } from './app/hooks/useAuthContext';
import { ConversationProvider } from './start-page/hooks/useConversation';

ReactDOM.render(
  <AuthProvider>
    <ConversationProvider>
      <App />
    </ConversationProvider>
  </AuthProvider>,
  document.getElementById('root')
);

import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app/App';
import { AuthProvider } from './app/hooks/useAuthContext';
import { ConversationProvider } from './start-page/hooks/useConversation';
import { ResponseMessageProvider } from './start-page/hooks/useResponseMessage';

ReactDOM.render(
  <AuthProvider>
    <ConversationProvider>
      <ResponseMessageProvider>
        <App />
      </ResponseMessageProvider>
    </ConversationProvider>
  </AuthProvider>,
  document.getElementById('root')
);

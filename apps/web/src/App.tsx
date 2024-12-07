import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import Routes from '@/routes/index';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </BrowserRouter>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;

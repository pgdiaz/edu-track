import { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { AuthenticationProvider } from "./security/AuthenticationProvider";
import Navigator from "./routers/Navigator";
import { load } from './api/apiUsuarios';

function App() {

  useEffect(() => {
    load();
  }, []);

  return (
    <AuthenticationProvider>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}>
        <Navigator />
      </SnackbarProvider>
    </AuthenticationProvider>
  )
}

export default App

import { SnackbarProvider } from 'notistack';
import { AuthenticationProvider } from "./security/AuthenticationProvider";
import Navigator from "./routers/Navigator";

function App() {
  return (
    <AuthenticationProvider>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}>
        <Navigator />
      </SnackbarProvider>
    </AuthenticationProvider>
  )
}

export default App

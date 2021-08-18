import './App.css';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import { useRoutes } from 'react-router';
import routes from './routes';
import theme from './theme';



const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;

import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Header from '~/components/Header';
import Map from '~/containers/Map';
import Panel from '~/containers/Panel';
import { store } from '~/stores';
import { GlobalStyle } from '~/theme/global';
import { tokens } from '~/theme/tokens';
import { Container } from './styles';

function App() {
  const theme = 'light';

  const antdTheme = {
    token: {
      colorPrimary: tokens[theme].primary,
    },
  };

  return (
    <Provider store={store}>
      <ConfigProvider theme={antdTheme} locale={ptBR}>
        <ThemeProvider theme={tokens[theme]}>
          <GlobalStyle />
          <Header />

          <Container>
            <Panel />
            <Map />
          </Container>
        </ThemeProvider>
      </ConfigProvider>
    </Provider>
  );
}

export default App;

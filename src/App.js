import Home from './pages/home/Home';
import { Provider } from 'react-redux';
import store from './redux/store'
function App() {
  return (
    <>
      <Provider store={store}>
        <Home />
      </Provider>
    </>
  );
}

export default App;

// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
// import Header from './components/Header';
import MainWorkTime from './screens/MainWorkTime';

function App() {

  return (
    <div
      style={{
        height: '100vh'
      }}
    >
      <MainWorkTime />
    </div>
  );
}

export default App;

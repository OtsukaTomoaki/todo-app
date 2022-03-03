import '../static/App.css';
import { RouterApp } from '../page/RouterApp';

import { fetchToken } from '../apis/auth';

function App() {
  return (
    <div className="App">
      <RouterApp />
    </div>
  );
}

export default App;

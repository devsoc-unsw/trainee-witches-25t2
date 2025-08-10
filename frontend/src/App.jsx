import {
  BrowserRouter as Router,
} from "react-router-dom";

import Pages from './Pages/Pages';

const App = () => {
  return (
    <Router>
      <Pages />
    </Router>
  );
}

export default App;

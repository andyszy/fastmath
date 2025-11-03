import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from './pages/Menu';
import { Multiplication } from './pages/Multiplication';
import { Squares } from './pages/Squares';
import { Powers2 } from './pages/Powers2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/multiplication" element={<Multiplication />} />
        <Route path="/squares" element={<Squares />} />
        <Route path="/powers2" element={<Powers2 />} />
      </Routes>
    </Router>
  );
}

export default App;


import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Solutions from './Pages/Solutions';
import Research from './Pages/Research';

const App = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-accent selection:text-brand-dark overflow-x-hidden">
      
      {/* --- Navigation Component --- */}
      <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="#" element={<Home />} />
         <Route path="/hash-ai" element={<Home />} />
         <Route path="/home" element={<Home />} />
         <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/research" element={<Research />} />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
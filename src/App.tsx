import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Solutions from './Pages/Solutions';
import Research from './Pages/Research';
<<<<<<< HEAD
import Docs from './Pages/Docs'
=======
>>>>>>> 3cc452e660b2df9954d40b7dbf730ec96d04710a

const App = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-accent selection:text-brand-dark overflow-x-hidden">
       <HashRouter>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/home" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/solutions" element={<Solutions />} />
         <Route path="/research" element={<Research />} />
<<<<<<< HEAD
         <Route path="/Docs" element={<Docs />} />
=======
>>>>>>> 3cc452e660b2df9954d40b7dbf730ec96d04710a
       </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
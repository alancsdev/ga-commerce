import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage/HomePage';
import { Button } from '@material-tailwind/react';

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <div className="sm:mx-4 md:mx-10 xl:mx-10">
          <HomePage />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;

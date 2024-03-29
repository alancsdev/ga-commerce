import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Button } from '@material-tailwind/react';

function App() {
  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold underline">Hello world!</h1>
      <Footer />
    </>
  );
}

export default App;

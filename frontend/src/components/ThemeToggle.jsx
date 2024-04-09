import { useEffect } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <DarkModeSwitch
      // style={{ marginBottom: '2rem' }}
      checked={darkMode}
      onChange={toggleDarkMode}
      size={30}
    />
  );
};

export default ThemeToggle;

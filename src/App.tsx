import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UnitPage from './pages/UnitPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { client } from './lib/sanity';
import { SITE_SETTINGS_QUERY } from './lib/queries';
import './index.css';

function App() {
  useEffect(() => {
    async function fetchSettings() {
      try {
        const settings = await client.fetch(SITE_SETTINGS_QUERY);
        if (settings) {
          // Priority: Local Storage > Sanity Settings
          const localTheme = localStorage.getItem('theme');
          const themeToApply = localTheme || settings.themeMode || 'light';

          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(themeToApply);

          if (settings.primaryColor) {
            document.documentElement.style.setProperty('--primary', settings.primaryColor);
            document.documentElement.style.setProperty('--primary-dark', settings.primaryColor);
          }
          if (settings.secondaryColor) {
            document.documentElement.style.setProperty('--secondary', settings.secondaryColor);
          }
          if (settings.title) {
            document.title = settings.title;
          }
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    }
    fetchSettings();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/unit/:id" element={<UnitPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

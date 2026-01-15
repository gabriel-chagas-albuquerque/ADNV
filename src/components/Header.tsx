import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { client } from '../lib/sanity';
import { SITE_SETTINGS_QUERY } from '../lib/queries';
import logoImg from '../assets/logo.png';
import '../index.css';

interface SiteSettings {
    title: string;
    logoUrl?: string;
    themeMode?: string;
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const data = await client.fetch(SITE_SETTINGS_QUERY);
                setSettings(data);

                // Initialize theme state
                const localTheme = localStorage.getItem('theme') as 'light' | 'dark';
                const themeToApply = localTheme || data?.themeMode || 'light';
                setCurrentTheme(themeToApply as 'light' | 'dark');
            } catch (error) {
                console.error('Error fetching site settings:', error);
            }
        }
        fetchSettings();
    }, []);

    const toggleTheme = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
    };

    const closeMenu = () => setIsMobileMenuOpen(false);

    // Scroll to section logic if on home page
    const scrollToSection = (id: string) => {
        closeMenu();
        if (location.pathname !== '/') {
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const logoSrc = settings?.logoUrl || logoImg;
    const siteName = settings?.title || 'ADNV';

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''} `}>
            <div className="container header-container">
                <Link to="/" className="logo" onClick={closeMenu}>
                    <img src={logoSrc} alt={siteName} className="header-logo-image" />
                </Link>

                <div className="header-actions-wrapper">
                    {/* Desktop Navigation */}
                    <nav className="desktop-nav">
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>Início</Link>
                        <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>Sobre Nós</a>
                        <a href="#locations" onClick={(e) => { e.preventDefault(); scrollToSection('locations'); }}>Nossas Igrejas</a>
                    </nav>

                    <div className="header-controls">
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Overlay */}
                <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <Link to="/" onClick={() => { closeMenu(); window.scrollTo(0, 0); }}>Início</Link>
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>Sobre Nós</a>
                    <a href="#locations" onClick={(e) => { e.preventDefault(); scrollToSection('locations'); }}>Nossas Igrejas</a>
                    <button className="mobile-theme-item" onClick={toggleTheme}>
                        Tema: {currentTheme === 'light' ? 'Escuro' : 'Claro'}
                    </button>
                </div>
            </div>
        </header>
    );
}

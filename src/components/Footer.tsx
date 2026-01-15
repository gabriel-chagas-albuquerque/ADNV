import { useState, useEffect } from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { client } from '../lib/sanity';
import { SITE_SETTINGS_QUERY } from '../lib/queries';
import '../index.css';

interface SocialLink {
    platform: string;
    url: string;
}

interface SiteSettings {
    title: string;
    contactPhone?: string;
    contactEmail?: string;
    address?: string;
    socialLinks?: SocialLink[];
}

export default function Footer() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const data = await client.fetch(SITE_SETTINGS_QUERY);
                setSettings(data);
            } catch (error) {
                console.error('Error fetching site settings:', error);
            }
        }
        fetchSettings();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'facebook':
                return <Facebook size={20} />;
            case 'instagram':
                return <Instagram size={20} />;
            case 'youtube':
                return <Youtube size={20} />;
            default:
                return null;
        }
    };

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>{settings?.title || 'ADNV'}</h3>
                    <p>Levando a palavra de Deus a todos os corações.</p>
                    <div className="social-links">
                        {settings?.socialLinks?.map((link, index) => (
                            <a key={index} href={link.url} aria-label={link.platform} target="_blank" rel="noopener noreferrer">
                                {getSocialIcon(link.platform)}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Contato</h4>
                    <ul className="contact-list">
                        <li><MapPin size={16} /> <span>{settings?.address || 'Sede: Rua Principal, 123 - Centro'}</span></li>
                        {settings?.contactPhone && (
                            <li><Phone size={16} /> <span>{settings.contactPhone}</span></li>
                        )}
                        {settings?.contactEmail && (
                            <li><Mail size={16} /> <span>{settings.contactEmail}</span></li>
                        )}
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Links Rápidos</h4>
                    <ul className="footer-nav">
                        <li><a href="/">Início</a></li>
                        <li><a href="#about">Sobre Nós</a></li>
                        <li><a href="#locations">Nossas Igrejas</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container bottom-content">
                    <p>&copy; {new Date().getFullYear()} Assembleia de Deus Novo Viver. Todos os direitos reservados.</p>
                    <button className="scroll-top" onClick={scrollToTop} aria-label="Voltar ao topo">
                        <ArrowUp size={20} />
                    </button>
                </div>
            </div>
        </footer>
    );
}


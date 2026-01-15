import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import LocationCard from '../components/LocationCard';
import { Target, Heart, Users } from 'lucide-react';
import { client } from '../lib/sanity';
import { CAROUSEL_QUERY, UNITS_QUERY, SITE_SETTINGS_QUERY } from '../lib/queries';

interface CarouselItem {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    link?: string;
}

interface Unit {
    _id: string;
    name: string;
    slug: string;
    address: string;
    imageUrl: string;
}

interface SiteSettings {
    aboutText: any[];
    mission?: string;
    vision?: string;
    values?: string;
}

export default function Home() {
    const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [carousel, unitsList, siteSettings] = await Promise.all([
                    client.fetch(CAROUSEL_QUERY),
                    client.fetch(UNITS_QUERY),
                    client.fetch(SITE_SETTINGS_QUERY)
                ]);
                setCarouselItems(carousel);
                setUnits(unitsList);
                setSettings(siteSettings);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (loading) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [loading]);

    if (loading) {
        return (
            <div className="home-page">
                <div className="container py-5 text-center">
                    <p>Carregando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page">
            <Carousel items={carouselItems.map(item => ({
                image: item.imageUrl,
                title: item.title,
                subtitle: item.description
            }))} />

            <section id="about" className="section bg-surface">
                <div className="container">
                    <div className="section-header text-center reveal">
                        <h2 className="section-title text-gradient glitch-title" data-text="Sobre Nós">Sobre Nós</h2>
                        <p className="section-subtitle">Conheça nossa história e nossa missão</p>
                    </div>

                    <div className="about-grid">
                        <div className="about-content reveal-left">
                            <h3>Nossa História</h3>
                            {settings?.aboutText && settings.aboutText.length > 0 ? (
                                settings.aboutText.map((block: any, index: number) => (
                                    <p key={index}>
                                        {block.children?.map((child: any) => child.text).join('')}
                                    </p>
                                ))
                            ) : (
                                <>
                                    <p>
                                        A Assembleia de Deus Novo Viver nasceu do desejo de levar o evangelho de uma forma transformadora e acolhedora.
                                        Há mais de 20 anos, temos sido um farol de esperança em nossa comunidade, pregando a palavra de Deus
                                        e servindo àqueles que precisam.
                                    </p>
                                    <p>
                                        Acreditamos no poder da oração, na comunhão dos irmãos e na transformação de vidas através do Espírito Santo.
                                        Nossa igreja é um lugar para toda a família, onde você pode crescer espiritualmente e fazer parte de uma comunidade vibrante.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="values-grid">
                            <div className="value-card reveal-right delay-1">
                                <Target className="value-icon" size={32} />
                                <h4>Missão</h4>
                                <p>{settings?.mission || 'Levar o evangelho a toda criatura, discipulando e integrando.'}</p>
                            </div>
                            <div className="value-card reveal-right delay-2">
                                <Heart className="value-icon" size={32} />
                                <h4>Visão</h4>
                                <p>{settings?.vision || 'Ser uma igreja relevante, acolhedora e cheia do Espírito Santo.'}</p>
                            </div>
                            <div className="value-card reveal-right delay-3">
                                <Users className="value-icon" size={32} />
                                <h4>Valores</h4>
                                <p>{settings?.values || 'Amor, Fé, Comunhão, Serviço e Excelência.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="locations" className="section">
                <div className="container">
                    <div className="section-header text-center reveal">
                        <h2 className="section-title text-gradient glitch-title" data-text="Nossas Igrejas">Nossas Igrejas</h2>
                        <p className="section-subtitle">Encontre a unidade mais próxima de você</p>
                    </div>

                    <div className="locations-grid">
                        {units.map((unit, index) => (
                            <div key={unit._id} className={`reveal delay-${(index % 5) + 1}`}>
                                <LocationCard
                                    id={unit.slug}
                                    name={unit.name}
                                    address={unit.address}
                                    image={unit.imageUrl}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}


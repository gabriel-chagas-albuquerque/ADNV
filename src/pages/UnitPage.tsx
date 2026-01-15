import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Users, MessageCircle } from 'lucide-react';
import { client } from '../lib/sanity';
import { UNIT_BY_SLUG_QUERY } from '../lib/queries';

interface ScheduleItem {
    day: string;
    time: string;
    activity: string;
}

interface WhatsAppGroup {
    name: string;
    link: string;
}

interface Unit {
    _id: string;
    name: string;
    slug: string;
    address: string;
    description: any[];
    schedule: ScheduleItem[];
    imageUrl: string;
    pastorName?: string;
    whatsappGroups?: WhatsAppGroup[];
}

export default function UnitPage() {
    const { id } = useParams<{ id: string }>();
    const [unit, setUnit] = useState<Unit | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUnit() {
            if (!id) return;

            try {
                const data = await client.fetch(UNIT_BY_SLUG_QUERY, { slug: id });
                setUnit(data);
            } catch (error) {
                console.error('Error fetching unit:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchUnit();
    }, [id]);

    useEffect(() => {
        if (loading || !unit) return;

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
    }, [loading, unit]);

    if (loading) {
        return (
            <div className="unit-page">
                <div className="container py-5 text-center">
                    <p>Carregando...</p>
                </div>
            </div>
        );
    }

    if (!unit) {
        return (
            <div className="unit-page">
                <div className="container py-5 text-center">
                    <h2>Unidade não encontrada</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="unit-page">
            <div className="unit-header bg-surface">
                <div className="container reveal">
                    <h1 className="unit-title text-gradient glitch-title" data-text={unit.name}>{unit.name}</h1>
                    <p className="unit-description">{unit.address}</p>
                </div>
            </div>

            <div className="container py-5">
                <div className="unit-grid">
                    <div className="schedule-section reveal-left">
                        <h2 className="section-title-small">
                            <Clock className="inline-icon" /> Programação
                        </h2>
                        <div className="schedule-list">
                            {unit.schedule && unit.schedule.length > 0 ? (
                                unit.schedule.map((item, index) => (
                                    <div key={index} className="schedule-item reveal delay-1">
                                        <span className="day">{item.day}</span>
                                        <span className="time">{item.time}</span>
                                        <span className="event">{item.activity}</span>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhuma programação disponível no momento.</p>
                            )}
                        </div>
                    </div>

                    <div className="groups-section reveal-right">
                        <h2 className="section-title-small">
                            <Users className="inline-icon" /> Informações
                        </h2>

                        {unit.pastorName && (
                            <div className="pastor-info mb-4 reveal delay-1">
                                <p className="mb-1 text-sm text-muted">Pastor Responsável</p>
                                <p className="font-semibold text-lg">{unit.pastorName}</p>
                            </div>
                        )}

                        <div className="about-content mb-4 reveal delay-2">
                            {unit.description && unit.description.length > 0 ? (
                                unit.description.map((block: any, index: number) => (
                                    <p key={index} className="mb-2">
                                        {block.children?.map((child: any) => child.text).join('')}
                                    </p>
                                ))
                            ) : (
                                <p>Informações em breve.</p>
                            )}
                        </div>

                        {unit.whatsappGroups && unit.whatsappGroups.length > 0 && (
                            <div className="whatsapp-links mt-5 reveal delay-3">
                                <h3 className="section-title-xs mb-3">Grupos de Comunicação (WhatsApp)</h3>
                                <div className="whatsapp-buttons-container">
                                    {unit.whatsappGroups.map((group, index) => (
                                        <a
                                            key={index}
                                            href={group.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="whatsapp-btn"
                                        >
                                            <MessageCircle size={18} />
                                            <span>{group.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


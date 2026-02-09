import { useState, useEffect, useRef } from 'react';
import { Users, Utensils, Scissors, Activity, MapPin, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { client } from '../lib/sanity';
import { MISSION_PROJECT_QUERY } from '../lib/queries';

interface StatItemProps {
    icon: React.ReactNode;
    label: string;
    value: number;
    suffix?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
    Users,
    Utensils,
    Scissors,
    Activity,
    MapPin
};

function StatItem({ icon, label, value, suffix = "" }: StatItemProps) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
        <div className="stat-card reveal" ref={countRef}>
            <div className="stat-icon-wrapper">
                {icon}
            </div>
            <div className="stat-info">
                <span className="stat-value">
                    {count.toLocaleString()}{suffix}
                </span>
                <span className="stat-label">{label}</span>
            </div>
        </div>
    );
}

interface MissionProjectData {
    title: string;
    subtitle: string;
    badge: string;
    contentTitle: string;
    description: any[];
    stats: {
        iconName: string;
        label: string;
        value: number;
        suffix: string;
    }[];
}

export default function MissionProject() {
    const [data, setData] = useState<MissionProjectData | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await client.fetch(MISSION_PROJECT_QUERY);
                if (result) {
                    setData(result);
                }
            } catch (error) {
                console.error('Error fetching mission project:', error);
            }
        }
        fetchData();
    }, []);

    const renderIcon = (name: string) => {
        const IconComponent = ICON_MAP[name] || Heart;
        return <IconComponent size={28} />;
    };

    return (
        <section id="mission-project" className="section mission-project-section">
            <div className="container">
                <div className="section-header text-center reveal">
                    <h2 className="section-title text-gradient glitch-title" data-text={data?.title || "Projeto Fonte de Água Viva"}>
                        {data?.title || "Projeto Fonte de Água Viva"}
                    </h2>
                    <p className="section-subtitle">{data?.subtitle || "Ação Missionária e Social Transformando Vidas"}</p>
                </div>

                <div className="project-grid">
                    <div className="project-description reveal-left">
                        <div className="description-badge">
                            <Heart size={16} /> {data?.badge || "Impacto Social"}
                        </div>
                        <h3>{data?.contentTitle || "Evangelismo e Cuidado"}</h3>

                        {data?.description && data.description.length > 0 ? (
                            data.description.map((block: any, index: number) => (
                                <p key={index}>
                                    {block.children?.map((child: any) => child.text).join('')}
                                </p>
                            ))
                        ) : (
                            <>
                                <p>
                                    O <strong>Projeto Fonte de Água Viva</strong> é o coração missionário da nossa igreja em movimento.
                                    Atuamos diretamente nas comunidades, levando o amor de Deus através de ações práticas e acolhimento espiritual.
                                </p>
                                <p>
                                    Durante nossas edições, oferecemos serviços essenciais gratuitos como <strong>medição de pressão arterial</strong> e
                                    <strong> corte de cabelo</strong>. Nosso compromisso vai além do físico: realizamos um trabalho dedicado de
                                    <strong> evangelismo infantil</strong> com atividades lúdicas, além de levar a palavra de esperança para adultos.
                                </p>
                                <p>
                                    Ao final de cada encontro, celebramos a comunhão com a <strong>distribuição de lanches</strong>,
                                    fortalecendo os laços comunitários e alimentando corpo e alma.
                                </p>
                            </>
                        )}
                    </div>

                    <div className="project-dashboard reveal-right">
                        <div className="dashboard-grid">
                            {data?.stats && data.stats.length > 0 ? (
                                data.stats.map((stat, index) => (
                                    <StatItem
                                        key={index}
                                        icon={renderIcon(stat.iconName)}
                                        label={stat.label}
                                        value={stat.value}
                                        suffix={stat.suffix}
                                    />
                                ))
                            ) : (
                                <>
                                    <StatItem
                                        icon={<Users size={28} />}
                                        label="Vidas Alcançadas"
                                        value={1500}
                                        suffix="+"
                                    />
                                    <StatItem
                                        icon={<Utensils size={28} />}
                                        label="Alimentos (kg)"
                                        value={2800}
                                    />
                                    <StatItem
                                        icon={<Scissors size={28} />}
                                        label="Cortes de Cabelo"
                                        value={450}
                                    />
                                    <StatItem
                                        icon={<Activity size={28} />}
                                        label="Pressão Aferida"
                                        value={800}
                                    />
                                    <StatItem
                                        icon={<MapPin size={28} />}
                                        label="Cidades Atendidas"
                                        value={12}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


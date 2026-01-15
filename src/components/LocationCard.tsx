import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../index.css';

interface LocationCardProps {
    id: string;
    name: string;
    address: string;
    phone?: string;
    image: string;
}

export default function LocationCard({ id, name, address, phone, image }: LocationCardProps) {
    return (
        <Link to={`/unit/${id}`} className="location-card">
            <div className="location-image-container">
                <img src={image} alt={name} className="location-image" />
                <div className="location-overlay">
                    <span className="view-details">Ver Detalhes <ArrowRight size={16} /></span>
                </div>
            </div>
            <div className="location-content">
                <h3 className="location-name">{name}</h3>
                <div className="location-info">
                    <p><MapPin size={16} className="icon" /> {address}</p>
                    {phone && <p><Phone size={16} className="icon" /> {phone}</p>}
                </div>
            </div>
        </Link>
    );
}

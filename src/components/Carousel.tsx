import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../index.css';

interface CarouselItem {
    image: string;
    title?: string;
    subtitle?: string;
}

interface CarouselProps {
    items: CarouselItem[];
    autoPlayInterval?: number;
}

export default function Carousel({ items, autoPlayInterval = 5000 }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide, autoPlayInterval]);

    if (!items.length) return null;

    return (
        <div
            className="carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                className="carousel-inner"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {items.map((item, index) => (
                    <div key={index} className="carousel-item">
                        <img src={item.image} alt={item.title || `Slide ${index + 1}`} />
                        {/* Overlay Gradient */}
                        <div className="carousel-overlay"></div>

                        {(item.title || item.subtitle) && (
                            <div className="carousel-caption">
                                {item.subtitle && <span className="carousel-subtitle">{item.subtitle}</span>}
                                {item.title && <h2 className="carousel-title">{item.title}</h2>}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button className="carousel-control prev" onClick={prevSlide} aria-label="Previous slide">
                <ChevronLeft size={32} />
            </button>
            <button className="carousel-control next" onClick={nextSlide} aria-label="Next slide">
                <ChevronRight size={32} />
            </button>

            <div className="carousel-indicators">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

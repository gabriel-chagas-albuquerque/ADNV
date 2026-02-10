import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../index.css';

interface CarouselItem {
    image: string;
    videoUrl?: string;
    youtubeUrl?: string;
    mediaType?: 'image' | 'video' | 'youtube';
    title?: string;
    subtitle?: string;
}

interface CarouselProps {
    items: CarouselItem[];
    autoPlayInterval?: number;
}

function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
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
        const currentItem = items[currentIndex];
        // Don't auto-advance if it's a video/youtube slide and it's playing
        if (isPaused || currentItem?.mediaType === 'video' || currentItem?.mediaType === 'youtube') return;

        const interval = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide, autoPlayInterval, items, currentIndex]);

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
                {items.map((item, index) => {
                    const isActive = index === currentIndex;
                    const youtubeId = item.youtubeUrl ? getYouTubeId(item.youtubeUrl) : null;

                    return (
                        <div key={index} className="carousel-item">
                            {item.mediaType === 'youtube' && youtubeId ? (
                                <div className="carousel-video-container">
                                    {isActive ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&enablejsapi=1`}
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                            className="carousel-video youtube-frame"
                                            style={{ pointerEvents: 'none' }}
                                        />
                                    ) : (
                                        <img src={item.image} alt={item.title || `Slide ${index + 1}`} />
                                    )}
                                </div>
                            ) : item.mediaType === 'video' && item.videoUrl ? (
                                <div className="carousel-video-container">
                                    {isActive ? (
                                        <video
                                            src={item.videoUrl}
                                            poster={item.image}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="carousel-video"
                                            onPlay={() => setIsPaused(true)}
                                            onEnded={() => {
                                                if (isActive) nextSlide();
                                            }}
                                        />
                                    ) : (
                                        <img src={item.image} alt={item.title || `Slide ${index + 1}`} />
                                    )}
                                </div>
                            ) : (
                                <img src={item.image} alt={item.title || `Slide ${index + 1}`} />
                            )}
                            {/* Overlay Gradient */}
                            <div className="carousel-overlay"></div>

                            {(item.title || item.subtitle) && (
                                <div className="carousel-caption">
                                    {item.subtitle && <span className="carousel-subtitle">{item.subtitle}</span>}
                                    {item.title && <h2 className="carousel-title">{item.title}</h2>}
                                </div>
                            )}
                        </div>
                    );
                })}

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

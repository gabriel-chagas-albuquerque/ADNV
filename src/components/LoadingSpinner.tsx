import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="spinner-wrapper">
                    <Loader2 className="spinner-icon" size={48} />
                    <div className="spinner-ring"></div>
                </div>
                <h2 className="loading-text text-gradient glitch-title" data-text="Carregando">
                    Carregando
                </h2>
                <div className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                </div>
            </div>
        </div>
    );
}

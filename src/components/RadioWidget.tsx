import { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';
import { client } from '../lib/sanity';
import { SITE_SETTINGS_QUERY } from '../lib/queries';

export default function RadioWidget() {
    const [radioUrl, setRadioUrl] = useState('https://www.webradionovoviver.com.br');

    useEffect(() => {
        async function fetchSettings() {
            try {
                const data = await client.fetch(SITE_SETTINGS_QUERY);
                if (data?.radioUrl) {
                    setRadioUrl(data.radioUrl);
                }
            } catch (error) {
                console.error('Error fetching radio URL:', error);
            }
        }
        fetchSettings();
    }, []);

    return (
        <a
            href={radioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="radio-widget"
            aria-label="Ouça nossa Rádio Web"
        >
            <div className="radio-content">
                <div className="radio-icon-container">
                    <Radio size={24} />
                    <span className="live-pulse"></span>
                </div>
                <div className="radio-text">
                    <span className="radio-title">Rádio Novo Viver</span>
                    <span className="radio-status">OUÇA AGORA</span>
                </div>
            </div>
        </a>
    );
}


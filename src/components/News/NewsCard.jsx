/* eslint-disable react/prop-types */
import { Clock } from "lucide-react";
export const NewsCard = ({ news, onCardClick }) => {
    // Sentiment and Impact Color Mapping
    const SENTIMENT_COLORS = {
        bullish: 'badge-success',
        bearish: 'badge-error',
        positive: 'badge-primary',
        neutral: 'badge-neutral'
    };

    const IMPACT_COLORS = {
        High: 'badge-error',
        Medium: 'badge-warning',
        Low: 'badge-info'
    };

    return (
        <div 
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            onClick={() => onCardClick(news)}
        >
            <figure className="relative">
                <img 
                    src={news.imageUrl} 
                    alt={news.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                    <span className={`badge ${SENTIMENT_COLORS[news.sentiment]}`}>
                        {news.sentiment.charAt(0).toUpperCase()}
                    </span>
                    <span className={`badge ${IMPACT_COLORS[news.impact]}`}>
                        {news.impact.charAt(0)}
                    </span>
                </div>
            </figure>
            <div className="card-body">
                <h3 className="card-title text-lg font-bold line-clamp-2">{news.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{news.summary}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-base-content/50">{news.source}</span>
                        <div className="badge badge-ghost">{news.category}</div>
                    </div>
                    <div className="flex items-center space-x-2 text-base-content/70">
                        <Clock size={16} />
                        <span className="text-xs">{news.readTime} min</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
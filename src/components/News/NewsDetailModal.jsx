/* eslint-disable react/prop-types */
import { Clock, ArrowUpRight } from "lucide-react";
export const NewsDetailModal = ({ news, onClose }) => {
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

    if (!news) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
                <button 
                    className="btn btn-sm btn-circle absolute right-2 top-2" 
                    onClick={onClose}
                >
                    ✕
                </button>
                
                <div className="space-y-4">
                    <img 
                        src={news.imageUrl} 
                        alt={news.title} 
                        className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                    
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className={`badge ${SENTIMENT_COLORS[news.sentiment]}`}>
                                {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
                            </span>
                            <span className={`badge ${IMPACT_COLORS[news.impact]}`}>
                                {news.impact} Impact
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-base-content/70">
                            <Clock size={16} />
                            <span>{news.readTime} min read</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold">{news.title}</h2>
                    
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-base-content/70">Source:</span>
                            <a 
                                href={news.sourceUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="link link-primary flex items-center"
                            >
                                {news.source}
                                <ArrowUpRight size={16} className="ml-1" />
                            </a>
                        </div>
                        <span className="text-base-content/50">{news.timestamp}</span>
                    </div>

                    <div className="prose max-w-none">
                        <p>{news.fullContent}</p>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Related Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {news.tags.map(tag => (
                                <span key={tag} className="badge badge-outline">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
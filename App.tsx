import React, { useState } from 'react';
import Sentiment from 'sentiment';
import { MessageCircle, Send, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';

// Mock tweets data
const mockTweets = [
  "I absolutely love this new feature! It's amazing! 🎉",
  "This is the worst experience ever. Totally disappointed. 😠",
  "The customer service was really helpful today.",
  "Can't believe how buggy this software is. Waste of money.",
  "Just had a great time at the conference! Learning so much!",
];

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [tweets, setTweets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const sentiment = new Sentiment();

  const analyzeSentiment = (text: string) => {
    const analysis = sentiment.analyze(text);
    return {
      score: analysis.score,
      comparative: analysis.comparative,
      positive: analysis.positive,
      negative: analysis.negative,
    };
  };

  const handleAnalyze = () => {
    if (!text.trim()) return;
    const analysis = analyzeSentiment(text);
    setResult(analysis);
  };

  const loadTweets = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTweets(mockTweets);
      setLoading(false);
    }, 1000);
  };

  const getSentimentColor = (score: number) => {
    if (score > 0) return 'text-green-500';
    if (score < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const getSentimentIcon = (score: number) => {
    if (score > 0) return <ThumbsUp className="w-5 h-5" />;
    if (score < 0) return <ThumbsDown className="w-5 h-5" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sentiment Analysis</h1>
          <p className="text-gray-600 mb-6">Analyze the sentiment of any text or social media content</p>
          
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <textarea
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                rows={4}
                placeholder="Enter text to analyze..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button
              onClick={handleAnalyze}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 h-fit"
            >
              <Send className="w-4 h-4" />
              Analyze
            </button>
          </div>

          {result && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-gray-600">Sentiment Score</p>
                  <p className={`text-2xl font-bold ${getSentimentColor(result.score)}`}>
                    {result.score}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-gray-600">Positive Words</p>
                  <p className="text-2xl font-bold text-green-500">{result.positive.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-gray-600">Negative Words</p>
                  <p className="text-2xl font-bold text-red-500">{result.negative.length}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Sample Tweets</h2>
            <button
              onClick={loadTweets}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Load Tweets
            </button>
          </div>

          <div className="space-y-4">
            {tweets.map((tweet, index) => {
              const tweetSentiment = analyzeSentiment(tweet);
              return (
                <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-gray-800">{tweet}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`flex items-center gap-1 ${getSentimentColor(tweetSentiment.score)}`}>
                          {getSentimentIcon(tweetSentiment.score)}
                          Score: {tweetSentiment.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {tweets.length === 0 && (
              <p className="text-gray-500 text-center py-4">Click "Load Tweets" to see sample tweets and their sentiment analysis</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
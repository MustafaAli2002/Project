import React, { useState, useEffect, useRef } from 'react';
import Navbars from '../componet/Nav/navber';
import './Premier.css';

function Ligue1() {
  const [activeTab, setActiveTab] = useState('standings');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef(null);

  const WIDGET_CONFIG = {
    standings: {
      widgetType: "entityStandings",
      widgetId: "e98bfb8f-998e-4886-9981-c0946bd75564"
    },
    scores: {
      widgetType: "entityScores",
      widgetId: "8a4a0fed-ed91-4490-8ad0-c215f9edfe0e"
    }
  };

  const generateWidgetHtml = (type) => {
    const config = WIDGET_CONFIG[type] || WIDGET_CONFIG.standings;

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <base target="_parent">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=1024">
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 1024px;
            font-family: Arial, sans-serif;
            overflow-y: auto;
            background-color: #222;
            color: #fff;
          }
          .widget-container {
            width: 100%;
            min-height: 640px;
            padding: 15px;
            box-sizing: border-box;
          }
          #powered-by {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #aaa;
            position: sticky;
            bottom: 0;
            background: #222;
          }
          #powered-by-link {
            color: #4dabf7;
            text-decoration: none;
            font-weight: bold;
            margin-left: 4px;
          }
          [data-widget-type] {
            width: 100% !important;
            min-height: 580px !important;
          }
        </style>
      </head>
      <body>
        <div class="widget-container">
          <div 
            data-widget-type="${config.widgetType}" 
            data-entity-type="league" 
            data-entity-id="35" 
            data-lang="en" 
            data-widget-id="${config.widgetId}"
            data-theme="dark">
          </div>
          <div id="powered-by">
            Powered by <a id="powered-by-link" href="https://www.365scores.com" target="_blank" rel="noopener noreferrer">365Scores.com</a>
          </div>
        </div>
        <script>
          (function() {
            var script = document.createElement('script');
            script.src = 'https://widgets.365scores.com/main.js?t=' + new Date().getTime();
            script.async = true;
            document.body.appendChild(script);
            
            var loadCheckInterval = setInterval(function() {
              var widget = document.querySelector('[data-widget-type]');
              if (widget && widget.innerHTML.trim() !== '') {
                clearInterval(loadCheckInterval);
                try {
                  if (window.parent) {
                    window.parent.postMessage({
                      type: 'widgetLoaded',
                      widgetType: '${type}',
                      league: 'ligue1'
                    }, '*');
                  }
                } catch(e) {
                  console.error('PostMessage error:', e);
                }
              }
            }, 500);
            
            setTimeout(function() {
              clearInterval(loadCheckInterval);
            }, 10000);
          })();
        </script>
      </body>
      </html>
    `;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setError('Loading timeout - please refresh');
        console.error('Widget loading timeout');
      }
    }, 15000); // Increased timeout to 15 seconds

    const handleMessage = (event) => {
      if (event.data?.type === 'widgetLoaded' && event.data?.league === 'ligue1') {
        clearTimeout(timer);
        setIsLoading(false);
        setError(null);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('message', handleMessage);
    };
  }, [isLoading, retryCount, activeTab]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setRetryCount(prev => prev + 1);
  };

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setIsLoading(true);
      setError(null);
    }
  };

  return (
    <>
      <Navbars />
      <div className="ligue1-container">
        <div className="ligue1-layout">
          {/* Right section - control buttons */}
          <div className="ligue1-controls">
            <button 
              className={`control-button ${activeTab === 'standings' ? 'active' : ''}`}
              onClick={() => handleTabChange('standings')}
              aria-current={activeTab === 'standings' ? 'true' : 'false'}
              aria-label="League table"
            >
              League Table
            </button>
            <button 
              className={`control-button ${activeTab === 'scores' ? 'active' : ''}`}
              onClick={() => handleTabChange('scores')}
              aria-current={activeTab === 'scores' ? 'true' : 'false'}
              aria-label="Today's matches"
            >
              Today's matches
            </button>
          </div>
          
          {/* Left section - content display */}
          <div className="ligue1-content">
            {isLoading && !error && (
              <div className="loading-placeholder" role="status" aria-live="polite">
                <div className="loading-spinner" aria-hidden="true"></div>
                <p>
                  {activeTab === 'standings' 
                    ? 'جارٍ تحميل جدول الدوري الفرنسي...' 
                    : 'جارٍ تحميل مباريات اليوم...'}
                </p>
              </div>
            )}

            {error && (
              <div className="error-state" role="alert">
                <p>⚠️ {error}</p>
                <button 
                  onClick={handleRetry}
                  className="retry-button"
                  aria-label="إعادة تحميل المحتوى"
                >
                  إعادة المحاولة
                </button>
              </div>
            )}

            <iframe
              key={`ligue1-iframe-${activeTab}-${retryCount}`}
              ref={iframeRef}
              srcDoc={generateWidgetHtml(activeTab)}
              title={activeTab === 'standings' ? 'جدول دوري ليج 1' : 'مباريات ليج 1 اليوم'}
              style={{
                width: '1024px',
                height: '640px',
                border: 'none',
                display: (!isLoading && !error) ? 'block' : 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}
              onLoad={() => {
                // Fallback in case postMessage fails
                setTimeout(() => {
                  if (isLoading) {
                    setIsLoading(false);
                  }
                }, 2000);
              }}
              onError={() => setError('Failed to load widget content')}
              sandbox="allow-scripts allow-same-origin allow-storage-access-by-user-activation"
              loading="eager"
              aria-hidden={isLoading || error}
              aria-busy={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Ligue1;
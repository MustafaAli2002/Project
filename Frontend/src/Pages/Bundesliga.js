import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Navbars from '../componet/Nav/navber';
import './Premier.css';

function Bundesliga({ leagueId = 25, leagueName = "Bundesliga" }) {
  const [activeTab, setActiveTab] = useState('standings');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef(null);

  const generateWidgetHtml = (type) => {
    const widgetConfig = {
      standings: {
        widgetType: "entityStandings",
        widgetId: "5d7c2cd9-3f10-4e13-934d-85ea7cf10dff"
      },
      scores: {
        widgetType: "entityScores",
        widgetId: "f462955f-9e15-4b96-b1b1-1cb0213775eb"
      }
    };

    const config = widgetConfig[type] || widgetConfig.standings;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <base target="_parent">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            width: 100%; 
            font-family: Arial, sans-serif;
            overflow-y: auto;
            background-color: #222;
            color: #fff;
          }
          .widget-wrapper { 
            width: 100%; 
            padding: 15px; 
            box-sizing: border-box;
            min-height: 640px;
          }
          #powered-by { 
            text-align: center; 
            padding: 10px; 
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
          }
          [data-widget-type] { 
            width: 100% !important;
            min-height: 580px !important;
          }
        </style>
      </head>
      <body>
        <div class="widget-wrapper">
          <div 
            data-widget-type="${config.widgetType}" 
            data-entity-type="league" 
            data-entity-id="${leagueId}" 
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
            
            try {
              if (window.parent) {
                window.parent.postMessage({ 
                  type: 'widgetLoaded', 
                  widgetType: '${type}',
                  league: 'bundesliga'
                }, '*');
              }
            } catch(e) {
              console.error('PostMessage error:', e);
            }
          })();
        </script>
      </body>
      </html>
    `;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setError('Failed to load widget within expected time');
        console.error('Widget loading timeout');
      }
    }, 10000);

    const handleMessage = (event) => {
      if (event.data?.type === 'widgetLoaded' && 
          event.data?.league === 'bundesliga') {
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
    setActiveTab(tab);
    setIsLoading(true);
    setError(null);
  };

  return (
    <>
      <Navbars />
      <div className="premier-container">
        <div className="premier-layout">
          {/* القسم الأيمن - أزرار التحكم */}
          <div className="premier-controls">
            <button 
              className={`control-button ${activeTab === 'standings' ? 'active' : ''}`}
              onClick={() => handleTabChange('standings')}
              aria-current={activeTab === 'standings' ? 'true' : 'false'}
            >
              League Table
            </button>
            <button 
              className={`control-button ${activeTab === 'scores' ? 'active' : ''}`}
              onClick={() => handleTabChange('scores')}
              aria-current={activeTab === 'scores' ? 'true' : 'false'}
            >
              Today's matches
            </button>
          </div>
          
          {/* القسم الأيسر - عرض المحتوى */}
          <div className="premier-content">
            {isLoading && !error && (
              <div 
                className="loading-placeholder" 
                role="status"
                aria-live="polite"
              >
                <div className="spinner" aria-hidden="true"></div>
                <p>
                  {activeTab === 'standings' 
                    ? `جارٍ تحميل جدول ${leagueName}...` 
                    : `جارٍ تحميل مباريات ${leagueName}...`}
                </p>
              </div>
            )}
            
            {error && (
              <div className="error-message" role="alert">
                <p>
                  {activeTab === 'standings' 
                    ? `فشل تحميل جدول ${leagueName}` 
                    : `فشل تحميل مباريات ${leagueName}`}
                </p>
                <button 
                  onClick={handleRetry}
                  aria-label="إعادة المحاولة"
                >
                  إعادة المحاولة
                </button>
              </div>
            )}

            <iframe
              key={`bundesliga-widget-${activeTab}-${retryCount}`}
              ref={iframeRef}
              srcDoc={generateWidgetHtml(activeTab)}
              title={
                activeTab === 'standings' 
                  ? `${leagueName} جدول الدوري` 
                  : `${leagueName} مباريات اليوم`
              }
              style={{ 
                width: '100%',
                minHeight: '640px',
                border: 'none',
                display: (!isLoading && !error) ? 'block' : 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onLoad={() => setIsLoading(false)}
              onError={() => setError('Failed to load widget content')}
              sandbox="allow-scripts allow-same-origin allow-storage-access-by-user-activation"
              loading="eager"
              aria-hidden={isLoading || error}
            />
          </div>
        </div>
      </div>
    </>
  );
}

Bundesliga.propTypes = {
  leagueId: PropTypes.number,
  leagueName: PropTypes.string
};

export default Bundesliga;
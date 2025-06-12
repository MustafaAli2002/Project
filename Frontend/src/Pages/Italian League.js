import React, { useState, useEffect, useRef } from 'react';
import Navbars from '../componet/Nav/navber';
import './Premier.css';

function Italy() {
  const [activeTab, setActiveTab] = useState('standings');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef(null);

  const generateWidgetHtml = (type) => {
    const widgetConfig = {
      standings: {
        widgetType: "entityStandings",
        widgetId: "ac2c4022-b5de-4e0b-aff3-27f5eb7dd969"
      },
      scores: {
        widgetType: "entityScores",
        widgetId: "07fb4a41-3afe-44d2-9a46-6ee59c406f15"
      }
    };

    const config = widgetConfig[type] || widgetConfig.standings;

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
            data-entity-id="17" 
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
            
            // Send load event to parent
            try {
              if (window.parent) {
                window.parent.postMessage({ 
                  type: 'iframeLoaded', 
                  widget: 'serieA',
                  tabType: '${type}'
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
        setError('Failed to load widget. Please check your connection and try again.');
        console.error('Widget loading timeout');
      }
    }, 10000);

    const handleMessage = (event) => {
      if (event.data?.type === 'iframeLoaded' && 
          event.data?.widget === 'serieA' &&
          event.data?.tabType === activeTab) {
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
      <div className="italy-container">
        <div className="italy-layout">
          {/* القسم الأيمن - أزرار التحكم */}
          <div className="italy-controls">
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
          <div className="italy-content">
            {isLoading && !error && (
              <div className="loading-placeholder">
                <div className="loading-spinner" aria-hidden="true"></div>
                <p>
                  {activeTab === 'standings' 
                    ? 'جارٍ تحميل جدول الدوري الإيطالي...' 
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
              key={`seriea-widget-${activeTab}-${retryCount}`}
              ref={iframeRef}
              srcDoc={generateWidgetHtml(activeTab)}
              title={activeTab === 'standings' ? 'جدول الدوري الإيطالي' : 'مباريات الدوري الإيطالي اليوم'}
              style={{
                width: '1024px',
                height: '640px',
                border: 'none',
                display: (!isLoading && !error) ? 'block' : 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden'
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

export default Italy;
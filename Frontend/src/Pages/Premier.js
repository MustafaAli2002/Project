import React, { useState } from 'react';
import Navbars from '../componet/Nav/navber'; // تأكد من صحة المسار
import './Premier.css';

function Premier() {
  const [activeTab, setActiveTab] = useState('standings');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const standingsWidgetHtml = `
    <!DOCTYPE html>
    <html>
     <head>
      <base target="_parent">
      <meta name="viewport" content="width=1024">
      <style>
        body { margin: 0; padding: 0; width: 1024px; font-family: Arial, sans-serif; }
        .widget-wrapper { width: 1024px; padding: 15px; box-sizing: border-box; }
        #powered-by { text-align: center; padding: 10px; font-size: 12px; color: #666; }
        #powered-by a { color: #0066cc; text-decoration: none; }
        [data-widget-type] { width: 100% !important; }
      </style>
    </head>
    <body>
      <div data-widget-type="entityStandings" data-entity-type="league" data-entity-id="7" data-lang="en" data-widget-id="482a222c-d2fa-4377-ae09-68d696757103" data-theme="dark"></div>
<div id="powered-by">Powered by<a id="powered-by-link" href="https://www.365scores.com" target="_blank">365Scores.com</a></div>
<script src="https://widgets.365scores.com/main.js"></script>
    </body> 
    </html>
  `;

  const matchesWidgetHtml = `
    <!DOCTYPE html>
    <html>
      <head>
      <base target="_parent">
      <meta name="viewport" content="width=1024">
      <style>
        body { margin: 0; padding: 0; width: 1024px; font-family: Arial, sans-serif; }
        .widget-wrapper { width: 1024px; padding: 15px; box-sizing: border-box; }
        #powered-by { text-align: center; padding: 10px; font-size: 12px; color: #666; }
        #powered-by a { color: #0066cc; text-decoration: none; }
        [data-widget-type] { width: 100% !important; }
      </style>
    </head>
    <body>
     <div data-widget-type="entityScores" data-entity-type="league" data-entity-id="7" data-lang="en" data-widget-id="752a0d59-90e6-4565-a406-381f5dc17443" data-theme="dark"></div>
<div id="powered-by">Powered by<a id="powered-by-link" href="https://www.365scores.com" target="_blank">365Scores.com</a></div>
<script src="https://widgets.365scores.com/main.js"></script>
    </body>
    </html>
  `;


  return (
    <>
      <Navbars />
      <div className="premier-container">
        <div className="premier-layout">
          {/* الأزرار على اليسار */}
          <div className="premier-controls">
            <button 
              className={`control-button ${activeTab === 'standings' ? 'active' : ''}`}
              onClick={() => setActiveTab('standings')}
            >
              League Table
            </button>
            <button 
              className={`control-button ${activeTab === 'matches' ? 'active' : ''}`}
              onClick={() => setActiveTab('matches')}
            >
              Today's matches
            </button>
          </div>
          
          {/* الـ iframe على اليمين */}
          <div className="premier-content">
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="spinner"></div>
                <p>Loading data...</p>
              </div>
            )}
            <iframe
              srcDoc={activeTab === 'standings' ? standingsWidgetHtml : matchesWidgetHtml}
              title={activeTab === 'standings' ? 'League Standings' : 'Today\'s Matches'}
              style={{ 
                width: '100%',
                minHeight: '600px',
                border: 'none',
                display: iframeLoaded ? 'block' : 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onLoad={() => setIframeLoaded(true)}
              sandbox="allow-scripts allow-same-origin"
              key={activeTab}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Premier;
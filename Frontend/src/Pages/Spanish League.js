import React, { useState } from 'react';
import Navbars from '../componet/Nav/navber';
import './Premier.css';

function Spanish() {
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
     <div data-widget-type="entityStandings" data-entity-type="league" data-entity-id="11" data-lang="en" data-widget-id="3201de90-8ba9-4964-83fb-ac8f26e10eb6" data-theme="dark"></div>
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
      <div data-widget-type="entityScores" data-entity-type="league" data-entity-id="11" data-lang="en" data-widget-id="fb180fbb-b079-4b15-bc41-491322ef04d9" data-theme="dark"></div>
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
          <div className="premier-controls">
            <button
              className={`control-button ${activeTab === 'standings' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('standings');
                setIframeLoaded(false);
              }}
            >
              League Table
            </button>
            <button
              className={`control-button ${activeTab === 'matches' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('matches');
                setIframeLoaded(false);
              }}
            >
              Today's Matches
            </button>
          </div>

          <div className="premier-content">
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="spinner"></div>
                <p>Loading data .....{activeTab === 'standings' ? 'جدول الدوري الإسباني' : 'مباريات اليوم'}...</p>
              </div>
            )}

            <iframe
              srcDoc={activeTab === 'standings' ? standingsWidgetHtml : matchesWidgetHtml}
              title={activeTab === 'standings' ? 'جدول الدوري الإسباني' : 'مباريات اليوم'}
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
              loading="eager"
              key={activeTab}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Spanish;

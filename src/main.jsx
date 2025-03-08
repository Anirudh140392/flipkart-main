import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import OverviewState from './store/overview/OverviewState';
import HistoryState from './store/history/HistoryState';
import RulesState from './store/rules/RulesState';
import AuthState from './store/auth/AuthState';
import KeywordAnalyticsState from './store/keywordAnalytics/KeywordAnalyticsState';

const url = window.location.href;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <KeywordAnalyticsState>
        <AuthState>
          <HistoryState>
            <OverviewState>
              <RulesState>
                {!url.includes('/login') && !url.includes('/signup') && (
                  <>
                    <Navbar />
                    <Header />
                  </>
                )}
                <div
                  className={`${url.includes('/login') || url.includes('/signup')
                      ? 'auth-main-con'
                      : 'main-con'
                    }`}
                >
                  <App />
                </div>
              </RulesState>
            </OverviewState>
          </HistoryState>
        </AuthState>
      </KeywordAnalyticsState>
    </BrowserRouter>
  </StrictMode>
);

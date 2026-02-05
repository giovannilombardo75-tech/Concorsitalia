
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { SearchForm } from './components/SearchForm';
import { ResultDisplay } from './components/ResultDisplay';
import { SearchResult } from './types';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDeployGuide, setShowDeployGuide] = useState(false);

  const handleSearch = async (qualification: string, location: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await geminiService.searchCompetitions(qualification, location);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Si è verificato un errore imprevisto.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 pt-24 pb-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
            <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
            Pronto per il Web
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Trova il tuo futuro nel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-200">Pubblico Impiego</span>
          </h2>
          <p className="text-xl text-indigo-100/80 mb-8 max-w-2xl mx-auto">
            Analizziamo in tempo reale i bandi di concorso per offrirti solo le opportunità su misura per te.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {/* Content Area */}
      <div className="min-h-[400px] max-w-7xl mx-auto">
        {error && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center space-x-3 shadow-sm">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold">Errore durante la ricerca</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading && !result && (
          <div className="max-w-4xl mx-auto px-4 py-24 text-center">
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mt-8">Consultazione banche dati...</h3>
              <p className="text-slate-500 mt-2 max-w-sm">Stiamo cercando tra Gazzetta Ufficiale, InPA e portali regionali per trovare i concorsi più recenti.</p>
              
              <div className="mt-8 flex gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !result && !error && (
          <div className="max-w-4xl mx-auto px-4 py-24 text-center">
            <div className="opacity-40 flex flex-col items-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-xl font-medium text-slate-500">Pronto per la tua ricerca personalizzata</p>
              <p className="text-slate-400 mt-2 text-sm">Inserisci il tuo titolo di studio e la località per iniziare.</p>
            </div>
          </div>
        )}

        {result && <ResultDisplay result={result} />}
      </div>

      {/* Deployment Help Banner */}
      <div className="max-w-4xl mx-auto px-4 mb-24">
        <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-bold text-indigo-900 mb-1">Vuoi mettere questa app online?</h3>
            <p className="text-indigo-700/70 text-sm italic">Puoi pubblicarla gratuitamente in pochi click.</p>
          </div>
          <button 
            onClick={() => setShowDeployGuide(!showDeployGuide)}
            className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-sm hover:shadow-md transition-all border border-indigo-200"
          >
            {showDeployGuide ? "Chiudi Guida" : "Scopri come fare"}
          </button>
        </div>

        {showDeployGuide && (
          <div className="mt-4 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm animate-fade-in">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Guida Rapida alla Pubblicazione (Deployment)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">1</div>
                <p className="font-semibold">Account Vercel</p>
                <p className="text-slate-500">Crea un account gratuito su <a href="https://vercel.com" target="_blank" className="text-indigo-600 underline">Vercel.com</a>.</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">2</div>
                <p className="font-semibold">GitHub</p>
                <p className="text-slate-500">Carica questa cartella su un repository GitHub (privato o pubblico).</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">3</div>
                <p className="font-semibold">Importa & API Key</p>
                <p className="text-slate-500">Importa il repo su Vercel e aggiungi la variabile d'ambiente <code className="bg-slate-100 px-1 rounded text-pink-600 font-mono text-xs">API_KEY</code>.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 italic">Perché usare ConcorsItalia?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Risultati Aggregati",
                desc: "Raccogliamo bandi da portali regionali, comunali e nazionali in un'unica vista.",
                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              },
              {
                title: "IA Intelligente",
                desc: "Il nostro motore basato su Gemini analizza i requisiti per mostrarti solo ciò che ti interessa.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              {
                title: "Link Diretti",
                desc: "Ti forniamo i collegamenti ufficiali per scaricare il bando e presentare domanda.",
                icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;

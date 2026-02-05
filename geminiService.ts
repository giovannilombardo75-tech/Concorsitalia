
import { GoogleGenAI } from "@google/genai";
import { SearchResult, Competition, GroundingSource } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // L'API Key viene iniettata automaticamente in fase di build/runtime dalle impostazioni del server.
    // Usiamo process.env.API_KEY come da linee guida.
    const apiKey = process.env.API_KEY || "";
    this.ai = new GoogleGenAI({ apiKey });
  }

  async searchCompetitions(qualification: string, location: string): Promise<SearchResult> {
    const prompt = `Cerca concorsi pubblici attivi in Italia per chi possiede un titolo di studio di "${qualification}" nella zona di "${location}". 
    Includi concorsi nazionali se applicabili alla zona o concorsi specifici regionali/comunali.
    
    Per ogni concorso trovato, fornisci OBBLIGATORIAMENTE:
    1. Titolo del concorso
    2. Ente banditore
    3. Requisiti principali
    4. Scadenza (molto importante)
    5. Descrizione sintetica
    6. LINK DIRETTO per presentare la domanda o per visualizzare il bando ufficiale (es. link a InPA, Gazzetta Ufficiale o portale dell'Ente).
    
    Usa un formato Markdown chiaro. Formatta i link come [Testo del link](URL).
    Assicurati di cercare dati reali e aggiornati tramite Google Search.`;

    try {
      // In produzione, usiamo gemini-3-flash-preview per un bilanciamento ideale tra velocità e precisione
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "Spiacenti, non abbiamo trovato concorsi corrispondenti ai criteri inseriti.";
      
      // Estraiamo le fonti di grounding per la massima trasparenza
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources: GroundingSource[] = groundingChunks
        .filter((chunk: any) => chunk.web)
        .map((chunk: any) => ({
          title: chunk.web.title || "Fonte ufficiale",
          uri: chunk.web.uri,
        }));

      return {
        text,
        sources,
        competitions: [] // Popoliamo tramite il testo markdown renderizzato
      };
    } catch (error) {
      console.error("Error fetching competitions:", error);
      throw new Error("Errore di connessione con il motore di ricerca. Verifica la tua connessione o riprova tra qualche minuto.");
    }
  }
}

export const geminiService = new GeminiService();


# ConcorsItalia 🇮🇹

Un motore di ricerca intelligente per concorsi pubblici italiani basato su IA (Google Gemini 3).

## 🚀 Come metterlo Online (Deployment)

Il modo più rapido e professionale per pubblicare questa app è usare **Vercel**.

### Passo 1: GitHub
Carica questa cartella su un nuovo repository GitHub. Assicurati di includere tutti i file (tranne quelli nel `.gitignore`).

### Passo 2: Vercel
1. Vai su [vercel.com](https://vercel.com) e accedi con GitHub.
2. Clicca su **"Add New"** > **"Project"**.
3. Seleziona il repository appena creato.

### Passo 3: Configurazione API Key (Fondamentale)
Durante l'importazione, prima di cliccare su "Deploy":
1. Apri la sezione **"Environment Variables"**.
2. Aggiungi una nuova variabile:
   - **Key**: `API_KEY`
   - **Value**: (La tua chiave API di Gemini ottenuta da [Google AI Studio](https://aistudio.google.com/))
3. Clicca su **Add**.

### Passo 4: Deploy
Clicca su **"Deploy"**. Vercel costruirà l'app e ti fornirà un URL pubblico (es: `concorsitalia.vercel.app`) in meno di un minuto.

---

## 🛠 Sviluppo Locale
Se vuoi lavorarci sul tuo PC:
1. `npm install`
2. Crea un file `.env.local` e aggiungi `GEMINI_API_KEY=tua_chiave`
3. `npm run dev`

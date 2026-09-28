# Scam Shield 🛡️

> **"Detect scams before they detect you."**

Scam Shield is a modern, lightweight cybersecurity web application designed to help users detect potential scam warning signs in suspicious SMS/messages, emails, and URLs.

It operates entirely client-side using rule-based security heuristics to simulate an AI-powered detection experience—requiring **zero backend servers**, **zero databases**, and **no external API keys**.

---

## 🌟 Features

- **💬 Message & Email Analysis**: Identifies urgent language, prize/financial claims, banking requests, threats, and embedded links.
- **🔗 URL Detection**: Analyzes link structures for insecure HTTP protocols, numerical IP addresses, URL shorteners, excessive hyphens, and high-risk TLDs.
- **📊 Intuitive Risk Scoring**: Generates a score from 0–100 along with clear LOW, MEDIUM, or HIGH risk status badges.
- **💡 Actionable Explanations**: Explains *why* content may be dangerous and gives tailored safety recommendations.
- **💾 Local History Persistence**: Automatically stores past analysis records in the browser's `localStorage`.
- **⚡ 100% Client-Side Privacy**: User inputs stay strictly within the browser and are never uploaded or fetched across the network.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: JavaScript (ES Module syntax)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Storage**: Browser `localStorage`
- **Deployment Target**: Vercel SPA

---

## 🔍 How Scam Detection Works

Scam Shield uses transparent rule-based heuristic pattern matching implemented in `src/utils/scamDetector.js`.

### 1. Message Rules (`analyzeMessage`)
- **Urgency Language (+15)**: Words like *urgent*, *immediately*, *act now*, *expires today*.
- **Reward / Money Claims (+20)**: Promises of lottery wins, prize rewards, ₹ / $, cash bonuses.
- **Sensitive Banking Requests (+25)**: References to bank accounts, credit cards, OTPs, PINs, passwords, or KYC.
- **Threats & Coercion (+20)**: Words like *blocked*, *suspended*, *police*, *legal action*, *penalty*.
- **Suspicious Action Triggers (+20)**: Directives like *click here*, *verify your account*, *send OTP*.
- **Embedded URLs (+20)**: Link structures detected within message body text.

### 2. URL Rules (`analyzeUrl`)
- **Insecure Protocol (+20)**: Uses `http://` instead of secure `https://`.
- **Numerical IP Hostname (+30)**: Direct IP address usage instead of a registered domain.
- **Excessive Length (+15)**: URL string exceeds 75 characters.
- **Phishing Keywords (+20)**: Domain/path contains words like *login*, *verify*, *secure*, *account*, *banking*.
- **URL Shorteners (+25)**: Uses services like `bit.ly`, `tinyurl.com`, `t.co`, `cutt.ly`.
- **Deceptive "@" Symbol (+25)**: Obscures destination address before the `@`.
- **Excessive Hyphens / Subdomains (+15)**: Brand spoofing indicators.
- **High-Risk TLDs (+20)**: Extensions like `.xyz`, `.top`, `.tk`, `.click`, `.buzz`, `.info`, `.zip`.

*(Note: Maximum threat score is capped at 100).*

---

## 📁 Project Structure

```
scam-shield/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── FeatureCard.jsx
    │   └── RiskResult.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Analyze.jsx
    │   ├── History.jsx
    │   └── About.jsx
    └── utils/
        ├── scamDetector.js
        └── storage.js
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 How to Deploy to Vercel

Scam Shield is 100% client-side and requires zero environment variables or backend configuration.

### Deployment Steps:

1. Push your codebase to GitHub, GitLab, or Bitbucket.
2. Log into [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `scam-shield` repository.
4. Keep the default settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.

*(The Included `vercel.json` automatically handles SPA client-side routes for React Router).*

---

## ⚠️ Limitations

- **Heuristic Analyzer Only**: Scam Shield evaluates structural patterns and text heuristics locally. It does not perform active network web crawling, real-time WHOIS lookups, or live threat-intelligence database queries.
- **Educational Awareness**: A LOW risk score does not guarantee safety, and a HIGH risk score indicates potential warning signs rather than absolute proof of malicious intent.

---

## 🔮 Future Improvements

- Custom user-defined risk rule builder.
- Export analysis reports as PDF or PNG images.
- Multi-language support (Hindi, Spanish, French).
- QR code image scam analyzer.

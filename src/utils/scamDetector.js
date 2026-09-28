/**
 * Scam Shield - Rule-Based Scam Detection Engine
 * Client-side heuristic analyzer for messages and URLs.
 */

// Helper to sanitize & extract text patterns
const containsAny = (text, keywords) => {
  const lowerText = text.toLowerCase();
  return keywords.filter((word) => lowerText.includes(word.toLowerCase()));
};

/**
 * Analyzes SMS, message, or email text content for scam indicators.
 * @param {string} messageText 
 * @returns {Object} Analysis result containing score, level, indicators, explanation, and recommendation
 */
export function analyzeMessage(messageText) {
  if (!messageText || typeof messageText !== 'string' || messageText.trim() === '') {
    return {
      score: 0,
      level: 'LOW',
      indicators: [],
      explanation: 'No text provided for analysis.',
      recommendation: 'Please paste a suspicious SMS, email, or message content to perform an analysis.'
    };
  }

  const text = messageText.trim();
  const lowerText = text.toLowerCase();
  let score = 0;
  const indicators = [];

  // 1. Urgency Patterns (+15)
  const urgencyKeywords = ['urgent', 'immediately', 'act now', 'within 24 hours', 'last chance', 'verify now', 'action required', 'expires today', 'final notice', 'right now', 'instant'];
  const matchedUrgency = containsAny(lowerText, urgencyKeywords);
  if (matchedUrgency.length > 0) {
    score += 15;
    indicators.push({
      title: 'Urgent / Coercive Language',
      detail: `Creates artificial urgency using words like: "${matchedUrgency.slice(0, 3).join('", "')}"`,
      weight: 15
    });
  }

  // 2. Financial / Prize Claims (+20)
  const prizeKeywords = ['won', 'winner', 'prize', 'lottery', 'reward', '₹', '$', 'money', 'cash', 'claim now', 'jackpot', 'credited', 'free bonus', 'congratulations'];
  const matchedPrize = containsAny(lowerText, prizeKeywords);
  if (matchedPrize.length > 0) {
    score += 20;
    indicators.push({
      title: 'Reward or Financial Incentive Claim',
      detail: `Promises monetary rewards or claims using keywords: "${matchedPrize.slice(0, 3).join('", "')}"`,
      weight: 20
    });
  }

  // 3. Banking & Credential Requests (+25)
  const bankKeywords = ['bank', 'account', 'credit card', 'debit card', 'otp', 'pin', 'password', 'cvv', 'kyc', 'pan card', 'ssn', 'social security', 'login details', 'netbanking'];
  const matchedBank = containsAny(lowerText, bankKeywords);
  if (matchedBank.length > 0) {
    score += 25;
    indicators.push({
      title: 'Sensitive Banking / Credential Request',
      detail: `References sensitive financial details or credentials: "${matchedBank.slice(0, 3).join('", "')}"`,
      weight: 25
    });
  }

  // 4. Threats & Suspensions (+20)
  const threatKeywords = ['blocked', 'suspended', 'legal action', 'police', 'arrest', 'penalty', 'court', 'deactivated', 'terminated', 'lawsuit'];
  const matchedThreats = containsAny(lowerText, threatKeywords);
  if (matchedThreats.length > 0) {
    score += 20;
    indicators.push({
      title: 'Threat of Account Suspension or Legal Action',
      detail: `Uses intimidation tactics with threatening terms: "${matchedThreats.slice(0, 3).join('", "')}"`,
      weight: 20
    });
  }

  // 5. Suspicious Action Triggers (+20)
  const actionKeywords = ['click here', 'verify your account', 'send otp', 'share password', 'claim now', 'update info', 'click this link', 'fill details', 'verify immediately'];
  const matchedActions = containsAny(lowerText, actionKeywords);
  if (matchedActions.length > 0) {
    score += 20;
    indicators.push({
      title: 'Suspicious Call-to-Action',
      detail: `Urges immediate unsafe actions: "${matchedActions.slice(0, 3).join('", "')}"`,
      weight: 20
    });
  }

  // 6. Embedded URLs in message (+20)
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/[^\s]*)/gi;
  const embeddedUrls = text.match(urlRegex);
  if (embeddedUrls && embeddedUrls.length > 0) {
    score += 20;
    indicators.push({
      title: 'Embedded Web Link Detected',
      detail: `Message contains external URL link(s): ${embeddedUrls[0]}`,
      weight: 20
    });
  }

  // Cap score at 100
  score = Math.min(100, score);

  // Determine Risk Level
  let level = 'LOW';
  if (score >= 70) {
    level = 'HIGH';
  } else if (score >= 35) {
    level = 'MEDIUM';
  }

  // Generate Explanation
  let explanation = '';
  let recommendation = '';

  if (level === 'HIGH') {
    explanation = 'This message displays severe scam characteristics commonly found in phishing campaigns, prize scams, or banking fraud. Scammers intentionally combine false urgency with fake rewards or threats to deceive recipients into taking unsafe actions.';
    recommendation = 'Do NOT click any links, call any provided phone numbers, or reply to this message. Never share OTPs, PINs, passwords, or banking details with anyone.';
  } else if (level === 'MEDIUM') {
    explanation = 'This message contains potential warning signs such as promotional language, urgency, or embedded links. While it may occasionally come from a legitimate service, it warrants careful verification.';
    recommendation = 'Proceed with caution. Independently verify the message by visiting the official organization website or contact channel directly instead of clicking provided links.';
  } else {
    explanation = 'No major high-risk scam patterns were identified in this message text based on standard heuristic rules.';
    recommendation = 'The message appears low risk, but standard digital safety practices still apply: never share passwords or sensitive credentials online.';
  }

  return {
    score,
    level,
    indicators,
    explanation,
    recommendation
  };
}

/**
 * Analyzes a URL string locally without fetching or loading the website.
 * @param {string} urlString 
 * @returns {Object} Analysis result containing score, level, indicators, explanation, and recommendation
 */
export function analyzeUrl(urlString) {
  if (!urlString || typeof urlString !== 'string' || urlString.trim() === '') {
    return {
      score: 0,
      level: 'LOW',
      indicators: [],
      explanation: 'No URL provided for analysis.',
      recommendation: 'Please enter a web address (e.g. http://example.com) to analyze.'
    };
  }

  let cleanedInput = urlString.trim();
  // Ensure valid prefix for parsing
  let parseableUrlStr = cleanedInput;
  if (!/^https?:\/\//i.test(parseableUrlStr)) {
    parseableUrlStr = 'http://' + parseableUrlStr;
  }

  let score = 0;
  const indicators = [];

  let parsedUrl = null;
  try {
    parsedUrl = new URL(parseableUrlStr);
  } catch (err) {
    // If URL parsing fails, flag invalid structure
    score += 40;
    indicators.push({
      title: 'Malformed URL Structure',
      detail: 'The submitted text does not follow valid standard URL syntax formatting.',
      weight: 40
    });
  }

  const hostname = parsedUrl ? parsedUrl.hostname.toLowerCase() : cleanedInput.toLowerCase();
  const fullPath = parsedUrl ? (parsedUrl.pathname + parsedUrl.search).toLowerCase() : cleanedInput.toLowerCase();
  const lowerRaw = cleanedInput.toLowerCase();

  // 1. HTTP instead of HTTPS (+20)
  if (lowerRaw.startsWith('http://') || (parsedUrl && parsedUrl.protocol === 'http:')) {
    score += 20;
    indicators.push({
      title: 'Insecure Protocol (HTTP)',
      detail: 'Uses unencrypted HTTP connection instead of secure HTTPS, making data susceptible to interception.',
      weight: 20
    });
  }

  // 2. IP Address Hostname (+30)
  const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (ipPattern.test(hostname)) {
    score += 30;
    indicators.push({
      title: 'IP Address Hostname Detected',
      detail: 'Uses a numerical IP address instead of a recognized domain name, a frequent indicator of rogue or temporary servers.',
      weight: 30
    });
  }

  // 3. URL Length > 75 characters (+15)
  if (cleanedInput.length > 75) {
    score += 15;
    indicators.push({
      title: 'Excessive URL Length',
      detail: `The URL length (${cleanedInput.length} chars) is unusually long, which is often used to conceal deceptive domain paths.`,
      weight: 15
    });
  }

  // 4. Suspicious Keywords (+20)
  const suspiciousKeywords = ['login', 'verify', 'secure', 'account', 'bonus', 'prize', 'free', 'gift', 'wallet', 'banking', 'paypal', 'update', 'signin', 'confirm', 'support', 'customer-service'];
  const matchedKeywords = containsAny(hostname + fullPath, suspiciousKeywords);
  if (matchedKeywords.length > 0) {
    score += 20;
    indicators.push({
      title: 'Deceptive Brand / Phishing Keywords',
      detail: `Contains high-risk targeting keywords in link path: "${matchedKeywords.slice(0, 3).join('", "')}"`,
      weight: 20
    });
  }

  // 5. URL Shorteners (+25)
  const shortenerDomains = ['bit.ly', 'tinyurl.com', 't.co', 'is.gd', 'cutt.ly', 'shorturl.at', 'rb.gy', 'ow.ly', 'buff.ly', 'tiny.cc'];
  const isShortener = shortenerDomains.some((d) => hostname === d || hostname.endsWith('.' + d));
  if (isShortener) {
    score += 25;
    indicators.push({
      title: 'URL Shortening Service Detected',
      detail: `Uses a link shortener (${hostname}) which obscures the true destination link address.`,
      weight: 25
    });
  }

  // 6. '@' Symbol in URL (+25)
  if (cleanedInput.includes('@')) {
    score += 25;
    indicators.push({
      title: 'Deceptive "@" Symbol Usage',
      detail: 'Contains an "@" symbol. Modern browsers treat text before "@" as login credentials, redirecting users to the domain specified after it.',
      weight: 25
    });
  }

  // 7. Excessive Hyphens in Hostname (+15)
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 3) {
    score += 15;
    indicators.push({
      title: 'Multiple Domain Hyphens',
      detail: `Hostname contains ${hyphenCount} hyphens, often used in typosquatting to mimic legitimate brand domains.`,
      weight: 15
    });
  }

  // 8. Too Many Subdomains (+15)
  const domainParts = hostname.split('.');
  if (domainParts.length >= 4 && !ipPattern.test(hostname)) {
    score += 15;
    indicators.push({
      title: 'Excessive Subdomain Levels',
      detail: `Domain has ${domainParts.length - 1} subdomain levels, which can be leveraged to impersonate trustworthy entity names.`,
      weight: 15
    });
  }

  // 9. Suspicious / Unconventional TLDs (+20)
  const suspiciousTLDs = ['.xyz', '.top', '.tk', '.ml', '.ga', '.cf', '.gq', '.work', '.click', '.buzz', '.info', '.zip', '.mov', '.cc', '.icu', '.site', '.monster', '.rest'];
  const matchedTLD = suspiciousTLDs.find((tld) => hostname.endsWith(tld));
  if (matchedTLD) {
    score += 20;
    indicators.push({
      title: 'High-Risk Top Level Domain (TLD)',
      detail: `Uses "${matchedTLD}" TLD, which is frequently associated with low-cost disposable spam domains.`,
      weight: 20
    });
  }

  // Cap score at 100
  score = Math.min(100, score);

  // Determine Risk Level
  let level = 'LOW';
  if (score >= 65) {
    level = 'HIGH';
  } else if (score >= 35) {
    level = 'MEDIUM';
  }

  // Generate Explanation & Recommendation using cautious heuristic terminology
  let explanation = '';
  let recommendation = '';

  if (level === 'HIGH') {
    explanation = 'Several potential scam indicators were detected for this URL. The link structure exhibits patterns commonly observed in spoofed phishing sites, unencrypted connections, or deceptive domain names.';
    recommendation = 'This URL should be treated cautiously. Do not log in or enter sensitive credentials, credit card details, or personal data on this web page.';
  } else if (level === 'MEDIUM') {
    explanation = 'This URL presents moderate risk factors, such as keyword flags, shortened paths, or non-standard structure. It may be potentially suspicious depending on its context.';
    recommendation = 'Verify the official domain of the organization before clicking or proceeding to interact with the destination page.';
  } else {
    explanation = 'No obvious automated scam or phishing structural flags were detected for this URL string based on local heuristic evaluation.';
    recommendation = 'The web address appears standard, but always double check that the domain name matches the expected entity exactly.';
  }

  return {
    score,
    level,
    indicators,
    explanation,
    recommendation
  };
}

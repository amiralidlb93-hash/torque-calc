(() => {
  'use strict';
  const engine = window.TorqueCalc;
  const root = document.documentElement;
  const expressionNode = document.querySelector('#expression');
  const resultNode = document.querySelector('#displayResult');
  const statusNode = document.querySelector('#statusText');
  const hintNode = document.querySelector('#displayHint');
  const historyNode = document.querySelector('#historyList');
  const toastNode = document.querySelector('#toast');
  const scientificPad = document.querySelector('#scientificPad');
  const scientificToggle = document.querySelector('#scientificToggle');
  const angleToggle = document.querySelector('#angleToggle');
  const copyButton = document.querySelector('#copyButton');
  const themeToggle = document.querySelector('#themeToggle');
  const languageFaButton = document.querySelector('#languageFa');
  const languageEnButton = document.querySelector('#languageEn');
  const STORAGE = { history: 'torque-calc-history-v1', theme: 'torque-calc-theme-v1', language: 'torque-calc-language-v1' };

  const messages = {
    en: {
      systemOnline: 'SYSTEM ONLINE', edition: 'STREET SERIES <b>01</b>', themeToLight: 'Light mode', themeToDark: 'Dark mode',
      heroEyebrow: 'PRECISION, NO SPEED LIMIT', heroTitle: 'Numbers hit<br><em>different at speed.</em>',
      heroDescription: 'A full-throttle scientific calculator built for quick thinking and clean lines. No downloads. No pit stops.',
      performanceData: 'PERFORMANCE DATA', live: 'LIVE', telemetryUnit: 'SEC / CALC', zeroDependencies: 'ZERO DEPENDENCIES', builtWeb: 'BUILT FOR THE WEB',
      telemetryLabel: 'Calculator specifications', calculatorLabel: 'TorqueCalc calculator', scientific: 'SCI', angleLabel: 'Toggle angle mode',
      liveEquation: 'LIVE EQUATION', ready: 'KEYBOARD READY', trackReady: 'TRACK READY', livePreview: 'LIVE PREVIEW', runComplete: 'RUN COMPLETE',
      inputProgress: 'INPUT IN PROGRESS', checkInput: 'CHECK YOUR INPUT', resultLocked: 'RESULT LOCKED IN', angleDegrees: 'ANGLE / DEGREES', angleRadians: 'ANGLE / RADIANS',
      copy: 'COPY', copyLabel: 'Copy result', clear: 'AC', sign: 'Change sign', divide: 'Divide', multiply: 'Multiply', subtract: 'Subtract', add: 'Add', calculate: 'Calculate',
      footerCalculate: 'calculate', footerClear: 'clear', engine: 'ENGINE', historyKicker: 'YOUR RUN LOG', historyHeading: 'Recent laps', clearHistory: 'CLEAR',
      emptyTitle: 'No calculations yet.', emptySubtitle: 'Make the first move.', reuse: 'Reuse {expression} equals {answer}', pitKicker: 'PIT NOTES', pitHeading: 'Stay in control.',
      pitCopy: 'Type straight from your keyboard. Toggle <b>SCI</b> for trig, roots, logs and constants.', shortcutNumbers: 'numbers', shortcutUndo: 'undo', shortcutAngles: 'DEG / RAD',
      disclaimer: 'Inspired by the speed of the street.<br><b>Built for the precision of the pit.</b>', footerTech: 'VANILLA HTML · CSS · JAVASCRIPT', footerLicense: 'OPEN SOURCE / MIT ↗',
      toastLap: 'LAP LOADED', toastHistory: 'RUN LOG CLEARED', toastCopied: 'RESULT COPIED', toastNothing: 'NOTHING TO COPY', toastCopyUnavailable: 'COPY UNAVAILABLE',
      toastAngle: 'ANGLE MODE / {mode}', toastError: 'CHECK YOUR INPUT', errorDivide: 'Cannot divide by zero', errorSquareRoot: 'Square root needs a non-negative value', errorPositive: 'log and ln need a positive value',
      errorIncomplete: 'Complete the expression', errorSyntax: 'Check the expression syntax', errorLarge: 'The result is too large', errorGeneric: 'Invalid expression', angleDeg: 'DEG', angleRad: 'RAD',
      clearKey: 'AC', decimal: '.', themeLightIcon: '☼', themeDarkIcon: '☾'
    },
    fa: {
      systemOnline: 'سیستم آماده است', edition: 'سری خیابانی <b>۰۱</b>', themeToLight: 'حالت روشن', themeToDark: 'حالت تاریک',
      heroEyebrow: 'دقت، بدون محدودیت سرعت', heroTitle: 'حساب کن<br><em>با نهایت سرعت.</em>',
      heroDescription: 'ماشین‌حساب علمی با حال‌وهوای مسابقه‌ای؛ برای محاسبه‌های سریع و دقیق. بدون توقف، بدون دردسر.',
      performanceData: 'داده‌های عملکرد', live: 'زنده', telemetryUnit: 'ثانیه / محاسبه', zeroDependencies: 'بدون وابستگی', builtWeb: 'ساخته‌شده برای وب',
      telemetryLabel: 'مشخصات ماشین‌حساب', calculatorLabel: 'ماشین‌حساب تورک‌کلک', scientific: 'علمی', angleLabel: 'تغییر حالت زاویه',
      liveEquation: 'عبارت جاری', ready: 'آمادهٔ ورود عبارت', trackReady: 'آمادهٔ شروع', livePreview: 'پیش‌نمایش زنده', runComplete: 'محاسبه انجام شد',
      inputProgress: 'در حال واردکردن', checkInput: 'عبارت را بررسی کن', resultLocked: 'نتیجه ثبت شد', angleDegrees: 'زاویه / درجه', angleRadians: 'زاویه / رادیان',
      copy: 'کپی', copyLabel: 'کپی نتیجه', clear: 'پاک', sign: 'تغییر علامت', divide: 'تقسیم', multiply: 'ضرب', subtract: 'تفریق', add: 'جمع', calculate: 'محاسبه',
      footerCalculate: 'محاسبه', footerClear: 'پاک‌کردن', engine: 'موتور', historyKicker: 'تاریخچهٔ مسیر', historyHeading: 'محاسبه‌های اخیر', clearHistory: 'پاک‌کردن',
      emptyTitle: 'هنوز محاسبه‌ای ثبت نشده.', emptySubtitle: 'اولین محاسبه را انجام بده.', reuse: 'استفادهٔ دوباره از {expression} برابر {answer}', pitKicker: 'یادداشت‌های پیت', pitHeading: 'کنترل دست توست.',
      pitCopy: 'با صفحه‌کلید مستقیم وارد کن. برای توابع مثلثاتی، ریشه، لگاریتم و ثابت‌ها، <b>علمی</b> را باز کن.', shortcutNumbers: 'عددها', shortcutUndo: 'بازگشت', shortcutAngles: 'درجه / رادیان',
      disclaimer: 'الهام‌گرفته از سرعت خیابان؛<br><b>ساخته‌شده برای دقت پیت.</b>', footerTech: 'HTML · CSS · JAVASCRIPT خام', footerLicense: 'متن‌باز / MIT ↗',
      toastLap: 'محاسبه بارگذاری شد', toastHistory: 'تاریخچه پاک شد', toastCopied: 'نتیجه کپی شد', toastNothing: 'چیزی برای کپی نیست', toastCopyUnavailable: 'کپی در دسترس نیست',
      toastAngle: 'حالت زاویه / {mode}', errorDivide: 'تقسیم بر صفر مجاز نیست', errorSquareRoot: 'ریشهٔ دوم به عدد نامنفی نیاز دارد', errorPositive: 'لگاریتم به عدد مثبت نیاز دارد',
      errorIncomplete: 'عبارت را کامل کن', errorSyntax: 'ساختار عبارت را بررسی کن', errorLarge: 'نتیجه بیش از حد بزرگ است', errorGeneric: 'عبارت نامعتبر است', angleDeg: 'درجه', angleRad: 'رادیان',
      clearKey: 'پاک', decimal: '٫', themeLightIcon: '☼', themeDarkIcon: '☾'
    }
  };

  let expression = '';
  let lastAnswer = 0;
  let angleMode = 'DEG';
  let justCalculated = false;
  let toastTimer;
  let language = getPreference(STORAGE.language, 'fa') === 'en' ? 'en' : 'fa';
  let theme = getPreference(STORAGE.theme, 'dark') === 'light' ? 'light' : 'dark';
  let history = loadHistory();
  const t = () => messages[language];

  function getPreference(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (_) { return fallback; }
  }

  function savePreference(key, value) {
    try { localStorage.setItem(key, value); } catch (_) { /* preferences are optional */ }
  }

  function loadHistory() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE.history) || '[]');
      return Array.isArray(saved) ? saved.slice(0, 8) : [];
    } catch (_) { return []; }
  }

  function saveHistory() {
    try { localStorage.setItem(STORAGE.history, JSON.stringify(history.slice(0, 8))); } catch (_) { /* storage is optional */ }
  }

  function localizeDigits(value) {
    if (language !== 'fa') return value;
    return String(value).replace(/[0-9]/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
  }

  function formatValue(value) {
    let formatted = engine.formatNumber(value);
    if (language === 'fa') formatted = formatted.replace(/,/g, '٬').replace(/\./g, '٫');
    return localizeDigits(formatted);
  }

  function prettyExpression(value) {
    let visible = value.replace(/\*/g, '×').replace(/\//g, '÷').replace(/-/g, '−').replace(/\bpi\b/gi, 'π');
    if (language === 'fa') visible = localizeDigits(visible).replace(/\./g, '٫');
    return visible;
  }

  function localizedError(error) {
    if (language === 'en') return error.message;
    if (/divide by zero/i.test(error.message)) return t().errorDivide;
    if (/square root/i.test(error.message)) return t().errorSquareRoot;
    if (/positive value/i.test(error.message)) return t().errorPositive;
    if (/incomplete|missing closing parenthesis/i.test(error.message)) return t().errorIncomplete;
    if (/too large|finite number/i.test(error.message)) return t().errorLarge;
    if (/unexpected|unknown|needs parentheses/i.test(error.message)) return t().errorSyntax;
    return t().errorGeneric;
  }

  function applyStaticTranslations() {
    const strings = t();
    const textIds = {
      systemStatusText: strings.systemOnline,
      heroEyebrow: strings.heroEyebrow,
      heroDescription: strings.heroDescription,
      performanceData: strings.performanceData,
      liveLabel: strings.live,
      telemetryUnit: strings.telemetryUnit,
      zeroDependencies: strings.zeroDependencies,
      builtWeb: strings.builtWeb,
      liveEquationLabel: strings.liveEquation,
      footerCalculate: strings.footerCalculate,
      footerClear: strings.footerClear,
      engineLabel: strings.engine,
      historyKicker: strings.historyKicker,
      historyHeading: strings.historyHeading,
      pitKicker: strings.pitKicker,
      pitHeading: strings.pitHeading,
      shortcutNumbers: strings.shortcutNumbers,
      shortcutUndo: strings.shortcutUndo,
      shortcutAngles: strings.shortcutAngles,
      footerTech: strings.footerTech,
      footerLicense: strings.footerLicense
    };
    Object.entries(textIds).forEach(([id, value]) => { document.getElementById(id).textContent = value; });
    document.getElementById('editionLabel').innerHTML = strings.edition;
    document.getElementById('heroTitle').innerHTML = strings.heroTitle;
    document.getElementById('pitCopy').innerHTML = strings.pitCopy;
    document.getElementById('disclaimerText').innerHTML = strings.disclaimer;
    document.getElementById('clearHistory').textContent = strings.clearHistory;
    document.getElementById('clearButton').textContent = strings.clearKey;
    document.getElementById('scientificLabel').textContent = strings.scientific;
    copyButton.textContent = strings.copy;
    copyButton.title = strings.copyLabel;
    copyButton.setAttribute('aria-label', strings.copyLabel);
    document.querySelector('#calculatorRegion').setAttribute('aria-label', strings.calculatorLabel);
    document.querySelector('#telemetryCard').setAttribute('aria-label', strings.telemetryLabel);
    angleToggle.setAttribute('aria-label', strings.angleLabel);
    document.querySelector('[data-action="sign"]').setAttribute('aria-label', strings.sign);
    document.querySelector('[data-input="/"]').setAttribute('aria-label', strings.divide);
    document.querySelector('[data-input="*"]').setAttribute('aria-label', strings.multiply);
    document.querySelector('[data-input="-"]').setAttribute('aria-label', strings.subtract);
    document.querySelector('[data-input="+"]').setAttribute('aria-label', strings.add);
    document.querySelector('[data-action="equals"]').setAttribute('aria-label', strings.calculate);
    document.querySelectorAll('[data-input]').forEach((button) => {
      if (/^\d$/.test(button.dataset.input)) button.textContent = localizeDigits(button.dataset.input);
      if (button.dataset.input === '.') button.textContent = strings.decimal;
    });
    document.getElementById('scientificSign').textContent = scientificPad.hidden ? '+' : '−';
    angleToggle.textContent = language === 'fa' ? (angleMode === 'DEG' ? strings.angleDeg : strings.angleRad) : angleMode;
    themeToggle.setAttribute('aria-label', theme === 'dark' ? strings.themeToLight : strings.themeToDark);
    document.getElementById('themeText').textContent = theme === 'dark' ? strings.themeToLight : strings.themeToDark;
    document.getElementById('themeIcon').textContent = theme === 'dark' ? strings.themeLightIcon : strings.themeDarkIcon;
    languageFaButton.setAttribute('aria-pressed', String(language === 'fa'));
    languageEnButton.setAttribute('aria-pressed', String(language === 'en'));
    languageFaButton.classList.toggle('active', language === 'fa');
    languageEnButton.classList.toggle('active', language === 'en');
    root.setAttribute('lang', language);
    root.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
    document.querySelector('title').textContent = language === 'fa' ? 'TorqueCalc — ماشین‌حساب مسابقه‌ای' : 'TorqueCalc — Full-throttle calculations';
    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor.content = theme === 'dark' ? '#10110f' : '#eef1e8';
  }

  function applyTheme(nextTheme) {
    theme = nextTheme;
    root.dataset.theme = theme;
    savePreference(STORAGE.theme, theme);
    applyStaticTranslations();
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    savePreference(STORAGE.language, language);
    applyStaticTranslations();
    updateDisplay();
    renderHistory();
  }

  function showToast(message) {
    toastNode.textContent = message;
    toastNode.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastNode.classList.remove('show'), 1700);
  }

  function renderHistory() {
    historyNode.replaceChildren();
    if (!history.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.innerHTML = `${t().emptyTitle}<br><span>${t().emptySubtitle}</span>`;
      historyNode.appendChild(empty);
      return;
    }
    history.forEach((item) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'history-row';
      row.setAttribute('aria-label', t().reuse.replace('{expression}', prettyExpression(item.expression)).replace('{answer}', formatValue(Number(item.raw))));
      const equation = document.createElement('span');
      equation.className = 'history-equation';
      equation.textContent = prettyExpression(item.expression);
      const answer = document.createElement('span');
      answer.className = 'history-answer';
      answer.textContent = formatValue(Number(item.raw));
      row.append(equation, answer);
      row.addEventListener('click', () => {
        expression = String(item.raw);
        lastAnswer = Number(item.raw);
        justCalculated = true;
        updateDisplay();
        showToast(t().toastLap);
      });
      historyNode.appendChild(row);
    });
  }

  function addToHistory(source, value) {
    const item = { expression: source, raw: value, answer: engine.formatNumber(value), at: Date.now() };
    history = [item, ...history.filter((entry) => entry.expression !== source || entry.raw !== value)].slice(0, 8);
    saveHistory();
    renderHistory();
  }

  function updateDisplay() {
    expressionNode.textContent = expression ? prettyExpression(expression) : ' ';
    expressionNode.classList.remove('error-state');
    resultNode.classList.remove('error-state');
    if (!expression) {
      resultNode.textContent = localizeDigits('0');
      statusNode.textContent = t().trackReady;
      hintNode.textContent = t().ready;
      return;
    }
    try {
      const result = engine.evaluateExpression(expression, angleMode);
      resultNode.textContent = formatValue(result);
      statusNode.textContent = justCalculated ? t().runComplete : t().livePreview;
      hintNode.textContent = angleMode === 'DEG' ? t().angleDegrees : t().angleRadians;
    } catch (error) {
      resultNode.textContent = '…';
      statusNode.textContent = t().inputProgress;
      hintNode.textContent = localizedError(error);
    }
  }

  function appendInput(value) {
    const isFreshValue = /^\d$/.test(value) || value === '.' || value === 'π' || value === 'e' || value.endsWith('(') || value === '(';
    if (justCalculated) {
      if (isFreshValue) expression = '';
      else if (/^[+\-*/^]$/.test(value)) expression = String(lastAnswer);
      justCalculated = false;
    }
    if (/^[+\-*/^]$/.test(value) && /[+\-*/^]$/.test(expression)) expression = expression.slice(0, -1) + value;
    else expression += value;
    updateDisplay();
  }

  function clearAll() {
    expression = '';
    lastAnswer = 0;
    justCalculated = false;
    updateDisplay();
  }

  function backspace() {
    if (justCalculated) { clearAll(); return; }
    expression = expression.slice(0, -1);
    updateDisplay();
  }

  function toggleSign() {
    if (!expression) expression = '-';
    else if (justCalculated) expression = `-(${lastAnswer})`;
    else expression = `-(${expression})`;
    justCalculated = false;
    updateDisplay();
  }

  function calculate() {
    if (!expression) return;
    try {
      const source = expression;
      const value = engine.evaluateExpression(source, angleMode);
      lastAnswer = value;
      justCalculated = true;
      statusNode.textContent = t().runComplete;
      hintNode.textContent = t().resultLocked;
      resultNode.textContent = formatValue(value);
      resultNode.classList.remove('error-state', 'result-pop');
      void resultNode.offsetWidth;
      resultNode.classList.add('result-pop');
      addToHistory(source, value);
    } catch (error) {
      resultNode.textContent = language === 'fa' ? 'خطا' : 'ERROR';
      resultNode.classList.add('error-state');
      statusNode.textContent = t().checkInput;
      const message = localizedError(error);
      hintNode.textContent = message;
      showToast(message);
    }
  }

  document.querySelectorAll('[data-input]').forEach((button) => button.addEventListener('click', () => appendInput(button.dataset.input)));
  document.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => {
    switch (button.dataset.action) {
      case 'clear': clearAll(); break;
      case 'backspace': backspace(); break;
      case 'sign': toggleSign(); break;
      case 'equals': calculate(); break;
    }
  }));

  scientificToggle.addEventListener('click', () => {
    const open = scientificPad.hidden;
    scientificPad.hidden = !open;
    scientificToggle.setAttribute('aria-expanded', String(open));
    document.getElementById('scientificSign').textContent = open ? '−' : '+';
  });

  angleToggle.addEventListener('click', () => {
    angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
    applyStaticTranslations();
    updateDisplay();
    showToast(t().toastAngle.replace('{mode}', angleMode === 'DEG' ? t().angleDeg : t().angleRad));
  });

  themeToggle.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
  languageFaButton.addEventListener('click', () => setLanguage('fa'));
  languageEnButton.addEventListener('click', () => setLanguage('en'));

  document.querySelector('#clearHistory').addEventListener('click', () => {
    history = [];
    saveHistory();
    renderHistory();
    showToast(t().toastHistory);
  });

  copyButton.addEventListener('click', async () => {
    const value = justCalculated ? lastAnswer : (() => {
      try { return engine.evaluateExpression(expression, angleMode); } catch (_) { return null; }
    })();
    if (value === null || !Number.isFinite(value)) { showToast(t().toastNothing); return; }
    try {
      await navigator.clipboard.writeText(String(value));
      showToast(t().toastCopied);
    } catch (_) { showToast(t().toastCopyUnavailable); }
  });

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const digitMap = { '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9', '٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9' };
    const key = digitMap[event.key] || event.key;
    if (/^\d$/.test(key) || ['.', '+', '-', '*', '/', '^', '%', '(', ')'].includes(key)) {
      event.preventDefault();
      appendInput(key);
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      calculate();
    } else if (key === 'Backspace') {
      event.preventDefault();
      backspace();
    } else if (key === 'Escape') {
      event.preventDefault();
      clearAll();
    } else if (key.toLowerCase() === 'd') {
      angleToggle.click();
    }
  });

  root.dataset.theme = theme;
  root.setAttribute('lang', language);
  root.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
  applyStaticTranslations();
  renderHistory();
  updateDisplay();
})();

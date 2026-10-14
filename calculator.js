(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.TorqueCalc = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const FUNCTIONS = new Set(['sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'abs']);
  const PRECEDENCE = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 4 };

  function tokenize(source) {
    const input = String(source)
      .replace(/[×]/g, '*')
      .replace(/[÷]/g, '/')
      .replace(/[−]/g, '-')
      .trim();
    if (!input) throw new Error('Enter an expression');
    if (input.length > 180) throw new Error('Expression is too long');

    const raw = [];
    const pattern = /\s*(?:(\d+(?:\.\d*)?|\.\d+)|([a-zA-Z]+|π)|([()+\-*/^%!]))/gy;
    let index = 0;
    while (index < input.length) {
      pattern.lastIndex = index;
      const match = pattern.exec(input);
      if (!match) throw new Error(`Unexpected character: ${input[index]}`);
      index = pattern.lastIndex;
      if (match[1] !== undefined) raw.push({ type: 'number', value: Number(match[1]) });
      else if (match[2] !== undefined) raw.push({ type: 'identifier', value: match[2].toLowerCase() });
      else raw.push({ type: 'operator', value: match[3] });
    }

    const output = [];
    const canEndValue = (token) => token && (
      token.type === 'number' ||
      (token.type === 'identifier' && !FUNCTIONS.has(token.value)) ||
      (token.type === 'operator' && [')', '%', '!'].includes(token.value))
    );
    const canStartValue = (token) => token && (
      token.type === 'number' || token.type === 'identifier' ||
      (token.type === 'operator' && token.value === '(')
    );

    for (const token of raw) {
      const previous = output[output.length - 1];
      if (canEndValue(previous) && canStartValue(token)) {
        output.push({ type: 'operator', value: '*' });
      }
      output.push(token);
    }
    return output;
  }

  function evaluateExpression(source, angleMode = 'DEG') {
    const tokens = tokenize(source);
    let cursor = 0;
    const peek = () => tokens[cursor];
    const take = () => tokens[cursor++];

    function parseExpression(minPrecedence = 0) {
      let left = parsePrefix();
      while (cursor < tokens.length) {
        const token = peek();
        if (token.type !== 'operator') break;
        if (token.value === '%' || token.value === '!') {
          take();
          left = token.value === '%' ? left / 100 : factorial(left);
          continue;
        }
        const precedence = PRECEDENCE[token.value];
        if (!precedence || precedence < minPrecedence) break;
        const operator = take().value;
        const right = parseExpression(operator === '^' ? precedence : precedence + 1);
        left = applyOperator(operator, left, right);
      }
      return left;
    }

    function parsePrefix() {
      const token = take();
      if (!token) throw new Error('Incomplete expression');

      if (token.type === 'operator' && (token.value === '+' || token.value === '-')) {
        const value = parseExpression(3);
        return token.value === '-' ? -value : value;
      }
      if (token.type === 'operator' && token.value === '(') {
        const value = parseExpression(0);
        if (!peek() || peek().value !== ')') throw new Error('Missing closing parenthesis');
        take();
        return value;
      }
      if (token.type === 'number') return token.value;
      if (token.type === 'identifier') {
        if (token.value === 'π' || token.value === 'pi') return Math.PI;
        if (token.value === 'e') return Math.E;
        if (!FUNCTIONS.has(token.value)) throw new Error(`Unknown function: ${token.value}`);
        if (!peek() || peek().value !== '(') throw new Error(`${token.value} needs parentheses`);
        take();
        const argument = parseExpression(0);
        if (!peek() || peek().value !== ')') throw new Error('Missing closing parenthesis');
        take();
        return applyFunction(token.value, argument, angleMode);
      }
      throw new Error(`Unexpected token: ${token.value}`);
    }

    const result = parseExpression(0);
    if (cursor < tokens.length) throw new Error(`Unexpected token: ${peek().value}`);
    if (!Number.isFinite(result)) throw new Error('Result is not a finite number');
    return Object.is(result, -0) ? 0 : result;
  }

  function applyOperator(operator, left, right) {
    switch (operator) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/':
        if (right === 0) throw new Error('Cannot divide by zero');
        return left / right;
      case '^': return left ** right;
      default: throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  function applyFunction(name, value, angleMode) {
    const angle = angleMode === 'DEG' ? value * Math.PI / 180 : value;
    switch (name) {
      case 'sin': return Math.sin(angle);
      case 'cos': return Math.cos(angle);
      case 'tan': return Math.tan(angle);
      case 'sqrt':
        if (value < 0) throw new Error('Square root needs a non-negative value');
        return Math.sqrt(value);
      case 'log':
        if (value <= 0) throw new Error('log needs a positive value');
        return Math.log10(value);
      case 'ln':
        if (value <= 0) throw new Error('ln needs a positive value');
        return Math.log(value);
      case 'abs': return Math.abs(value);
      default: throw new Error(`Unknown function: ${name}`);
    }
  }

  function factorial(value) {
    if (value < 0 || !Number.isInteger(value)) throw new Error('Factorial needs a non-negative integer');
    if (value > 170) throw new Error('Factorial is too large');
    let result = 1;
    for (let i = 2; i <= value; i += 1) result *= i;
    return result;
  }

  function formatNumber(value) {
    if (!Number.isFinite(value)) return 'ERROR';
    if (Object.is(value, -0) || value === 0) return '0';
    const absolute = Math.abs(value);
    if (absolute >= 1e12 || absolute < 1e-8) return value.toExponential(6).replace(/\.0+e/, 'e').replace(/(\.\d*?)0+e/, '$1e');
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 10 }).format(value);
  }

  return { evaluateExpression, formatNumber, tokenize };
});

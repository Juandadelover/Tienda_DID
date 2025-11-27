#!/usr/bin/env node

/**
 * T006 - Color Contrast Validation Script
 * Validates WCAG AA (4.5:1) and AAA (7:1) compliance for Tienda DID color palette
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */

// Color palette from tailwind.config.ts
const colors = {
  primary: {
    DEFAULT: '#059669',
    hover: '#047857',
    light: '#10b981',
    lightest: '#ecfdf5',
  },
  secondary: {
    DEFAULT: '#0f172a',
    800: '#1e293b',
    700: '#334155',
  },
  background: {
    DEFAULT: '#f8fafc',
    card: '#ffffff',
    modal: '#ffffff',
  },
  text: {
    primary: '#0f172a',
    secondary: '#64748b',
    tertiary: '#94a3b8',
    disabled: '#94a3b8',
  },
  error: {
    DEFAULT: '#ef4444',
    hover: '#dc2626',
    light: '#fef2f2',
  },
  success: {
    DEFAULT: '#22c55e',
    light: '#f0fdf4',
  },
  warning: {
    DEFAULT: '#facc15',
    light: '#fde047',
    hover: '#eab308',
  },
  info: {
    DEFAULT: '#3b82f6',
    light: '#eff6ff',
  },
};

/**
 * Convert hex to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio
 * https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check WCAG compliance level
 */
function checkCompliance(ratio) {
  return {
    'AA Normal': ratio >= 4.5,
    'AA Large': ratio >= 3,
    'AAA Normal': ratio >= 7,
    'AAA Large': ratio >= 4.5,
  };
}

/**
 * Main validation
 */
console.log('\n🎨 Tienda DID - Color Contrast Validation (WCAG)\n');
console.log('================================================\n');

// Test combinations: text on backgrounds
const tests = [
  // Primary text on backgrounds
  { fg: colors.text.primary, bg: colors.background.DEFAULT, label: 'Primary text on main background' },
  { fg: colors.text.primary, bg: colors.background.card, label: 'Primary text on card' },
  { fg: colors.text.secondary, bg: colors.background.DEFAULT, label: 'Secondary text on main background' },
  { fg: colors.text.secondary, bg: colors.background.card, label: 'Secondary text on card' },
  
  // Primary color on backgrounds
  { fg: colors.primary.DEFAULT, bg: colors.background.DEFAULT, label: 'Primary color on main background' },
  { fg: colors.primary.DEFAULT, bg: colors.background.card, label: 'Primary color on card' },
  
  // White text on primary (buttons)
  { fg: '#ffffff', bg: colors.primary.DEFAULT, label: 'White text on primary button' },
  { fg: '#ffffff', bg: colors.primary.hover, label: 'White text on primary hover' },
  
  // White text on secondary
  { fg: '#ffffff', bg: colors.secondary.DEFAULT, label: 'White text on secondary' },
  
  // Error states
  { fg: colors.error.DEFAULT, bg: colors.background.card, label: 'Error text on card' },
  { fg: colors.error.DEFAULT, bg: colors.error.light, label: 'Error text on error background' },
  
  // Success states
  { fg: colors.success.DEFAULT, bg: colors.background.card, label: 'Success text on card' },
  { fg: colors.success.DEFAULT, bg: colors.success.light, label: 'Success text on success background' },
  
  // Warning states
  { fg: colors.warning.DEFAULT, bg: colors.background.card, label: 'Warning text on card' },
  { fg: colors.secondary.DEFAULT, bg: colors.warning.DEFAULT, label: 'Dark text on warning' },
  
  // Info states
  { fg: colors.info.DEFAULT, bg: colors.background.card, label: 'Info text on card' },
  { fg: '#ffffff', bg: colors.info.DEFAULT, label: 'White text on info' },
];

let totalPassed = 0;
let totalFailed = 0;

tests.forEach((test) => {
  const ratio = getContrastRatio(test.fg, test.bg);
  const compliance = checkCompliance(ratio);
  
  const passAA = compliance['AA Normal'];
  const passAAA = compliance['AAA Normal'];
  
  if (passAA) totalPassed++;
  else totalFailed++;
  
  const status = passAAA ? '✅ AAA' : passAA ? '✅ AA' : '❌ FAIL';
  const symbol = passAAA ? '🟢' : passAA ? '🟡' : '🔴';
  
  console.log(`${symbol} ${status} | Ratio: ${ratio.toFixed(2)}:1 | ${test.label}`);
  
  if (!passAA) {
    console.log(`   ⚠️  WCAG AA minimum not met (requires 4.5:1)`);
  }
});

console.log('\n================================================');
console.log(`\n📊 Summary:`);
console.log(`   Total tests: ${tests.length}`);
console.log(`   Passed (AA+): ${totalPassed} (${((totalPassed / tests.length) * 100).toFixed(1)}%)`);
console.log(`   Failed: ${totalFailed}`);

if (totalFailed === 0) {
  console.log('\n✅ All color combinations meet WCAG AA standards!\n');
  process.exit(0);
} else {
  console.log('\n⚠️  Some combinations need adjustment for WCAG AA compliance.\n');
  process.exit(1);
}

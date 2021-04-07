export const color = {
  darkgreen: '\x1b[0m\x1b[32m',
  yellow: '\u001b[33m',
  blue: '\u001b[36m',
  resetColor: '\u001b[0m',
};

const { darkgreen, blue, resetColor } = color;

export const log = (...args) => {
  const { log: _log } = console;
  const _args = args.map((arg) => {
    return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg;
  });
  _log('\n', darkgreen, '---@', blue, ..._args, darkgreen, '@---', resetColor);
};

module.exports = {
  root: true,
  extends: ['plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // Otras reglas que puedas tener
    'react/prop-types': 'error', // Agrega esta regla para habilitar la validación de propiedades
  },
};

/**
 * Crea un archivo de configuración compatible con postcss.config.js y rollup.config.js
 */
module.exports = function () {
return `
export default {
    plugins: []
}
`.trim();
}
/**
 * Crea el archivo theme.config.js con informacion básica y necesaria para trabajar con el tema
 */
module.exports = function (name) {
return `
export default {
    /**
     * Theme information
     */
    theme: {
        name: "${name}",
        version: "1.0.0",
    },
    
    /**
     * Author information
     */
    author: {
        name: "MarceloTLD",
        url: "https://github.com/MarceloTLD"
    },

    /**
     * License type
     */
    license: "Release under MIT License",

    /**
     * Plugins
     */
    plugins: {
      postcss: [],
      rollup: []
    }
}
`.trim();
}
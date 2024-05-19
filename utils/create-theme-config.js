/**
 * Crea el archivo theme.config.js con informacion básica y necesaria para trabajar con el tema
 */
module.exports = function (name) {
  return `
export const themeConfig = {
  name: "${name}",
  description: "A basic tool for building blogger template",
  version: "1.0.0",
  url: "https://github.com/Karasu-themes/BloggerBase",
  license: "Release under MIT License",
  author: {
    name: "MarceloTLD",
    url: "https://github.com/MarceloTLD"
  },
}
`.trim();
}
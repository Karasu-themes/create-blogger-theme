/**
 * Crea el archivo package.json para utilizar en el proyecto creado en la ruta actual
 */
module.exports = function (name, template = "Blank") {
    return `
{
    "name": "${name}",
    "version": "1.0.0",
    "type": "module",
    "description": "My awesome blogger template with ${template.toLowerCase}",
    "scripts": {
        "build": "blogger build --mode production",
        "start": "blogger start",
        "start:demo": "blogger start --mode demo"
    },
    "keywords": [],
    "author": "",
    "license": "MIT",
    "devDependencies": {
        "bloggerbase": "^2.0.0",
        "cheerio": "1.0.0-rc.12",
        "chokidar": "3.5.3",
        "ejs": "3.1.9",
        "postcss": "8.4.31",
        "rollup": "4.5.1",
        "rollup-plugin-esbuild": "6.1.0",
        "sass": "1.69.5"
    },
    "dependencies": {
        "chalk": "^5.3.0",
        "commander": "12.0.0"
    }
}
    `.trim();
}
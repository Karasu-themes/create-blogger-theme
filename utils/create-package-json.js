/**
 * Crea el archivo package.json para utilizar en el proyecto creado en la ruta actual
 */
module.exports = function (name, template = "Blank") {
    return `
{
    "name": "${name}",
    "version": "1.0.0",
    "type": "module",
    "description": "My awesome blogger template with ${template}",
    "scripts": {
        "build": "blogger build --mode production",
        "start": "blogger start",
        "start:demo": "blogger start --mode demo"
    },
    "keywords": [],
    "author": "",
    "license": "MIT",
    "devDependencies": {
        "clean-css": "^5.3.3",
        "postcss": "^8.4.31",
        "rollup": "^4.5.1",
        "sass": "^1.69.5",
        "autoprefixer": "^10.4.19",
        "ejs": "^3.1.9",
        "terser": "^5.30.2"
    },
    "dependencies": {
        "bloggerbase": "^2.0.0",
        "chokidar": "^3.5.3",
        "chalk": "^5.3.0",
        "commander": "^12.0.0"
    }
}
    `.trim();
}
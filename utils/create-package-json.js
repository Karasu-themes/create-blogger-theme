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
        "bloggerbase": "^2.0.0"
    }
}
`.trim();
}
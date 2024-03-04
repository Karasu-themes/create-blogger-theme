#!/usr/bin/env node

/**
* Copyright © 2022-present, Karasu-themes.
*/

const chalk = require('chalk');
const { program } = require('commander');
const fs = require('node:fs');
const fse = require('fs-extra');
const path = require('node:path');
const createPackageJson = require('./utils/create-package-json');
const createThemeConfig = require('./utils/create-theme-config');

let projectName;
const CURRENTPATH = __dirname;
const DIRPATH = process.env.PWD;

program.arguments("<project-directory>")
.option("-t, --template <value>", "Set the template to use")
.action((name, options) => {
    projectName = name;
    const template = options.template ?? "blank";
    const thisDirName = path.join(CURRENTPATH, "templates", template);
    const dirName = path.join(DIRPATH, projectName);

    // revisamos que la carpeta no existe en la ruta actual
    if (fs.existsSync(dirName)) {
        console.log(chalk.redBright("El proyecto que intentas crear ya existe en ésta ubicación!"))
        process.exit(1);
    };

    // Si no existe, creamos el proyecto con el nombre especificado
    if (!fs.existsSync(dirName)) {
        // Creamos la carpeta en la ruta actual
        fs.mkdirSync(dirName);

        // Creamos el archivo package.json con la información necesaria
        fs.writeFileSync(path.resolve(dirName, "package.json"), createPackageJson(projectName));
        
        // Creamos el archivo de configuración theme.config.js
        fs.writeFileSync(path.resolve(dirName, "theme.config.js"), createThemeConfig(projectName));

        // Agregamos la licencia al nuevo proyecto
        fse.copySync(path.join(CURRENTPATH, "LICENSE"), path.join(DIRPATH, projectName, "LICENSE"));
    
        // Copiamos el template seleccionado
        fse.copySync(thisDirName, path.join(dirName, "app"));
    }

});

program.parse(process.argv);
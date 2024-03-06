#!/usr/bin/env node

/**
* Copyright © 2022-present, Karasu-themes.
*/

const chalk = require('chalk');
const { program } = require('commander');
const prompts = require('prompts');
const { execSync } = require('child_process');
const fs = require('node:fs');
const fse = require('fs-extra');
const path = require('node:path');
const createPackageJson = require('./utils/create-package-json');
const createThemeConfig = require('./utils/create-theme-config');
const createConfigFile = require('./utils/create-config-files');

let projectName;
const CURRENTPATH = __dirname;
const DIRPATH = process.env.PWD;

program.arguments("<project-directory>")
.option("-t, --template <value>", "Establece la plantilla a utilizar")
.action(async (name, options) => {
    projectName = name;
    const template = options.template ?? "blank";
    const thisDirName = path.join(CURRENTPATH, "templates", template.toLowerCase());
    const dirName = path.join(DIRPATH, projectName);

    // revisamos que la carpeta no existe en la ruta actual
    if (fs.existsSync(dirName)) {
        console.log(chalk.redBright("The project you are trying to create already exists at this location!"))
        process.exit(1);
    };

    console.log(`Creating a new blogger theme in ${chalk.green(dirName)}`);

    // Si no existe, creamos el proyecto con el nombre especificado
    if (!fs.existsSync(dirName)) {
        // Creamos la carpeta en la ruta actual
        fs.mkdirSync(dirName);

        // Creamos el archivo package.json con la información necesaria
        fs.writeFileSync(path.resolve(dirName, "package.json"), createPackageJson(projectName));
        console.log(chalk.greenBright(`The ${chalk.bold("package.json")} has been successfully created. ✔`));

        // Creamos el archivo de configuración theme.config.js
        fs.writeFileSync(path.resolve(dirName, "theme.config.js"), createThemeConfig(projectName));
        console.log(chalk.greenBright(`The ${chalk.bold("theme.config.js")} has been successfully created. ✔`));

        // Agregamos la licencia al nuevo proyecto
        fse.copySync(path.join(CURRENTPATH, "LICENSE"), path.join(DIRPATH, projectName, "LICENSE"));
        console.log(chalk.greenBright(`The ${chalk.bold("LICENSE")} has been successfully created. ✔`));

        // Creamos los archivos rollup.config.js y postcss.config.js?
        const { installConfigFile } = await prompts({
            type: 'text',
            name: 'installConfigFile',
            initial: 'yes | no',
            message: 'Do you want to create postcss.config.js y rollup.config.js files right now?'
        });

        if (installConfigFile.toLowerCase() == "yes") {
            fs.writeFileSync(path.resolve(dirName, "postcss.config.js"), createConfigFile());
            fs.writeFileSync(path.resolve(dirName, "rollup.config.js"), createConfigFile(projectName));
            console.log(chalk.greenBright(`The ${chalk.bold("config files")} has been successfully created. ✔`));
        }

        // Copiamos el template seleccionado
        fse.copySync(thisDirName, path.join(dirName, "app"));
    }

    // Debemos instalar las dependencias ahora mismo o le dejamos ese paso al usuario?
    const { canInstallDependencies } = await prompts({
        type: 'text',
        name: 'canInstallDependencies',
        initial: 'yes | no',
        message: 'Do you want to install the dependencies right now?'
    });

    if (canInstallDependencies.toLowerCase() == "yes") {
        console.log(chalk.bold('Installing dependencies...'))
        process.chdir(dirName); // ejecutamos el comando en la ruta dónde instalamos el proyecto

        try {
            // Ejecutamos el comando
            execSync('npm install', { stdio: 'inherit' });
            console.log(chalk.green(`The theme has been installed in ${chalk.green(dirName)} ✔`));

        } catch (error) {
            console.error(chalk.red('Error installing dependencies: ' + error.message + " ✖"));
        }

        process.exit(1);
    } else {
        console.log(`The theme with the template ${chalk.bold(template)} has been installed in ${chalk.green(dirName)} ✔`);
        process.exit(1);
    }

});

program.parse(process.argv);
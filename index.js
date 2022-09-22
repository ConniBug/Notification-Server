const { debug, error } = require('@connibug/js-logging');
const fs = require(`fs`)
const path = require('path')

let listeners = new Map();

fs.readdirSync(path.resolve(__dirname, 'listeners'))
    .filter(f => f.endsWith('.js'))
    .forEach(f => {
        debug(`Loading listener ${f}`)
        try {
            let listener = require(`./listeners/${f}`);
            let { start, stop, setup, info } = listener
            if(typeof start !== 'function') {
                throw `${f} is missing a Start function!`
            } else if(typeof stop !== 'function') {
                throw `${f} is missing a Stop function!`
            } else if(typeof setup !== 'function') {
                throw `${f} is missing a Setup function!`
            } else if(!info) {
                throw `${f} is missing a info segment!`
            }
            listeners.set(info.name, listener)
        } catch(error) {
            error(`Failed to load listener ${f}: ${error}`)
            console.error(`Failed to load listener ${f}: ${error}`)
        }
    })

listeners.forEach(listener => {
    debug(`Setting up listener ${listener.info.name}`)
    listener.setup();
});

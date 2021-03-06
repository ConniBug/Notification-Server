const l = require('@connibug/js-logging');
const fs = require(`fs`)
const path = require('path')

let listeners = new Map();

fs.readdirSync(path.resolve(__dirname, 'listeners'))
    .filter(f => f.endsWith('.js'))
    .forEach(f => {
        l.debug(`Loading listener ${f}`)
        try {
            let listener = require(`./listeners/${f}`)
            if(typeof listener.start !== 'function') {
                throw `${f} is missing a Start function!`
            } else if(typeof listener.stop !== 'function') {
                throw `${f} is missing a Stop function!`
            } else if(typeof listener.setup !== 'function') {
                throw `${f} is missing a Setup function!`
            } else if(!listener.info) {
                throw `${f} is missing a info segment!`
            }
            listeners.set(listener.info.name, listener)
        } catch(error) {
            l.error(`Failed to load listener ${f}: ${error}`)
            console.error(`Failed to load listener ${f}: ${error}`)
        }
    })

listeners.forEach(listener => {
    l.debug(`Setting up listener ${listener.info.name}`)
    listener.setup();
});
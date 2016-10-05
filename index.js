/**
 * @author Sora Kusakabe
 * @copyright 2016 Sora Kusakabe
 * @license MIT
 * @module accettare
 * @fileoverview simple accept-language parser
 */

'use strict';

/* import bcp47 lib */
const bcp47 = require('./lib/bcp47.js');

/**
 * set configuration
 * @param  {array} langs
 * @return {null}
 */
module.exports.languages = (langs) => {
    if (!Array.isArray(langs)) {
        throw new Error('accettare.languages: please pass Array.')
    }
    if (langs.length === 0) {
        throw new Error('accettare.languages: please set content.');
    }

    /* validate bcp47 */
    const valid = langs.filter((lang) => {
        return bcp47.check(lang);
    });
    if (valid.length === 0) {
        throw new Error('accettare.languages: please set languages used bcp47 format.');
    }

    this.valid = valid;
    this.default = valid[0];
    return;
}

/**
 * analyze HTTP accept-language header
 * @param  {string} header
 * @return {array}
 */
function getProperties (header) {
    return header.split(',').map((split) => {
        const components = split.replace(/\s+/, '').split(';');
        const priorityRegex = /^q=([0-1](\.[0-9]{1,3})?)$/;

        /* assign null to priority when invaild quarity values */
        return {
            lang: components[0],
            priority: components[1] ? priorityRegex.test(components[1]) ? parseFloat(components[1].split('=')[1]) : null : 1
        }
    }).filter((property) => {
        return property.priority === null ? false : bcp47.check(property.lang);
    }).sort((a, b) => {
        return a.priority < b.priority ? 1 : a.priority > b.priority ? -1 : 0;
    });
}

/**
 * search match by BCP47 Objects
 * @param  {Array} properties
 * @param  {Array} langs
 * @return {string}
 */
function matchAccept (properties, langs) {
    let match = null;
    let priority = 0;

    base: for(const lang of langs) {
        for (const property of properties) {
            if (property.priority === 0) {
                break;
            }
            if (lang.bcp47.language === property.bcp47.language && priority <= property.priority) {
                match = lang.raw;
                priority = property.priority;
                break;
            }
        }
    }

    return match;
}

/**
 * search match by accept-languages
 * @param  {String} header [HTTP accept-language header]
 * @return {string} [lang]
 */
module.exports.get = (header) => {
    if (!header) {
        throw new Error('accettare.get: please pass valid string.')
    }

    /* convert to array and BCP47 check */
    const properties = getProperties(header);
    if (properties.length === 0) {
        return this.default;
    }

    /* convert to BCP47 Object */
    const enhanceProperties = properties.map((property) => {
        return {
            bcp47: bcp47.convert(property.lang),
            lang: property.lang.toLowerCase(),
            priority: property.priority
        }
    });
    const enhancedLangs = this.valid.map((lang) => {
        return {
            bcp47: bcp47.convert(lang),
            lang: lang.toLowerCase(),
            raw: lang
        }
    });

    /* search match */
    const match = matchAccept(enhanceProperties, enhancedLangs);
    return match === null ? this.default : match;
}
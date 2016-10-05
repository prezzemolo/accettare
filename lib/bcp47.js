/**
 * @author Sora Kusakabe
 * @copyright 2016 Sora Kusakabe
 * @license MIT
 * @module accettare-bcp47
 * @fileoverview simple bcp47 validity checker
 */

'use strict';

/**
 * BCP47 Regex
 * from https://github.com/gagle/node-bcp47
 * @author Gabriel Llamas
 * @copyright 2013 Gabriel Llamas
 * @licence MIT (see https://github.com/gagle/node-bcp47/blob/master/LICENSE)
 */
const bcp47Regex = /^(?:(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))$|^((?:[a-z]{2,3}(?:(?:-[a-z]{3}){1,3})?)|[a-z]{4}|[a-z]{5,8})(?:-([a-z]{4}))?(?:-([a-z]{2}|\d{3}))?((?:-(?:[\da-z]{5,8}|\d[\da-z]{3}))*)?((?:-[\da-wy-z](?:-[\da-z]{2,8})+)*)?(-x(?:-[\da-z]{1,8})+)?$|^(x(?:-[\da-z]{1,8})+)$/i;

/**
 * check BCP47 validity
 * @param  {string} lang
 * @return {boolean}
 */
module.exports.check = (lang) => {
    return bcp47Regex.test(lang) ? true : false;
}

/**
 * convert language string to BCP47 object
 * @param  {string} lang
 * @return {object}
 */
module.exports.convert = (lang) => {
    const splitLang = lang.split('-');
    if (splitLang.length === 0) {
        return null;
    }
    return {
        "language": splitLang[0].toLowerCase(),
        "script": splitLang[1] ? splitLang[1].toLowerCase() : null,
        "region": splitLang[2] ? splitLang[2].toLowerCase() : null,
        "variant": splitLang[3] ? splitLang[3].toLowerCase() : null,
        "extension": splitLang[4] ? splitLang[4].toLowerCase() : null,
        "private_use": splitLang[5] ? splitLang[5].toLowerCase() : null
    };
}
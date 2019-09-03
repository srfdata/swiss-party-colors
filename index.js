;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define([ 'exports' ], factory)
      : factory((global.gsheets = global.gsheets || {}))
})(this, function (exports) {
  'use strict'

  /**
   * The available languages
   * @typedef {'de' | 'fr' | 'it', 'ro'} LanguageCodes
   */

  /**
   * The Party definition object
   * @typedef {Object} PartyDefinition
   * @property {string} abbr - The commonly used abbrevation of the party
   * @property {string} name - The official name of the party
   * @property {string} color - The color for use on larger color patches
   * @property {string} blackOrWhite - The color for the text displayed on patches of that color
   * @property {string} fontColor - A tweaked version of the color for use as a text color on light backgrounds
   * @property {string} fontColorOnBlack - A tweaked version of the color for use as a text color on dark backgrounds
   */

  var colors = require('./definitions.json')

  /** @type {LanguageCodes[]} */
  var available_languages = [ 'de', 'fr', 'it', 'ro' ]

  /**
   * Fallback object in cases where the party can't be found for some reason
   * @type {PartyDefinition}
   */
  var fallBackColor = {
    abbr: '?',
    name: 'Not found',
    color: '#9D9D9D',
    blackOrWhite: '#000',
    fontColor: '#757575',
    fontColorOnBlack: '#757575'
  }

  /**
   * This function returns another function that can be used directly without defining the language code again
   * @param {LanguageCodes} lang language code, either 'de', 'fr' or 'it'
   * @return {Function}
   */
  function getPartyFunctionForLanguage (lang) {
    lang = lang.toLowerCase()
    return function getParty (abbr) {
      abbr = abbr.toUpperCase()
      if (available_languages.indexOf(lang) < 0) {
        throw new Error(
          `the requested language ${lang} is not available. Chose either 'de', 'fr', 'it' or 'ro'`
        )
      } else {
        const party = colors.data.find(party => party[`abbr_${lang}`] === abbr)
        if (!party) {
          console.error(
            `Error in getParty: party ${abbr} not found in lang ${lang}, returning fallback color`
          )
          return fallBackColor
        }
        return {
          abbr: party[`abbr_${lang}`],
          name: party[`name_${lang}`],
          color: party.color,
          blackOrWhite: party.on_color,
          fontColor: party.on_white,
          fontColorOnBlack: party.on_black
        }
      }
    }
  }

  /**
   *
   * @param {LanguageCodes} lang
   * @param {string} abbr
   * @return {PartyDefinition}
   */
  var getParty = (lang, abbr) => getPartyFunctionForLanguage(lang)(abbr)

  // create one function per language for export
  var getPartyDE = getPartyFunctionForLanguage('de')
  var getPartyFR = getPartyFunctionForLanguage('fr')
  var getPartyIT = getPartyFunctionForLanguage('it')
  var getPartyRO = getPartyFunctionForLanguage('ro')

  /**
   * Get party name, using the specified language
   * @param lang {LanguageCodes}
   * @param abbr {string}
   * @return {string}
   */
  function getPartyName (lang, abbr) {
    var party = getPartyFunctionForLanguage(lang)(abbr)
    if (party) return party.name
  }

  function getPartyNameDE (abbr) {
    var party = getPartyDE(abbr)
    if (party) return party.name
  }

  function getPartyNameFR (abbr) {
    var party = getPartyFR(abbr)
    if (party) return party.name
  }

  function getPartyNameIT (abbr) {
    var party = getPartyIT(abbr)
    if (party) return party.name
  }

  function getPartyNameRO (abbr) {
    var party = getPartyRO(abbr)
    if (party) return party.name
  }

  /**
   * Get the party color, using the specified language
   * @param lang {LanguageCodes}
   * @param abbr {string}
   * @return {string}
   */
  function getPartyColor (lang, abbr) {
    var party = getPartyFunctionForLanguage(lang)(abbr)
    if (party) return party.color
  }

  function getPartyColorDE (abbr) {
    var party = getPartyDE(abbr)
    if (party) return party.color
  }

  function getPartyColorFR (abbr) {
    var party = getPartyFR(abbr)
    if (party) return party.color
  }

  function getPartyColorIT (abbr) {
    var party = getPartyIT(abbr)
    if (party) return party.color
  }

  function getPartyColorRO (abbr) {
    var party = getPartyRO(abbr)
    if (party) return party.color
  }

  /**
   * Return whether the text on the coloured background should be black or white, according to accessibility standards.
   * @param lang {LanguageCodes}
   * @param abbr {string}
   * @return {string}
   */
  function getBlackOrWhite (lang, abbr) {
    var party = getPartyFunctionForLanguage(lang)(abbr)
    if (party) return party.blackOrWhite
  }
  function getBlackOrWhiteDE (abbr) {
    var party = getPartyDE(abbr)
    if (party) return party.blackOrWhite
  }

  function getBlackOrWhiteFR (abbr) {
    var party = getPartyFR(abbr)
    if (party) return party.blackOrWhite
  }

  function getBlackOrWhiteIT (abbr) {
    var party = getPartyIT(abbr)
    if (party) return party.blackOrWhite
  }

  function getBlackOrWhiteRO (abbr) {
    var party = getPartyRO(abbr)
    if (party) return party.blackOrWhite
  }

  /**
   * Return the party color for use as text color
   * @param lang {LanguageCodes}
   * @param abbr {string}
   * @return {string}
   */
  function getPartyFontColor (lang, abbr) {
    var party = getPartyFunctionForLanguage(lang)(abbr)
    if (party) return party.fontColor
  }

  function getPartyFontColorDE (abbr) {
    var party = getPartyDE(abbr)
    if (party) return party.fontColor
  }

  function getPartyFontColorFR (abbr) {
    var party = getPartyFR(abbr)
    if (party) return party.fontColor
  }

  function getPartyFontColorIT (abbr) {
    var party = getPartyIT(abbr)
    if (party) return party.fontColor
  }

  function getPartyFontColorRO (abbr) {
    var party = getPartyRO(abbr)
    if (party) return party.fontColor
  }

  /**
   * Return the party color for use as a text color on a dark background.
   * @param lang {LanguageCodes}
   * @param abbr {string}
   * @return {string}
   */
  function getPartyFontColorOnBlack (lang, abbr) {
    var party = getPartyFunctionForLanguage(lang)(abbr)
    if (party) return party.fontColorOnBlack
  }

  function getPartyFontColorOnBlackDE (abbr) {
    var party = getPartyDE(abbr)
    if (party) return party.fontColorOnBlack
  }

  function getPartyFontColorOnBlackFR (abbr) {
    var party = getPartyFR(abbr)
    if (party) return party.fontColorOnBlack
  }

  function getPartyFontColorOnBlackIT (abbr) {
    var party = getPartyIT(abbr)
    if (party) return party.fontColorOnBlack
  }

  function getPartyFontColorOnBlackRO (abbr) {
    var party = getPartyRO(abbr)
    if (party) return party.fontColorOnBlack
  }

  exports.getParty = getParty
  exports.getPartyDE = getPartyDE
  exports.getPartyFR = getPartyFR
  exports.getPartyIT = getPartyIT
  exports.getPartyRO = getPartyRO

  exports.getPartyName = getPartyName
  exports.getPartyNameDE = getPartyNameDE
  exports.getPartyNameFR = getPartyNameFR
  exports.getPartyNameIT = getPartyNameIT
  exports.getPartyNameRO = getPartyNameRO

  exports.getPartyColor = getPartyColor
  exports.getPartyColorDE = getPartyColorDE
  exports.getPartyColorFR = getPartyColorFR
  exports.getPartyColorIT = getPartyColorIT
  exports.getPartyColorRO = getPartyColorRO

  exports.getBlackOrWhite = getBlackOrWhite
  exports.getBlackOrWhiteDE = getBlackOrWhiteDE
  exports.getBlackOrWhiteFR = getBlackOrWhiteFR
  exports.getBlackOrWhiteIT = getBlackOrWhiteIT
  exports.getBlackOrWhiteRO = getBlackOrWhiteRO

  exports.getPartyFontColor = getPartyFontColor
  exports.getPartyFontColorDE = getPartyFontColorDE
  exports.getPartyFontColorFR = getPartyFontColorFR
  exports.getPartyFontColorIT = getPartyFontColorIT
  exports.getPartyFontColorRO = getPartyFontColorRO

  exports.getPartyFontColorOnBlack = getPartyFontColorOnBlack
  exports.getPartyFontColorOnBlackDE = getPartyFontColorOnBlackDE
  exports.getPartyFontColorOnBlackFR = getPartyFontColorOnBlackFR
  exports.getPartyFontColorOnBlackIT = getPartyFontColorOnBlackIT
  exports.getPartyFontColorOnBlackRO = getPartyFontColorOnBlackRO

  Object.defineProperty(exports, '__esModule', { value: true })
})

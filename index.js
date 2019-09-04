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
   * @typedef {'de' | 'fr' | 'it' | 'ro'} LanguageCode
   * Colors are defined as hex codes
   * @typedef {string} Color - A color as a hex code e.g. #123456
   * Party IDs are numbers from 1 to about 50
   * @typedef {number} PartyId - The ID of a party as visible in the spreadsheet
   */

  /**
   * The Party definition object
   * @typedef {Object} PartyDefinition
   * @property {string} abbr - The commonly used abbrevation of the party
   * @property {string} name - The official name of the party
   * @property {Color} color - The hex color for use on larger color patches
   * @property {Color} blackOrWhite - The hex color for the text displayed on patches of that color
   * @property {Color} fontColor - A tweaked version of the hex color for use as a text color on light backgrounds
   * @property {Color} fontColorOnBlack - A tweaked version of the hex color for use as a text color on dark backgrounds
   */

  /** @type {LanguageCode[]} */
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

  // here the data from the google spreadsheet is loaded
  var colors = require('./definitions.json')

  /**
   * Get a function that returns a party definition for an abbreviation in the given language
   * @param {LanguageCode} lang language code that the abbreviations will be in when called
   * @return {Function} getParty
   * @throws If the langauge that is requested is not valid, an Error is thrown
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
   * Get the complete party definition by party id and language
   * @param {PartyId} id ID of the party in question
   * @param {[LanguageCode='de']} lang Language that the return value is
   * @return {PartyDefinition}
   */
  var getPartyById = (id, lang = 'de') => {
    if (available_languages.indexOf(lang) < 0) {
      throw new Error(
        `the requested language ${lang} is not available. Chose either 'de', 'fr', 'it' or 'ro'`
      )
    } else {
      var availableIds = colors.data.map(d => d.id)
      if (!availableIds.includes(id)) {
        console.error(
          `the requested party id ${id} is not available, returning fallback color`
        )
        return fallBackColor
      }
      const party = colors.data.find(d => d.id === id)
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

  /**
   * Get the complete party definition by abbreviation
   * @param {LanguageCode} lang Language that the abbreviation is in
   * @param {string} abbr Abbreviation of the party in question
   * @return {PartyDefinition}
   * @throws If the langauge that is requested is not valid, an Error is thrown
   */
  var getParty = (lang, abbr) => getPartyFunctionForLanguage(lang)(abbr)

  // create one function per language for export
  var getPartyDE = getPartyFunctionForLanguage('de')
  var getPartyFR = getPartyFunctionForLanguage('fr')
  var getPartyIT = getPartyFunctionForLanguage('it')
  var getPartyRO = getPartyFunctionForLanguage('ro')

  /**
   * Get party abbreviation by id and language
   * @param {PartyId} id ID of the party in question
   * @param {LanguageCode} lang The language the returend abbreviation will be in
   * @return {string}
   */
  function getPartyAbbrById (id, lang) {
    const party = getPartyById(id, lang)
    if (party) return party.abbr
  }

  /**
   * Get party name by id and language
   * @param {PartyId} id ID of the party in question
   * @param {LanguageCode} lang The language the returend abbreviation will be in
   * @return {string} Name of the party in the lang specified
   */
  function getPartyNameById (id, lang) {
    const party = getPartyById(id, lang)
    if (party) return party.name
  }

  /**
   * Get party name by language and abbreviation
   * @param {LanguageCode} lang The language of the abbreviation and the party name
   * @param {string} abbr Abbreviation of the party in the lang specified
   * @return {string} Name of the party in the lang specified
   */
  function getPartyName (lang, abbr) {
    var party = getPartyFunctionForLanguage(lang)(abbr)
    if (party) return party.name
  }

  /**
   * Get party name by abbreviation
   * @param {string} abbr Abbreviation of the party in German
   * @return {string} Name of the party in German
   */
  function getPartyNameDE (abbr) {
    var party = getPartyDE(abbr)
    if (party) return party.name
  }

  /**
   * Get party name by abbreviation
   * @param {string} abbr Abbreviation of the party in French
   * @return {string} Name of the party in French
   */
  function getPartyNameFR (abbr) {
    var party = getPartyFR(abbr)
    if (party) return party.name
  }

  /**
   * Get party name by abbreviation
   * @param {string} abbr Abbreviation of the party in Italian
   * @return {string} Name of the party in Italian
   */
  function getPartyNameIT (abbr) {
    var party = getPartyIT(abbr)
    if (party) return party.name
  }

  /**
   * Get party name by abbreviation
   * @param {string} abbr Abbreviation of the party in Rhaeto-Romanic
   * @return {string} Name of the party in Rhaeto-Romanic
   */
  function getPartyNameRO (abbr) {
    var party = getPartyRO(abbr)
    if (party) return party.name
  }

  /**
   * Get party name by language and abbreviation
   * @param {LanguageCode} lang The language of the abbreviation
   * @param {string} abbr Abbreviation of the party in the lang specified
   * @return {string} Primary party color as hex
   */
  function getPartyColor (lang, abbr) {
    var party = getPartyFunctionForLanguage(lang)(abbr)
    if (party) return party.color
  }

  /**
   * Get primary party color by id
   * @param {PartyId} id ID of the party in question
   * @return {string} Primary party color as hex
   */
  function getPartyColorById (id) {
    var party = getPartyById(id)
    if (party) return party.color
  }

  /**
   * Get primary party color by abbreviation
   * @param {string} abbr Abbreviation of the party in German
   * @return {Color} Primary party color as hex
   */
  function getPartyColorDE (abbr) {
    var party = getPartyDE(abbr)
    if (party) return party.color
  }

  /**
   * Get primary party color by abbreviation
   * @param {string} abbr Abbreviation of the party in French
   * @return {Color} Primary party color as hex
   */
  function getPartyColorFR (abbr) {
    var party = getPartyFR(abbr)
    if (party) return party.color
  }

  /**
   * Get primary party color by abbreviation
   * @param {string} abbr Abbreviation of the party in Italian
   * @return {Color} Primary party color as hex
   */
  function getPartyColorIT (abbr) {
    var party = getPartyIT(abbr)
    if (party) return party.color
  }

  /**
   * Get primary party color by abbreviation
   * @param {string} abbr Abbreviation of the party in Rhaeto-Romanic
   * @return {Color} Primary party color as hex
   */
  function getPartyColorRO (abbr) {
    var party = getPartyRO(abbr)
    if (party) return party.color
  }

  /**
   * Get black or white for text on a primary colored background by language and abbreviation
   * @param {LanguageCode} lang The language of the abbreviation
   * @param {string} abbr Abbreviation of the party in the lang specified
   * @return {Color} Either #FFF or #000
   */
  function getBlackOrWhite (lang, abbr) {
    var party = getPartyFunctionForLanguage(lang)(abbr)
    if (party) return party.blackOrWhite
  }

  /**
   * Get black or white for text on a primary colored background by id
   * @param {PartyId} id ID of the party in question
   * @return {Color} Either #FFF or #000
   */
  function getBlackOrWhiteById (id) {
    var party = getPartyById(id)
    if (party) return party.blackOrWhite
  }

  /**
   * Get black or white for text on a primary colored background by abbreviation
   * @param {string} abbr Abbreviation of the party in German
   * @return {Color} Either #FFF or #000
   */
  function getBlackOrWhiteDE (abbr) {
    var party = getPartyDE(abbr)
    if (party) return party.blackOrWhite
  }

  /**
   * Get black or white for text on a primary colored background by abbreviation
   * @param {string} abbr Abbreviation of the party in French
   * @return {Color} Either #FFF or #000
   */
  function getBlackOrWhiteFR (abbr) {
    var party = getPartyFR(abbr)
    if (party) return party.blackOrWhite
  }

  /**
   * Get black or white for text on a primary colored background by abbreviation
   * @param {string} abbr Abbreviation of the party in Italian
   * @return {Color} Either #FFF or #000
   */
  function getBlackOrWhiteIT (abbr) {
    var party = getPartyIT(abbr)
    if (party) return party.blackOrWhite
  }

  /**
   * Get black or white for text on a primary colored background by abbreviation
   * @param {string} abbr Abbreviation of the party in Rhaeto-Romanic
   * @return {Color} Either #FFF or #000
   */
  function getBlackOrWhiteRO (abbr) {
    var party = getPartyRO(abbr)
    if (party) return party.blackOrWhite
  }

  /**
   * Get the party color for use as text color on white by langauge and abbreviation. This color is often darker than
   * the primary party color so it can be used on a white background and maintain a contrast ratio of at least 1:4.5
   * @param {LanguageCode} lang The language of the abbreviation
   * @param {string} abbr Abbreviation of the party in the lang specified
   * @return {Color} Accessibility friendly, dark party color as hex
   */
  function getPartyFontColor (lang, abbr) {
    var party = getPartyFunctionForLanguage(lang)(abbr)
    if (party) return party.fontColor
  }

  /**
   * Get the party color for use as text color on white by langauge and abbreviation. This color is often darker than
   * the primary party color so it can be used on a white background and maintain a contrast ratio of at least 1:4.5
   * @param {PartyId} id ID of the party in question
   * @return {Color} Accessibility friendly, dark party color as hex
   */
  function getPartyFontColorById (id) {
    var party = getPartyById(id)
    if (party) return party.fontColor
  }

  /**
   * Get the party color for use as text color on white by langauge and abbreviation. This color is often darker than
   * the primary party color so it can be used on a white background and maintain a contrast ratio of at least 1:4.5
   * @param {string} abbr Abbreviation of the party in German
   * @return {Color} Accessibility friendly, dark party color as hex
   */
  function getPartyFontColorDE (abbr) {
    var party = getPartyDE(abbr)
    if (party) return party.fontColor
  }

  /**
   * Get the party color for use as text color on white by langauge and abbreviation. This color is often darker than
   * the primary party color so it can be used on a white background and maintain a contrast ratio of at least 1:4.5
   * @param {string} abbr Abbreviation of the party in French
   * @return {Color} Accessibility friendly, dark party color as hex
   */
  function getPartyFontColorFR (abbr) {
    var party = getPartyFR(abbr)
    if (party) return party.fontColor
  }

  /**
   * Get the party color for use as text color on white by langauge and abbreviation. This color is often darker than
   * the primary party color so it can be used on a white background and maintain a contrast ratio of at least 1:4.5
   * @param {string} abbr Abbreviation of the party in Italian
   * @return {Color} Accessibility friendly, dark party color as hex
   */
  function getPartyFontColorIT (abbr) {
    var party = getPartyIT(abbr)
    if (party) return party.fontColor
  }

  /**
   * Get the party color for use as text color on white by langauge and abbreviation. This color is often darker than
   * the primary party color so it can be used on a white background and maintain a contrast ratio of at least 1:4.5
   * @param {string} abbr Abbreviation of the party in Rhaeto-Roman
   * @return {Color} Accessibility friendly, dark party color as hex
   */
  function getPartyFontColorRO (abbr) {
    var party = getPartyRO(abbr)
    if (party) return party.fontColor
  }

  /**
   * Get the party color for use as text color on black by langauge and abbreviation. This color is often brighter than
   * the primary party color so it can be used on a black background and maintain a contrast ratio of at least 1:4.5
   * @param {LanguageCode} lang The language of the abbreviation
   * @param {string} abbr Abbreviation of the party in the lang specified
   * @return {Color} Accessibility friendly, dark party color as hex
   */
  function getPartyFontColorOnBlack (lang, abbr) {
    var party = getPartyFunctionForLanguage(lang)(abbr)
    if (party) return party.fontColorOnBlack
  }

  /**
   * Get the party color for use as text color on black by langauge and abbreviation. This color is often brighter than
   * the primary party color so it can be used on a black background and maintain a contrast ratio of at least 1:4.5
   * @param {PartyId} id ID of the party in question
   * @return {Color} Accessibility friendly, bright party color as hex
   */
  function getPartyFontColorOnBlackById (id) {
    var party = getPartyById(id)
    if (party) return party.fontColorOnBlack
  }

  /**
   * Get the party color for use as text color on black by langauge and abbreviation. This color is often brighter than
   * the primary party color so it can be used on a black background and maintain a contrast ratio of at least 1:4.5
   * @param {string} abbr Abbreviation of the party in German
   * @return {Color} Accessibility friendly, bright party color as hex
   */
  function getPartyFontColorOnBlackDE (abbr) {
    var party = getPartyDE(abbr)
    if (party) return party.fontColorOnBlack
  }

  /**
   * Get the party color for use as text color on black by langauge and abbreviation. This color is often brighter than
   * the primary party color so it can be used on a black background and maintain a contrast ratio of at least 1:4.5
   * @param {string} abbr Abbreviation of the party in French
   * @return {Color} Accessibility friendly, bright party color as hex
   */
  function getPartyFontColorOnBlackFR (abbr) {
    var party = getPartyFR(abbr)
    if (party) return party.fontColorOnBlack
  }

  /**
   * Get the party color for use as text color on black by langauge and abbreviation. This color is often brighter than
   * the primary party color so it can be used on a black background and maintain a contrast ratio of at least 1:4.5
   * @param {string} abbr Abbreviation of the party in Italian
   * @return {Color} Accessibility friendly, bright party color as hex
   */
  function getPartyFontColorOnBlackIT (abbr) {
    var party = getPartyIT(abbr)
    if (party) return party.fontColorOnBlack
  }

  /**
   * Get the party color for use as text color on black by langauge and abbreviation. This color is often brighter than
   * the primary party color so it can be used on a black background and maintain a contrast ratio of at least 1:4.5
   * @param {string} abbr Abbreviation of the party in Rhaeto-Roman
   * @return {Color} Accessibility friendly, bright party color as hex
   */
  function getPartyFontColorOnBlackRO (abbr) {
    var party = getPartyRO(abbr)
    if (party) return party.fontColorOnBlack
  }

  exports.getPartyById = getPartyById

  exports.getParty = getParty
  exports.getPartyDE = getPartyDE
  exports.getPartyFR = getPartyFR
  exports.getPartyIT = getPartyIT
  exports.getPartyRO = getPartyRO

  exports.getPartyAbbrById = getPartyAbbrById

  exports.getPartyName = getPartyName
  exports.getPartyNameById = getPartyNameById
  exports.getPartyNameDE = getPartyNameDE
  exports.getPartyNameFR = getPartyNameFR
  exports.getPartyNameIT = getPartyNameIT
  exports.getPartyNameRO = getPartyNameRO

  exports.getPartyColor = getPartyColor
  exports.getPartyColorById = getPartyColorById
  exports.getPartyColorDE = getPartyColorDE
  exports.getPartyColorFR = getPartyColorFR
  exports.getPartyColorIT = getPartyColorIT
  exports.getPartyColorRO = getPartyColorRO

  exports.getBlackOrWhite = getBlackOrWhite
  exports.getBlackOrWhiteById = getBlackOrWhiteById
  exports.getBlackOrWhiteDE = getBlackOrWhiteDE
  exports.getBlackOrWhiteFR = getBlackOrWhiteFR
  exports.getBlackOrWhiteIT = getBlackOrWhiteIT
  exports.getBlackOrWhiteRO = getBlackOrWhiteRO

  exports.getPartyFontColor = getPartyFontColor
  exports.getPartyFontColorById = getPartyFontColorById
  exports.getPartyFontColorDE = getPartyFontColorDE
  exports.getPartyFontColorFR = getPartyFontColorFR
  exports.getPartyFontColorIT = getPartyFontColorIT
  exports.getPartyFontColorRO = getPartyFontColorRO

  exports.getPartyFontColorOnBlack = getPartyFontColorOnBlack
  exports.getPartyFontColorOnBlackById = getPartyFontColorOnBlackById
  exports.getPartyFontColorOnBlackDE = getPartyFontColorOnBlackDE
  exports.getPartyFontColorOnBlackFR = getPartyFontColorOnBlackFR
  exports.getPartyFontColorOnBlackIT = getPartyFontColorOnBlackIT
  exports.getPartyFontColorOnBlackRO = getPartyFontColorOnBlackRO

  Object.defineProperty(exports, '__esModule', { value: true })
})

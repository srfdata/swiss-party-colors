;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define([ 'exports' ], factory)
      : factory((global.gsheets = global.gsheets || {}))
})(this, function (exports) {
  'use strict'

  var colors = require('./definitions.json')

  var available_languages = [ 'de', 'fr', 'it' ]

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
   * @param {string} lang language code, either 'de', 'fr' or 'it'
   */
  function getPartyFunctionForLanguage (lang) {
    return function getParty (abbr) {
      if (available_languages.indexOf(lang) < 0) {
        throw new Error(
          `the requested language ${lang} is not available. Chose either 'de', 'fr' or 'it'`
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

  // create one function per language for export
  var getPartyDE = getPartyFunctionForLanguage('de')
  var getPartyFR = getPartyFunctionForLanguage('fr')
  var getPartyIT = getPartyFunctionForLanguage('it')

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

  exports.getPartyDE = getPartyDE
  exports.getPartyFR = getPartyFR
  exports.getPartyIT = getPartyIT

  exports.getPartyNameDE = getPartyNameDE
  exports.getPartyNameFR = getPartyNameFR
  exports.getPartyNameIT = getPartyNameIT

  exports.getPartyColorDE = getPartyColorDE
  exports.getPartyColorFR = getPartyColorFR
  exports.getPartyColorIT = getPartyColorIT

  exports.getBlackOrWhiteDE = getBlackOrWhiteDE
  exports.getBlackOrWhiteFR = getBlackOrWhiteFR
  exports.getBlackOrWhiteIT = getBlackOrWhiteIT

  exports.getPartyFontColorDE = getPartyFontColorDE
  exports.getPartyFontColorFR = getPartyFontColorFR
  exports.getPartyFontColorIT = getPartyFontColorIT

  exports.getPartyFontColorOnBlackDE = getPartyFontColorOnBlackDE
  exports.getPartyFontColorOnBlackFR = getPartyFontColorOnBlackFR
  exports.getPartyFontColorOnBlackIT = getPartyFontColorOnBlackIT

  Object.defineProperty(exports, '__esModule', { value: true })
})

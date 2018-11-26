var getPartyDE = require('./index.js').getPartyDE
var getPartyFR = require('./index.js').getPartyFR
var getPartyIT = require('./index.js').getPartyIT

var getPartyNameDE = require('./index.js').getPartyNameDE
var getPartyNameFR = require('./index.js').getPartyNameFR
var getPartyNameIT = require('./index.js').getPartyNameIT

var getPartyColorDE = require('./index.js').getPartyColorDE
var getPartyColorFR = require('./index.js').getPartyColorFR
var getPartyColorIT = require('./index.js').getPartyColorIT

var getBlackOrWhiteDE = require('./index.js').getBlackOrWhiteDE
var getBlackOrWhiteFR = require('./index.js').getBlackOrWhiteFR
var getBlackOrWhiteIT = require('./index.js').getBlackOrWhiteIT

var getPartyFontColorDE = require('./index.js').getPartyFontColorDE
var getPartyFontColorFR = require('./index.js').getPartyFontColorFR
var getPartyFontColorIT = require('./index.js').getPartyFontColorIT

var getPartyFontColorOnBlackDE = require('./index.js')
  .getPartyFontColorOnBlackDE
var getPartyFontColorOnBlackFR = require('./index.js')
  .getPartyFontColorOnBlackFR
var getPartyFontColorOnBlackIT = require('./index.js')
  .getPartyFontColorOnBlackIT

var definitions = require('./definitions.json').data

var bigSeven = definitions.filter(
  party =>
    [ 'SVP', 'FDP', 'CVP', 'BDP', 'GLP', 'GPS', 'SP' ].indexOf(party.abbr_de) >=
    0
)

bigSeven.forEach(party => {
  test(`getPartyDE returns correct values for ${party.abbr_de}`, () => {
    expect(getPartyDE(party.abbr_de).name).toBe(party.name_de)
  })

  test(`getPartyFR returns correct values for ${party.abbr_fr}`, () => {
    expect(getPartyFR(party.abbr_fr).name).toBe(party.name_fr)
  })

  test(`getPartyIT returns correct values for ${party.abbr_it}`, () => {
    expect(getPartyIT(party.abbr_it).name).toBe(party.name_it)
  })

  test(`getPartyNameDE returns correct values for ${party.abbr_de}`, () => {
    expect(getPartyNameDE(party.abbr_de)).toBe(party.name_de)
  })

  test(`getPartyNameFR returns correct values for ${party.abbr_fr}`, () => {
    expect(getPartyNameFR(party.abbr_fr)).toBe(party.name_fr)
  })

  test(`getPartyNameIT returns correct values for ${party.abbr_it}`, () => {
    expect(getPartyNameIT(party.abbr_it)).toBe(party.name_it)
  })

  test(`getPartyColorDE returns correct hex code for ${party.abbr_de}`, () => {
    expect(getPartyColorDE(party.abbr_de)).toBe(party.color)
  })

  test(`getPartyColorFR returns correct hex code for ${party.abbr_fr}`, () => {
    expect(getPartyColorFR(party.abbr_fr)).toBe(party.color)
  })

  test(`getPartyColorIT returns correct hex code for ${party.abbr_it}`, () => {
    expect(getPartyColorIT(party.abbr_it)).toBe(party.color)
  })

  test(`getBlackOrWhiteDE returns correct hex code for ${party.abbr_de}`, () => {
    expect(getBlackOrWhiteDE(party.abbr_de)).toBe(party.on_color)
  })

  test(`getBlackOrWhiteFR returns correct hex code for ${party.abbr_fr}`, () => {
    expect(getBlackOrWhiteFR(party.abbr_fr)).toBe(party.on_color)
  })

  test(`getBlackOrWhiteIT returns correct hex code for ${party.abbr_it}`, () => {
    expect(getBlackOrWhiteIT(party.abbr_it)).toBe(party.on_color)
  })

  test(`getPartyFontColorDE returns correct hex code for ${party.abbr_de}`, () => {
    expect(getPartyFontColorDE(party.abbr_de)).toBe(party.on_white)
  })

  test(`getPartyFontColorFR returns correct hex code for ${party.abbr_fr}`, () => {
    expect(getPartyFontColorFR(party.abbr_fr)).toBe(party.on_white)
  })

  test(`getPartyFontColorIT returns correct hex code for ${party.abbr_it}`, () => {
    expect(getPartyFontColorIT(party.abbr_it)).toBe(party.on_white)
  })

  test(`getPartyFontColorOnBlackDE returns correct hex code for ${party.abbr_de}`, () => {
    expect(getPartyFontColorOnBlackDE(party.abbr_de)).toBe(party.on_black)
  })

  test(`getPartyFontColorOnBlackFR returns correct hex code for ${party.abbr_fr}`, () => {
    expect(getPartyFontColorOnBlackFR(party.abbr_fr)).toBe(party.on_black)
  })

  test(`getPartyFontColorOnBlackIT returns correct hex code for ${party.abbr_it}`, () => {
    expect(getPartyFontColorOnBlackIT(party.abbr_it)).toBe(party.on_black)
  })
})

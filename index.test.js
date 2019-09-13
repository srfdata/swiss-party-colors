var distinct = (v, i, a) => a.indexOf(v) === i

var getPartyDE = require('./index.js').getPartyDE
var getPartyFR = require('./index.js').getPartyFR
var getPartyIT = require('./index.js').getPartyIT
var getPartyRO = require('./index.js').getPartyRO

var getPartyNameDE = require('./index.js').getPartyNameDE
var getPartyNameFR = require('./index.js').getPartyNameFR
var getPartyNameIT = require('./index.js').getPartyNameIT
var getPartyNameRO = require('./index.js').getPartyNameRO

var getPartyColorDE = require('./index.js').getPartyColorDE
var getPartyColorFR = require('./index.js').getPartyColorFR
var getPartyColorIT = require('./index.js').getPartyColorIT
var getPartyColorRO = require('./index.js').getPartyColorRO

var getBlackOrWhiteDE = require('./index.js').getBlackOrWhiteDE
var getBlackOrWhiteFR = require('./index.js').getBlackOrWhiteFR
var getBlackOrWhiteIT = require('./index.js').getBlackOrWhiteIT
var getBlackOrWhiteRO = require('./index.js').getBlackOrWhiteRO

var getPartyFontColorDE = require('./index.js').getPartyFontColorDE
var getPartyFontColorFR = require('./index.js').getPartyFontColorFR
var getPartyFontColorIT = require('./index.js').getPartyFontColorIT
var getPartyFontColorRO = require('./index.js').getPartyFontColorRO

var getPartyFontColorOnBlackDE = require('./index.js')
  .getPartyFontColorOnBlackDE
var getPartyFontColorOnBlackFR = require('./index.js')
  .getPartyFontColorOnBlackFR
var getPartyFontColorOnBlackIT = require('./index.js')
  .getPartyFontColorOnBlackIT
var getPartyFontColorOnBlackRO = require('./index.js')
  .getPartyFontColorOnBlackRO

var definitions = require('./definitions.json').data

var langCodes = [ 'de', 'fr', 'it', 'ro' ]

langCodes.forEach(langCode => {
  test(`abbreviations in ${langCode.toUpperCase()} are unique`, () => {
    const abbreviations = definitions.map(d => d[`abbr_${langCode}`])
    expect(abbreviations.length === abbreviations.filter(distinct).length)
  })
})

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

  test(`getPartyRO returns correct values for ${party.abbr_ro}`, () => {
    expect(getPartyRO(party.abbr_ro).name).toBe(party.name_ro)
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

  test(`getPartyNameRO returns correct values for ${party.abbr_ro}`, () => {
    expect(getPartyNameRO(party.abbr_ro)).toBe(party.name_ro)
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

  test(`getPartyColorRO returns correct hex code for ${party.abbr_ro}`, () => {
    expect(getPartyColorRO(party.abbr_ro)).toBe(party.color)
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

  test(`getBlackOrWhiteRO returns correct hex code for ${party.abbr_ro}`, () => {
    expect(getBlackOrWhiteRO(party.abbr_ro)).toBe(party.on_color)
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

  test(`getPartyFontColorRO returns correct hex code for ${party.abbr_ro}`, () => {
    expect(getPartyFontColorRO(party.abbr_ro)).toBe(party.on_white)
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

  test(`getPartyFontColorOnBlackRO returns correct hex code for ${party.abbr_ro}`, () => {
    expect(getPartyFontColorOnBlackRO(party.abbr_ro)).toBe(party.on_black)
  })
})

// region Test Generic, language-independent functions

const getParty = require('./index').getParty
const getPartyName = require('./index').getPartyName
const getPartyColor = require('./index').getPartyColor
const getBlackOrWhite = require('./index').getBlackOrWhite
const getPartyFontColor = require('./index').getPartyFontColor
const getPartyFontColorOnBlack = require('./index').getPartyFontColorOnBlack

describe.each(bigSeven)('Get properties for %p', party => {
  describe.each(langCodes)('In %p', language => {
    test('getParty() returns correct party definition object', () => {
      const partyDefinition = getParty(language, party['abbr_' + language])
      expect(partyDefinition).toHaveProperty('name', party['name_' + language])
      expect(partyDefinition).toHaveProperty('abbr', party['abbr_' + language])
      expect(partyDefinition).toHaveProperty('color', party.color)
      expect(partyDefinition).toHaveProperty('blackOrWhite', party.on_color)
      expect(partyDefinition).toHaveProperty('fontColor', party.on_white)
      expect(partyDefinition).toHaveProperty('fontColorOnBlack', party.on_black)
    })

    test('getPartyName() returns correct party name', () => {
      const partyName = getPartyName(language, party['abbr_' + language])
      expect(partyName).toBe(party['name_' + language])
    })

    test('getPartyColor() returns correct color', () => {
      const partyColor = getPartyColor(language, party['abbr_' + language])
      expect(partyColor).toBe(party.color)
    })

    test('getBlackOrWhite() returns correct color', () => {
      const blackOrWhite = getBlackOrWhite(language, party['abbr_' + language])
      expect(blackOrWhite).toBe(party.on_color)
    })

    test('getPartyFontColor() returns correct color', () => {
      const fontColor = getPartyFontColor(language, party['abbr_' + language])
      expect(fontColor).toBe(party.on_white)
    })

    test('getPartyFontColorOnBlack() returns correct color', () => {
      const fontColor = getPartyFontColorOnBlack(
        language,
        party['abbr_' + language]
      )
      expect(fontColor).toBe(party.on_black)
    })
  })
})

// endregion

// region Test Functions that gets data by id

var getPartyById = require('./index.js').getPartyById
var getPartyAbbrById = require('./index.js').getPartyAbbrById
var getPartyNameById = require('./index.js').getPartyNameById
var getPartyById = require('./index.js').getPartyById
var getPartyColorById = require('./index.js').getPartyColorById
var getBlackOrWhiteById = require('./index.js').getBlackOrWhiteById
var getPartyFontColorById = require('./index.js').getPartyFontColorById
var getPartyFontColorOnBlackById = require('./index.js')
  .getPartyFontColorOnBlackById

describe.each(bigSeven)('Get properties for %p', party => {
  // language specific functions
  describe.each(langCodes)('In %p', language => {
    test('getPartyById() returns correct party definition object', () => {
      const partyDefinition = getPartyById(party.id, language)
      expect(partyDefinition).toHaveProperty('name', party['name_' + language])
      expect(partyDefinition).toHaveProperty('abbr', party['abbr_' + language])
      expect(partyDefinition).toHaveProperty('color', party.color)
      expect(partyDefinition).toHaveProperty('blackOrWhite', party.on_color)
      expect(partyDefinition).toHaveProperty('fontColor', party.on_white)
      expect(partyDefinition).toHaveProperty('fontColorOnBlack', party.on_black)
    })

    test('getPartyAbbrById() returns correct party abbr', () => {
      const partyAbbr = getPartyAbbrById(party.id, language)
      expect(partyAbbr).toBe(party['abbr_' + language])
    })

    test('getPartyNameById() returns correct party name', () => {
      const partyName = getPartyNameById(party.id, language)
      expect(partyName).toBe(party['name_' + language])
    })
  })

  test('getPartyById() returns german as default party definition', () => {
    const partyDefinitionGerman = getPartyById(party.id, 'de')
    const partyDefinitionDefault = getPartyById(party.id)
    expect(partyDefinitionDefault).toEqual(partyDefinitionGerman)
  })

  // non language specific functions
  test('getPartyColorById() returns correct color', () => {
    const partyColor = getPartyColorById(party.id)
    expect(partyColor).toBe(party.color)
  })

  test('getBlackOrWhiteById() returns correct color', () => {
    const blackOrWhite = getBlackOrWhiteById(party.id)
    expect(blackOrWhite).toBe(party.on_color)
  })

  test('getPartyFontColorById() returns correct color', () => {
    const fontColor = getPartyFontColorById(party.id)
    expect(fontColor).toBe(party.on_white)
  })

  test('getPartyFontColorOnBlackById() returns correct color', () => {
    const fontColor = getPartyFontColorOnBlackById(party.id)
    expect(fontColor).toBe(party.on_black)
  })
})

// endregion

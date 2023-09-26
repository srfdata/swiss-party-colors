import definitions from '../definitions.json' assert {type: 'json'};

const createPartyEntry = (d) => {
    const container = document.createElement('div')
    container.setAttribute('class', 'party')
    // farbquadrat, farbname, Parteiname, (RGB), Schrift auf Farbquadrat, Schrift auf Weiss
    container.innerHTML = `
        <div class="party__color-square" style="background-color: ${d.color}"></div>
        <p class="party__color">${d.color}</p>
        <h3 title="${d.name_de}">${d.abbr_de}</h3>    
        <div class="party__color-square" style="background-color: ${d.color}; color: ${d.on_color}">
            <b>${d.abbr_de}</b>
            <span>${d.abbr_de}</span>
        </div>
        <div class="party__color-square party__color-square--white" style="color: ${d.on_white}">
            <b>${d.abbr_de}</b>
            <span>${d.on_white}</span>
        </div>
        <div class="party__color-square party__color-square--black" style="color: ${d.on_black}">
            <b>${d.abbr_de}</b>
            <span>${d.on_black}</span>
        </div>
`
    return container
}

document.getElementById("meta").innerHTML = 'Zuletzt aktualisiert: ' + definitions.updated

const partyContainer = document.querySelector('.party-container.parliament')
const partyContainerOthers = document.querySelector('.party-container.others')

const partiesInParliament = ['EAG', 'PDA', 'SP', 'Grüne', 'GLP', 'EVP', 'Mitte', 'FDP', 'EDU', 'SVP', 'LEGA']

definitions.data.filter(d => partiesInParliament.includes(d.abbr_de)).forEach((d) => partyContainer.append(createPartyEntry(d)))
definitions.data.filter(d => !partiesInParliament.includes(d.abbr_de)).forEach((d) => partyContainerOthers.append(createPartyEntry(d)))

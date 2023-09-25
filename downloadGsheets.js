require('dotenv').config({path: `./.env.${process.env.NODE_ENV}`})
const fs = require('fs')
const axios = require('axios')
const {config} = require('./package.json')

/**
 GSHEETS-Downloader
 */

// fileID: Edit in package.json (config.googleSheetFileId)
const fileId = config.googleSheetFileId

// ---------------------------------------------------------
if (fileId === '--ENTER GOOGLE SHEETS FILE ID HERE WHEN NEEDED--') {
    // eslint-disable-next-line no-console
    console.error(
        '\x1b[97;41m No Google Sheets File ID provided, add it in package.json (config.googleSheetFileId) \x1b[0m',
    )
    process.exit(1)
}

const fileName = 'definitions.json'
const destination = '.'
const url = `https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/colors?alt=json&key=${process.env.GOOGLE_API_KEY}`

// make sure directories exist
if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, {recursive: true})
}

axios
    .get(url)
    .then((response) => {


        const keys = response.data.values[0]
        const data = response.data.values.slice(1)
        const processedData = data.map((row) => {
            const rowObject = {}
            row.forEach((value, i) => {
                if (value === 'true' || value === 'false') {
                    value = JSON.parse(value)
                } else if (!isNaN(Number(value))) {
                    value = parseInt(value)
                } else if (value === 'null') {
                    value = null
                    // hint: key value pairs with 'undefined' as value do not appear in data
                } else if (value === 'undefined') {
                    value = undefined
                }

                rowObject[keys[i]] = value
            })
            return rowObject
        })

        const outputData = {
            "updated": new Date(),
            "title": "colors", data: processedData
        }
        fs.writeFile(
            `${destination}/${fileName}`,
            JSON.stringify(outputData, null, 2),
            (error) => {
                if (error) {
                    console.log('\x1b[97;41m Error writing to file \x1b[0m')
                    return
                }
                console.log(`Example Object:`)
                console.log(processedData[0])
                console.log(
                    `\n\x1b[95m Writing ${processedData.length} objects to ${destination}/${fileName}  \x1b[0m`,
                )
                console.log(`\x1b[97;42m Successfully finished writing \x1b[0m`)
            },
        )
    })
    .catch((error) => {
        console.error(
            `\x1b[97;41m Error downloading spreadsheet: ${error.message}\x1b[0m`,
        )
    })

const fs = require('fs')
const { argv } = require('process')
const gameName = argv[2]
const templateDocument = fs.readFileSync(`input/${gameName}/templates/template_document.tex`, 'utf-8')
const templatePage = fs.readFileSync(`input/${gameName}/templates/template_page.svg`, 'utf-8')
const json = JSON.parse(fs.readFileSync(`input/${gameName}/pages.json`, 'utf-8'))

let pages = ''

for (let i = 0; i < json.length; i++) {
    const page = json[i]

    console.log(`Generating page: ${i + 1}...`);

    if (pages) {
        pages += '\n\n\\newpage\n\n'
    }

    pages += generateFigure(page, i + 1)
}

const pdf = templateDocument.replace('{{PAGES}}', pages)
fs.writeFileSync(`output/document.tex`, pdf)

function base64File(path) {
    const content = fs.readFileSync(path, { encoding: 'base64' })

    return 'data:image/png;base64,' + content
}

function convertSvg2Png(name) {
    const exec = require('child_process').execSync
    exec(`inkscape --export-width=1905 --export-height=2667 --export-type=png --export-filename="output/temp/${name}.png" "output/temp/${name}.svg"`)
}

function generatePageImage(images, index) {
    const content = templatePage
        .replace('{{IMAGE1}}', base64File(`temp/png/${images[0]}`))
        .replace('{{IMAGE2}}', base64File(`temp/png/${images[1]}`))
        .replace('{{IMAGE3}}', base64File(`temp/png/${images[2]}`))
        .replace('{{IMAGE4}}', base64File(`temp/png/${images[3]}`))
        .replace('{{IMAGE5}}', base64File(`temp/png/${images[4]}`))
        .replace('{{IMAGE6}}', base64File(`temp/png/${images[5]}`))
        .replace('{{IMAGE7}}', base64File(`temp/png/${images[6]}`))
        .replace('{{IMAGE8}}', base64File(`temp/png/${images[7]}`))
        .replace('{{IMAGE9}}', base64File(`temp/png/${images[8]}`))

    fs.writeFileSync(`output/temp/page${index}.svg`, content)
    convertSvg2Png(`page${index}`)

    const exec = require('child_process').execSync
    exec(`convert output/temp/page${index}.png -colorspace Gray output/temp/page${index}.png`)

    return `page${index}.png`
}

// Use 1.0525 multiplier
// Original: 190.5mm x 266.7mm
// Adjusted: 200.5mm x 280.7mm
function generateFigure(images, index) {
    const pageFile = generatePageImage(images, index)

    return `\\begin{center}
\t\\centering
\t\\includegraphics[width=200.5mm,height=280.7mm]{output/temp/${pageFile}}
\\end{center}`
}
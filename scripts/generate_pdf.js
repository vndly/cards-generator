const fs = require('fs')
const template = fs.readFileSync('input/template_document.tex', 'utf-8')
const json = JSON.parse(fs.readFileSync('input/pages.json', 'utf-8'))

let pages = ''

for (const page of json) {
    pages += generatePage(page)
}

const pdf = template.replace('{{PAGES}}', pages)
fs.writeFileSync(`output/document.tex`, pdf)

//const exec = require('child_process').exec
//exec(`pdflatex /../output/document.tex`)

function generatePage(page) {
    let result = ''

    for (const images of page) {
        if (result) {
            result += '\n\n\\newpage\n\n'
        }

        result += generateFigure(images)
    }

    return result
}

function generateFigure(images) {
    return `\\begin{center}
\t\\centering
\t\\includegraphics[width=190.5mm,height=266.7mm]{front.png}
\\end{center}`
}
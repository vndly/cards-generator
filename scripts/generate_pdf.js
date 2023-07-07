const fs = require('fs')
const template = fs.readFileSync('input/template.tex', 'utf-8')
const json = JSON.parse(fs.readFileSync('input/pages.json', 'utf-8'))

let pages = ''

for (const page of json) {
    pages += generatePage(page)
}

const pdf = template.replace('{{PAGES}}', pages)
fs.writeFileSync(`output/document.tex`, pdf)

function generatePage(page) {
    let figures = ''

    for (const figure of page) {
        if (figures) {
            figures += '\n\t'
        }

        figures += generateFigure(figure, 0, 0)
    }

    return figures
}

function generateFigure(figure, x, y) {
    return `\\begin{textblock*}{0mm}(-5.25mm, 0mm)
        \\includegraphics[width=70mm, height=99mm]{figure}
    \\end{textblock*}\n`
}
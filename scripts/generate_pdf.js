const fs = require('fs')
const template = fs.readFileSync('input/template.tex', 'utf-8')
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

    for (const row of page) {
        if (result) {
            result += '\n'
        }

        result += generateRow(row)
    }

    return result
}

function generateRow(row) {
    let result = ''

    for (const figure of row) {
        if (result) {
            result += '\n'
        }

        result += generateFigure(figure, 0, 0)
    }

    return result
}

function generateFigure(figure, x, y) {
    return `\t\\begin{textblock*}{0mm}(-5.25mm, 0mm)
        \\includegraphics[width=70mm, height=99mm]{../png/${figure}}
    \\end{textblock*}\n`
}
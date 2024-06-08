#!/usr/bin/env bash

set -e

GAME="mafia"

BASE_DIR=`dirname $0`
TEMP="${BASE_DIR}/../temp"

#rm -rf ${TEMP}
#mkdir ${TEMP}

#node ${BASE_DIR}/generate_png.js ${GAME}
node ${BASE_DIR}/generate_pdf.js ${GAME}

pdflatex -output-directory=${BASE_DIR}/../output ${BASE_DIR}/../output/document.tex
rm ${BASE_DIR}/../output/document.aux
rm ${BASE_DIR}/../output/document.log
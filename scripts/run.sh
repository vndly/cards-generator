#!/usr/bin/env bash

set -e

GAME="dbz"

BASE_DIR=`dirname $0`
TEMP="${BASE_DIR}/../temp"
OUTPUT="${BASE_DIR}/../output"

rm -rf ${TEMP}
rm -rf ${OUTPUT}

mkdir ${TEMP}
mkdir "${TEMP}/output"
mkdir "${OUTPUT}"

node ${BASE_DIR}/generate_png.js ${GAME}
node ${BASE_DIR}/generate_pdf.js ${GAME}

pdflatex -output-directory=${BASE_DIR}/../output ${BASE_DIR}/../output/document.tex
rm ${BASE_DIR}/../output/document.aux
rm ${BASE_DIR}/../output/document.log

xdg-open ${BASE_DIR}/../output/document.pdf
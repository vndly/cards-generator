#!/usr/bin/env bash

set -e

BASE_DIR=`dirname $0`
TEMP="${BASE_DIR}/../temp"

rm -rf ${TEMP}
mkdir ${TEMP}

node ${BASE_DIR}/generate_png.js
#node ${BASE_DIR}/generate_pdf.js

#pdflatex -output-directory=${BASE_DIR}/../output ${BASE_DIR}/../output/document.tex
#rm ${BASE_DIR}/../output/document.aux
#rm ${BASE_DIR}/../output/document.log
#!/usr/bin/env bash

set -e

BASE_DIR=`dirname $0`

node ${BASE_DIR}/generate_png.js
node ${BASE_DIR}/generate_pdf.js
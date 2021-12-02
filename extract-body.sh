#!/bin/bash

awk -F, -- 'NR == 1 || $2 == '$2' { print }' $1 > $3


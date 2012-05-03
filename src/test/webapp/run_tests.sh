#!/bin/bash
phantomjs run-jasmine.js SpecRunner.html
echo "Exit code" $?

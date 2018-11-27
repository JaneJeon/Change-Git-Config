#!/usr/bin/env bash
curl -X DELETE -u $USER https://api.github.com/repos/$USER/test
rm -rf sample

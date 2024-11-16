#!/usr/bin/env bash

hugo && rsync -av public/ --exclude 'js/swagger-ui' debian@91.92.155.156:/home/m346.frickelbude.ch/public/

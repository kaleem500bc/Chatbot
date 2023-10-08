#!/bin/bash

declare -a _modules=("gpt_module" "frontend" "node_server" "whisper_module")

# copy config.yaml to each module
for module in "${_modules[@]}"
do 
    cp config.yaml $module
done

(cd gpt_module && python flask_api.py &)
(cd whisper_module && python flask_api.py &)
(cd node_server && npm start &)
(cd frontend && npm start &)

# # For using docker
# # build docker image for each module
# for module in "${modules[@]}"
# do 
#     (cd $module && docker build -t $module .)
# done


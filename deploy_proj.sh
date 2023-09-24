#!/bin/bash

declare -a modules=("gpt_module" "frontend" "node_server" "whisper_module")

# copy config.yaml to each module
for module in "${modules[@]}"
do 
    cp config.yaml $module
done

(cd gpt_module && python flask_api.py)
(cd whisper_module && python flask_api.py)
(cd frontend && npm start)

# # For using docker
# # build docker image for each module
# for module in "${modules[@]}"
# do 
#     (cd $module && docker build -t $module .)
# done


#!/bin/bash
set -e

cmd="$1"

build="$2"

app="$build-deckie-front"

function init() {
    echo "Creating heroku app $app..."

    heroku apps:create $app --region eu --buildpack \
      https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/emberjs.tgz
}

function clean() {
    heroku apps:destroy --app $app --confirm $app
}

for supported_cmd in init configure deploy clean
do
    if [ "$cmd" == $supported_cmd ]; then
        if [ ! $build ]; then
            echo "Please specify a build type."

            exit -1
        fi

        eval $cmd

        exit 0
    fi
done

echo "usage: bash scripts/heroku.sh [init|configure|deploy|clean] build"

exit -1

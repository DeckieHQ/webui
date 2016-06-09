#!/bin/bash
set -e

cmd="$1"

build="$2"

app="$build-deckie-front"

api="$build-deckie-api"

function init() {
    echo "Creating heroku app $app..."

    heroku apps:create $app --region eu --buildpack \
      https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/emberjs.tgz
}

function configure() {
    for key in ALGOLIASEARCH_APPLICATION_ID ALGOLIASEARCH_API_KEY_SEARCH
    do
        echo "Copying env key $key from $api to $app..."

        heroku config:set --app $app $(heroku config:get $key --app $api -s)
    done

    if [ "$CUSTOM_DOMAIN" ]; then
        if [ $build == "production" ]; then
            api_domain_name="api.$CUSTOM_DOMAIN"
        else
            api_domain_name="$build-api.$CUSTOM_DOMAIN"
        fi
    else
        api_domain_name="$api.herokuapp.com"
    fi

    heroku config:set --app $app API_URL="http://$api_domain_name"
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

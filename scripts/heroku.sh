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

    git remote add $app "https://git.heroku.com/$app.git"
}

function configure() {
    for key in ALGOLIASEARCH_APPLICATION_ID ALGOLIASEARCH_API_KEY_SEARCH
    do
        echo "Copying env key $key from $api to $app..."

        heroku config:set --app $app $(heroku config:get $key --app $api -s)
    done

    if [ "$CUSTOM_DOMAIN" ]; then
        heroku domains:clear --app $app

        if [ $build == "staging" ]; then
            ssl_prefix="https"
        fi

        if [ $build == "production" ]; then
            api_domain_name="api.$CUSTOM_DOMAIN"

            heroku domains:add --app $app "www.$CUSTOM_DOMAIN"

            heroku domains:add --app $app "$CUSTOM_DOMAIN"

            ssl_prefix="https"
        else
            api_domain_name="$build-api.$CUSTOM_DOMAIN"

            heroku domains:add --app $app "$build.$CUSTOM_DOMAIN"
        fi
    else
        api_domain_name="$api.herokuapp.com"
    fi

    heroku config:set --app $app API_URL="$ssl_prefix://$api_domain_name"
}

function deploy() {
    heroku config:set REBUILD_ALL=true --app $app

    heroku plugins:install https://github.com/heroku/heroku-repo.git

    heroku repo:purge_cache -a $app

    git push $app master

    heroku config:unset REBUILD_ALL --app $app
}

function upgrade() {
    echo "Upgrading dynos..."

    heroku dyno:type hobby --app $app
}

function clean() {
    heroku apps:destroy --app $app --confirm $app
}

for supported_cmd in init configure deploy upgrade clean
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

echo "usage: bash scripts/heroku.sh [init|configure|deploy|upgrade|clean] build"

exit -1

# Evaluate sentences with Natural Language Processing

## Overview

This project is an asynchronous web app that uses MeaningCloud API to sentiment analysis sentences and dynamically update the UI.

## Run app

Clone this repo

```
git clone https://github.com/DamVanManh/Meaning-Cloud-Sentences.git
```

Create your .env file at root folder with MEANINGCLOUD_LICENSE_KEY key, which store your meaningclound license key. Get your key [here](https://www.meaningcloud.com/developer/sentiment-analysis).

`cd` into your new folder and run:

- `npm install`
- `npm run build-dev` to start the webpack dev server
- `npm run build-prod` to generate a dist folder for prod
- `npm start` to run the Express server on port 8081

## Link demo

[heroku link](https://meaning-cloud.herokuapp.com/)

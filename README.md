# YMCA Search Cross Component

# Dev - Test - Deploy

# Production Instructions

# Development

## Pre-requesites
- Download Git
  https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- Download Node/NPM
  https://nodejs.org/en/
- Install Gulp CLI
  https://gulpjs.com/
- Install Type Script
  https://www.typescriptlang.org/
- Install SCSS
  https://sass-lang.com/install

# Documentation

Intialize component with the following method:
ymcaSearchComponent.init(param1, param2, param3, param4);
Will fire off method:
    init: async function (filters, loggedIn, async, renderResultsNow)

### param1:
    - Type: Object
    - Example:
    let filters: {
        familyCenter: '',
        zipCode: '',
        program: '',
        dayOfTheWeek: '',
        times: ''
    }
    - Details:
    This parameter determines the filtering of the result of the programs search.

### param2:
    - Type: Boolean
    - Example: true, false
    - Details
    This paramter determines rendered configuration of the search component.
### param3:
    - Type: Boolean
    - Example: true,false
    -Details
    This parameter determines if the component will fire a page reload or return the result in a predetermined div.
### param4:
    - Type: Boolean
    - Example: true, false
    - Details
    This parameter determins if the component should render the results right away based on current configurations. 
#DEMO

## Install:

npm install http-server -g

## Run Command http-server in demo directory.

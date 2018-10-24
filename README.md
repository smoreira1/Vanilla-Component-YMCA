# YMCA Search Cross Component
## Development
### Pre-requesites
- Download Git
  https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- Download Node/NPM
  https://nodejs.org/en/
- Install Gulp CLI
  https://gulpjs.com/
- Install Type Script
  https://www.typescriptlang.org/ (Currently not in use, but will be used to ensure browser compatibility. )
- Install SCSS
  https://sass-lang.com/install (Current not in sure, but will be used to have a flexiable css infrastructure. )

## Production Instructions
Include the both .min file versions from the /dist folder in your project. (Excluding the debug file.)
Create two divs with the following id's: 
1: 'ymca-search-component'
2: 'ymca-search-results'

The first component will be the rendered search component box.
The second component will be the rendered results set from the search parameters. 

These are the only deployment dependencies; look at the documentation section to explore component behavior on your project. 

## Documentation
Intialize component with the following method:
ymcaSearchComponent.init(param1, param2, param3, param4, param5);
Will fire off method:
    init: async function (filters, loggedIn, async, renderResultsNow, apiPath)

### param1/filters:
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

### param2/loggedIn:
    - Type: Boolean
    - Example: true, false
    - Details
    This paramter determines rendered configuration of the search component.
### param3/async:
    - Type: Boolean
    - Example: true,false
    -Details
    This parameter determines if the component will fire a page reload or return the result in a predetermined div.
### param4/renderResultsNow:
    - Type: Boolean
    - Example: true, false
    - Details
    This parameter determins if the component should render the results right away based on current configurations. 
### param5/apiPath:
    - Type: String
    - Example: /mock 
    - Details
    Path of data source. 
#DEMO
## npm install http-server -g
## Run Command http-server in demo directory.

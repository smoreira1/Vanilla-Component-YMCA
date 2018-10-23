window.ymcaSearchComponent = {
    loggedIn: false,
    async: true,
    familyName: 'Not logged in.',
    filters: {
        familyCenter: '',
        zipCode: '32825',
        program: '',
        dayOfTheWeek: '',
        times: ''
    },
    familyCenters: [{
        value: 'family',
        name: 'family-center'
    }],
    programs: [{
        value: 'program',
        name: 'program'
    }],
    init: async function (loggedIn, familyCenter, program, async) {
            this.config(loggedIn, async);
            const programsReponse = await fetch('program.json' , {mode:'cors'});
            this.programs = programsReponse.json();
            const familyCentersResponse = await fetch('familyCenters.json' , {mode:'cors'});
            this.familyCenters = await familyCentersResponse;
            this.render();
        },
        config: function (loggedIn, async) {
            this.loggedIn = loggedIn;
            this.async = async;
        },
        render: function () {
            document.getElementById("ymca-search-component").innerHTML = `<div class='ymca-component-search'>
                    <div class='ymca-component-search-header'>Search Programs</div>
                    <div class="ymca-component-family-logged-in">Family: ${this.familyName}</div>
                        ${this.getFamilyCentersRendered()}
                        <input class="ymca-component-zipcode ymca-component-input" placeholder="ZIP Code" value='${this.filters.zipCode}'></input>
                        ${this.getProgramsRendered()}
                        <div class="ymca-component-search-button-container"><button class="ymca-component-search-button" onclick="ymcaSearchComponent.search()" type="button">Search</button></div>
                    </div>
                </div>`;
        },
        getSearchResultsRender: function () {
            return fetch('ymcaPrograms.json')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    return data.map(i => `<div class="ymca-search-result">
                                                <div class="ymca-search-result-title">${i.title}</div>
                                                <div class="ymca-search-result-body">
                                                    <div class="ymca-search-result-times">${i.times}</div>
                                                    <div class="ymca-search-result-details">${i.details}</div>
                                                    <div class="ymca-search-result-actions">
                                                        <a href="" class="details-action">Details</a>
                                                        <a href="" class="visit_action">Visit This Y</a>
                                                    </div>
                                                </div>
                                            </div>`).join('');
                });
        },
        getProgramsRendered: function () {
            const programOptions = this.programs.map(i => {
                if (this.filters.program === i.value) {
                    return `<option value='${i.value}' selected>${i.name}</option>`
                } else {
                    return `<option value='${i.value}'>${i.name}</option>`
                }
            }).join('');
            return `<select class='ymca-program-select ymca-component-select' name='ymca-programs'>${programOptions}</select>`;
        },
        getFamilyCentersRendered: function () {
            console.log(this.familyCenters);
            const familyCentersOptions = this.familyCenters.map(i => {
                if (this.filters.familyCenter === i.value) {
                    return `<option value='${i.value}' selected>${i.name}</option>`
                } else {
                    return `<option value='${i.value}'>${i.name}</option>`
                }
            }).join('');
            return `<select class='ymca-family-center-select ymca-component-select' name='ymca-family-center'>${familyCentersOptions}</select>`;
        },
        search: function () {
            if (this.async) {
                this.getSearchResultsRender().then((response) => {
                    document.getElementById("ymca-search-results").innerHTML = response;
                });
            } else {
                //Navigate to a specific url in the domain so the user can potentially see other data. 
                window.location.href = window.location.hostname;
            }
        }
}
window.ymcaSearchComponent = {
    loggedIn: false,
    async: true,
    renderResultsNow: false,
    familyName: 'Not logged in.',
    filters: {
        familyCenter: '',
        zipCode: '',
        program: '',
        dayOfTheWeek: '',
        times: ''
    },
    familyCenters: [],
    programs: [],
    init: async function (filters, loggedIn, async, renderResultsNow) {
            this.config(filters, loggedIn, async, renderResultsNow);
            //NOTE: FIX ME! THESE ASYNC CALLS DO NOT DEPEND ON EACH OTHER.
            this.programs = await fetch('programs.json' , {mode:'cors'}).then((response) => {
                return response.json();
            });
            this.familyCenters = await fetch('familyCenters.json' , {mode:'cors'}).then((response) => {
                return response.json();
            });
            this.render();
            if(this.renderResultsNow){
                this.search();
            }
        },
        config: function (filters, loggedIn, async, renderResultsNow) {
            this.filters.familyCenter = filters.familyCenter;
            this.filters.zipCode = filters.zipCode;
            this.filters.program = filters.program;
            this.filters.daysOfTheWeek = filters.daysOfTheWeek;
            this.filters.times = filters.times;
            this.loggedIn = loggedIn;
            this.async = async;
            this.renderResultsNow = renderResultsNow;
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
            return `<label for="programs">Programs</label><select class='ymca-program-select ymca-component-select' name='ymca-programs'>${programOptions}</select>`;
        },
        getFamilyCentersRendered: function () {
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
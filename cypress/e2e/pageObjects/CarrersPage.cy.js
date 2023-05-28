class CarrersPage {
    elements = {
        h_openpositions: () => cy.get(".title-container-default div"),
        sel_jobtype: () => cy.get(`[class="selection"]  [class="select2-selection__placeholder"]`),
        resultstitle: () => cy.get('.results-title '),
        resultjobitems: () => cy.get('.result-item'),
        viewjob:"View job"
    }

    initiate(){
        cy.invoke_browser()
        cy.accept_cookies()
        cy.popupclose()
        cy.title().should('eq', 'Career and Job openings - Userlane')
        }

    verifyCarrersPageLoaded(openposition, jointeam) {
        this.elements.h_openpositions().each(($el) => {
            if ($el.text() === openposition) {
                cy.wrap($el).siblings('h3').should('have.text', jointeam)
                cy.wrap($el).siblings('h3').scrollIntoView()
            } else {
                // do something else
            }
        })
    }

    selectLocation_jobtype(seldd_jobtypeval, jobtype, seldd_location, location) {
        this.elements.sel_jobtype().each(($el) => {
            console.log($el.text())
            if ($el.text() == seldd_jobtypeval) {
                cy.wrap($el).scrollIntoView().click();

                cy.get('.type li').each(($cel) => {
                    if ($cel.text() == jobtype) {
                        cy.wrap($cel).click();
                    }
                })

            }
            if ($el.text() == seldd_location) {
                cy.wrap($el).scrollIntoView().click();

                cy.get('.location li').each(($cel) => {
                    if ($cel.text() == location) {
                        cy.wrap($cel).click();
                    }
                })
            }

        })
    }


    verifyIsJobResultsdisplayed() {
        let _openings;
        this.elements.resultstitle().then((openings) => {
            if (openings.text().includes("open positions")) {
                const x = openings.text().split(" ");
                if (x[1] > "0") {
                    return x[1]
                }
            }
        })

    }


    SelectTheJobDisplayed(jobtype,jobtitle){
        let v =-1;
        this.elements.resultjobitems().parent(`[style=""]`).each((checkvisible,index) => {  
           // cy.wrap(checkvisible).then(($label) => {
            cy.wrap(checkvisible).then(($label) => {

              const id = $label.attr('style');
              if (!(id == 'display: none;')) {
                cy.wrap(checkvisible).find('.category').should("contain", jobtype);
                cy.wrap(checkvisible).find('.name').should("contain", jobtitle)
                cy.wrap(checkvisible).find('.text-right .value').should("contain", this.elements.viewjob).click();
                return false
            }
            })

          })
        
    }


}
module.exports = new CarrersPage();
/// <reference types="cypress" />

const { before, beforeEach } = require("mocha");
import CarrersPageCy from '../../pageObjects/CarrersPage.cy'
import applicationPageCy from '../../pageObjects/Applicationpg.cy'

describe('Apply for Job Automation Tester', () => {

  beforeEach(function () {

    cy.fixture('formdata').then(function (_formdata) {
      this._formdata = _formdata;
    });
    cy.fixture('pagehighligtsdata').then(function (pghighlights) {
      this.pghighlights = pghighlights;
    });
  })


  it('Submit job aplication with required fields', function () {

    cy.log("Initiate navigation to carrers page")
    CarrersPageCy.initiate();
    
    CarrersPageCy.verifyCarrersPageLoaded(
      this.pghighlights.openpositions,
      this.pghighlights.jointeam);

  cy.log(`"Select the location and position" :`+(this.pghighlights.jobdepartment) +
  (this.pghighlights.location))

    CarrersPageCy.selectLocation_jobtype(
      this.pghighlights.seldd_jobtype,
      this.pghighlights.jobdepartment,
      this.pghighlights.seldd_location,
      this.pghighlights.location

    );

    let jobdisplayed = CarrersPageCy.verifyIsJobResultsdisplayed()
    if (jobdisplayed > "0") {
      cy.log('displayed are the job results :' + (jobdisplayed))
    }


    CarrersPageCy.SelectTheJobDisplayed(
      this.pghighlights.jobdepartment,
      this.pghighlights._jd_jobtitle)

      cy.log(`form -  job title`+(this.pghighlights._jd_jobtitle))
      cy.log(`form - full name`+(this.pghighlights.fullname))
      cy.log(`form - email`+(this.pghighlights.email))
      cy.log(`form - phone`+(this.pghighlights.phone))
      cy.log(`form- expeted salary`+(this.pghighlights.expectedctc))


    applicationPageCy.startApplication_VeriifySubmitted(
      this.pghighlights._jd_jobtitle,
      this._formdata.fullname,
      this._formdata.email,
      this._formdata.phone,
      this._formdata.expectedctc,
      this._formdata.resumename,true
    )

  })

})
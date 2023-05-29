class applicationPg {
    elements = {
        header: () => cy.get(".posting-headline h2"),
        btn_apply: () => cy.get(`[data-qa="btn-apply-bottom"]`),
        txt_btnapply: "Apply for this job",
        applicationform: () => cy.get('#application-form'),
        resumebrowse: () => cy.get('input[type=file]'),
    }

    form_name() { return cy.get('[name="name"]') }
    form_email = () => cy.get('[name="email"]');
    form_phone = () => cy.get('[name="phone"]');
    form_ctc = () => cy.get('[class="card-field-input"]');
    btn_checkprivacy = () => cy.get('.application-question [type="checkbox"]');
    btn_submit = () => cy.get("#btn-submit")

    startApplication_VeriifySubmitted(jobtype, fullname, email, phone, ctc, resumename, submit) {
        const hits = [fullname, email, phone, ctc, resumename, submit];
        //  cy.intercept(
        //     {method:'GET',url:'https://jobs.lever.co/parseResume'},
        //     {StatusCode:200}).as(`resumeupload`);
        //cy.intercept({POST,Cypress.env('job_url')+``}).as("submitapplication");
        cy.origin('https://jobs.lever.co', { args: { hits } }, ({ hits }) => {

            cy.get(".cc-desktop .cc-dismiss").click({ force: true });
            cy.get(".posting-headline h2").should("contain.text", `Automation Test Engineer`);
            cy.get(`[data-qa="btn-apply-bottom"]`).should("have.text", "Apply for this job").click();
            cy.get('#application-form').should("be.visible")

            cy.get('[id="resume-upload-input"]').selectFile({
                contents: Cypress.Buffer.from('file contents'),
                fileName: hits[4],
                mimeType: 'text/pdf',
            })


            cy.get(".resume-upload-success .resume-upload-label").then(($issucess) => {
                if ($issucess.text() == "Success!") {
                    cy.log("sucess")
                }
            })

            cy.get('[name="name"]').type(hits[1])

            cy.get('[name="email"]').type(hits[1])
            cy.get('[name="phone"]').type(hits[2])
            cy.get('[class="card-field-input"]').type(hits[3])
            cy.get('.application-question [type="checkbox"]').check()
            cy.get("#btn-submit").click()

            if (hits[5] == true) {
                cy.get(`[id="application-form"] `).submit()
                cy.contains("✱ There was an error verifying your application. Please try again.").should("be.visible");
                cy.contains("Submit your application").should("be.visible");
            }
        })

    }

}


module.exports = new applicationPg();

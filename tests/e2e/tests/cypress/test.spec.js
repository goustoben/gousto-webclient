describe("Test", () => {
  it("Shows choose recipes", () => {
    cy.visit("/menu");
    cy.get("h1")
      .should("have.text", "Choose Recipes");
  })
})

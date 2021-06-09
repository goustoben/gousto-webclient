import { GoustoApi } from '../fixtures/api';

export class GoustoTestBot { 
    constructor (_selectors){
      this.selectors = _selectors;
      this.dataTestingSelectors = this.selectors.dataTesting
    }
    
    get api(){
      return GoustoApi
    }

    stubAllThirdParties() { return cy.stubAll3rdParties() }

    prepareForBrand(){
      this.api.brand.v1.theme.OK()
      this.api.brand.v1["menu-headers"].OK()
    }

    prepareForLoggedOutUser(){
      this.api.user.current.notFound()
      this.api.user.current.orders.notFound()
      this.api.user.current.projectedDeliveries.notFound()
    }

    confirmLocation(location) { return cy.location().its('pathname').should('eq', location) }

    dataTestingSelector(name) { return `[data-testing="${name}"]` }
  
    getByDataTestingAttribute(selector, opts){ return cy.get(this.dataTestingSelector(selector), opts) }

    getByDataTestingName(name, opts) { return this.getByDataTestingAttribute(this.dataTestingSelectors[name], opts) } 
  } 

import React, { createContext, useContext, useRef } from 'react'

/* eslint react/prop-types: 0 */

const ProductNavBarContext = createContext()
ProductNavBarContext.displayName = 'ProductNavBarContext'

const ProductNavBarProvider = ({ children }) => {
  const ref = useRef(null)

  return <ProductNavBarContext.Provider value={ref}>{children}</ProductNavBarContext.Provider>
}

const useProductNavBar = () => useContext(ProductNavBarContext)

export { ProductNavBarProvider, useProductNavBar }

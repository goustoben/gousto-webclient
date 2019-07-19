import React from 'react'
import { RecipeCard } from'./RecipeCard'

const recipes = [1,2,3]

const Cookbook = () => (
  <div>
    { recipes.map(() => (
      <RecipeCard />
    ))
    }
  </div>

)

export { Cookbook }

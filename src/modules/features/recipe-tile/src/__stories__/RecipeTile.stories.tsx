import { Meta } from "@storybook/react"
import React from 'react'

import { RecipeTile } from "../"

export default {
    component: RecipeTile,
    title: 'Components/RecipeTile',
} as Meta

export const RecipeTileExample: React.FC = () => <RecipeTile bool />

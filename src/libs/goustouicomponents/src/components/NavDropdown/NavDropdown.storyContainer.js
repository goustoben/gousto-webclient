import React from 'react'
import LinkTo from '@storybook/addon-links/react'
import { NavDropdown } from '.'

const routerOptions = [
  {
    value: 'ExpandableSection',
    text: 'ExpandableSection story',
  },
  {
    value: 'ExpandingText',
    text: 'ExpandingText story',
  },
  {
    value: 'ExtraInfo',
    text: 'ExpandingText story',
  },
]

// This is a sample render prop, not a component.
// eslint-disable-next-line react/prop-types
const renderRouterItem = ({ value, text }) => (
  <LinkTo kind={value} story={value}>
    {text}
  </LinkTo>
)

const plainOptions = [
  {
    value: 'https://gousto.co.uk',
    text: 'Gousto',
  },
  {
    value: 'https://en.wikipedia.org/',
    text: 'Wikipedia',
  },
]

// eslint-disable-next-line react/prop-types
const renderPlainItem = ({ value, text }) => <a href={value}>{text}</a>

export const NavDropdownStory = () => (
  <div>
    <h2>NavDropdown - Router links</h2>
    <h3>Desktop</h3>
    <NavDropdown
      placeholder="Navigate to..."
      options={routerOptions}
      isMobile={false}
      name="Navigate to..."
      renderItem={renderRouterItem}
    />
    <h3>Mobile</h3>
    <NavDropdown
      placeholder="Navigate to..."
      options={routerOptions}
      isMobile
      name="Navigate to..."
      renderItem={renderRouterItem}
    />
    <h2>NavDropdown - plain links</h2>
    <h3>Desktop</h3>
    <NavDropdown
      placeholder="Navigate to..."
      options={plainOptions}
      isMobile={false}
      name="Navigate to..."
      renderItem={renderPlainItem}
    />
    <h2>Nav Dropdown - plain links - mobile</h2>
    <h3>Mobile</h3>
    <NavDropdown
      placeholder="Navigate to..."
      options={plainOptions}
      isMobile
      name="Navigate to..."
      renderItem={renderPlainItem}
    />
  </div>
)

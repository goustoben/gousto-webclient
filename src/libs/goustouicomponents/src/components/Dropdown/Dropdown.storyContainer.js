import React from 'react'

import { Dropdown } from './Dropdown.logic'

const options = [
  {
    value: '1',
    text: 'First option',
  },
  {
    value: '2',
    text: 'Second option',
    disabled: true,
  },
  {
    value: '3',
    text: 'Third option',
  },
  {
    value: '4',
    text: 'Fourth option',
  },
  {
    value: '5',
    text: 'Fifth option',
  },
  {
    value: '6',
    text: 'Sixth option',
  },
  {
    value: '7',
    text: 'Seventh option',
  },
]

export const DropdownStory = () => {
  const [dropdownValue, setDropdownValue] = React.useState(null)

  return (
    <div>
      <h2>
        Value:
        {' '}
        {JSON.stringify(dropdownValue)}
      </h2>

      <h2>Desktop Dropdown</h2>
      <Dropdown
        value={dropdownValue}
        placeholder="Placeholder"
        options={options}
        onChange={setDropdownValue}
        name="Desktop Dropdown"
      />

      <br />

      <h2>Mobile Dropdown</h2>
      <p>Renders into a fullscreen Modal (use `Mobile` checkbox in Addons to view)</p>

      <Dropdown
        value={dropdownValue}
        placeholder="Placeholder"
        options={options}
        onChange={setDropdownValue}
        isMobile
        name="Mobile Dropdown"
      />
    </div>
  )
}

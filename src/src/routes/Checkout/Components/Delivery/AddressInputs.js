import React from 'react'
import TextInput from 'Form/Input'

const AddressInputs = ({ houseNoVal, streetVal, townVal, countyVal, onChangeHandler }) => (
	<div>
		<br />
		<div>
			<label>House number or name</label>
			<TextInput
			  autoFocus
			  name="houseNo"
			  color="gray"
			  textAlign="left"
			  type="text"
			  placeholder="House number or name"
			  required
			  onChange={houseNo => onChangeHandler({ houseNo })}
			  value={houseNoVal}
			  mask
			/>
		</div>
		<br />
		<div>
			<label>Street</label>
			<TextInput
			  name="street"
			  color="gray"
			  textAlign="left"
			  type="text"
			  placeholder="Enter Street name"
			  required
			  onChange={street => onChangeHandler({ street })}
			  value={streetVal}
			  mask
			/>
		</div>
		<br />
		<div>
			<label>Town</label>
			<TextInput
			  name="town"
			  color="gray"
			  textAlign="left"
			  type="text"
			  placeholder="Enter Town"
			  required
			  onChange={town => onChangeHandler({ town })}
			  value={townVal}
			  mask
			/>
		</div>
		<br />
		<div>
			<label>County</label>
			<TextInput
			  name="county"
			  color="gray"
			  textAlign="left"
			  type="text"
			  placeholder="Enter County"
			  required
			  onChange={county => onChangeHandler({ county })}
			  value={countyVal}
			  mask
			/>
		</div>
		<br />
	</div>
)

AddressInputs.propTypes = {
  houseNoVal: React.PropTypes.string,
  streetVal: React.PropTypes.string,
  townVal: React.PropTypes.string,
  countyVal: React.PropTypes.string,
  onChangeHandler: React.PropTypes.func,
}

AddressInputs.defaultProps = {
  houseNoVal: '',
  streetVal: '',
  townVal: '',
  countyVal: '',
  onChangeHandler: () => {},
}

export default AddressInputs

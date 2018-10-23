import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import css from './Nutrition.css'

const NutritionInfo = ({ perPortion, per100Grams, restrictedView, inset }) => (
	<div>
		<div className={classnames(css.header, inset && css.insetHeader)}>Nutritional information&#42;</div>
		<table className={classnames(css.table, inset && css.tableMargins)}>
			<thead>
				<tr className={css.tableBorder}>
					<th className={css.tablePadding}>Typical Values</th>
					<th className={css.tablePadding}>per 100g</th>
					{!restrictedView && <th className={css.tablePadding}>per portion</th>}
				</tr>
			</thead>
			<tbody>
				<tr className={css.tableBorder}>
					<td className={css.tablePadding}>Energy</td>
					<td className={css.tablePadding}>{Math.round(per100Grams.energyKj)} kJ<br />{Math.round(per100Grams.energyKcal)} kcal</td>
					{!restrictedView && <td className={css.tablePadding}>{Math.round(perPortion.energyKj)} kJ<br />{Math.round(perPortion.energyKcal)} kcal</td>}
				</tr>
				<tr className={css.tableBorder}>
					<td className={css.tablePadding}>Fat<br />of which saturates</td>
					<td className={css.tablePadding}>{per100Grams.fat.toFixed(1)} g<br />{per100Grams.fatSaturates.toFixed(1)} g</td>
					{!restrictedView && <td className={css.tablePadding}>{perPortion.fat.toFixed(1)} g<br />{perPortion.fatSaturates.toFixed(1)} g</td>}
				</tr>
				<tr className={css.tableBorder}>
					<td className={css.tablePadding}>Carbohydrate<br />of which sugars</td>
					<td className={css.tablePadding}>{per100Grams.carbs.toFixed(1)} g<br />{per100Grams.carbsSugars.toFixed(1)} g</td>
					{!restrictedView && <td className={css.tablePadding}>{perPortion.carbs.toFixed(1)} g<br />{perPortion.carbsSugars.toFixed(1)} g</td>}
				</tr>
				<tr className={css.tableBorder}>
					<td className={css.tablePadding}>Fibre</td>
					<td className={css.tablePadding}>{per100Grams.fibre.toFixed(1)} g</td>
					{!restrictedView && <td className={css.tablePadding}>{perPortion.fibre.toFixed(1)} g</td>}
				</tr>
				<tr className={css.tableBorder}>
					<td className={css.tablePadding}>Protein</td>
					<td className={css.tablePadding}>{per100Grams.protein.toFixed(1)} g</td>
					{!restrictedView && <td className={css.tablePadding}>{perPortion.protein.toFixed(1)} g</td>}
				</tr>
				<tr>
					<td className={css.tablePadding}>Salt</td>
					<td className={css.tablePadding}>{per100Grams.salt.toFixed(2)} g</td>
					{!restrictedView && <td className={css.tablePadding}>{perPortion.salt.toFixed(2)} g</td>}
				</tr>
			</tbody>
		</table>
		<div className={classnames(css.extraNutritionalInformation, inset && css.extraInfoMargins)}>
			<span>&#42;Gousto’s nutritional information only applies to ingredients supplied by Gousto. The cooking process and additional ingredients added at home (listed under “What you’ll need”) will affect total values.</span>
		</div>
	</div>
)

NutritionInfo.propTypes = {
	restrictedView: PropTypes.bool,
	inset: PropTypes.bool,
	per100Grams: PropTypes.shape({
		energyKj: PropTypes.number,
		energyKcal: PropTypes.number,
		fat: PropTypes.number,
		fatSaturates: PropTypes.number,
		carbs: PropTypes.number,
		carbsSugars: PropTypes.number,
		fibre: PropTypes.number,
		protein: PropTypes.number,
		salt: PropTypes.number,
	}).isRequired,
	perPortion: PropTypes.shape({
		energyKj: PropTypes.number,
		energyKcal: PropTypes.number,
		fat: PropTypes.number,
		fatSaturates: PropTypes.number,
		carbs: PropTypes.number,
		carbsSugars: PropTypes.number,
		fibre: PropTypes.number,
		protein: PropTypes.number,
		salt: PropTypes.number,
	}).isRequired,
}

NutritionInfo.defaultProps = {
	restrictedView: false,
	inset: true,
}

export default NutritionInfo

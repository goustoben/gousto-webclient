<div class="stock-info" data-recipe-id="{{{ $recipe['id'] }}}">
	<div style="display:none;" data-bind="visible: (soldOut({{{ $recipe['id'] }}}) && qtyInBasket({{{ $recipe['id'] }}}) == 0)" class="nostock">&nbsp;</div>
	<div style="display:none;" data-bind="visible: (soldOut({{{ $recipe['id'] }}}) && qtyInBasket({{{ $recipe['id'] }}}) == 0)" class="stocklabel soldout stockalert">Sold Out: try another<br/>delivery day?</div>
	<div style="display:none;" data-bind="visible: (numPortions() == 2 && stockCheck({{{ $recipe['id'] }}}, 'couple') < 10)" class="stocklabel stockalert">Only <span data-bind="text: stockCheck({{{ $recipe['id'] }}}, 'couple') - qtyInBasket({{{ $recipe['id']}}})"></span></div>
	<div style="display:none;" data-bind="visible: (numPortions() == 4 && stockCheck({{{ $recipe['id'] }}}, 'family') < 10)" class="stocklabel stockalert">Only <span data-bind="text: stockCheck({{{ $recipe['id'] }}}, 'family') - qtyInBasket({{{ $recipe['id']}}}) "></span></div>
</div>

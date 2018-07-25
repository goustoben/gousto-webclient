<button id="cancel-orders-button" class="gbtn-tertiary ladda-button" data-url="{{{ URL::route('user.cancel-pending-orders') }}}" data-style="slide-left">No, Cancel {{{ count($open_orders_data) > 1 ? 'these deliveries' : 'this delivery' }}}</button>
<button id="keep-orders-button" class="gbtn-secondary">Yes, Keep {{{ count($open_orders_data) > 1 ? 'these deliveries' : 'this delivery' }}}</button>

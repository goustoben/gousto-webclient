var paymentForm = function(paymentFormEl, payNowButton) {
    var _userId = '';
    var _token = '';
    var formUrl = '';

    function submitCardSuccess(response) {
        payNowButton.disable = false;
    }

    function submitCardError(error) {
        payNowButton.disable = false;
    }

    function submitCardStart(data) {
        window.Frames.addCardToken(paymentFormEl, data.cardToken);
        $.ajax({
            url: formUrl,
            type: 'POST',
            data: {
                is_default: true,
                type: 'card',
                card: {
                    _token: _token,
                    payment_provider: 'checkout',
                    card_token: data.cardToken,
                    active: true
                }
            },
            headers: {
                'Authorization': 'Bearer ' + _token
            },
            error: submitCardError,
            success: submitCardSuccess
        })
    }

    function onSubmitForm(event) {
        event.preventDefault();
        if (!_userId || !_token) {
            console.warn('[payment form]', 'user ID or token is not valid');
        }

        window.Frames.submitCard()
            .then(submitCardStart)
            .catch(submitCardError);
    }

    return {
        init: function (formConfig) {
            _userId = paymentFormEl.querySelector('input[name=_id]').value;
            _token = paymentFormEl.querySelector('input[name=_token]').value;
            formUrl = '[api_domain]/customers/v2/customers/' + _userId + '/payment_methods';

            paymentFormEl.removeEventListener('submit', onSubmitForm);

            var frameConfig = {
                publicKey: '[frameApiKey]',
                containerSelector: formConfig.containerSelector,
                style: formConfig.style,
                theme: formConfig.theme,
                localisation: formConfig.localisation,
                cardValidationChanged: function() {
                    // if all fields contain valid information, the Pay now
                    // button will be enabled and the form can be submitted
                    // payNowButton.disabled = !window.Frames.isCardValid();
                    // console.log(window.Frames.isCardValid(), payNowButton, paymentFormEl)
                  },
                  cardSubmitted: function() {
                    // payNowButton.disabled = true;
                    // display loader
                  }
            };

            window.Frames.init(frameConfig);
            paymentFormEl.addEventListener('submit', onSubmitForm);
        }
    }
};

var billingModal = function() {
    var sageForm = function() {
        $('#payment-form-sage').removeClass('hide');

        var form = $('#account-payment-method-form');
        form.submit(function(e){
            var postData = $(this).serializeArray();
            var formURL = $(this).attr("action");

            function fail(){
                var _companyTelephone = form[0].querySelector('input[name=_companyTelephone]').value;
                form.replaceWith(
                    '<div class="modal-body">' +
                        '<p>Unfortunately we have been unable to update your billing details.</p>' +
                        '<p>Please try again later or contact customer service on ' + _companyTelephone +' for assistance.</p>' +
                    '</div>'
                );
            }

            var l = Ladda.create($('#billing-submit-button').get(0));
            l.start();

            $.ajax({
                url: formURL,
                type: 'post',
                data: postData,
                success: function(response){
                    if(response.error){
                        fail();
                    } else if(response.MD !== undefined){
                        $('#account-payment-method-form div.form-group, #cards').hide();
                        $('#account-payment-method-form div.form-group:last').after(
                            '<iframe src="/3dsecure?MD=' + response.MD + '&ACSURL=' + response.ACSURL +
                            '&PAReq=' + response.PAReq + '&VendorTxCode=' + response.VendorTxCode +
                            '" id="3DIFrame" name="3DIFrame" width="100%" height="500" frameborder="0"></iframe>'
                        );
                    } else {
                        successMsg();
                    }
                    l.stop();
                },
                error: function(){
                    fail();
                    l.stop();
                }
            });
            e.preventDefault();
        });

        jQuery.validator.setDefaults({
            errorElement: 'div',
            success: 'valid'
        });

        form.validate({
            rules: {
                card_number: {
                    required: true,
                    creditcard: true
                },
                exp_mm: {
                    required:true,
                    digits:true
                },
                exp_yy: {
                    required:true,
                    digits:true
                },
                card_cvv2: {
                    minlength:3,
                    maxlength:3,
                    required:true
                }
            }
        });

        $('.validatebd').click(function(){
            $('#card_expires').val($('#exp_mm').val() + '/' + $('#exp_yy').val());
            if(form.valid()){
                form.submit();
            }
        });

        //Populate Expiration year input
        var select = $('.card-expiry-year');
        var year = new Date().getFullYear() - 2000;
        for (var i = 0; i < 30; i++) {
            select.append($("<option value='" + (i + year) + "' " + (i === 0 ? "" : "") + ">" + (i + year) + "</option>"));
        }
    };

    var checkoutForm = function() {
        $('#payment-form-checkout').removeClass('hide');

        var paymentFormEl = document.getElementById('payment-form-modal');
        var payNowButton = document.getElementById('pay-now-modal-button');
        var paymentFormStyle = window.paymentFormStyle;

        if (paymentFormEl && payNowButton) {
            var formConfig = {
                style: paymentFormStyle(),
                theme: 'standard',
                containerSelector: '.frames-container-modal',
                localisation: {
                    cardNumberPlaceholder: 'Card number'
                }
            };

            var currentPaymentForm = window.paymentForm(paymentFormEl, payNowButton);
            currentPaymentForm.init(formConfig);
        }
    };

    return {
        init: function() {
            var cookieList = cookiesToJs();
            var feature = JSON.parse(
                JSON.parse(cookieList.v1_goustoStateStore_features)
            );

            if (feature && feature.featureCheckout && feature.featureCheckout.value) {
                checkoutForm();
            } else {
                sageForm();
            }
        }
    };
};

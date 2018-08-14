var paymentFormStyle = function() {
    return {
        '.embedded .card-form .input-group .input-control': {
            fontSize: '14px'
        },
        '.embedded .card-form .input-group label.icon+*': {
            paddingLeft: '10px'
        },
        '.embedded .card-form .input-group': {
            borderRadius: '5px',
            border: '1px solid #d6d8da',
            margin: '5px 0'
        },
        /* focus */
        '.embedded .card-form .input-group.focus:not(.error)': {
            border: '1px solid green'
        },
        /* icons */
        '.embedded .card-form .input-group .icon': {
            display: 'none'
        },
        /* error */
        '.embedded .card-form .input-group.error': {
            border: '1px solid red',
            background: '#FBF4F4'
        },
        '.embedded .card-form .input-group.error .hint.error-message': {
            color: 'red'
        },
        '.embedded .card-form .input-group.error .hint-icon:hover': {
            color: 'red'
        },
        '.embedded .card-form .input-group.focus input': {
            color: '#333D49',
            borderColor: '#999ea3'
        },
        '.embedded .card-form .input-group.error input': {
            color: 'red'
        }
    };
};
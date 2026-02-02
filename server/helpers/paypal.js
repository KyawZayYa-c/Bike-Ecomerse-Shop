const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: 'AWiVt3PkESGYS8jzZjqeF8jIcUE-nHp1heulEZDkjPY-9hVMZlrSPPh_z_gmbeXtIa7MwS1HrckPg14M',
    client_secret: 'EFHe9AjczK7PiY4Fp_HjodnbGU2iinHFS2ibkJydxjDvkOR0v55TBUPRkFbJ9oq8pb-P1Vhl7IxNVIMA'
});

module.exports = paypal;
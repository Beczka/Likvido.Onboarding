const Validation = {};

Validation.validationEmail = (el) => {
    var regexp = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    return regexp.test(el);

};

Validation.validationPass = (el) => {
    return !!/^(?=.*\d)(?=.*[a-z])(?=(.*[a-z]){4}).{8,20}$/i.test(el);
}

Validation.validationDublPass = (pass, pass2) => {
    return pass === pass2;
}

Validation.validationName = (el) => {
    return el.length > 0;
}

Validation.validationCVR = (el) => {
    var regexp = /^[\S]{8,11}$/i
    return regexp.test(el);
}
Validation.validationZipcode = (el) => {
    var regexp = /^[0-9]{4}$/i
    return regexp.test(el);
}

export default Validation;
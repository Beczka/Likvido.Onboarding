const Validation = {};

Validation.validationEmail = (el) => {
    return /^(?!\.)(""([^""\r\\]|\\[""\r\\])*""|([-a-z0-9!#$%&'*+/=?^_`{|}~]|(?<!\.)\.)*)(?<!\.)@[a-z0-9][\w\.-]*[a-z0-9]\.[a-z][a-z\.]*[a-z]$/.test(el);

};

Validation.validationPass = (el) => {
    return !!/^(?=.*\d)(?=.*[a-z])(?=(.*[a-z]){4}).{8,20}$/.test(el);
}

Validation.validationDublPass = (pass, pass2) => {
    return pass === pass2;
}

Validation.validationName = (el) => {
    return el.length > 0;
}

Validation.validationCVR = (el) => {
    return /^[\S]{8,11}$/i.test(el);
}
Validation.validationZipcode = (el) => {
    return /^[0-9]{4}$/.test(el);
}

export default Validation;
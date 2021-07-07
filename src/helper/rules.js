import messages from './messages.js'

export default {
    CONFIRM_PASSWORD(password) {
        return v => {
            if (!v)
                return true
            if (v == password)
                return true

            return messages.PASSWORD_MATCH_ERROR;
        }
    },
    PASSWORD: [v => !!v || messages.PASSWORD_ERROR],
    MOBILE: [
        v => !!v || messages.MOBILE_NUMBER_ERROR,
        v => {
            if (!isNaN(parseFloat(v)) && v >= 5000000000 && v <= 999999999999) return true;
            return messages.INVALID_MOBILE_NUMBER_ERROR;
        }
    ],
    EMAIL: [
        v => !!v || messages.EMAIL_ERROR,
        v => /.+@.+\..+/.test(v) || messages.EMAIL_MUST_BE_VALID,
    ],
    REQUIRED_FIELD(field_name) {
        return v => {
            if (!v)
                return field_name + " can not be Empty";
            return true
        }
    },
    REQUIRED_NUMBER_FIELD(field_name) {
        return v => {
            if (!v)
                return field_name + " can not be Empty";
            if (!isNaN(parseFloat(v)) && v >= 1 && v <= 999999999999)
                return true;
            return field_name + " must be number";
        }
    },

}



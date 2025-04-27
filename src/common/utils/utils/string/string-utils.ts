import validator from "validator";
import {parsePhoneNumberWithError} from "libphonenumber-js";

export const extractPhone = (phone: string | undefined): { code: string, phone: string } | undefined => {
    if (!phone) {
        return undefined;

    }
    if (!validator.isMobilePhone(phone ,"any" , {strictMode: true})) {
        return undefined;
    }
    let k = parsePhoneNumberWithError(phone)!
    return {
        code: k.countryCallingCode,
        phone: k.nationalNumber,
    }
}
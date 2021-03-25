// for correct work form must have
// - class "al-form"
// - option with selected country in select name="country"
// - two text fields with name "name, phone"
// - button submit
// - if "settings" (fills below) hasn't "phonesCode" for country - this validation ignore

/**
 * @param  {Boolean} noCountryCode
 * noCountryCode - new property - from url GET params &no_code=true
 *  if no_code=true - phone field without country code and +
 * if nothing or no_code=false - phone field add country code automatically on focus event
 *
 * Example: "scripts/tl-validator.js?country=es&label=false&no_code=true"
 *
 * For IN country code always disabled
 */

(function (GlobalObj) {
    // data
    var settings = {
        // phone codes
        phonesCode: {
            AE: 971,
            AL: 355,
            AT: 43,
            BA: 387,
            ME: 382,
            BD: 880,
            BE: 32,
            BG: 359,
            CY: 357,
            CZ: 420,
            DE: 49,
            EE: 372,
            ES: 34,
            FI: 358,
            FR: 33,
            GR: 30,
            HR: 385,
            HU: 36,
            ID: 62,
            IN: 91,
            IT: 39,
            LT: 370,
            LV: 371,
            MA: 212,
            MY: 60,
            NG: 234,
            NL: 31,
            PH: 63,
            PL: 48,
            PT: 351,
            RO: 40,
            MD: 373,
            RS: 381,
            RU: 7,
            SI: 386,
            SK: 421,
            TH: 66,
            VN: 84,
            XK: 383,
            JO: 962,
            CI: 225,
            KH: 855,
            OM: 968,
            SG: 65,
            TR: 90,
            CO: 57,
            AR: 54,
            TW: 886,
            HK: 852,
            MK: 389,
            MX: 52,
            PE: 51,
            KE: 254,
            MM: 95,
            PK: 92,
            IR: 98,
            ZA: 27,
            LK: 94,
            IQ: 964,
            NP: 977,
            CL: 56,
            KW: 965,
            SA: 966,
            BH: 973,
            EG: 20,
        },

        // phone length
        phoneMinLength: 9,
        phoneMaxLength: 20,

        // allow btn codes
        allowedBtnCodes: [
            43,
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            45,
            32,
            40,
            41,
            229,
            8,
            13,
        ],

        // massages errors list
        massages: {
            EN: {
                fillName: "Enter your name",
                fillPhone: "Enter your number",
                incorrectPhone: "Error, incorrect number",
            },
            RU: {
                fillName: "Введите ФИО",
                fillPhone: "Введите номер",
                incorrectPhone: "Ошибка, некорректный номер",
            },
            ES: {
                fillName: "Introduzca su nombre comleto",
                fillPhone: "Introduzca su número de teléfono",
                incorrectPhone: "Error, el número de teléfono incorrecto",
            },
            FR: {
                fillName: "Entrez votre nom et prénom",
                fillPhone: "Entrez le numéro de téléphone",
                incorrectPhone: "Erreur, numéro incorrect",
            },
            IT: {
                fillName: "Inserire il nome ed il cognome",
                fillPhone: "Inserire il numero di telefono",
                incorrectPhone: "Errore, numero sbagliato",
            },
            PT: {
                fillName: "Introduza seu nome e sobrenome",
                fillPhone: "Introduza o número de telemovel",
                incorrectPhone: "Error, número incorrecto",
            },
            GR: {
                fillName: "Εισάγετε το όνομα και το επώνυμο",
                fillPhone: "Εισάγετε τον αριθμό τηλεφώνου",
                incorrectPhone: "Σφάλμα, λάθος νούμερο",
            },
            CY: {
                fillName: "Εισάγετε το όνομα και το επώνυμο",
                fillPhone: "Εισάγετε τον αριθμό τηλεφώνου",
                incorrectPhone: "Σφάλμα, λάθος νούμερο",
            },
            BG: {
                fillName: "Име",
                fillPhone: "Телефон номер",
                incorrectPhone: "Грешка, невалиден номер",
            },
            SI: {
                fillName: "Napišite svoje ime in priimek",
                fillPhone: "Napišite svojo telefonsko številko",
                incorrectPhone: "Napačna številka",
            },
            SK: {
                fillName: "Zadajte Meno a Priezvisko",
                fillPhone: "Zadajte telefónne číslo",
                incorrectPhone: "Chyba, zlé číslo",
            },
            CZ: {
                fillName: "Zadejte Jméno Příjmení",
                fillPhone: "Zadejte telefonní číslo",
                incorrectPhone: "Chyba, není platné číslo",
            },
            HU: {
                fillName: "Vezetéknév, keresztnév",
                fillPhone: "Telefon",
                incorrectPhone: "Hiba, helytelen számot adott meg",
            },
            RO: {
                fillName: "Nume de tip",
                fillPhone: "Introduceţi numărul de",
                incorrectPhone: "Număr de telefon greșit",
            },
            MD: {
                fillName: "Nume de tip",
                fillPhone: "Introduceţi numărul de",
                incorrectPhone: "Număr invalid eroare",
            },
            PL: {
                fillName: "Wpisz swoje imię i nazwisko",
                fillPhone: "Podaj swoj numer",
                incorrectPhone: "Błąd , nieprawidłowy numer",
            },
            DE: {
                fillName: "Geben Sie Ihren Namen ein",
                fillPhone: "Geben Sie Ihre Telefonnummer ein",
                incorrectPhone: "Eingabefehler, die Nummer ist inkorrekt",
                lessNineSymbols: "Eingabefehler, die Nummer ist inkorrekt",
            },
            AT: {
                fillName: "Geben Sie Ihren Namen ein",
                fillPhone: "Geben Sie Ihre Telefonnummer ein",
                incorrectPhone: "Eingabefehler, die Nummer ist inkorrekt",
                lessNineSymbols: "Eingabefehler, die Nummer ist inkorrekt",
            },
            MY: {
                fillName: "Masukkan Nama",
                fillPhone: "Masukkan nombor",
                incorrectPhone: "Ralat, nombor yang salah",
            },
            LT: {
                fillName: "Įveskite savo vardą",
                fillPhone: "Įveskite savo telefono numerį",
                incorrectPhone: "Klaidingas telefono numeris",
            },
            // Вьетнам
            VN: {
                fillName: "Nhập họ tên",
                fillPhone: "Nhập số điện thoại",
                incorrectPhone: "Lỗi, số điện thoại không đúng",
            },
            // Индия
            IN: {
                fillName: "नाम भरे",
                fillPhone: "आपका नम्बर",
                incorrectPhone: "ग़लत नम्बर",
            },
            // Хорватия
            HR: {
                fillName: "Upišite Ime i Prezime",
                fillPhone: "Upišite broj telefona",
                incorrectPhone: "Pogreška, nepravilan broj",
            },
            // Сербия
            RS: {
                fillName: "Unesite IME i PREZIME",
                fillPhone: "Unesite broj telefona",
                incorrectPhone: "Greška, nekorektan broj",
            },
            BA: {
                fillName: "Unesite IME i PREZIME",
                fillPhone: "Unesite broj telefona",
                incorrectPhone: "Greška, nekorektan broj",
            },
            ME: {
                fillName: "Unesite IME i PREZIME",
                fillPhone: "Unesite broj telefona",
                incorrectPhone: "Greška, nekorektan broj",
            },
            TH: {
                fillName: "ใส่ชื่อ",
                fillPhone: "ใส่เบอร์โทร",
                incorrectPhone: "Error, หมายเลขโทรศัพท์ไม่ถูกต้อง",
            },
            LV: {
                fillName: "Ievadiet jūsu vārdu",
                fillPhone: "Ievadiet jūsu numuru",
                incorrectPhone: "Kļūda, numurs norādīts nepareizi",
            },
            EE: {
                fillName: "Sisestage oma nimi",
                fillPhone: "Sisestage oma number",
                incorrectPhone: "Viga, vale number",
            },
            AL: {
                fillName: "Vendos emrin dhe mbiemrin",
                fillPhone: "Vendos numrin e telefonit",
                incorrectPhone: "Gabim, numri nuk është i saktë",
            },
            NL: {
                fillName: "Vul naam in",
                fillPhone: "Voer telefoonnummer in",
                incorrectPhone: "Foutmelding, nummer ongeldig",
            },
            FI: {
                fillName: "Saisimmeko nimenne",
                fillPhone: "Puhelinnumeronne",
                incorrectPhone: "Virhe, väärä numero",
            },
            KH: {
                fillName: "បញ្ចូលឈ្មោះរបស់អ្នក",
                fillPhone: "បញ្ចូលលេខទូរស័ព្ទរបស់អ្នក",
                incorrectPhone: "លេខទូរស័ព្ទមិនត្រឹមត្រូវ",
            },
            CO: {
                fillName: "Introduzca su nombre comleto",
                fillPhone: "Introduzca su número de teléfono",
                incorrectPhone: "Error, el número de teléfono incorrecto",
            },
            MK: {
                fillName: "Внесете ги името и презимето",
                fillPhone: "Внесете го бројот",
                incorrectPhone: "Грешка, погрешен број",
            },
            TR: {
                fillName: "Adınız ve soyadınız girin",
                fillPhone: "Numaranız girin",
                incorrectPhone: "Hata, geçersiz numara",
            },
            PE: {
                fillName: "Introduzca su nombre comleto",
                fillPhone: "Introduzca su número de teléfono",
                incorrectPhone: "Error, el número de teléfono incorrecto",
            },
            CL: {
                fillName: "Introduzca su nombre comleto",
                fillPhone: "Introduzca su número de teléfono",
                incorrectPhone: "Error, el número de teléfono incorrecto",
            },
        },
    };

    // Validator main
    function Validator(settings) {
        this.forms = [].slice.call(document.querySelectorAll(".al-form"));
        this.settings = settings || {};
        this.isLabel = this._getPerameterFromJSON("label") == "true";

        this.noCountryCode = this._getPerameterFromJSON("no_code") == "true";

        this.countriesWithoutPlus = ["OM"];

        var _this = this;
        setTimeout(function () {
            var _selectedCountryCode = _this._getCountry();
            _this._setCountrySettings(_selectedCountryCode);
        }, 300);

        this.isLang = this._getPerameterFromJSON("lang");
        if (!this.isLabel) {
            this.setRelativeForm(this.forms);
            this._setStylesTooltips();
        }

        this._addEvents();
        return this;
    }

    Validator.prototype.DEFAULT_SETTINGS = {
        phonesCode: "",
        isClicked: false,
        phoneMinLength: 9,
        phoneMaxLength: 18,
        allowedBtnCodes: [
            43,
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            45,
            32,
            40,
            41,
            229,
            8,
            13,
        ],
        massages: {
            fillName: "Enter your name",
            fillPhone: "Enter your number",
            incorrectPhone: "Error, incorrect number",
        },
    };
    Validator.prototype._getParamsFromScriptURL = function () {
        var index = 0;
        var paramsJSON = {};
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            var scriptSrc = scripts[i].getAttribute("src");
            if (scriptSrc && scriptSrc.indexOf("tl-validator") !== -1) {
                index = i;
            }
        }
        var validatorScript = scripts[index];
        var scriptURL = validatorScript.src;
        if (scriptURL.indexOf("?") !== -1) {
            var params = scriptURL.substring(scriptURL.indexOf("?") + 1);
            params.split("&").forEach(function (part) {
                var item = part.split("=");
                paramsJSON[item[0]] = decodeURIComponent(item[1]);
            });
        }
        return paramsJSON;
    };
    /**
     * Method for set special country parameters
     *
     * @param  {String} countryCode - country code in ISO 3166-1 alpha-2 format https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     */
    Validator.prototype._setCountrySettings = function (countryCode) {
        // Disable phone code for IN
        if (
            countryCode === "IN" ||
            countryCode === "PH" ||
            countryCode === "PE" ||
            countryCode === "AR" ||
            countryCode === "KE" ||
            countryCode === "LK" ||
            countryCode === "IQ" ||
            countryCode === "NP"
        ) {
            this.noCountryCode = true;
        } else {
            this.noCountryCode = false;
        }
    };

    Validator.prototype._getPerameterFromJSON = function (query) {
        var result = "";
        try {
            result = this._getParamsFromScriptURL()[query];
        } catch (error) {
            console.warn(error);
        }
        return result;
    };
    Validator.prototype._testCountryCode = function (countryCode) {
        if (
            countryCode.toUpperCase().match(/[A-Z]{2}/i)[0] in
            this.settings.phonesCode
        ) {
            return true;
        }
        console.log(
            "%cIncorrect country code! Can't get country " + countryCode + ".",
            "color: #004ff0; font-size: 20px; font-weight: bold;"
        );
        return false;
    };
    Validator.prototype._getCountry = function () {
        if (window.countryKey) {
            window.countryKey = window.countryKey.toUpperCase();
        }
        var countryCodeURL =
            window.countryKey || this._getPerameterFromJSON("country");
        if (countryCodeURL && this._testCountryCode(countryCodeURL)) {
            return countryCodeURL.toUpperCase().match(/[A-Z]{2}/i)[0];
        } else {
            if (this.forms[0].country) {
                var options = this.forms[0].country.options;
            } else {
                var options = this.forms[0].querySelector("select").options;
            }
            var optionsLength = options.length,
                i = void 0;
            for (i = 0; i < optionsLength; i++) {
                if (options[i].selected) {
                    var selectedCountryCode = options[i].value;
                }
                if (selectedCountryCode) {
                    return selectedCountryCode
                        .toString()
                        .toUpperCase()
                        .match(/[A-Z]{2}/i)[0];
                }
            }
        }
    };

    Validator.prototype._getProp = function (prop) {
        var countryCode = this._getCountry();
        if (this.isLang && prop == "massages") {
            return (
                this.settings[prop][this.isLang.toUpperCase()] ||
                this.DEFAULT_SETTINGS[prop]
            );
        }
        return this.settings[prop][countryCode] || this.DEFAULT_SETTINGS[prop];
    };

    Validator.prototype._clearPhone = function (phone) {
        return phone.replace(/[^\d]+/gi, "");
    };

    Validator.prototype._setStylesTooltips = function () {
        var styles = document.createElement("style");
        styles.innerHTML =
            '\
            .validator__tooltip { \
                position: absolute; \
                z-index: 700; \
                display: block; \
                font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif; \
                font-style: normal; \
                font-weight: 400; \
                letter-spacing: normal; \
                line-break: auto; \
                line-height: 1.5; \
                text-align: left; \
                text-align: start; \
                text-decoration: none; \
                text-shadow: none; \
                text-transform: none; \
                white-space: normal; \
                word-break: normal; \
                word-spacing: normal; \
                font-size: 14px; \
                word-wrap: break-word; \
                opacity: 1; \
                padding-bottom: 5px; \
                pointer-events: none \
            } \
            .input-wrapper .error+label {\
                pointer-events: none;\
            } \
            .validator__tooltip-inner { \
                max-width: 290px; \
                padding: 3px 8px; \
                color: #fff; \
                text-align: center; \
                background-color: #cd5b20; \
                border-radius: 4px; \
            } \
            .validator__tooltip-inner::before { \
                position: absolute; \
                width: 0; \
                height: 0; \
                border-color: transparent; \
                border-style: solid; \
                bottom: 1px; \
                left: 50%; \
                margin-left: -5px; \
                content: ""; \
                border-width: 5px 5px 0; \
                border-top-color: #cd5b20; \
            }';
        document.body.appendChild(styles);
    };

    Validator.prototype._getCoords = function (elem) {
        var box = elem.getBoundingClientRect(),
            body = document.body,
            docEl = document.documentElement,
            scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft,
            clientTop = docEl.clientTop || body.clientTop || 0,
            clientLeft = docEl.clientLeft || body.clientLeft || 0;
        return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft,
        };
    };

    Validator.prototype.insertBefore = function (el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode);
    };

    Validator.prototype.setRelativeForm = function (forms) {
        for (var i = 0; i < forms.length; i++) {
            var currPosition = window
                .getComputedStyle(forms[i], null)
                .getPropertyValue("position");
            if (currPosition == "static") {
                forms[i].style.position = "relative";
            }
        }
    };

    Validator.prototype._createErrorMassage = function (element, massage) {
        this._removeState(element);
        if (element.classList) element.classList.add("error");
        else element.className += " " + "error";
        if (this.isLabel) {
            var elId = element.id;
            if (elId) var label = document.querySelector("[for=" + elId + "]");
            if (label) label.innerText = massage;
        } else {
            var errorMassage = document.createElement("div");
            errorMassage.className = "validator__tooltip";
            errorMassage.innerHTML =
                '<div class="validator__tooltip-inner">' + massage + "</div>";
            this.insertBefore(errorMassage, element);
            errorMassage.setAttribute(
                "style",
                "left:50%; margin-top: -" +
                errorMassage.clientHeight +
                "px; margin-left: -" +
                errorMassage.clientWidth / 2 +
                "px;"
            );
        }
    };

    Validator.prototype._removeState = function (element) {
        if (element.classList) {
            element.classList.remove("error");
            element.classList.remove("success");
        } else {
            element.className = errorFields[i].className.replace(
                new RegExp("(^|\\b)" + "(error|success)" + "(\\b|$)", "gi"),
                " "
            );
        }
        if (!this.isLabel) {
            var errorTooltip = element.parentNode.querySelector(
                ".validator__tooltip"
            );
            if (errorTooltip) {
                errorTooltip.parentNode.removeChild(errorTooltip);
            }
        }
    };

    Validator.prototype._success = function (element) {
        this._removeState(element);
        if (element.classList) element.classList.add("success");
    };

    Validator.prototype._validate = function (form, element) {
        this.massages = this._getProp("massages");
        this.phonesCode = this._getProp("phonesCode");

        this.phoneMinLength =
            this.settings.phoneMinLength || this.DEFAULT_SETTINGS.phoneMinLength;
        this.phoneMaxLength =
            this.settings.phoneMaxLength || this.DEFAULT_SETTINGS.phoneMaxLength;

        var elementName = void 0;
        if (element) {
            elementName = element.name;
        } else {
            elementName = "all";
        }

        var valid = true;

        // validate name
        if (form.name && (elementName == "name" || elementName == "all")) {
            if (
                form.name.value === null ||
                form.name.value == "" ||
                form.name.value.length < 3 ||
                form.name.value === undefined
            ) {
                this._createErrorMassage(form.name, this.massages.fillName);
                valid = false;
            } else {
                this._success(form.name);
            }
        }
        // validate phone
        if (form.phone && (elementName == "phone" || elementName == "all")) {
            var clearTel = this._clearPhone(form.phone.value),
                phoneCodeRegEx = new RegExp("^(00)?" + this.phonesCode, "i");
            var geo = this._getCountry();

            if (
                clearTel === null ||
                form.phone.value == "" ||
                clearTel === undefined
            ) {
                this._createErrorMassage(form.phone, this.massages.fillPhone);
                valid = false;
            } else if (
                (clearTel == "" && form.phone.value.length > 0) ||
                (!this.noCountryCode && clearTel.search(phoneCodeRegEx) == -1)
            ) {
                this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                valid = false;
            } else if (geo == "DE") {
                var phoneRegExForDE = new RegExp(
                    "^(00)?" + this.phonesCode + "0+",
                    "i"
                );
                if (clearTel.search(phoneRegExForDE) > -1) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else if (clearTel.length < this.phoneMinLength) {
                    this._createErrorMassage(form.phone, this.massages.lessNineSymbols);
                    valid = false;
                } else if (clearTel.length > this.phoneMaxLength) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "FR" || geo == "ZA") {
                var phoneRegExForFR = new RegExp(
                    "^(00)?" + this.phonesCode + "\\d{9}$",
                    "i"
                );
                if (clearTel.search(phoneRegExForFR) == -1) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "ES" || geo == "IT") {
                if (clearTel.length < 7 || clearTel.length > this.phoneMaxLength) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "IN") {
                if (clearTel.length !== 10) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "MD") {
                if (clearTel.length !== 11) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "PH") {
                var phoneRegExForPH = new RegExp(
                    "^(" + this.phonesCode + ")?\\d{10,15}$",
                    "i"
                );
                if (clearTel.search(phoneRegExForPH) == -1) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "JO") {
                if (clearTel.length < 11 || clearTel.length > 15) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "ID") {
                if (clearTel.length < 8 || clearTel.length > 14) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "OM" || geo == "KW" || geo == "BH") {
                if (clearTel.length < 11 || clearTel.length > 18) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "SA") {
                if (clearTel.length < 12 || clearTel.length > 18) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "TR") {
                if (clearTel.length < 11 || clearTel.length > 13) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "MA") {
                var phoneRegExForMA = new RegExp(
                    "^(" + this.phonesCode + ")?\\d{10}$",
                    "i"
                );
                if (clearTel.search(phoneRegExForMA) == -1) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "CO") {
                if (clearTel.length < 10 || clearTel.length > 13) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "AR") {
                var phoneRegExForAR = [];
                phoneRegExForAR.push(new RegExp("^[^0\\D]\\d{9}$", "i"));
                phoneRegExForAR.push(new RegExp("^(?!15)\\d{10}$", "i"));
                if (
                    clearTel.search(phoneRegExForAR[0]) == -1 ||
                    clearTel.search(phoneRegExForAR[1]) == -1
                ) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "HK") {
                if (clearTel.length < 11 || clearTel.length > 15) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "MK") {
                if (clearTel.length < 11 || clearTel.length > 12) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "PE") {
                if (clearTel.length < 8 || clearTel.length > 11) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "CL") {
                if (clearTel.length !== 11) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "KE") {
                var phoneRegExForKE = new RegExp(
                    "^(" + this.phonesCode + "0)?\\d{9,15}$",
                    "i"
                );
                if (clearTel.search(phoneRegExForKE) == -1) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "MM") {
                var phoneRegExForMM = new RegExp(
                    "^(00)?" + this.phonesCode + "\\d{10,13}$",
                    "i"
                );
                if (clearTel.search(phoneRegExForMM) == -1) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "PK" || geo == "IR") {
                var phoneRegExForPK = new RegExp(
                    "^(00)?" + this.phonesCode + "\\d{10}$",
                    "i"
                );
                if (clearTel.search(phoneRegExForPK) == -1) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "LK") {
                var phoneRegExForLK = new RegExp("^7\\d{8}$", "i");
                if (clearTel.search(phoneRegExForLK) == -1) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "IQ") {
                var phoneRegExForIQ = new RegExp("^7\\d{9}$", "i");
                if (clearTel.search(phoneRegExForIQ) == -1) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (geo == "NP") {
                var phoneRegExForNP = new RegExp("^98\\d{8}$", "i");
                if (clearTel.search(phoneRegExForNP) == -1) {
                    this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                    valid = false;
                } else {
                    this._success(form.phone);
                }
            } else if (
                clearTel.length < this.phoneMinLength ||
                clearTel.length > this.phoneMaxLength
            ) {
                this._createErrorMassage(form.phone, this.massages.incorrectPhone);
                valid = false;
            } else {
                this._success(form.phone);
            }
        }

        // if something isn't valid
        if (!valid) {
            return false;
        }
        // if all valid
        else {
            return true;
        }
    };
    Validator.prototype._moveCursorToEnd = function (nodeElement) {
        if (typeof nodeElement.selectionStart == "number") {
            nodeElement.selectionStart = nodeElement.selectionEnd =
                nodeElement.value.length;
        } else if (typeof nodeElement.createTextRange != "undefined") {
            nodeElement.focus();
            var range = nodeElement.createTextRange();
            range.collapse(false);
            range.select();
        }
    };
    Validator.prototype._addEvents = function () {
        var _this = this,
            formLength = this.forms.length,
            i = void 0,
            currenCountryCode = _this._getCountry(),
            currentPhoneCode = _this._getProp("phonesCode");
        _this._setCountrySettings(currenCountryCode);

        for (i = 0; i < formLength; i++) {
            var form = this.forms[i],
                elementsLength = form.elements.length,
                j;

            for (j = 0; j < elementsLength; j++) {
                if (
                    form.elements[j].getAttribute("type") == "button" ||
                    form.elements[j].getAttribute("type") == "submit" ||
                    form.elements[j].tagName == "BUTTON"
                ) {
                    form.elements[j].addEventListener("click", function (event) {
                        var valid = _this._validate(this.form);
                        if (valid) {
                            currenCountryCode = _this._getCountry();
                            _this._setCountrySettings(currenCountryCode);
                            var phoneVal = this.form.phone.value;
                            phoneVal = _this._clearPhone(phoneVal);

                            //PH special
                            if (currenCountryCode === "PH") {
                                phoneVal = "63" + phoneVal.replace(/^63(\d{10,15})/, "$1");
                            }
                            //KE special
                            if (currenCountryCode === "KE") {
                                phoneVal = "2540" + phoneVal.replace(/^2540?(\d{9,15})/, "$1");
                            }

                            //return back phone val
                            this.form.phone.value = phoneVal;
                            return;
                        } else {
                            event.preventDefault();
                        }
                    });
                }
            }

            if (form.name) {
                form.name.addEventListener("blur", function () {
                    _this._validate(this.form, this);
                });
            }

            if (form.phone) {
                form.phone.addEventListener("focus", function () {
                    currenCountryCode = _this._getCountry();
                    currentPhoneCode = _this._getProp("phonesCode");
                    _this._setCountrySettings(currenCountryCode);
                    if (!this.value) {
                        // noCountryCode - phone number without +XXX
                        if (!_this.noCountryCode) {
                            if (
                                _this.countriesWithoutPlus.indexOf(currenCountryCode) === -1
                            ) {
                                this.value = "+";
                            }
                            this.value += currentPhoneCode;
                        }
                        _this.isClicked = false;
                        if (currenCountryCode == "LK") {
                            this.value = "7";
                        }
                        if (currenCountryCode == "IQ") {
                            this.value = "7";
                        }
                        if (currenCountryCode == "NP") {
                            this.value += "98";
                        }
                    }
                });

                form.phone.addEventListener("click", function () {
                    if (!_this.isClicked) {
                        _this._moveCursorToEnd(this);
                        _this.isClicked = true;
                    }
                });

                form.phone.addEventListener("blur", function () {
                    _this._validate(this.form, this);
                });

                // not for android chrome
                form.phone.addEventListener("keypress", function (event) {
                    if (_this.settings.allowedBtnCodes.indexOf(event.which) < 0) {
                        event.preventDefault();
                        return false;
                    }
                });

                form.phone.addEventListener("keyup", function (event) {
                    if (/[^\+\d]+/g.test(this.value)) {
                        this.value = this.value.replace(/[^\+\d]+/, "");
                    }
                });

                form.phone.addEventListener("input", function (event) {
                    if (currenCountryCode == "AR") {
                        var clearTel = _this._clearPhone(this.value);
                        var phoneRegExForAR = new RegExp("^(0|15)", "i");
                        if (clearTel.search(phoneRegExForAR) != -1) {
                            this.value = "";
                        }
                    } else if (currenCountryCode == "PK" || currenCountryCode == "IR") {
                        this.value = this.value.replace(
                            new RegExp("^((00)?(\\+)?" + currentPhoneCode + ")0", "gi"),
                            "$1"
                        );
                    } else if (currenCountryCode == "LK") {
                        var clearTel = _this._clearPhone(this.value);
                        var phoneRegExForLK = new RegExp("^[^7]", "gi");
                        if (!clearTel || clearTel.search(phoneRegExForLK) != -1) {
                            this.value = "7";
                        }
                    } else if (currenCountryCode == "IQ") {
                        var clearTel = _this._clearPhone(this.value);
                        var phoneRegExForIQ = new RegExp("^[^7]", "gi");
                        if (!clearTel || clearTel.search(phoneRegExForIQ) != -1) {
                            this.value = "7";
                        }
                    } else if (currenCountryCode == "NP") {
                        var clearTel = _this._clearPhone(this.value);
                        var phoneRegExForNP = new RegExp("^98", "gi");
                        if (!clearTel || clearTel.search(phoneRegExForNP) == -1) {
                            this.value = "98";
                        }
                    }
                });
            }

            if (form.country) {
                form.country.addEventListener("change", function () {
                    for (var k = 0; k < formLength; k++) {
                        _this.forms[k].country.selectedIndex = this.selectedIndex;
                        _this.forms[k].phone.value = "";
                    }
                });
            }
        }
    };

    GlobalObj.addEventListener("DOMContentLoaded", function () {
        new Validator(settings);
    });
})(window);
'use strict';

const Alexa = require('alexa-sdk');
const D = "----------";

const APP_ID = "amzn1.ask.skill.9fa2bb31-c881-4a4f-9dfe-491b382e7519";  // TODO replace with your app ID (OPTIONAL).

const handlers = {
     "LaunchRequest": function() {
        console.log(D + "LAUNCHREQUEST");
        this.emit(":ask", "LaunchRequest");
     },
     "ElementIntent": function() {
         console.log("this.event.request.intent.slots = " + JSON.stringify(this.event.request));
         writeSlots(this.event.request.intent.slots);
        var requestedElement = this.event.request.intent.slots.element.value;
        console.log(D + "DescribeElement.  STATE == DESCRIBE.  Requested Element: " + requestedElement);
        var elementArray = this.t("ELEMENTS");
        console.log(D + "elementArray == " + elementArray);
        var element = elementArray.filter(x => x.name.toLowerCase() === requestedElement);
        console.log(D + "element == " + element);
        console.log(D + "element.length == " + element.length);
        if (element.length === 0)
        {
            console.log(D + "DID NOT FIND AN ELEMENT MATCH.")
        }
        console.log(D + "element[0].symbol == " + element[0].symbol);
        this.emit(":tell", element[0].symbol);
    },
    "SymbolIntent": function() {
        var letter1 = this.event.request.intent.slots.letterone.value;
        console.log("LETTER ONE == " + letter1);

        var elementArray = this.t("ELEMENTS");
        console.log(D + "elementArray == " + elementArray);
        var element = elementArray.filter(x => x.symbol.toLowerCase() === letter1.toLowerCase());
        this.emit(":tell", element[0].name);
        /*
        var letter2 = this.event.request.intent.slots.lettertwo.value;
        console.log("LETTERTWO == " + letter2);
        var letter3 = this.event.request.intent.slots.letterthree.value;
        console.log("LETTER THREE == " + letter3);
        this.emit(":tell", "Letters were <say-as interpret-as='spell-out'>" + letter1 + letter2 + letter3 + "</say-as>");
        */
    },
    "Unhandled": function() {
        console.log(D + "UNHANDLED!");
        this.emit(":tell", "UNHANDLED!");
    }
};


exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.AppId = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function writeSlots(slots)
{
    console.log(D + "BEGIN WRITING SLOTS.");
    for (var slot in slots)
    {
        console.log(D + slot);
        var slotName=slots[slot].name;
        var slotValue=slots[slot].value;
        //console.log(key + ' : ' + data[key]);
        console.log(D + slot + ' > ' + slotName + ' > '+ slotValue);
    }
    console.log(D + "DONE WRITING SLOTS.")
}

function getRandom(number)
{
    return Math.floor(Math.random() * number);
}

function getRandomSymbolSpeech(symbol)
{
    return "<say-as interpret-as='spell-out'>" + symbol + "</say-as>";
}

var languageStrings = {
    "en-GB": {
        "translation": {
        }
    },
    "en-US": {
        "translation": {
            "ELEMENTS": [           {"number": 1,  "name": "Hydrogen",   "symbol": "H",   "weight": 1.008,  "type": "Nonmetal"},
                                    {"number": 2,  "name": "Helium",     "symbol": "He",  "weight": 4.003,  "type": "Noble Gas"},
                                    {"number": 3,  "name": "Lithium",    "symbol": "Li",  "weight": 6.94,   "type": "Alkali Metal"},
                                    {"number": 4,  "name": "Beryllium",  "symbol": "Be",  "weight": 9.012,  "type": "Alkaline Earth Metal"},
                                    {"number": 5,  "name": "Boron",      "symbol": "B",   "weight": 10.81,  "type": "Metalloid"},
                                    {"number": 6,  "name": "Carbon",     "symbol": "C",   "weight": 12.011, "type": "Nonmetal"},
                                    {"number": 7,  "name": "Nitrogen",   "symbol": "N",   "weight": 14.007, "type": "Nonmetal"},
                                    {"number": 8,  "name": "Oxygen",     "symbol": "O",   "weight": 15.999, "type": "Nonmetal"},
                                    {"number": 9,  "name": "Fluorine",   "symbol": "F",   "weight": 18.998, "type": "Halogen"},
                                    {"number": 10, "name": "Neon",       "symbol": "Ne",  "weight": 20.180, "type": "Noble Gas"},
                                    {"number": 11, "name": "Sodium",     "symbol": "Na",  "weight": 22.990, "type": "Alkali Metal"},
                                    {"number": 12, "name": "Magnesium",  "symbol": "Mg",  "weight": 24.305, "type": "Alkaline Earth Metal"},
                                    {"number": 13, "name": "Aluminum",   "symbol": "Al",  "weight": 26.982, "type": "Post-transition Metal"},
                                    {"number": 14, "name": "Silicon",    "symbol": "Si",  "weight": 28.085, "type": "Metalloid"},
                                    {"number": 15, "name": "Phosphorus", "symbol": "P",   "weight": 30.974, "type": "Nonmetal", "misspelling": "Phosphorous"},
                                    {"number": 16, "name": "Sulfur",     "symbol": "S",   "weight": 32.06,  "type": "Nonmetal"},
                                    {"number": 17, "name": "Chlorine",   "symbol": "Cl",  "weight": 35.45,  "type": "Halogen"},
                                    {"number": 18, "name": "Argon",      "symbol": "Ar",  "weight": 39.948, "type": "Noble Gas"},
                                    {"number": 19, "name": "Potassium",  "symbol": "K",   "weight": 39.098, "type": "Alkali Metal"},
                                    {"number": 20, "name": "Calcium",    "symbol": "Ca",  "weight": 40.078, "type": "Alkaline Earth Metal"},
                                    {"number": 21, "name": "Scandium",   "symbol": "Sc",  "weight": 44.956, "type": "Transition Metal"},
                                    {"number": 22, "name": "Titanium",   "symbol": "Ti",  "weight": 47.867, "type": "Transition Metal"},
                                    {"number": 23, "name": "Vanadium",   "symbol": "V",   "weight": 50.942, "type": "Transition Metal"},
                                    {"number": 24, "name": "Chromium",   "symbol": "Cr",  "weight": 51.996, "type": "Transition Metal"},
                                    {"number": 25, "name": "Manganese",  "symbol": "Mn",  "weight": 54.938, "type": "Transition Metal"},
                                    {"number": 26, "name": "Iron",       "symbol": "Fe",  "weight": 55.845, "type": "Transition Metal"},
                                    {"number": 27, "name": "Cobalt",     "symbol": "Co",  "weight": 58.933, "type": "Transition Metal"},
                                    {"number": 28, "name": "Nickel",     "symbol": "Ni",  "weight": 58.693, "type": "Transition Metal"},
                                    {"number": 29, "name": "Copper",     "symbol": "Cu",  "weight": 63.546, "type": "Transition Metal"},
                                    {"number": 30, "name": "Zinc",       "symbol": "Zn",  "weight": 65.38,  "type": "Transition Metal"},
                                    {"number": 31, "name": "Gallium",    "symbol": "Ga",  "weight": 69.723, "type": "Post-transition Metal"},
                                    {"number": 32, "name": "Germanium",  "symbol": "Ge",  "weight": 72.63,  "type": "Metalloid"},
                                    {"number": 33, "name": "Arsenic",    "symbol": "As",  "weight": 74.922, "type": "Metalloid"},
                                    {"number": 34, "name": "Selenium",   "symbol": "Se",  "weight": 78.96,  "type": "Nonmetal"},
                                    {"number": 35, "name": "Bromine",    "symbol": "Br",  "weight": 79.904, "type": "Halogen"},
                                    {"number": 36, "name": "Krypton",    "symbol": "Kr",  "weight": 83.978, "type": "Noble Gas"}
                                    ],

            "STOP_MESSAGE" :           "Goodbye!  Let's do this again sometime!",
            "APP_GOODBYE" : [           "Thanks for using Send To Friend! Goodbye!"]
        }
    },
    "de-DE": {
        "translation": {
            
        }
    }
};


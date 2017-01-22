'use strict';

const Alexa = require('alexa-sdk');
const D = "----------";

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
     "LaunchRequest": function() {
        console.log(D + "LAUNCHREQUEST");
        this.emit(":ask", "LaunchRequest");
     },
     "StateNameIntent": function() {
        console.log(D + "STATE NAME INTENT");

        var requestedState = this.event.request.intent.slots.state_name.value;
        console.log(D + "Requested State: " + requestedState);

        var stateArray = this.t("STATES");
        console.log(D + "stateArray == " + stateArray);

        var state = stateArray.filter(x => x.name.toLowerCase() === requestedState.toLowerCase());
        console.log(D + "STATE == " + state);
        console.log(D + "state.length == " + state.length);

        console.log(D + "state[0].abbreviation == " + state[0].abbreviation);
        this.emit(":tell", "<say-as interpret-as='spell-out'>" + state[0].abbreviation + "</say-as>");
    },
    "StateAbbrIntent": function() {
        console.log(D + "STATE ABBREVIATION INTENT");

        var requestedState = this.event.request.intent.slots.state_abbr.value;
        console.log(D + "Requested State: " + requestedState);

        var stateArray = this.t("STATES");
        console.log(D + "stateArray == " + stateArray);

        var state = stateArray.filter(x => x.abbreviation.toLowerCase() === requestedState.toLowerCase());
        console.log(D + "STATE == " + state);
        console.log(D + "state.length == " + state.length);

        console.log(D + "state[0].name == " + state[0].name);
        this.emit(":tell", state[0].name);
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
            "STATES": [
                {"name": "Alabama",        "abbreviation": "AL", "capital": "Montgomery",     "statehood_year": 1819, statehood_order: 22 },
                {"name": "Alaska",         "abbreviation": "AK", "capital": "Juneau",         "statehood_year": 1959, statehood_order: 49 },
                {"name": "Arizona",        "abbreviation": "AZ", "capital": "Phoenix",        "statehood_year": 1912, statehood_order: 48 },
                {"name": "Arkansas",       "abbreviation": "AR", "capital": "Little Rock",    "statehood_year": 1836, statehood_order: 48 },
                {"name": "California",     "abbreviation": "CA", "capital": "California",     "statehood_year": 1850, statehood_order: 48 },
                {"name": "Colorado",       "abbreviation": "CO", "capital": "Denver",         "statehood_year": 1876, statehood_order: 48 },
                {"name": "Connecticut",    "abbreviation": "CT", "capital": "Hartford",       "statehood_year": 1788, statehood_order: 48 },
                {"name": "Delaware",       "abbreviation": "DE", "capital": "Dover",          "statehood_year": 1787, statehood_order: 48 },
                {"name": "Florida",        "abbreviation": "FL", "capital": "Tallahassee",    "statehood_year": 1845, statehood_order: 48 },
                {"name": "Georgia",        "abbreviation": "GA", "capital": "Atlanta",        "statehood_year": 1788, statehood_order: 48 },
                {"name": "Hawaii",         "abbreviation": "HI", "capital": "Honolulu",       "statehood_year": 1959, statehood_order: 48 },
                {"name": "Idaho",          "abbreviation": "ID", "capital": "Boise",          "statehood_year": 1890, statehood_order: 48 },
                {"name": "Illinois",       "abbreviation": "IL", "capital": "Springfield",    "statehood_year": 1818, statehood_order: 48 },
                {"name": "Indiana",        "abbreviation": "IN", "capital": "Indianapolis",   "statehood_year": 1816, statehood_order: 48 },
                {"name": "Iowa",           "abbreviation": "IA", "capital": "Des Moines",     "statehood_year": 1846, statehood_order: 48 },
                {"name": "Kansas",         "abbreviation": "KS", "capital": "Topeka",         "statehood_year": 1861, statehood_order: 48 },
                {"name": "Kentucky",       "abbreviation": "KY", "capital": "Frankfort",      "statehood_year": 1792, statehood_order: 48 },
                {"name": "Louisiana",      "abbreviation": "LA", "capital": "Baton Rouge",    "statehood_year": 1812, statehood_order: 48 },
                {"name": "Maine",          "abbreviation": "ME", "capital": "Augusta",        "statehood_year": 1820, statehood_order: 48 },
                {"name": "Maryland",       "abbreviation": "MD", "capital": "Annapolis",      "statehood_year": 1788, statehood_order: 48 },
                {"name": "Massachusetts",  "abbreviation": "MA", "capital": "Boston",         "statehood_year": 1788, statehood_order: 48 },
                {"name": "Michigan",       "abbreviation": "MI", "capital": "Lansing",        "statehood_year": 1837, statehood_order: 48 },
                {"name": "Minnesota",      "abbreviation": "MN", "capital": "St. Paul",       "statehood_year": 1858, statehood_order: 48 },
                {"name": "Mississippi",    "abbreviation": "MS", "capital": "Jackson",        "statehood_year": 1817, statehood_order: 48 },
                {"name": "Missouri",       "abbreviation": "MO", "capital": "Jefferson City", "statehood_year": 1821, statehood_order: 48 },
                {"name": "Montana",        "abbreviation": "MT", "capital": "Helena",         "statehood_year": 1889, statehood_order: 48 },
                {"name": "Nebraska",       "abbreviation": "NE", "capital": "Lincoln",        "statehood_year": 1867, statehood_order: 48 },
                {"name": "Nevada",         "abbreviation": "NV", "capital": "Carson City",    "statehood_year": 1864, statehood_order: 48 },
                {"name": "New Hampshire",  "abbreviation": "NH", "capital": "Concord",        "statehood_year": 1788, statehood_order: 48 },
                {"name": "New Jersey",     "abbreviation": "NJ", "capital": "Trenton",        "statehood_year": 1787, statehood_order: 48 },
                {"name": "New Mexico",     "abbreviation": "NM", "capital": "Santa Fe",       "statehood_year": 1912, statehood_order: 48 },
                {"name": "New York",       "abbreviation": "NY", "capital": "Albany",         "statehood_year": 1788, statehood_order: 48 },
                {"name": "North Carolina", "abbreviation": "NC", "capital": "Raleigh",        "statehood_year": 1789, statehood_order: 48 },
                {"name": "North Dakota",   "abbreviation": "ND", "capital": "Bismarck",       "statehood_year": 1889, statehood_order: 48 },
                {"name": "Ohio",           "abbreviation": "OH", "capital": "Columbus",       "statehood_year": 1803, statehood_order: 48 },
                {"name": "Oklahoma",       "abbreviation": "OK", "capital": "Oklahoma City",  "statehood_year": 1907, statehood_order: 48 },
                {"name": "Oregon",         "abbreviation": "OR", "capital": "Salem",          "statehood_year": 1859, statehood_order: 48 },
                {"name": "Pennsylvania",   "abbreviation": "PA", "capital": "Harrisburg",     "statehood_year": 1787, statehood_order: 48 },
                {"name": "Rhode Island",   "abbreviation": "RI", "capital": "Providence",     "statehood_year": 1790, statehood_order: 48 },
                {"name": "South Carolina", "abbreviation": "SC", "capital": "Columbia",       "statehood_year": 1788, statehood_order: 48 },
                {"name": "South Dakota",   "abbreviation": "SD", "capital": "Pierre",         "statehood_year": 1889, statehood_order: 48 },
                {"name": "Tennessee",      "abbreviation": "TN", "capital": "Nashville",      "statehood_year": 1796, statehood_order: 48 },
                {"name": "Texas",          "abbreviation": "TX", "capital": "Austin",         "statehood_year": 1845, statehood_order: 48 },
                {"name": "Utah",           "abbreviation": "UT", "capital": "Salt Lake City", "statehood_year": 1896, statehood_order: 48 },
                {"name": "Vermont",        "abbreviation": "VT", "capital": "Montpelier",     "statehood_year": 1791, statehood_order: 48 },
                {"name": "Virginia",       "abbreviation": "VA", "capital": "Richmond",       "statehood_year": 1788, statehood_order: 48 },
                {"name": "Washington",     "abbreviation": "WA", "capital": "Olympia",        "statehood_year": 1889, statehood_order: 48 },
                {"name": "West Virginia",  "abbreviation": "WV", "capital": "Charleston",     "statehood_year": 1863, statehood_order: 48 },
                {"name": "Wisconsin",      "abbreviation": "WI", "capital": "Madison",        "statehood_year": 1848, statehood_order: 48 },
                {"name": "Wyoming",        "abbreviation": "WY", "capital": "Cheyenne",       "statehood_year": 1890, statehood_order: 48 }
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


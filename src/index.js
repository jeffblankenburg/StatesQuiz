'use strict';

const Alexa = require('alexa-sdk');
const D = "----------";

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
var counter = 0;

var states = {
    CAPITOLSQUIZ: '_CAPITOLSQUIZ'
};

const handlers = {
     "LaunchRequest": function() {
        console.log(D + "LAUNCHREQUEST");
        this.emit(":ask", "LaunchRequest", "LaunchRequest");
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
        writeSlots(this.event.request.intent.slots);
        var letter1 = this.event.request.intent.slots.letterone.value;
        var letter2 = this.event.request.intent.slots.lettertwo.value;

        var requestedState = letter1 + letter2;
        console.log(D + "Requested State: " + requestedState);

        var stateArray = this.t("STATES");
        console.log(D + "stateArray == " + stateArray);

        var state = stateArray.filter(x => x.abbreviation.toLowerCase() === requestedState.toLowerCase());
        console.log(D + "STATE == " + state);
        console.log(D + "state.length == " + state.length);

        console.log(D + "state[0].name == " + state[0].name);
        this.emit(":tell", state[0].name);
    },
    "CapitolsQuizIntent": function() {
        console.log(D + "CAPITOLS QUIZ INTENT.  SETTING STATE = CAPITOLSQUIZ.  REDIRECT TO CapitolsQuiz HANDLERS.");
        this.handler.state = states.CAPITOLSQUIZ;
        this.emitWithState("CapitolsQuiz");
    },
    "Unhandled": function() {
        console.log(D + "UNHANDLED!");
        this.emit(":tell", "UNHANDLED!");
    }
};

var capQuizHandlers = Alexa.CreateStateHandler(states.CAPITOLSQUIZ,{
    "CapitolsQuiz": function() {
        console.log(D + "STARTING CAPITOLSQUIZ.");
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        console.log(D + "RESET COUNTER TO ZERO.");
        this.emit(":ask", "Starting Capitols Quiz.  Each round, I will give you 10 states, and you will need to tell me the capitol of that state.  Ready?", "Are you ready to start the capitols quiz?");
    },
    "AMAZON.YesIntent": function() {
        console.log(D + "USER WANTS TO START A CAPITOLS QUIZ. REDIRECTING TO QUIZ ASKER.");
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function() {
        console.log(D + "ASKING QUESTION.");
        var stateArray = this.t("STATES");
        console.log(D + "stateArray == " + stateArray);
        var state = stateArray[getRandom(50)];
        console.log(D + "RANDOM STATE IS " + state.name);
        this.attributes["quizstate"] = state;
        this.attributes["counter"]++;
        console.log(D + "INCREMENTING COUNTER TO " + this.attributes["counter"]);
        var response = this.attributes["response"] + "Here is your " + getOrdinal(this.attributes["counter"]) + " question.  What is the capitol of "  + state.name + "?";
        this.emit(":ask", response, response);
    },
    "CapitolNameIntent": function() {
        console.log(D + "CAPITOL NAME INTENT.  STATE == CAPITOLSQUIZ.");
        var capitolName = this.event.request.intent.slots.capitol_name.value;
        console.log(D + "USER SAID " + capitolName);
        var currentState = this.attributes["quizstate"];
        console.log(D + "currentState = " + currentState.name);
        console.log(D + "capitolName = " + capitolName + " AND currentState.capitol = " + currentState.capitol);
        this.attributes["response"] = "";
        var response = "";
        if (capitolName == currentState.capitol)
        {
            console.log(D + "USER GOT THE CORRECT ANSWER.");
            response += "Correct! ";
            this.attributes["quizscore"]++;
        }
        else
        {
            var stateArray = this.t("STATES");
            var state = stateArray.filter(x => x.capitol.toLowerCase() === capitolName.toLowerCase());
            if (state.length > 0)
            {
                console.log(D + "USER GOT AN INCORRECT ANSWER: " + capitolName + ".  Expected " + currentState.capitol);
                response += "Nope!  That's not right. You said " + capitolName + ", which is the capitol of " + state[0].name + ". ";
            }
            else
            {
                console.log(D + "USER GOT AN INCORRECT ANSWER THAT ISN'T A STATE CAPITOL: " + capitolName);
                response += "Nope!  You said " + capitolName + ", which is not even a capitol city! ";
            }
            
        }
        response += "The capital of " + currentState.name + " is " + currentState.capitol + ". ";
        
        if (this.attributes["counter"] <= 10)
        {
            console.log(D + "CURRENT SCORE: " + this.attributes["quizscore"]);
            response += "Your current score is " + this.attributes["quizscore"] + ". ";
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        //this.emit(":ask", response, response);
    },
    "Unhandled": function() {
        console.log(D + "UNHANDLED IN CAPITOLS QUIZ!");
        this.emit(":tell", "UNHANDLED IN CAPITOLS QUIZ!");
    }
});


exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.AppId = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers, capQuizHandlers);
    alexa.execute();
};

function getOrdinal(number)
{
    switch(number)
    {
        case 1: {return "first";}
        case 2: {return "second";}
        case 3: {return "third";}
        case 4: {return "fourth";}
        case 5: {return "fifth";}
        case 6: {return "sixth";}
        case 7: {return "seventh";}
        case 8: {return "eighth";}
        case 9: {return "ninth";}
        case 10: {return "tenth";}
    }
}

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
                {"name": "Alabama",        "abbreviation": "AL", "capitol": "Montgomery",     "statehood_year": 1819, statehood_order: 22 },
                {"name": "Alaska",         "abbreviation": "AK", "capitol": "Juneau",         "statehood_year": 1959, statehood_order: 49 },
                {"name": "Arizona",        "abbreviation": "AZ", "capitol": "Phoenix",        "statehood_year": 1912, statehood_order: 48 },
                {"name": "Arkansas",       "abbreviation": "AR", "capitol": "Little Rock",    "statehood_year": 1836, statehood_order: 48 },
                {"name": "California",     "abbreviation": "CA", "capitol": "California",     "statehood_year": 1850, statehood_order: 48 },
                {"name": "Colorado",       "abbreviation": "CO", "capitol": "Denver",         "statehood_year": 1876, statehood_order: 48 },
                {"name": "Connecticut",    "abbreviation": "CT", "capitol": "Hartford",       "statehood_year": 1788, statehood_order: 48 },
                {"name": "Delaware",       "abbreviation": "DE", "capitol": "Dover",          "statehood_year": 1787, statehood_order: 48 },
                {"name": "Florida",        "abbreviation": "FL", "capitol": "Tallahassee",    "statehood_year": 1845, statehood_order: 48 },
                {"name": "Georgia",        "abbreviation": "GA", "capitol": "Atlanta",        "statehood_year": 1788, statehood_order: 48 },
                {"name": "Hawaii",         "abbreviation": "HI", "capitol": "Honolulu",       "statehood_year": 1959, statehood_order: 48 },
                {"name": "Idaho",          "abbreviation": "ID", "capitol": "Boise",          "statehood_year": 1890, statehood_order: 48 },
                {"name": "Illinois",       "abbreviation": "IL", "capitol": "Springfield",    "statehood_year": 1818, statehood_order: 48 },
                {"name": "Indiana",        "abbreviation": "IN", "capitol": "Indianapolis",   "statehood_year": 1816, statehood_order: 48 },
                {"name": "Iowa",           "abbreviation": "IA", "capitol": "Des Moines",     "statehood_year": 1846, statehood_order: 48 },
                {"name": "Kansas",         "abbreviation": "KS", "capitol": "Topeka",         "statehood_year": 1861, statehood_order: 48 },
                {"name": "Kentucky",       "abbreviation": "KY", "capitol": "Frankfort",      "statehood_year": 1792, statehood_order: 48 },
                {"name": "Louisiana",      "abbreviation": "LA", "capitol": "Baton Rouge",    "statehood_year": 1812, statehood_order: 48 },
                {"name": "Maine",          "abbreviation": "ME", "capitol": "Augusta",        "statehood_year": 1820, statehood_order: 48 },
                {"name": "Maryland",       "abbreviation": "MD", "capitol": "Annapolis",      "statehood_year": 1788, statehood_order: 48 },
                {"name": "Massachusetts",  "abbreviation": "MA", "capitol": "Boston",         "statehood_year": 1788, statehood_order: 48 },
                {"name": "Michigan",       "abbreviation": "MI", "capitol": "Lansing",        "statehood_year": 1837, statehood_order: 48 },
                {"name": "Minnesota",      "abbreviation": "MN", "capitol": "St. Paul",       "statehood_year": 1858, statehood_order: 48 },
                {"name": "Mississippi",    "abbreviation": "MS", "capitol": "Jackson",        "statehood_year": 1817, statehood_order: 48 },
                {"name": "Missouri",       "abbreviation": "MO", "capitol": "Jefferson City", "statehood_year": 1821, statehood_order: 48 },
                {"name": "Montana",        "abbreviation": "MT", "capitol": "Helena",         "statehood_year": 1889, statehood_order: 48 },
                {"name": "Nebraska",       "abbreviation": "NE", "capitol": "Lincoln",        "statehood_year": 1867, statehood_order: 48 },
                {"name": "Nevada",         "abbreviation": "NV", "capitol": "Carson City",    "statehood_year": 1864, statehood_order: 48 },
                {"name": "New Hampshire",  "abbreviation": "NH", "capitol": "Concord",        "statehood_year": 1788, statehood_order: 48 },
                {"name": "New Jersey",     "abbreviation": "NJ", "capitol": "Trenton",        "statehood_year": 1787, statehood_order: 48 },
                {"name": "New Mexico",     "abbreviation": "NM", "capitol": "Santa Fe",       "statehood_year": 1912, statehood_order: 48 },
                {"name": "New York",       "abbreviation": "NY", "capitol": "Albany",         "statehood_year": 1788, statehood_order: 48 },
                {"name": "North Carolina", "abbreviation": "NC", "capitol": "Raleigh",        "statehood_year": 1789, statehood_order: 48 },
                {"name": "North Dakota",   "abbreviation": "ND", "capitol": "Bismarck",       "statehood_year": 1889, statehood_order: 48 },
                {"name": "Ohio",           "abbreviation": "OH", "capitol": "Columbus",       "statehood_year": 1803, statehood_order: 48 },
                {"name": "Oklahoma",       "abbreviation": "OK", "capitol": "Oklahoma City",  "statehood_year": 1907, statehood_order: 48 },
                {"name": "Oregon",         "abbreviation": "OR", "capitol": "Salem",          "statehood_year": 1859, statehood_order: 48 },
                {"name": "Pennsylvania",   "abbreviation": "PA", "capitol": "Harrisburg",     "statehood_year": 1787, statehood_order: 48 },
                {"name": "Rhode Island",   "abbreviation": "RI", "capitol": "Providence",     "statehood_year": 1790, statehood_order: 48 },
                {"name": "South Carolina", "abbreviation": "SC", "capitol": "Columbia",       "statehood_year": 1788, statehood_order: 48 },
                {"name": "South Dakota",   "abbreviation": "SD", "capitol": "Pierre",         "statehood_year": 1889, statehood_order: 48 },
                {"name": "Tennessee",      "abbreviation": "TN", "capitol": "Nashville",      "statehood_year": 1796, statehood_order: 48 },
                {"name": "Texas",          "abbreviation": "TX", "capitol": "Austin",         "statehood_year": 1845, statehood_order: 48 },
                {"name": "Utah",           "abbreviation": "UT", "capitol": "Salt Lake City", "statehood_year": 1896, statehood_order: 48 },
                {"name": "Vermont",        "abbreviation": "VT", "capitol": "Montpelier",     "statehood_year": 1791, statehood_order: 48 },
                {"name": "Virginia",       "abbreviation": "VA", "capitol": "Richmond",       "statehood_year": 1788, statehood_order: 48 },
                {"name": "Washington",     "abbreviation": "WA", "capitol": "Olympia",        "statehood_year": 1889, statehood_order: 48 },
                {"name": "West Virginia",  "abbreviation": "WV", "capitol": "Charleston",     "statehood_year": 1863, statehood_order: 48 },
                {"name": "Wisconsin",      "abbreviation": "WI", "capitol": "Madison",        "statehood_year": 1848, statehood_order: 48 },
                {"name": "Wyoming",        "abbreviation": "WY", "capitol": "Cheyenne",       "statehood_year": 1890, statehood_order: 48 }
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


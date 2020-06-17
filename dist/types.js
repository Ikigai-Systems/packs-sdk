"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncInterval = exports.QuotaLimitType = exports.FeatureSet = exports.DefaultConnectionType = exports.AuthenticationType = exports.ProviderId = exports.PackId = exports.PackCategory = void 0;
var PackCategory;
(function (PackCategory) {
    PackCategory["CRM"] = "CRM";
    PackCategory["Calendar"] = "Calendar";
    PackCategory["Communication"] = "Communication";
    PackCategory["DataStorage"] = "DataStorage";
    PackCategory["Design"] = "Design";
    PackCategory["Financial"] = "Financial";
    PackCategory["Fun"] = "Fun";
    PackCategory["Geo"] = "Geo";
    PackCategory["IT"] = "IT";
    PackCategory["Mathematics"] = "Mathematics";
    PackCategory["Organization"] = "Organization";
    PackCategory["Recruiting"] = "Recruiting";
    PackCategory["Shopping"] = "Shopping";
    PackCategory["Social"] = "Social";
    PackCategory["Sports"] = "Sports";
    PackCategory["Travel"] = "Travel";
    PackCategory["Weather"] = "Weather";
})(PackCategory = exports.PackCategory || (exports.PackCategory = {}));
var PackId;
(function (PackId) {
    PackId[PackId["Slack"] = 1000] = "Slack";
    PackId[PackId["Airtable"] = 1001] = "Airtable";
    PackId[PackId["Intercom"] = 1002] = "Intercom";
    PackId[PackId["GoogleCalendar"] = 1003] = "GoogleCalendar";
    PackId[PackId["Gmail"] = 1004] = "Gmail";
    PackId[PackId["Notion"] = 1005] = "Notion";
    PackId[PackId["CodaTrigonometry"] = 1006] = "CodaTrigonometry";
    PackId[PackId["Twitter"] = 1007] = "Twitter";
    PackId[PackId["Giphy"] = 1008] = "Giphy";
    PackId[PackId["CodaDebug"] = 1009] = "CodaDebug";
    PackId[PackId["Figma"] = 1010] = "Figma";
    PackId[PackId["GoogleContacts"] = 1011] = "GoogleContacts";
    PackId[PackId["GoogleNaturalLanguage"] = 1014] = "GoogleNaturalLanguage";
    PackId[PackId["GoogleTasks"] = 1012] = "GoogleTasks";
    PackId[PackId["GitHub"] = 1013] = "GitHub";
    PackId[PackId["Weather"] = 1015] = "Weather";
    PackId[PackId["Twilio"] = 1016] = "Twilio";
    PackId[PackId["Zoom"] = 1017] = "Zoom";
    PackId[PackId["Spotify"] = 1018] = "Spotify";
    PackId[PackId["FullContact"] = 1019] = "FullContact";
    PackId[PackId["GoogleDirections"] = 1020] = "GoogleDirections";
    PackId[PackId["Coda"] = 1021] = "Coda";
    PackId[PackId["Greenhouse"] = 1022] = "Greenhouse";
    PackId[PackId["Lob"] = 1023] = "Lob";
    PackId[PackId["Stocks"] = 1024] = "Stocks";
    PackId[PackId["Discourse"] = 1025] = "Discourse";
    PackId[PackId["WalmartShopping"] = 1026] = "WalmartShopping";
    PackId[PackId["GooglePlaces"] = 1027] = "GooglePlaces";
    PackId[PackId["Unused"] = 1028] = "Unused";
    PackId[PackId["Instagram"] = 1029] = "Instagram";
    PackId[PackId["YouTube"] = 1030] = "YouTube";
    PackId[PackId["Wikipedia"] = 1031] = "Wikipedia";
    PackId[PackId["Dropbox"] = 1032] = "Dropbox";
    PackId[PackId["Quickbooks"] = 1033] = "Quickbooks";
    PackId[PackId["Shopify"] = 1034] = "Shopify";
    PackId[PackId["HubSpot"] = 1035] = "HubSpot";
    PackId[PackId["Phabricator"] = 1036] = "Phabricator";
    PackId[PackId["Stripe"] = 1037] = "Stripe";
    PackId[PackId["MLB"] = 1038] = "MLB";
    PackId[PackId["NBA"] = 1039] = "NBA";
    PackId[PackId["NFL"] = 1040] = "NFL";
    PackId[PackId["GoogleMaps"] = 1041] = "GoogleMaps";
    PackId[PackId["Imgur"] = 1042] = "Imgur";
    PackId[PackId["Fitbit"] = 1043] = "Fitbit";
    PackId[PackId["Pinterest"] = 1044] = "Pinterest";
    PackId[PackId["Reddit"] = 1045] = "Reddit";
    PackId[PackId["Flights"] = 1046] = "Flights";
    PackId[PackId["Cryptocurrency"] = 1047] = "Cryptocurrency";
    PackId[PackId["S3"] = 1048] = "S3";
    PackId[PackId["GoogleSearchConsole"] = 1049] = "GoogleSearchConsole";
    PackId[PackId["OMDB"] = 1050] = "OMDB";
    PackId[PackId["PubNub"] = 1051] = "PubNub";
    PackId[PackId["Jira"] = 1052] = "Jira";
    PackId[PackId["Barcode"] = 1053] = "Barcode";
    PackId[PackId["CodaDoc"] = 1054] = "CodaDoc";
    PackId[PackId["GoogleSheets"] = 1055] = "GoogleSheets";
    PackId[PackId["GoogleDocs"] = 1056] = "GoogleDocs";
    PackId[PackId["Mode"] = 1057] = "Mode";
    PackId[PackId["LaTeX"] = 1058] = "LaTeX";
    PackId[PackId["GoogleDrive"] = 1059] = "GoogleDrive";
    PackId[PackId["Lever"] = 1060] = "Lever";
    PackId[PackId["Unsplash"] = 1061] = "Unsplash";
    PackId[PackId["Typeform"] = 1062] = "Typeform";
    PackId[PackId["GoogleTranslate"] = 1063] = "GoogleTranslate";
    PackId[PackId["CodaStats"] = 1064] = "CodaStats";
    PackId[PackId["Trello"] = 1065] = "Trello";
    PackId[PackId["Asana"] = 1066] = "Asana";
    PackId[PackId["GoogleGroups"] = 1067] = "GoogleGroups";
    PackId[PackId["OpsGenie"] = 1068] = "OpsGenie";
    PackId[PackId["Crypto"] = 1069] = "Crypto";
    PackId[PackId["FedEx"] = 1070] = "FedEx";
    PackId[PackId["UPS"] = 1071] = "UPS";
    PackId[PackId["SlackChannels"] = 1072] = "SlackChannels";
    PackId[PackId["USPS"] = 1073] = "USPS";
    PackId[PackId["Shutterstock"] = 1074] = "Shutterstock";
    PackId[PackId["GSuiteDirectory"] = 1075] = "GSuiteDirectory";
    PackId[PackId["Okta"] = 1076] = "Okta";
})(PackId = exports.PackId || (exports.PackId = {}));
var ProviderId;
(function (ProviderId) {
    ProviderId[ProviderId["Airtable"] = 2001] = "Airtable";
    ProviderId[ProviderId["Coda"] = 2002] = "Coda";
    ProviderId[ProviderId["Figma"] = 2003] = "Figma";
    ProviderId[ProviderId["Giphy"] = 2004] = "Giphy";
    ProviderId[ProviderId["Google"] = 2005] = "Google";
    ProviderId[ProviderId["Intercom"] = 2006] = "Intercom";
    ProviderId[ProviderId["Notion"] = 2007] = "Notion";
    ProviderId[ProviderId["Slack"] = 2008] = "Slack";
    ProviderId[ProviderId["Twitter"] = 2009] = "Twitter";
    ProviderId[ProviderId["GitHub"] = 2010] = "GitHub";
    ProviderId[ProviderId["Weather"] = 2011] = "Weather";
    ProviderId[ProviderId["Twilio"] = 2012] = "Twilio";
    ProviderId[ProviderId["Zoom"] = 2013] = "Zoom";
    ProviderId[ProviderId["Spotify"] = 2014] = "Spotify";
    ProviderId[ProviderId["FullContact"] = 2015] = "FullContact";
    ProviderId[ProviderId["Greenhouse"] = 2016] = "Greenhouse";
    ProviderId[ProviderId["Lob"] = 2017] = "Lob";
    ProviderId[ProviderId["Stocks"] = 2018] = "Stocks";
    ProviderId[ProviderId["Discourse"] = 2019] = "Discourse";
    ProviderId[ProviderId["Walmart"] = 2020] = "Walmart";
    ProviderId[ProviderId["Instagram"] = 2021] = "Instagram";
    ProviderId[ProviderId["Wikipedia"] = 2022] = "Wikipedia";
    ProviderId[ProviderId["Dropbox"] = 2023] = "Dropbox";
    ProviderId[ProviderId["Intuit"] = 2024] = "Intuit";
    ProviderId[ProviderId["Shopify"] = 2025] = "Shopify";
    ProviderId[ProviderId["HubSpot"] = 2026] = "HubSpot";
    ProviderId[ProviderId["Phacility"] = 2027] = "Phacility";
    ProviderId[ProviderId["Stripe"] = 2028] = "Stripe";
    ProviderId[ProviderId["MLB"] = 2029] = "MLB";
    ProviderId[ProviderId["NBA"] = 2030] = "NBA";
    ProviderId[ProviderId["NFL"] = 2031] = "NFL";
    ProviderId[ProviderId["Imgur"] = 2032] = "Imgur";
    ProviderId[ProviderId["Fitbit"] = 2033] = "Fitbit";
    ProviderId[ProviderId["Pinterest"] = 2034] = "Pinterest";
    ProviderId[ProviderId["Reddit"] = 2035] = "Reddit";
    ProviderId[ProviderId["Flights"] = 2036] = "Flights";
    ProviderId[ProviderId["Cryptocurrency"] = 2037] = "Cryptocurrency";
    ProviderId[ProviderId["AWS"] = 2038] = "AWS";
    ProviderId[ProviderId["OMDB"] = 2039] = "OMDB";
    ProviderId[ProviderId["PubNub"] = 2040] = "PubNub";
    ProviderId[ProviderId["Atlassian"] = 2041] = "Atlassian";
    ProviderId[ProviderId["Barcode"] = 2042] = "Barcode";
    ProviderId[ProviderId["Mode"] = 2043] = "Mode";
    ProviderId[ProviderId["LaTeX"] = 2044] = "LaTeX";
    ProviderId[ProviderId["Lever"] = 2045] = "Lever";
    ProviderId[ProviderId["Unsplash"] = 2046] = "Unsplash";
    ProviderId[ProviderId["Typeform"] = 2047] = "Typeform";
    ProviderId[ProviderId["Trello"] = 2048] = "Trello";
    ProviderId[ProviderId["Asana"] = 2049] = "Asana";
    ProviderId[ProviderId["YouTube"] = 2050] = "YouTube";
    ProviderId[ProviderId["FedEx"] = 2051] = "FedEx";
    ProviderId[ProviderId["UPS"] = 2052] = "UPS";
    ProviderId[ProviderId["USPS"] = 2053] = "USPS";
    ProviderId[ProviderId["Shutterstock"] = 2054] = "Shutterstock";
    ProviderId[ProviderId["Okta"] = 2055] = "Okta";
})(ProviderId = exports.ProviderId || (exports.ProviderId = {}));
var AuthenticationType;
(function (AuthenticationType) {
    AuthenticationType["None"] = "None";
    AuthenticationType["HeaderBearerToken"] = "HeaderBearerToken";
    AuthenticationType["CustomHeaderToken"] = "CustomHeaderToken";
    AuthenticationType["QueryParamToken"] = "QueryParamToken";
    AuthenticationType["MultiQueryParamToken"] = "MultiQueryParamToken";
    AuthenticationType["OAuth2"] = "OAuth2";
    AuthenticationType["WebBasic"] = "WebBasic";
    AuthenticationType["AWSSignature4"] = "AWSSignature4";
    AuthenticationType["CodaApiHeaderBearerToken"] = "CodaApiHeaderBearerToken";
})(AuthenticationType = exports.AuthenticationType || (exports.AuthenticationType = {}));
var DefaultConnectionType;
(function (DefaultConnectionType) {
    DefaultConnectionType[DefaultConnectionType["SharedDataOnly"] = 1] = "SharedDataOnly";
    DefaultConnectionType[DefaultConnectionType["Shared"] = 2] = "Shared";
    DefaultConnectionType[DefaultConnectionType["ProxyActionsOnly"] = 3] = "ProxyActionsOnly";
})(DefaultConnectionType = exports.DefaultConnectionType || (exports.DefaultConnectionType = {}));
var FeatureSet;
(function (FeatureSet) {
    FeatureSet["Basic"] = "Basic";
    FeatureSet["Pro"] = "Pro";
    FeatureSet["Team"] = "Team";
    FeatureSet["Enterprise"] = "Enterprise";
})(FeatureSet = exports.FeatureSet || (exports.FeatureSet = {}));
var QuotaLimitType;
(function (QuotaLimitType) {
    QuotaLimitType["Action"] = "Action";
    QuotaLimitType["Getter"] = "Getter";
    QuotaLimitType["Sync"] = "Sync";
    QuotaLimitType["Metadata"] = "Metadata";
})(QuotaLimitType = exports.QuotaLimitType || (exports.QuotaLimitType = {}));
var SyncInterval;
(function (SyncInterval) {
    SyncInterval["Manual"] = "Manual";
    SyncInterval["Daily"] = "Daily";
    SyncInterval["Hourly"] = "Hourly";
    SyncInterval["EveryTenMinutes"] = "EveryTenMinutes";
})(SyncInterval = exports.SyncInterval || (exports.SyncInterval = {}));

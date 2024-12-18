// import { UserBillingInformation } from "../definitions/data-model";

// export const billingInfoSeed: UserBillingInformation[] = [
//   {
//     "id": 181,
//     "user_id": "59b34959-20ed-443a-88a1-9084f3b2a112",
//     "street": "5749 Elm Road",
//     "apt_num": null,
//     "city": "South Presley",
//     "state": "Louisiana",
//     "zip": "58471-5573",
//     "payment_method": "CASH",
//     "purchase_order": "48917329",
//     "primary_contact_name": "Charity Will",
//     "primary_contact_email": "force.fair@example.com",
//     "primary_contact_phone": "+1(254)512-7348",
//     "fax_num": "+1(254)512-7348",
//     "is_primary": true,
//     "is_active": true
//   },
//   {
//     "id": 195,
//     "user_id": "59b34959-20ed-443a-88a1-9084f3b2a112",
//     "street": "14706 Colton Underpass",
//     "apt_num": null,
//     "city": "New Houstonport",
//     "state": "Hawaii",
//     "zip": "35595",
//     "payment_method": "PURCHASE ORDER",
//     "purchase_order": "06174517",
//     "primary_contact_name": "Charity Will",
//     "primary_contact_email": "force.fair@example.com",
//     "primary_contact_phone": "+1(254)512-7348",
//     "fax_num": "+1(254)512-7348",
//     "is_primary": false,
//     "is_active": false
//   },
//   {
//     "id": 752,
//     "user_id": "59b34959-20ed-443a-88a1-9084f3b2a112",
//     "street": "8411 Maximilian Trafficway",
//     "apt_num": "Apt. 332",
//     "city": "Edmondboro",
//     "state": "Maryland",
//     "zip": "54187-5030",
//     "payment_method": "PURCHASE ORDER",
//     "purchase_order": "41634608",
//     "primary_contact_name": "Charity Will",
//     "primary_contact_email": "force.fair@example.com",
//     "primary_contact_phone": "+1(254)512-7348",
//     "fax_num": "+1(254)512-7348",
//     "is_primary": true,
//     "is_active": false
//   },
//   {
//     "id": 706,
//     "user_id": "eb02853f-8d9a-46b9-8699-666b64fdf7f5",
//     "street": "64152 Senger Orchard",
//     "apt_num": null,
//     "city": "Janieton",
//     "state": "Texas",
//     "zip": "34814",
//     "payment_method": "PURCHASE ORDER",
//     "purchase_order": "15035425",
//     "primary_contact_name": "Blanca Ankunding",
//     "primary_contact_email": "terrible.crop@example.com",
//     "primary_contact_phone": "+1(944)421-3427",
//     "fax_num": "+1(944)421-3427",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 493,
//     "user_id": "eb02853f-8d9a-46b9-8699-666b64fdf7f5",
//     "street": "1277 Amari Forge",
//     "apt_num": null,
//     "city": "Port Giovanna",
//     "state": "Hawaii",
//     "zip": "82884-7662",
//     "payment_method": "PURCHASE ORDER",
//     "purchase_order": "24560061",
//     "primary_contact_name": "Blanca Ankunding",
//     "primary_contact_email": "terrible.crop@example.com",
//     "primary_contact_phone": "+1(944)421-3427",
//     "fax_num": "+1(944)421-3427",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 887,
//     "user_id": "c7e54533-c4f0-461e-9cb3-40f06420b886",
//     "street": "465 Arnaldo Divide",
//     "apt_num": "Apt. 678",
//     "city": "Osbornehaven",
//     "state": "Arkansas",
//     "zip": "85175",
//     "payment_method": "PURCHASE ORDER",
//     "purchase_order": "91497488",
//     "primary_contact_name": "Linnea Hintz",
//     "primary_contact_email": "or.jar@example.com",
//     "primary_contact_phone": "+1(947)780-7706",
//     "fax_num": "+1(947)780-7706",
//     "is_primary": false,
//     "is_active": false
//   },
//   {
//     "id": 986,
//     "user_id": "7a39cc76-0161-4c45-8f69-f78b3b82c140",
//     "street": "6578 Brandy Centers",
//     "apt_num": null,
//     "city": "Arlington",
//     "state": "Indiana",
//     "zip": "05080-9804",
//     "payment_method": "PURCHASE ORDER",
//     "purchase_order": "11264000",
//     "primary_contact_name": "Hillard Parisian",
//     "primary_contact_email": "fall.organization@example.com",
//     "primary_contact_phone": "+1(734)216-1007",
//     "fax_num": "+1(734)216-1007",
//     "is_primary": true,
//     "is_active": false
//   },
//   {
//     "id": 197,
//     "user_id": "7a39cc76-0161-4c45-8f69-f78b3b82c140",
//     "street": "53701 W Broadway",
//     "apt_num": "Suite 385",
//     "city": "Chesleyview",
//     "state": "California",
//     "zip": "12631",
//     "payment_method": "CHECK",
//     "purchase_order": "07018601",
//     "primary_contact_name": "Hillard Parisian",
//     "primary_contact_email": "fall.organization@example.com",
//     "primary_contact_phone": "+1(734)216-1007",
//     "fax_num": "+1(734)216-1007",
//     "is_primary": true,
//     "is_active": true
//   },
//   {
//     "id": 810,
//     "user_id": "2677e8e7-7c66-4ca3-bd80-70680b93cf7b",
//     "street": "29998 Sawayn Vista",
//     "apt_num": null,
//     "city": "Morarworth",
//     "state": "Missouri",
//     "zip": "73951-2153",
//     "payment_method": "CREDIT",
//     "purchase_order": "25487516",
//     "primary_contact_name": "Donnell Larkin",
//     "primary_contact_email": "deer.spider@example.com",
//     "primary_contact_phone": "+1(273)599-6457",
//     "fax_num": "+1(273)599-6457",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 152,
//     "user_id": "2677e8e7-7c66-4ca3-bd80-70680b93cf7b",
//     "street": "35066 Dietrich Burg",
//     "apt_num": "Apt. 355",
//     "city": "Thornton",
//     "state": "Oregon",
//     "zip": "13258-5592",
//     "payment_method": "DEBIT",
//     "purchase_order": "66159530",
//     "primary_contact_name": "Donnell Larkin",
//     "primary_contact_email": "deer.spider@example.com",
//     "primary_contact_phone": "+1(273)599-6457",
//     "fax_num": "+1(273)599-6457",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 164,
//     "user_id": "ec4e7793-914a-406e-82c1-18fafa442a0d",
//     "street": "87186 Don Corners",
//     "apt_num": null,
//     "city": "Hagenesbury",
//     "state": "New Hampshire",
//     "zip": "83935",
//     "payment_method": "CASH",
//     "purchase_order": "58468231",
//     "primary_contact_name": "Trudie Brakus-Reichel",
//     "primary_contact_email": "stood.shoot@example.com",
//     "primary_contact_phone": "+1(241)970-5992",
//     "fax_num": "+1(241)970-5992",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 539,
//     "user_id": "ec4e7793-914a-406e-82c1-18fafa442a0d",
//     "street": "5461 Abigayle Fords",
//     "apt_num": null,
//     "city": "West Joanneshire",
//     "state": "Washington",
//     "zip": "16129-9011",
//     "payment_method": "DEBIT",
//     "purchase_order": "55218178",
//     "primary_contact_name": "Trudie Brakus-Reichel",
//     "primary_contact_email": "stood.shoot@example.com",
//     "primary_contact_phone": "+1(241)970-5992",
//     "fax_num": "+1(241)970-5992",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 240,
//     "user_id": "ec4e7793-914a-406e-82c1-18fafa442a0d",
//     "street": "72610 Lori Locks",
//     "apt_num": null,
//     "city": "Gwenborough",
//     "state": "New Jersey",
//     "zip": "13167-2525",
//     "payment_method": "CHECK",
//     "purchase_order": "59952268",
//     "primary_contact_name": "Trudie Brakus-Reichel",
//     "primary_contact_email": "stood.shoot@example.com",
//     "primary_contact_phone": "+1(241)970-5992",
//     "fax_num": "+1(241)970-5992",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 50,
//     "user_id": "e097eac8-c26e-48e9-be32-d6f7b61b1038",
//     "street": "53226 Francis Harbors",
//     "apt_num": null,
//     "city": "New Ubaldomouth",
//     "state": "Minnesota",
//     "zip": "91636",
//     "payment_method": "CHECK",
//     "purchase_order": "39120032",
//     "primary_contact_name": "Enoch Davis",
//     "primary_contact_email": "sing.soldier@example.com",
//     "primary_contact_phone": "+1(732)344-3116",
//     "fax_num": "+1(732)344-3116",
//     "is_primary": false,
//     "is_active": false
//   },
//   {
//     "id": 48,
//     "user_id": "a1e86f9a-359f-406c-937b-056c990a50a8",
//     "street": "645 Airport Road",
//     "apt_num": null,
//     "city": "Groverchester",
//     "state": "Utah",
//     "zip": "25763",
//     "payment_method": "CHECK",
//     "purchase_order": "76685367",
//     "primary_contact_name": "Laurie Wiza",
//     "primary_contact_email": "everything.actually@example.com",
//     "primary_contact_phone": "+1(786)250-2053",
//     "fax_num": "+1(786)250-2053",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 275,
//     "user_id": "a1e86f9a-359f-406c-937b-056c990a50a8",
//     "street": "95638 Willow Street",
//     "apt_num": null,
//     "city": "West Doyle",
//     "state": "Idaho",
//     "zip": "89642",
//     "payment_method": "CHECK",
//     "purchase_order": "97260592",
//     "primary_contact_name": "Laurie Wiza",
//     "primary_contact_email": "everything.actually@example.com",
//     "primary_contact_phone": "+1(786)250-2053",
//     "fax_num": "+1(786)250-2053",
//     "is_primary": true,
//     "is_active": false
//   },
//   {
//     "id": 365,
//     "user_id": "a1e86f9a-359f-406c-937b-056c990a50a8",
//     "street": "9458 Waterside",
//     "apt_num": null,
//     "city": "Sonyacester",
//     "state": "New Mexico",
//     "zip": "25932",
//     "payment_method": "DEBIT",
//     "purchase_order": "03930644",
//     "primary_contact_name": "Laurie Wiza",
//     "primary_contact_email": "everything.actually@example.com",
//     "primary_contact_phone": "+1(786)250-2053",
//     "fax_num": "+1(786)250-2053",
//     "is_primary": true,
//     "is_active": false
//   },
//   {
//     "id": 485,
//     "user_id": "a1901435-659f-4df1-a0c3-34472be10bdd",
//     "street": "580 New Street",
//     "apt_num": null,
//     "city": "Connellytown",
//     "state": "Massachusetts",
//     "zip": "81300-4670",
//     "payment_method": "DEBIT",
//     "purchase_order": "22763498",
//     "primary_contact_name": "Leora Auer",
//     "primary_contact_email": "planet.worry@example.com",
//     "primary_contact_phone": "+1(257)617-9890",
//     "fax_num": "+1(257)617-9890",
//     "is_primary": true,
//     "is_active": true
//   },
//   {
//     "id": 167,
//     "user_id": "a1901435-659f-4df1-a0c3-34472be10bdd",
//     "street": "7350 Grove Street",
//     "apt_num": "Suite 219",
//     "city": "Rosariohaven",
//     "state": "Texas",
//     "zip": "91503-4744",
//     "payment_method": "CREDIT",
//     "purchase_order": "02418037",
//     "primary_contact_name": "Leora Auer",
//     "primary_contact_email": "planet.worry@example.com",
//     "primary_contact_phone": "+1(257)617-9890",
//     "fax_num": "+1(257)617-9890",
//     "is_primary": true,
//     "is_active": false
//   },
//   {
//     "id": 42,
//     "user_id": "a1901435-659f-4df1-a0c3-34472be10bdd",
//     "street": "21655 London Road",
//     "apt_num": "Suite 837",
//     "city": "Castro Valley",
//     "state": "Virginia",
//     "zip": "67043-9767",
//     "payment_method": "CREDIT",
//     "purchase_order": "88400033",
//     "primary_contact_name": "Leora Auer",
//     "primary_contact_email": "planet.worry@example.com",
//     "primary_contact_phone": "+1(257)617-9890",
//     "fax_num": "+1(257)617-9890",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 780,
//     "user_id": "8da298b9-367c-4f19-8c9b-19108e2d055b",
//     "street": "7669 Zulauf Glens",
//     "apt_num": "Suite 434",
//     "city": "Stoltenbergtown",
//     "state": "New York",
//     "zip": "60758",
//     "payment_method": "CREDIT",
//     "purchase_order": "95815224",
//     "primary_contact_name": "Richard Hills",
//     "primary_contact_email": "rule.standard@example.com",
//     "primary_contact_phone": "+1(563)357-1488",
//     "fax_num": "+1(563)357-1488",
//     "is_primary": false,
//     "is_active": false
//   },
//   {
//     "id": 662,
//     "user_id": "8da298b9-367c-4f19-8c9b-19108e2d055b",
//     "street": "88545 Kessler Club",
//     "apt_num": "Suite 854",
//     "city": "South Ivoryberg",
//     "state": "Nebraska",
//     "zip": "09791",
//     "payment_method": "CASH",
//     "purchase_order": "91131352",
//     "primary_contact_name": "Richard Hills",
//     "primary_contact_email": "rule.standard@example.com",
//     "primary_contact_phone": "+1(563)357-1488",
//     "fax_num": "+1(563)357-1488",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 78,
//     "user_id": "80725dc7-caa2-47e7-9e84-30ec6cf20ce3",
//     "street": "119 W Lake Street",
//     "apt_num": null,
//     "city": "South Emmie",
//     "state": "Nevada",
//     "zip": "35033-8319",
//     "payment_method": "DEBIT",
//     "purchase_order": "74885404",
//     "primary_contact_name": "Annalise Breitenberg",
//     "primary_contact_email": "therefore.sell@example.com",
//     "primary_contact_phone": "+1(418)936-2676",
//     "fax_num": "+1(418)936-2676",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 907,
//     "user_id": "80725dc7-caa2-47e7-9e84-30ec6cf20ce3",
//     "street": "23769 N Union Street",
//     "apt_num": null,
//     "city": "Lake Jerome",
//     "state": "Michigan",
//     "zip": "81414-5033",
//     "payment_method": "CREDIT",
//     "purchase_order": "14580135",
//     "primary_contact_name": "Annalise Breitenberg",
//     "primary_contact_email": "therefore.sell@example.com",
//     "primary_contact_phone": "+1(418)936-2676",
//     "fax_num": "+1(418)936-2676",
//     "is_primary": true,
//     "is_active": true
//   },
//   {
//     "id": 284,
//     "user_id": "272d4fb2-2ed3-4886-8ad6-73cf85f2e045",
//     "street": "4633 Sarah Fords",
//     "apt_num": null,
//     "city": "DuBuquefort",
//     "state": "Idaho",
//     "zip": "41833",
//     "payment_method": "CASH",
//     "purchase_order": "69327579",
//     "primary_contact_name": "Oren Schulist",
//     "primary_contact_email": "storm.familiar@example.com",
//     "primary_contact_phone": "+1(285)614-7505",
//     "fax_num": "+1(285)614-7505",
//     "is_primary": false,
//     "is_active": false
//   },
//   {
//     "id": 111,
//     "user_id": "27d2210d-2382-4a14-a0ca-b3676f4d910f",
//     "street": "35744 McLaughlin Canyon",
//     "apt_num": null,
//     "city": "Jaquelinhaven",
//     "state": "Louisiana",
//     "zip": "40506-1526",
//     "payment_method": "DEBIT",
//     "purchase_order": "09819448",
//     "primary_contact_name": "Vivien Weber",
//     "primary_contact_email": "they.butter@example.com",
//     "primary_contact_phone": "+1(927)649-4486",
//     "fax_num": "+1(927)649-4486",
//     "is_primary": false,
//     "is_active": true
//   },
//   {
//     "id": 380,
//     "user_id": "27d2210d-2382-4a14-a0ca-b3676f4d910f",
//     "street": "6745 Wiza Fall",
//     "apt_num": "Suite 170",
//     "city": "Luisaside",
//     "state": "North Carolina",
//     "zip": "36284",
//     "payment_method": "DEBIT",
//     "purchase_order": "05244510",
//     "primary_contact_name": "Vivien Weber",
//     "primary_contact_email": "they.butter@example.com",
//     "primary_contact_phone": "+1(927)649-4486",
//     "fax_num": "+1(927)649-4486",
//     "is_primary": true,
//     "is_active": false
//   },
//   {
//     "id": 780,
//     "user_id": "27d2210d-2382-4a14-a0ca-b3676f4d910f",
//     "street": "54031 Cedar Close",
//     "apt_num": "Suite 972",
//     "city": "Hesselcester",
//     "state": "Mississippi",
//     "zip": "12891",
//     "payment_method": "CREDIT",
//     "purchase_order": "22463945",
//     "primary_contact_name": "Vivien Weber",
//     "primary_contact_email": "they.butter@example.com",
//     "primary_contact_phone": "+1(927)649-4486",
//     "fax_num": "+1(927)649-4486",
//     "is_primary": true,
//     "is_active": true
//   },
//   {
//     "id": 23,
//     "user_id": "3dd7f028-cf4c-4cf1-a6f7-6c995816ac7f",
//     "street": "4695 S 1st Street",
//     "apt_num": "Suite 848",
//     "city": "Dooleystead",
//     "state": "Texas",
//     "zip": "70402",
//     "payment_method": "CREDIT",
//     "purchase_order": "65205840",
//     "primary_contact_name": "Kiara Stroman-Bernier",
//     "primary_contact_email": "this.powder@example.com",
//     "primary_contact_phone": "+1(646)173-9042",
//     "fax_num": "+1(646)173-9042",
//     "is_primary": true,
//     "is_active": false
//   },
//   {
//     "id": 557,
//     "user_id": "8760df0a-5d19-49fa-b637-ad521a13847c",
//     "street": "628 Syble Crescent",
//     "apt_num": "Apt. 329",
//     "city": "Lake Nyahstead",
//     "state": "Rhode Island",
//     "zip": "39737-9668",
//     "payment_method": "CREDIT",
//     "purchase_order": "56291923",
//     "primary_contact_name": "Florence Stoltenberg",
//     "primary_contact_email": "happened.electric@example.com",
//     "primary_contact_phone": "+1(842)734-8940",
//     "fax_num": "+1(842)734-8940",
//     "is_primary": true,
//     "is_active": true
//   }
// ];

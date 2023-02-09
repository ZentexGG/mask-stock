const easyinvoice = require('easyinvoice');
const fs = require('fs');
    
let data = {
    "client": {
        "company": "Client Corp",
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
    },
    "sender": {
        "company": "Sample Corp",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
    },
    "information": {
        "number": "2021.0001",
        "date": "12-12-2021",
    },
    "products": [
        {
            "quantity": "2",
            "description": "Test1",
            "tax-rate": 6,
            "price": 33.87
        },
        {
            "quantity": "4",
            "description": "Test2",
            "tax-rate": 21,
            "price": 10.45
        }
    ],

};

easyinvoice.createInvoice(data, function (result) {

    fs.writeFileSync("invoice.pdf", result.pdf, 'base64');

});
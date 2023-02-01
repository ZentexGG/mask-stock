# Mask Stock

## Story

Congratulations!
Your developer business has a new client, one of the largest environmentally friendly reusable FFP2/KN95 mask supplier in Europe.
Their company wants to create a new B2B website for European hospitals to make the order and delivery easier.
Their stock is refilled on the first day of every month with 10.000 new masks.
Your new client contracted with 10 hospitals and every hospitals have a dedicated person who is responsible to place the orders.
List of the hospitals:
- Pécsi Irgalmasrendi Kórház, Pécs (Hungary)
- Miskolci Semmelweis Ignác Egészségügyi Központ és Egyetemi Oktatókórház, Miskolc (Hungary)
- Szent Pantaleon Kórház Kht., Dunaújváros (Hungary)
- Markhot Ferenc Oktatókórház és Rendelőintézet, Eger (Hungary)
- Fővárosi Önkormányzat Heim Pál Gyermekkórház, Budapest (Hungary)
- The Helios Hospital Berlin-Buch, Berlin (Germany)
- The University Hospital Duesseldorf, Duesseldorf (Germany)
- The University Hospital of Ludwig Maximilian University of Munich , Munich (Germany)
- Rigas Austrumu Kliniskas Universitates, Riga (Latvia)
- Karolinska University Hospital, Stockholm (Swened)

You have to create a web application where the hospitals' employee can login to their account and order new amount of masks.
The hospitals paying for the order with bank transfer 15 days due date.
The application should contain the following features: Automatically updated stock, order form, login and registration page, order history.
The application have to care about the invoicing as well. Your client asked you to solve it with Billingo's API so you have to check the API's documentation for the information needed for generating invoices with Billingo API (you order form have to include all the necessary details).
Don't forget that your Client's company is Hungarian so the Hungarian hospitals have to pay Hungarian TAX (VAT / ÁFA - 27%) but the hospitals form the other countries don't have to pay (if they have/set EU VAT Number).

## What are you going to learn?

- recap React JS, Node JS, Express JS
- use MongooseJS
- store data with mongoDB
- connect to an API on the server side (fetch GET/POST)

## Tasks

1. Create a noSQL database which able to store all the required data: Legal data of the hospitals. (Check Billingo API's documentation.) Accounts for the hospitals employees. (The users.) Orders and their details.
    - The database contains all the 10 hospitals
    - Each hospital's data contains all the legal data for issuing an invoice for the hospital
    - Every hospital have at least one user account
    - User accounts connected to one or two hospitals
    - An invoice is generated for every order
    - Every order is saved into the database
    - The amount of currently available masks is stored in the database
    - Every order affects the available amount of the masks

2. Connect to the Billingo API from the backend side, post all the orders to the API to generate invoices. Handling TAX / VAT is important!
    - Every order generates an invoice in Billingo
    - The tax is different for Hungarian hospitals than other EU hospitals

3. Create a web based order form where the employees (users) can place orders on behalf of their hospitals. Secure the order form so only (the allowed) users could access to it. A users could see the orders of their hospitals only.
    - The order form available only after login or registration
    - The users are able to add new hospitals
    - The users can see the hospitals data connected to their account
    - The users can select from their hospitals for issuing the invoice

## General requirements

None

## Hints

- Before you start the project, check the documentation of the Billingo API especially the required data for partner and invoice creation (build the hopsital database on those data)
- Pay special attention to the format of all API values (string, number, date formats)
- You can solve the registration and login with Passport.js

## Background materials

- <i class="far fa-exclamation"></i> [Billingo API documentation](https://app.swaggerhub.com/apis/Billingo/Billingo)
- <i class="far fa-exclamation"></i> [Passport JS](http://www.passportjs.org)
- <i class="far fa-book-open"></i> [MongoDB - NoSQL database](https://www.mongodb.com/)
- <i class="far fa-book-open"></i> [MongooseJS - MongoDB connector](https://mongoosejs.com/)
- <i class="far fa-book-open"></i> [Simple CRUD app with Node, Express, and MongoDB](https://zellwk.com/blog/crud-express-mongodb)
- <i class="far fa-book-open"></i> [Set up an Express.Js App With Passport.Js and Mongodb for Password Authentication](https://medium.com/swlh/set-up-an-express-js-app-with-passport-js-and-mongodb-for-password-authentication-6ea05d95335c)
- <i class="far fa-book-open"></i> [Authenticate Users With Node ExpressJS and Passport.js](https://heynode.com/tutorial/authenticate-users-node-expressjs-and-passportjs)

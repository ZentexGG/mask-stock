# Mask Stock

## Table of Contents

- [Introduction](#introduction)
- [Technologies & Libraries](#technologies--libraries)
- [Features](#features)
- [Installation](#installation)

## Introduction

Mask Stock is a project meant to make the proccess of ordering masks way easier for hospital administrators. You can create a new account on the site and select the hospitals the said account can manage.

## Technologies & Libraries
The main tech stack used in the project is MERN.
### Frontend
- React.js
- Bootstrap
- React Bootstrap
### Backend
- Node.js
- Express
- .env (for storing db connectiong string)
### Database
- MongoDB

## Features
Some of the main features of the site are listed below:
- Secure authentification and account creation
- Sessions using cookies
- Possibility for one account to manage more hospitals
- Updating mask stock ammount after an order
- Orders are all saved in the database
- Users can download an automatically generated PDF invoice
- Secured routes (i.e. you cannot access the order page if you're not logged in, or the login page if you're logged in)

## Installation

After cloning the repository, please install all dependencies for both server and client side using the following commands

### Client side

```bash
cd ./client
npm install
```

### Server side

```bash
cd ./server
npm install
```

### Populating
After you have installed all the dependencies for the client and server side, navigate to the server folder and populate the database using
```bash
npm run populate
```

This will add all the necessary data into your database with the name 'mask-stock'

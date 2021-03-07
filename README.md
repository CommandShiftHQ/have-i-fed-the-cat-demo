# Have I Fed The Cat?

A simple app for tracking when the cat was last fed. Useful for cats who know how to manipulate multiple humans.

## Running the app

This app requires a MySQL database. Connection details should be stored in a `.env` file:

```bash
DB_NAME=have_i_fed_the_cat_app_db
DB_HOST=localhost
DB_PASSWORD=password
DB_USER=root
DB_PORT=3307
```

Clone this repo and install dependencies:

```bash
git clone git@github.com:MCRcodes/have-i-fed-the-cat-demo.git
cd have-i-fed-the-cat-demo
npm install
npm start
```
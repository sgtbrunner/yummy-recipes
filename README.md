# Yummy Recipes

The ultimate recipe app is finally here!
Yummy Recipes can help you out with either your favourite recipes or your loved shopping list.

## Prerequisites

* NPM installed<br>
* A Firebase account (if you don't have one already) up and running

## Getting Started

On terminal:
1. Run `git clone https://github.com/sgtbrunner/yummy-recipes.git`
2. Run `cd yummy-recipes`
3. Run `npm install`
4. Replace DATABASE_URL and RECIPES_TABLE constants in the src/app/shared/constants/app-constants.ts file with your own Database URL and Recipe Table file name respectively
5. Create files environment.ts and environment.prod.ts in src/environments folder. In both files, place the following code:
   export const environment = {
      production: false (true if file is environment.prod.ts),
      API_KEY: '',
      MASTER_USER_ID: ''
   };
6. Fill in API_KEY and MASTER_USER_ID with your own API KEY and ADMIN LOGIN respectively.
7. Run `npm start`

## Built With

* HTML
* CSS
* Typescript
* Angular 9
* Firebase

## Authors

* **Guilherme Brunner** - *Initial work* - [sgtbrunner](https://github.com/sgtbrunner)

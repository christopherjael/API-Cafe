# API Cafe

Use `npm install` for installing dependencies.

## Endpoints

* GET `/api/users/` : Return a list of users.
    * Querys optionals
        * `limit` : Define maximum number of users of request, *default is 5*.
        * `skip` : Defines from which user the list will start, *default is 0*.

* POST `/api/users/:id` : Create a new user.
    * Params
        * `id` : It has to be a valid mongo id.
    * Body JSON
        * `name String` : Name of the user.
        * `email String` : Email of the user.
        * `password String` : Password of the user.
        * `role String`: Role of the user, can be **ADMIN_ROLE**, **USER_ROLE** or **SALES_ROLE**

* PUT `/api/users/:id` : Update a user.
    * Params
        * `id` : It has to be a valid mongo id.
    * Body JSON
        * `name String` : Name of the user.
        * `email String` : Email of the user.
        * `password String` : Password of the user.
        * `role String` : Role of the user, can be **ADMIN_ROLE**, **USER_ROLE** or **SALES_ROLE**
        * `google_auth Boolean` : Change to google_auth true or false.
* DELETE `/api/users/:id` : Delete a user
    * Params
        * `id` : It has to be a valid mongo id.
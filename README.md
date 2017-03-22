# Trello Clone App

This is my implementation of the Trello app. It's not intended as a complete and exact replica of the app. It's purpose purely for learning purposes

That said, below is the stack used for this Trello Clone App

# Stack

### Back-end

* `node + express`: Server and router
* `pug + stylus`: Pre-processor for html and css
* `json`: Used `json` data to persist the data. Used [custom built api](https://github.com/preyes323/JSON-crud) for parsing the JSON data for easy use with RESTful routes.
* `client-sessions + bcrypt`: Manage client sessions and securely store user information (i.e password)
* `gravatar`: Used for profile pictures
* `grunt`: For minification and uglification
* `csurf`: Used to manage CSRF attacks. Currently disabled. TODO: add public accessible API endpoint

### Front-end

* `backbone`: Manage front end application views and routes to minimize full page reloads.
* `jquery`: DOM interaction/manipulation and user interaction
* `moment.js`: Used to easily manipulate and manage date displayed
* `sortable`: Used for drag and drop functionality of elements
* `handlebars`: Stores templates/markup for used with backbone views

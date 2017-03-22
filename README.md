# Trello Clone App

This is my implementation of the Trello app. It's not intended as a complete and exact replica of the app. It's purpose purely for learning purposes. A major difference of this clone with the real one is that the "boards" are all personal for personal use.

For more details on what the trello app and its features are, vist [their website](https://trello.com/).

Here is a [link to my version](https://pure-everglades-14342.herokuapp.com) (clone) of the trello app.

#### For reference here are the features that my trello clone has:
* `User registration with login+sessions`: This makes the boards created visible and accessible only to you *when* logged-in
* `Board Creation/Deletion`: Users can add any number of `boards`. Consequently they can deleted those they don't need
* `List creation`: Within `boards` users can create any number of `lists`
* `Card creation`: Within `lists` users can create any number of `cards`
* `Search board`: Search boards
* `Notifications`: Notifications on actions that are possible (i.e card creation, list creation, boardeletion, card movement)

#### Features, I know off, that are not included:
* `Searching cards`: Search for cards and display context about it
* `Card attributes`: These are comments, labels, due dates, etc for the card.
* `emoji`: There is currently no emoji support.
* `List/Card deletion`: Currently these can't be deleted. The current approach is to have a list for `deleted/done` cards. Once all cards are deleted you can delete the `board`
* `List menu`: Manage the activities with a board. Activities include managing the labels and filtering cards.
* `User Profile`: Once the profile is created there is no way to edit or delete it.


# Stack

That said, below is the stack used for this Trello Clone App

### Back-end

* `node + express`: Server and router
* `pug + stylus`: Pre-processor for html and css
* `json`: Used `json` to persist the data. Used [custom built api](https://github.com/preyes323/JSON-crud) for parsing the JSON data for easy use with RESTful routes.
* `client-sessions + bcrypt`: Manage client sessions and securely store user information (i.e password)
* `gravatar`: Used for profile pictures
* `grunt`: For minification and uglification
* `csurf`: Used to manage CSRF. Currently disabled. TODO: add public accessible API endpoint

### Front-end

* `backbone`: Manage front end application views and routes to minimize full page reloads.
* `jquery`: DOM interaction/manipulation and user interaction
* `moment.js`: Used to easily manipulate and manage date displayed
* `sortable`: Used for drag and drop functionality of elements
* `handlebars`: Stores templates/markup for used with backbone views

# Data Model

For those interested this is the data-model that I used for the back-end given the current feature implemented:

![]

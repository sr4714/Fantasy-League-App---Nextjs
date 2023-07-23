Fantasy League APP

To Run:
    Create .env with RapidAPI key and MongoDB URI, .env.example included
    npm install
    npm run dev
    http://localhost:3000/

Basic Usage:
    Create an account
    Create a new team
    Search for players to add to team
    See other user's teams 
    Compare with other User's teams
    See all teams rankings

Features: 
    Player Search
    Persistent Login    
    All Teams Rankings
    Comapare your teams with other user's teams

Project Structure:
    /components
        /account
            index.js - Home component for /account
            layout.jsx - Provides a protected route for logged in users
        /users
            AddEdit.jsx - Component for viewing other user's teams
            AddEditTeam.jsx - Component for adding teams and players or editing teams
            index.jsx - Home component for /users
        Alert.jsx - Component for creating alerts
        Nav.jsx - Component for navigation bar
        NavLink.jsx - Component for navigation bar links
        SearchBar.jsx - Component for player's search text box
        SearchResult.jsx - Component for a single search result
        SearchResultList.jsx - Component for list of search results
        Spinner.jsx - Component for loading animation
    /helpers
        /api
            /api-handler.js - Middleware to help with supported api calls and jwt
            /db.js - Middleware to help with MongoDB connection and schemas
            /error-handler.js - Middleware to help with error messages received from the api
            /index.js - exports for all other files
            /jwt-middleware.js - Middleware for jwt auth
            /user-repo.js - Middleware for mongoDB CRUD operations
        /fetch-wrapper.js - Middleware for fetch operations and auth for making api calls
        /index.js - export fetch-wrapper
    /node_modules
    /pages
        /account
            login.jsx - Protected user login page
            register.jsx Protected user registration page
        /api
            /users
                [id].js - Parameterised endpoint for user functions
                authenticate.js - Endpoint for authenticating user
                index.js - Home endpoint for /users, gets all users
                register.jsx - Endpoint for registrating users
            getKey.js - Endpoint for getting RapidAPI key
            getURI.js - Endpoint for getting MongoDB URI, not working
        /users
            /compare
                [id].jsx - Parameterised route for selecting user to compare teams with
            /edit
                /[id]
                    /[name]
                        /[cteam].jsx - Parameterised route for comparing two teams
                    [name].jsx - Parameterised route for selecting a user's team to compare with
                [id].jsx - Protected parameterised route for viewing a user's teams   
            /team
                [id].jsx - Protected parameterised route for editing a team
            add.jsx - Protected route for adding a new user, deprecated
            addTeam.jsx - Protected route for adding a new team
            index.jsx - Home route for /users, displays and all users
            rankings.jsx - Route for displaying a sorted list of all user's teams
            teams.jsx - Route for displaying a user's team with all options to compare, edit, add, and delete
        _app.js - Checks for authorization and routes to login if not
        _document.js
    /services
        alert.service.js - Creates alerts for success and error messages
        index.js - Export for alert.service and user.service
        user.service.js - Update, delete, get functions for users, exports logged in user


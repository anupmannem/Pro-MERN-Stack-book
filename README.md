# Babel compile

_babel src --presets react --out-dir static_ - compiles a .jsx file to js file to static dir

_babel src --presets react --out-dir static --watch_ - watches for changes in jsx file

_babel src --presets react,es2015 --out-dir static_ - includes capabilities of ES6\ECMAScript2015 features

running the application

-   npm run compile
-   npm start

# Component Composition

Building components that uses user-defined components apart from built-in react components  
It lets you split the UI into smaller independent pieces.

## Passing data (using properties)

Using properties you can pass data from parent component to child component and make it render differently on different instances.

Any data passed in from the parent can be accessed in the child component through `this.props`

## Property Validation

Properties being passed from one component to another are validated against a specification.  
This specification is supplied in the form of static object called _propTypes_ (with name of the property as the key and the validator as the value).

**property validation is checked only in development mode** and a warning is shown in console when any validation is failed.

# Dynamic Composition

Replacing hardcoded components with programatically generated set.  
For example, we create an array and pass that array as input.

-   IssueList renders IssueTable component
    -   passing a global array into IssueTable component with attribute issues
    -   rendering multiple IssueRows in IssueTable component using map function
        -   passing the array data to IssueRow component with attribute issue

# Setting State

To make components that respond to user inputs and other events, React uses a datastructure called `state` in the component.
The state essentially holds the model, something that can change, as opposed to immutable properties in the form of props.  
React treats a component as a simple state machine.Whenever the state changes, it triggers a rerender of the component and the view automatically changes.

The way to inform React of a state change is by using the `setState()` method.

-   this method takes in an object and top level properties are merged into the existing state.
-   within the component, you can access the properties via `this.state` variable.
-   the initialization of state is done in the constructor.

This is what **declarative programming** paradigm is all about, you just mutate the model(state) and views rerender itself to reflect the changes.

# Event Handling

To handle button's click event, we attach the handle function to the onClick attribute.

## Child to Parent communication

The child does not have access to the parent's methods. The way to communicate from child to a parent is by passing _callbacks_ from the parent to the child.

-   In this case, we pass `createIssue` as a callback property from _IssueTable_ to _IssueAdd_ component.

From the child, you just call the passed function in the handler(`'handleSubmit'`) to create a new issue. And within this method, we read the form's input values and using them we call the `createIssue` function which is available via _this.props_.

#### onSubmit vs onClick

-   both events are acceptable, but using `onSubmit` will allow user to press _enter_ to add a new issue in addition to clicking the button.

# Stateless components

1. IssueList has lots of methods, a state, initialization and functions that modify the state.
2. Incomparision, IssueAdd has some interactivity, but no state (we are not capturing any, in this case).
3. IssueRow and IssueTable have nothing but a `render()` method.

For performance reasons, it is recommended that such components are written as functions rather than classes.

# Designing Components

### State vs Props

-   Both state and props hold model information, but they are different.
-   the props are immutable, but state is not.
-   state variables are passed down to child components as props, because child don't maintain or modify them.
-   if any event in child changes the parent's state, the child calls a method defined in the parent. Access to this method should have been explicitly given by passing it as a callback via props.

**parent communicate with children via props, and children to parent via callback**  
_siblings can't communicate with eachother, if there is a need then the information has to go up the hierarchy and back down_.

**state is immutable**, so use methods like concat() to add to it.

---

# EXPRESS

### Routing

-   takes a client request
-   matches against any routes that are present
-   executes a handler function that is associated with that route
    -   handler function is expected to generate the appropriate response.

The handler function is passed in a request and response object. The request object can be inspected to get the various details of the request, and the response object's methods can be used to send the response to the client.

#### Writing a handler function

To setup a route, you use a function to indicate which HTTP method to use.

-   to handle a GET HTTP method, you use `app.get()` function
-   you pass in a pattern to match and a function to deal with the request if it does match.

```javascript
// if you receive get request to the URL /hello then do this
app.get("/hello", (req, res) => {
    res.send("hello world!");
});
```

#### Request Matching

When a request is received, first thing that happens is request matching.

-   the get function was called, indicating it should match only the GET HTTP method.
-   and also the request URL with path spec _'/hello'_
-   if a request matches this spec, then the handler is called.

#### Route Parameters

Route parameters are named segments in the path specification that match a part of the URL.  
ex - `app.get('/customers/:customerId', ...)`

-   the URL /customers/1234 will match the above route specification, and so will /customers/4567.
    In either case, if match occurs, the value in that part of the URL is supplied as a variable in the request object and supplied to the handler function as part of **`req.params`**, with the name of the parameter as the key.
-   req.params.customerId will have the values 1234 or 4567 for each of those URLs respectively.

#### Route Lookup

Multiple routes can be setup to match different URLs and patterns. The router does not try to find a best match,instead it tries to match all the routes in the order they were installed. So if two routes are possible matches to a request, it will use the first defined one.  
ex - if you want to match everything that goes under `/api/`, that is a pattern like `/api/*`, you should add this route only after all the specifc routes that handle paths such as /api/issues, etc...

### Request Objects

-   req.query: holds a parsed query string
    -   ex -order[status]=closed, can be accessed as `req.query.order.status`
-   req.header: gives access to any header in the request (key-value pairs)
-   req.path: contains the path part of the URL, i.e everything upto '?' in the URL
-   req.url, req.originalURL: contains the complete URL including the query strings
-   req.body: contains body of the request, valid for POST-PUT-PATCH requests.
    These are few of the objects, to read about all the request objects checkout the [documentation](http://expressjs.com/en/api.html#req)

### Response Objects

The response object is used to construct and send a response to a request. **If no response is sent, client is left waiting**.

-   res.send: responds with a string, also accepts buffer
-   res.status(code): sets the status response code
-   res.json(object): same as res.send, except this method forces conversion of the parameter passed into a JSON.
-   res.sendFile(path): responds with contents of file at path.
    These are few of the objects, to read about all the response objects checkout the [documentation](http://expressjs.com/en/api.html#res)

### Middleware

Middleware functions are those that have access to request, response objects and the next middleware function in the application's request-response cycle.

-   the next middleware function is commonly denoted by a variable named `next`
-   `express.static` is a middleware function which serves static files.

_Middleware can be at application level(i.e applies to all requests) or the router level(i.e applies to specific request path patterns)_  
Middleware is invoked using `app.use(middlewareFunction)`

#### Handling Error messages

The error message can be returned in the `response.body` as a JSON string. We can return an object with single property called `message` that holds a readable as description.  
At the server, sending an error is simple. All you need to do is set the status using `res.status()` and send the error messages as the response.

### Tools for express
- **nodemon**
    + to automatically restart the server, on changes
    + `npm install nodemon --save-dev`
- **body-parser**
    + to parse request bodies and convert to object
    + `npm install body-parser --save`
    + body-parser places the result of parsing into request's body property `(req.body)`.

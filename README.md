# Babel compile

_babel src --presets react --out-dir static_ - compiles a .jsx file to js file to static dir

_babel src --presets react --out-dir static --watch_ - watches for changes in jsx file

_babel src --presets react,es2015 --out-dir static_ - includes capabilities of ES6\ECMAScript2015 features

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

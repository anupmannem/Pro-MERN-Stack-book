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

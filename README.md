# marionette-vine

Hierarchy scoped events for Marionette

[![Travis build status](http://img.shields.io/travis/th3hunt/marionette-vine.svg?style=flat)](https://travis-ci.org/th3hunt/marionette-vine)
[![Dependency Status](https://david-dm.org/th3hunt/marionette-vine.svg)](https://david-dm.org/th3hunt/marionette-vine)
[![devDependency Status](https://david-dm.org/th3hunt/marionette-vine/dev-status.svg)](https://david-dm.org/th3hunt/marionette-vine#info=devDependencies)


## The Goal

This project aims to provide Marionette 2+ applications with view hierarchy based event bubbling similar to that provided by `$scope#emit()` in Angular 1.x. It should answer the common need of letting a view notify all its parent views about something without being directly aware of its placement in the view tree and without polluting all possible intermediate views with event propagation code. 


Why bring something over to Marionette when it's being abandoned elsewhere? Are there no alternatives?


Well, I think that in a Marionette app, sometimes all alternatives are inferior and inevitably lead to boilerplate code and spreading of a single responsibility to many components. Angular had its reasons to get rid of scope `$scope`, as people tended to depend their components (controllers) on it instead of building interfaces for them. However, I believe that `$emit` and `$broadcast` will be missed as no [alternative](http://stackoverflow.com/questions/34700438/global-events-in-angular-2) seems satisfying enough to me except maybe from directly using [zones](https://github.com/angular/zone.js/).


If using React + Flux/Redux on the other hand, [context](https://facebook.github.io/react/docs/context.html) provides a scope mechanism, but the unidirectional event flow paradigm makes scoped events redundant.  


Finally, Backbone.Radio channels are great but won't provide scope transparently either. A channel per scope, would mean that all components should somehow find out the scope (or an identifier of it) they belong to in order to use it like `Radio.channel('scope identifier')`. So back to square one.


### API (proposed)

```javascript
// Marionette.View

scopeEvents: {
  'foo': 'onFoo'
}

this.scope.trigger('foo');

```

# marionette-vine

Hierarchy scoped events for Marionette

[![Travis build status](http://img.shields.io/travis/th3hunt/marionette-vine.svg?style=flat)](https://travis-ci.org/th3hunt/marionette-vine)
[![Dependency Status](https://david-dm.org/th3hunt/marionette-vine.svg)](https://david-dm.org/th3hunt/marionette-vine)
[![devDependency Status](https://david-dm.org/th3hunt/marionette-vine/dev-status.svg)](https://david-dm.org/th3hunt/marionette-vine#info=devDependencies)


## The Goal

This project aims to provide Marionette 2+ applications with view hierarchy based event bubbling similar to that provided by `$scope#emit()` in Angular 1.x. It should answer the common need of letting a view notify all its parent views about something without being directly aware of its placement in the view tree and without polluting all possible intermediate views with event propagation code. 


Why bring something over to Marionette when it's being abandoned elsewhere? Are there no alternatives?


Angular had its reasons to get rid of scope `$scope`, as people did tend to use it for pretty much anything. From local state to global state and inter-component communication. However, I believe that `$emit` and `$broadcast` will be missed as no [alternative](http://stackoverflow.com/questions/34700438/global-events-in-angular-2) seems satisfying enough to me except maybe from directly using [zones](https://github.com/angular/zone.js/).


If using React + Flux/Redux on the other hand, [context](https://facebook.github.io/react/docs/context.html) provides a scope mechanism, but the unidirectional event flow paradigm makes scoped events redundant.  


What about Backbone/Marionette? Well, in a Marionette app there is not native scope of any sort. Backbone.Radio channels are great but won't provide scope transparently. A channel per scope, would mean that all components should somehow find out the scope they belong to in order to use it like `Radio.channel('scope identifier')`. So back to square one. All other alternatives suffer from the same disease of boilerplate code and spreading of a single responsibility to many components.


### How to use

```javascript
// Consider the following view hierarchy
// (A) LayoutView 
//     (A1) Region
//          (B) LayoutView
//              (B1) Region      
//                   (C) CollectionView
//                       (C1) ItemView
//                       (C2) ItemView
//                       (C3) ItemView

const A = Marionette.LayoutView.extend({
  template,
  
  regions: {
    'a1': '#a1'
  },
  
  scopeEvents: {
    'foo': 'onFoo'
  },
  
  onFoo() {
    console.log('foo in A');
  }
});

...

const C1 = Marionette.ItemView.extend({
  events: {
    'click': 'onClick'
  },

  onClick() {
    this.scope.trigger('foo');
  }
});

// Clicking on C1 will result in "foo in A" printed on the console
```

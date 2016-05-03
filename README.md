# marionette-vine

Hierarchy scoped events for Marionette

[![Travis build status](http://img.shields.io/travis/th3hunt/marionette-vine.svg?style=flat)](https://travis-ci.org/th3hunt/marionette-vine)
[![Dependency Status](https://david-dm.org/th3hunt/marionette-vine.svg)](https://david-dm.org/th3hunt/marionette-vine)
[![devDependency Status](https://david-dm.org/th3hunt/marionette-vine/dev-status.svg)](https://david-dm.org/th3hunt/marionette-vine#info=devDependencies)


## The Goal

This project aims to provide Marionette 2+ applications with view hierarchy based event bubbling like that provided by `Angular's` `$rootScope.Scope#$emit`. It should answer the common need of letting a view notify all its parent views about something without being directly aware of its placement in the view tree and without polluting all possible intermediate views with event propagation code. 


Why introduce hierarchy based events when such practices seem to get abandoned? Well, if using React + Flux/Redux, even if [context](https://facebook.github.io/react/docs/context.html) provides a scope mechanism, unidirectional event flow paradigm makes scoped events redundant. Angular 2.x uses [zones](https://github.com/angular/zone.js/) to deal with scope, which is cool but only if you're prepared to incorporate a library that overrides every single asynchronous browser method to your project. Finally, Backbone.Radio channels are great but won't provide scope. 


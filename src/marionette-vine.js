import Backbone from 'backbone';
import _ from 'underscore';
import Marionette from 'backbone.marionette';

const Vine = Marionette.Vine = Object.create(null);

function Events() {}
Events.prototype = Backbone.Events;

/**
 * Vine.Scope
 * ----------
 *
 * A vine scope has an owner (typically a Marionette.View)
 * which is part of a view hierarchy.
 *
 * @param {object} owner - a Marionette.Object that is part of a view hierarchy
 *                         which can traversed upwards via the owner._parent property
 */
class Scope extends Events {
  constructor(owner) {
    super();
    this.owner = owner;
  }

  trigger(...args) {
    Backbone.Events.trigger.apply(this, args);
    const parentScope = this.getParentScope();
    if (parentScope) {
      parentScope.trigger(...args);
    }
  }

  getParentScope() {
    return this.owner._parent && this.owner._parent.scope;
  }
}

Vine.Scope = Scope;

function addScopedEvents(View) {
  const _super = _.pick(View.prototype, 'delegateEvents', 'undelegateEvents');

  _.extend(View.prototype, {

    delegateEvents(events) {
      _super.delegateEvents.call(this, events);
      this.bindEntityEvents(this.scope, this.getOption('scopeEvents'));
      _.each(this._behaviors, (behavior) => {
        behavior.bindEntityEvents(this.scope, behavior.getOption('scopeEvents'));
      });
      return this;
    },

    undelegateEvents(events) {
      _super.undelegateEvents.call(this, events);
      this.unbindEntityEvents(this.scope, this.getOption('scopeEvents'));
      _.each(this._behaviors, (behavior) => {
        behavior.unbindEntityEvents(this.scope, behavior.getOption('scopeEvents'));
      });
      return this;
    }

  });

  return View;
};

Vine.extend = function extend(Component) {
  if (Component.prototype instanceof Backbone.View) {
    addScopedEvents(Component);
  }
  return Component.extend({
    constructor() {
      this.scope = new Scope(this);
      Component.apply(this, arguments);
    }
  });
};

Vine.installTo = function installTo(Marionette) {
  Marionette.Object = Vine.extend(Marionette.Object);
  Marionette.Controller = Vine.extend(Marionette.Controller);
  Marionette.View = Vine.extend(Marionette.View);
};

export default Vine;

import Marionette from 'backbone.marionette';
import _ from 'underscore';

const ChildView = Marionette.ItemView.extend({

  tagName: 'li',

  template: _.template('child view')

});

export default Marionette.CollectionView.extend({

  tagName: 'ul',

  childView: ChildView

});

import Marionette from 'backbone.marionette';
import _ from 'underscore';

export default Marionette.LayoutView.extend({

  template: _.template(`
    <div id="foo"></div>
    <div id="bar"></div>
    `),

  regions: {
    fooRegion: '#foo',
    barRegion: '#bar'
  }

});

import Marionette from 'backbone.marionette';
import _ from 'underscore';

export default Marionette.ItemView.extend({

  template: _.template(`
    <p>
    item view
    </p>
    `)

});

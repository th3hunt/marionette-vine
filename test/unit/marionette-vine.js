import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Vine from '../../src/marionette-vine';
import LayoutView from './layoutView';
import CollectionView from './collectionView';
import ItemView from './itemView';

Vine.installTo(Marionette);

describe('Vine', () => {
  it('should be available as Marionette.Vine', () => {
    expect(Marionette.Vine).to.eq(Vine);
  });

  describe('Scope', () => {
    let layoutView;
    let collectionView;
    let itemView;

    beforeEach(() => {
      let collection = new Backbone.Collection([{
        id: 1,
        child: 1
      }, {
        id: 1,
        child: 2
      }]);

      layoutView = new LayoutView();
      collectionView = new CollectionView({collection});
      itemView = new ItemView();

      layoutView.render();
      layoutView.fooRegion.show(collectionView);
      layoutView.barRegion.show(itemView);
    });

    afterEach(() => {
      itemView.destroy();
      collectionView.destroy();
      layoutView.destroy();
    });

    describe('#trigger(event, *args)', () => {
      it('triggers the event on the scope instance itself', () => {
        const spy = sinon.spy();
        itemView.scope.on('boom', spy);
        itemView.scope.trigger('boom');
        expect(spy).to.have.been.calledOnce;
      });

      it('triggers the event on the parent Layout scope', () => {
        const spy = sinon.spy();
        layoutView.scope.on('boom', spy);
        itemView.scope.trigger('boom');
        expect(spy).to.have.been.calledOnce;
      });

      it('triggers the event on the parent CollectionView scope', () => {
        const spy = sinon.spy();
        collectionView.scope.on('boom', spy);
        collectionView.children.findByIndex(0).scope.trigger('boom');
        expect(spy).to.have.been.calledOnce;
      });
    });
  });

  describe('scopeEvents', () => {
    const onBar = sinon.spy();
    const CoolBehavior = Marionette.Behavior.extend({
      scopeEvents: {
        'baz': 'onBaz'
      },
      onBaz() {}
    });
    const ScopedView = Marionette.View.extend({
      behaviors: {
        CoolBehavior: {
          behaviorClass: CoolBehavior
        }
      },
      scopeEvents: {
        foo: 'onFoo',
        bar: onBar
      },
      onFoo() {}
    });

    it('provide declarative event binding on the view scope', () => {
      const onFoo = sinon.spy(ScopedView.prototype, 'onFoo');
      const onBaz = sinon.spy(CoolBehavior.prototype, 'onBaz');
      const view = new ScopedView();

      view.scope.trigger('foo');
      expect(onFoo).to.have.been.calledOnce;
      view.scope.trigger('bar');
      expect(onBar).to.have.been.calledOnce;
      view.scope.trigger('baz');
      expect(onBaz).to.have.been.calledOnce;

      onFoo.reset();
      onBar.reset();
      onBaz.reset();

      view.destroy();

      view.scope.trigger('foo');
      expect(onFoo).to.not.have.been.called;
      view.scope.trigger('bar');
      expect(onBar).to.not.have.been.called;
      view.scope.trigger('baz');
      expect(onBaz).to.not.have.been.called;
    });
  });
});

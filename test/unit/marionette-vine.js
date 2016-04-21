import Marionette from '../../src/marionette-vine';

describe('Marionette', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(Marionette, 'greet');
      Marionette.greet();
    });

    it('should have been run once', () => {
      expect(Marionette.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(Marionette.greet).to.have.always.returned('hello');
    });
  });
});

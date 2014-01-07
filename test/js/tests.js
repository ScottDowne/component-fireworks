(function () {
  var fireworkElement;
  var iframeHandler;
  beforeEach(function (done) {
    iframeHandler = harnessUtils.createIframe('test/html/test.html', function (win, doc) {
      fireworkElement = iframeHandler.document.querySelector('ceci-fireworks');
      done();
    });
  });

  describe('Ceci Fireworks', function () {

    test('Broadcasts', function (done) {
      iframeHandler.testBroadcasts(fireworkElement, done, {
        check: {
          kaboom: function (e, channel) {
            chai.assert.equal(e.detail.data, 'Pew Pew', 'Component attached correct value to event.');
            chai.assert.equal(e.detail.data, fireworkElement.getAttribute('fireworkSound'), 'Correct component broadcasted ' + channel + ' event.');
          }
        },
        execute: {
          kaboom: function (channel) {
            console.log( channel );
            fireworkElement.shootRocket();
          }
        }
      });
    });

    test('Listeners', function (done) {
      iframeHandler.testListeners(fireworkElement, done, {
        check: {
          shootRocket: function (e, channel) {
            chai.assert(true, 'shootRocket event occured.');
          },
          shootThisManyRockets: function (e, channel) {
            chai.assert( true, 'shootThisManyRockets event occured.');
          }
        }
      });
    });
  });
})();

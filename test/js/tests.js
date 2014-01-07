console.log( "OK WAT" );
(function () {
  var fireworkElement;
  var iframeHandler;
  beforeEach(function (done) {
      console.log( "WAT?" );
    iframeHandler = harnessUtils.createIframe('test/html/test.html', function (win, doc) {
      fireworkElement = iframeHandler.document.querySelector('ceci-fireworks');
      done();
    });
  });

  describe('Ceci Fireworks', function () {
    test('Sanity check', function (done) {
      console.log( fireworkElement );
      chai.assert(fireworkElement.ceci, 'Ceci descriptor exists.');
      iframeHandler.runIframeTest('Sanity Check', done);
    });

    test('Broadcasts', function (done) {
      iframeHandler.testBroadcasts(fireworkElement, done, {
        check: {
          kaboom: function (e, channel) {
            chai.assert.equal(e.detail.data, 'Pew Pew', 'Component attached correct value to event.');
            chai.assert.equal(e.detail.data, fireworkElement.getAttribute('fireworkSound'), 'Correct component broadcasted ' + channel + ' event.');
          }
        },
        execute: {
          shootRocket: function (channel) {
            fireworkElement.shootRocket();
          },
          shootThisManyRockets: function (channel) {
            fireworkElement.shootThisManyRockets( 12 );
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
            chai.assert( e.detail.data, 12, 'shootThisManyRockets shot 12 rockets');
          }
        }
      });
    });
  });
})();

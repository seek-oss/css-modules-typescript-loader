const compiler = require('../compiler.js');

test('Can verify valid declaration', async () => {
  // just validate webpack build passes
  await compiler(require.resolve('./index.js'), {
    mode: 'verify'
  });
});

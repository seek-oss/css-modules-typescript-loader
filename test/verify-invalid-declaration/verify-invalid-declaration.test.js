const compiler = require('../compiler.js');

test('Can error on invalid declaration', async () => {
  await expect(
    compiler(require.resolve('./index.js'), {
      mode: 'verify'
    })
  ).rejects.toMatchObject({
    failed: true
  });
});

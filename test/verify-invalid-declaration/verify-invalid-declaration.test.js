const compiler = require('../compiler.js');
const getErrorMessage = require('../getErrorMessage');

test('Can error on invalid declaration', async () => {
  expect.assertions(1);

  try {
    await compiler(require.resolve('./index.js'), {
      mode: 'verify'
    });
  } catch (err) {
    expect(getErrorMessage(err.errors[0])).toMatchSnapshot();
  }
});

const compiler = require('../compiler.js');
const getErrorMessage = require('../getErrorMessage');

test('Can error on invalid declaration', async () => {
  expect.assertions(1);

  try {
    await compiler(require.resolve('./index.js'), {
      mode: 'verify'
    });
  } catch (err) {
    // make test robust for Windows by replacing backslashes in the file path with slashes
    let errorMessage = getErrorMessage(err.errors[0]).replace(/(?<=Error:.*)\\/g, "/");

    expect(errorMessage).toMatchSnapshot();
  }
});

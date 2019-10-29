const fs = require('fs');
const compiler = require('../compiler.js');

test('Should have prefixed interface name', async () => {
  expect.assertions(1);

  await compiler(require.resolve('./index.js'), {
    prefix: 'I'
  });

  const declaration = fs.readFileSync(
    require.resolve('./index.css.d.ts'),
    'utf-8'
  );

  expect(declaration).toMatchSnapshot();
});

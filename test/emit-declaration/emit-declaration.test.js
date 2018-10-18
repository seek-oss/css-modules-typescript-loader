const fs = require('fs');
const compiler = require('../compiler.js');

test('Can emit valid declaration', async () => {
  await compiler(require.resolve('./index.js'));

  const declaration = fs.readFileSync(
    require.resolve('./index.css.d.ts'),
    'utf-8'
  );

  expect(declaration).toMatchSnapshot();
});

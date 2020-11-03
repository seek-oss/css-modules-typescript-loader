const fs = require('fs');
const compiler = require('../compiler.js');

test('Can add custom banners', async () => {
  await compiler(require.resolve('./index.js'), {
    banner: "// @generated",
  });

  const declaration = fs.readFileSync(
    require.resolve('./index.css.d.ts'),
    'utf-8'
  );

  expect(declaration).toMatchSnapshot();
});

[![Build Status](https://img.shields.io/travis/seek-oss/css-modules-typescript-loader/master.svg?style=flat-square)](http://travis-ci.org/seek-oss/css-modules-typescript-loader) [![npm](https://img.shields.io/npm/v/css-modules-typescript-loader.svg?style=flat-square)](https://www.npmjs.com/package/css-modules-typescript-loader) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

# css-modules-typescript-loader

[Webpack](https://webpack.js.org/) loader to create [TypeScript](https://www.typescriptlang.org/) declarations for [CSS Modules](https://github.com/css-modules/css-modules).

Emits TypeScript declaration files matching your CSS Modules in the same location as your source files, e.g. `src/Component.css` will generate `src/Component.css.d.ts`.

## Why?

There are currently a lot of [solutions to this problem](https://www.npmjs.com/search?q=css%20modules%20typescript%20loader). However, this package differs in the following ways:

- Encourages generated TypeScript declarations to be checked into source control, which allows `webpack` and `tsc` commands to be run in parallel in CI.

- Ensures committed TypeScript declarations are in sync with the code that generated them via the [`verify` mode](#verify-mode).

## Usage

Place `css-modules-typescript-loader` directly after `css-loader` in your webpack config.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
};
```

### Verify Mode

Since the TypeScript declarations are generated by `webpack`, they may potentially be out of date by the time you run `tsc`. To ensure your types are up to date, you can run the loader in `verify` mode, which is particularly useful in CI.

For example:

```js
{
  loader: 'css-modules-typescript-loader',
  options: {
    mode: process.env.CI ? 'verify' : 'emit'
  }
}
```

Instead of emitting new TypeScript declarations, this will throw an error if a generated declaration doesn't match the committed one. This allows `tsc` and `webpack` to run in parallel in CI, if desired.

This workflow is similar to using the [Prettier](https://github.com/prettier/prettier) [`--list-different` option](https://prettier.io/docs/en/cli.html#list-different).

### Named Exports

If using the `namedExports` option of `css-loader` then you can enable the same option in this loader. This can improve tree shaking and reduce bundled JavaScript size by dropping the original class names.

## With Thanks

This package borrows heavily from [typings-for-css-modules-loader](https://github.com/Jimdo/typings-for-css-modules-loader).

## License

MIT.

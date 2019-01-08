module.exports = error => error
  .split(process.cwd())
  .join('')
  .match(/(Error: .*?)\s{4}at /s)[1];

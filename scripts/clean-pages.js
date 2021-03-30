const path = require('path');
const rimraf = require('rimraf');
const config = require('../i18n');

const dstPath = path.join(__dirname, '../', config.finalPagesDir);

rimraf(dstPath, () => {
  // noop
});

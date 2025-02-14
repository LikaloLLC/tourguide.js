const {generateDocumentation} = require('tsdoc-markdown');

const utilsInputFiles = [
  '@types/index.ts',
  'src/Tour.ts'
];

generateDocumentation({
  inputFiles: utilsInputFiles,
  outputFile: 'docs/README.md',
  buildOptions: {
    explore: true,
    types: true,
    repo: {
      url: 'https://github.com/LikaloLLC/tourguide.js'
    }
  }
});
module.exports = {
  name: 'miniurl',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/miniurl',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

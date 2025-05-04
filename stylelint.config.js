module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  plugins: [
    'stylelint-value-no-unknown-custom-properties',
    'stylelint-at-rule-no-children',
    'stylelint-media-use-custom-media',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  ignoreFiles: ['./src/ui/styles/reboot.css'],
  defaultSeverity: 'error',
  rules: {
    'aditayvm/at-rule-no-children': [{ignore: ['define-mixin', 'mixin']}],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'define-mixin'],
      },
    ],
    'plugin/declaration-block-no-ignored-properties': true,
    'csstools/media-use-custom-media': [
      'known',
      {
        importFrom: ['./src/ui/styles/media.css'],
      },
    ],
    'csstools/value-no-unknown-custom-properties': [
      true,
      {
        importFrom: ['./src/ui/styles/variables.css'],
      },
    ],
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-no-important': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'max-nesting-depth': [
      3,
      {
        ignore: ['blockless-at-rules', 'pseudo-classes'],
      },
    ],
    'no-duplicate-selectors': true,
    'no-invalid-double-slash-comments': true,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
    'selector-max-compound-selectors': 2,
    'selector-max-id': 0,
    'selector-max-type': 0,
    'selector-max-universal': 0,
    'selector-pseudo-element-no-unknown': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
    'shorthand-property-no-redundant-values': true,
    'string-no-newline': true,
  },
};

module.exports = {
  plugins: [
    // [
    //   'postcss-simple-vars',
    //   {
    //     variables: function () {
    //       return {APP_STATIC_URL: process.env.APP_STATIC_URL, APP_STATIC_BASE_URL: process.env.APP_STATIC_BASE_URL};
    //     },
    //   },
    // ],
    'postcss-simple-vars',
    'postcss-mixins',
    'postcss-flexbugs-fixes',
    'postcss-import',
    'postcss-nested',
    'postcss-custom-properties',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    [
      'postcss-custom-media',
      {
        // хардкодим адрес файла с custom-media, потому что
        // если добавить import custom-media в файл css,
        // то custom-media не работают
        importFrom: './src/ui/styles/media.css',
      },
    ],
  ],
};

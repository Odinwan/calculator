const path = require('path');

module.exports = {
    webpack: {
        devtool: 'source-map',
        alias: {
            '@sections': path.resolve(__dirname, './src/sections'),
            '@core': path.resolve(__dirname, './src/core'),
            '@settings': path.resolve(__dirname, './src/settings'),
        },
        configure: (webpackConfig) => {
            // Установите желаемое имя для файла bundle.js
            webpackConfig.output.filename = 'static/js/bundle.js';

            // Установите желаемое имя для CSS файла
            webpackConfig.plugins.forEach((plugin) => {
                if (plugin.constructor.name === 'MiniCssExtractPlugin') {
                    plugin.options.filename = 'static/css/bundle.css'; // Здесь вы можете указать желаемое имя для CSS файла
                }
            });
            return webpackConfig;
        },
    },
};

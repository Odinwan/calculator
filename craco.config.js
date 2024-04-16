const path = require('path');

module.exports = {
    webpack: {
        devtool: 'source-map',
        alias: {
            '@app': path.resolve(__dirname, './src/app'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@core': path.resolve(__dirname, './src/core'),
            '@components': path.resolve(__dirname, './src/components'),
            '@context': path.resolve(__dirname, './src/contexts'),
            '@services': path.resolve(__dirname, './src/services'),
            '@settings': path.resolve(__dirname, './src/settings'),
            '@pages': path.resolve(__dirname, './src/pages'),
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

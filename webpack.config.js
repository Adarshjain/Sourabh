const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path')

module.exports = async function(env, argv) {
    return await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components']
        }
    }, argv);
};

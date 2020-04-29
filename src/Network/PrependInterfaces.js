module.exports = {
    plugin: () => {
        return 'export type GQLInput<T> = {input: T};';
    },
};
export default {
    moduleNameMapper: {
        '@core/(.*)$': '<rootDir>/src/$1',
    },
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {useESM: true}],
    },
}

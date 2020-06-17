import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'databases', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'databases', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'databases', 'seeds')
    },
    useNullAsDefault: true,
}
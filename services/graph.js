const url = process.env.GRAPHENEDB_BOLT_URL || process.env.BOLT_URL;
const user = process.env.GRAPHENEDB_BOLT_USER || process.env.BOLT_USER;
const password = process.env.GRAPHENEDB_BOLT_PASSWORD || process.env.BOLT_PASSWORD;

const driver = neo4j.driver(url, neo4j.auth.basic(user, password));

module.exports = driver;

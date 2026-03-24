const { createClient } = require('@libsql/client');
const client = createClient({ 
    url: process.env.URL_CONNECTION,
    authToken: process.env.TOKEN_AUTH
});

async function initDB() {

    // Create users table with boolean fields
    let queryUsers = 'CREATE TABLE IF NOT EXISTS users (';
    queryUsers += 'user_name TEXT NOT NULL, ';
    queryUsers += 'birth_date TEXT, ';
    queryUsers += 'user_email TEXT PRIMARY KEY NOT NULL, ';
    queryUsers += 'user_password TEXT NOT NULL, ';
    queryUsers += 'phone_number TEXT, ';
    queryUsers += 'include_email BOOLEAN, ';
    queryUsers += 'region TEXT, ';
    queryUsers += 'is_admin BOOLEAN NOT NULL );';
    await client.execute(queryUsers);
    
    // Create user_projects table with boolean fields
    let queryProjects = 'CREATE TABLE IF NOT EXISTS user_projects (';
    queryProjects += 'email TEXT NOT NULL, ';
    queryProjects += 'progLang TEXT NOT NULL, ';
    queryProjects += 'projName TEXT NOT NULL, ';
    queryProjects += 'description TEXT, ';
    queryProjects += 'region TEXT NOT NULL, ';
    queryProjects += 'contributors INTEGER, ';
    queryProjects += 'diffcultyRange INTEGER, ';
    queryProjects += 'wantDesign BOOLEAN NOT NULL, ';
    queryProjects += 'wantServerHosting BOOLEAN NOT NULL, ';
    queryProjects += 'wantMarketing BOOLEAN NOT NULL, ';
    queryProjects += 'wantCodeCleanup BOOLEAN NOT NULL, ';
    queryProjects += 'PRIMARY KEY(email, projName), ';
    queryProjects += 'FOREIGN KEY(email) REFERENCES users(user_email) ON DELETE CASCADE );';
    await client.execute(queryProjects);
}

module.exports = { client, initDB };
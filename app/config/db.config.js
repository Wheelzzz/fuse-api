const config = {
  HOST: "n6tzc76eqz.database.windows.net",
  PORT: "1433",
  USER: "kwheeler",
  PASSWORD: "Wheelzzz57106",
  DB: "fuse",
  dialect: "mssql",
  server: "n6tzc76eqz.database.windows.net",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = config;


// const config = {
//  user:  'kwheeler',
//  password:  'Wheelzzz57106',
//  server:  'n6tzc76eqz.database.windows.net',
//  port:  1433,
//  database:  'fuse',
  // options: {
  //     trustedconnection:  true,
  //     enableArithAbort:  true,
  // },


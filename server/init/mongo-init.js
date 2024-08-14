
db = db.getSiblingDB('configurations');
db.createUser(
    {
      user: "mongodb",
      pwd: "password",
      roles: [ { role: "dbOwner", db: "configurations" } ]
    }
  )
db.createCollection('config');

db = db.getSiblingDB('mongo_unit_test');
db.createUser(
    {
      user: "mongodb",
      pwd: "password",
      roles: [ { role: "dbOwner", db: "mongo_unit_test" } ]
    }
  )
db.createCollection('config');

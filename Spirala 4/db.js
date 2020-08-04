const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2018","root","root",{host:"localhost",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.godina = sequelize.import(__dirname+'/godina.js');
db.student = sequelize.import(__dirname+'/student.js');
db.zadatak = sequelize.import(__dirname+'/zadatak.js');
db.vjezba = sequelize.import(__dirname+'/vjezba.js');

//relacije
db.godina.hasMany(db.student,{as:'studenti', foreignKey:'studentGod'});

db.godina_vjezba = db.godina.belongsToMany(db.vjezba,{through:'godina_vjezba',fk:'idgodina',as:'vjezbe'});
db.vjezba.belongsToMany(db.godina,{mt:'godina_vjezba',through:'godina_vjezba',fk:'idvjezba', as:'godine'});

db.vjezba_zadatak = db.vjezba.belongsToMany(db.zadatak,{through:'vjezba_zadatak',fk:'idvjezba',as:'zadaci'});
db.zadatak.belongsToMany(db.vjezba,{through:'vjezba_zadatak',fk:'idzadatak', as:'vjezbe'});

module.exports=db;
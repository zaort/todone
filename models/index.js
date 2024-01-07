const User = require('./User');
const List = require('./List');

//Define model associations here

//User has many Lists
User.hasMany(List, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    hooks: true
});

//List belongs to User
List.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = { User, List };
const { Sequelize, Datatypes, Model } = require('sequelize');
const { types } = require('util');
const { type } = require('os');
const sequelize = new Sequelize('mysql://admin:pass@localhost:3306/nhnac')
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  //Multiple Chapters managed by database
  class Chapters extends Model {}
  Chapters.init ({
    Name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });
  //logging statement can be removed
  console.log(User === sequelize.models.Chapters); // true

  //Councils are groups of members with special administration authorities within a Chapter of the Church
  class Councils extends Model {}
  Councils.init ({
    ID: {
        type: Datatypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type:DataTypes.STRING
    },
    Chapter: {
        type: DataTypes.STRING,
        references: {
            model: Chapters,
            key: 'Name'
        }
    }
  },{

    ///This was in the "Column Options" section of the sequilize manual, not sure what it does.
    sequelize,
    modelName: 'Councils',
    // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    indexes: [{ unique: true, fields: ['ID'] }]
  });

  console.log(User === sequelize.models.Councils); // true
  

  class Members extends Model {}
  Members.init ({
    ID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    //A member belongs to a chapter, possibly no value here could infere a default "New Haven" Chapter
    Chapter: {
        type: DataTypes.STRING,
        references: {
            model: Chapters,
            key: 'Name'
        }
    }
  }, {

  ///This was in the "Column Options" section of the sequilize manual
    sequelize,
    modelName: 'Members',
  
    // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    indexes: [{ unique: true, fields: ['ID'] }]
  });
  console.log(User === sequelize.models.Members); // true

  //Which members belong to which councils? Members may belong to multiple councils.
  class CouncilMembers extends model {}
  CouncilMembers.init ({
      CouncilID: {
          type: DataTypes.INTEGER,
          //foreign key
          references: { 
              model: Councils,
              key: 'ID'
          }
      },
      MemberId: {
          type: DataTypes.INTEGER,
          references: {
            model: Members,
            key: 'ID'
          }
      }
  }, {
    sequelize,
    modelName: 'CouncilsMembers'
  
    //not sure if Index is needed
  });
  console.log(User === sequelize.models.CouncilMembers); // true

  
  
const { Sequelize, DataTypes, Model } = require('sequelize');
const { types } = require('util');
const { type } = require('os');
const sequelize = new Sequelize('mysql://newhavenuser:newhavenpass@localhost:3306/newhaven')
//try {
  //  await sequelize.authenticate();
  //  console.log('Connection has been established successfully.');
  //} catch (error) {
  //  console.error('Unable to connect to the database:', error);
  //}

  //Multiple Chapters managed by database
  class Chapter extends Model {}
  Chapter.init ({
    Name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Chapter',
    //not sure if Index is needed
    indexes: [{ unique: true, fields: ['Name'] }]
  });

  //logging statement can be removed
  console.log(Chapter === sequelize.models.Chapter); // true

  //Councils are groups of members with special administration authorities within a Chapter of the Church
  class Council extends Model {}
  Council.init ({
    CouncilID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type:DataTypes.STRING
    },
    //A council belongs to a Chapter
    Chapter: {
        type: DataTypes.STRING,
        references: {
            model: Chapter,
            key: 'Name'
        }
    }
  },{
    ///This was in the "Column Options" section of the sequilize manual, not sure what it does.
    sequelize,
    modelName: 'Council',
    // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    indexes: [{ unique: true, fields: ['CouncilID'] }]
  });

  console.log(Council === sequelize.models.Council); // true
  

  class Member extends Model {}
  Member.init ({
    MemberID: {
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
            model: Chapter,
            key: 'Name'
        }
    }
  }, {
  ///This was in the "Column Options" section of the sequilize manual
    sequelize,
    modelName: 'Member',
  
    // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    indexes: [{ unique: true, fields: ['MemberID'] }]
  });
  console.log(Member === sequelize.models.Member); // true

  //Which members belong to which councils? Members may belong to multiple councils.
  //Need to add Roles to this table, or possibly a new table "CouncilMemberRoles"
  //Counciles have "stone carriers", as well as other authoritative positions.
  class CouncilMember extends Model {}
  CouncilMember.init ({
    CouncilMemberID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    CouncilID: {
        type: DataTypes.INTEGER.UNSIGNED,
        //foreign key
        references: { 
            model: Council,
            key: 'CouncilID'
        }
    },
    MemberId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: Member,
          key: 'MemberID'
        }
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CouncilMember',
    indexes: [{ unique: true, fields: ['CouncilMemberID'] }]
  });
  console.log(CouncilMember === sequelize.models.CouncilMember); // true


//This table will store the names of the various Roles that people within the church play
//"web admin", "church member", "medicine person", "peyote roadman", "ayahuasca roadman"
  class Role extends Model {}
  Role.init({
    Name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Role',
    //not sure if Index is needed
    indexes: [{ unique: true, fields: ['Name'] }]
  });
  console.log(Role === sequelize.models.Role); // true


  //Members may play multiple roles in the church, "web admin", "church member", "medicine person", 
  class MemberRole extends Model {}
  MemberRole.init({
    MemberRoleID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    MemberID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Member,
        key: 'MemberID'
      }
    },
    Role: {
      type: DataTypes.STRING,
      references: {
        model: Role,
        key: 'Name'
      }
    }
  }, {
      sequelize,
      modelName: 'MemberRole',
      indexes: [{ unique: true, fields: ['MemberRoleID'] }]
  });
  console.log(MemberRole === sequelize.models.MemberRole); // true

//This table will store the names of the various Roles that people within church councils play
//"principle stone carrier", "treasurer", "council member"
class CouncilRole extends Model {}
CouncilRole.init({
  Name: {
    type: DataTypes.STRING,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'CouncilRole',
  //not sure if Index is needed
  indexes: [{ unique: true, fields: ['Name'] }]
});
console.log(CouncilRole === sequelize.models.CouncilRole); // true

//This table will store roles that the people in a council  play
//"Johnny is the Principle Stone Carrier of the Land Management Council"
class CouncilMemberRole extends Model {}
CouncilMemberRole.init({
  //token primary key
 CouncilMemberRoleID: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },

  MemberID: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Member,
      key: 'MemberID'
    }
  },
  CouncilID: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Council,
      key: 'CouncilID'
    }
  },
  CouncilRole: {
    type: DataTypes.STRING,
    references: {
      model: CouncilRole,
      key: 'Name'
    }
  }
}, {
  sequelize,
  modelName: 'CouncilMemberRole',
  //not sure if Index is needed
  indexes: [{ unique: true, fields: ['CouncilMemberRoleID'] }]
});
console.log(CouncilMemberRole === sequelize.models.CouncilMemberRole); // true

  //This table is for the actual PDF data documents that people have earned
  //or for references to the PDF documents on the server storage
  class Certificate extends Model {}
  Certificate.init({
      CertificateID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      Name: {
        type: DataTypes.STRING
      },
      
      //This field holds either the binary PDF file, or a pointer to that file on the server storage
      File: {
        type: DataTypes.STRING // datatype might need to be changed.
      },
      //A Certificate belongs to a member.
      MemberID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: Member,
          key: 'MemberID'
        }
      }
    }, {
      sequelize,
      modelName: 'Certificate',
      indexes: [{ unique: true, fields: ['CertificateID'] }]
  });
  console.log(Certificate === sequelize.models.Certificate); // true


  sequelize.sync({ force: true });

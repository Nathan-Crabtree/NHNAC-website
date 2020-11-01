//var babel = require("@babel/core");
//import { transform } from "@babel/core";
//import * as babel from "@babel/core";

const {Sequelize, DataTypes, Model} = require('sequelize');
const { types } = require('util');
const { type } = require('os');
const sequelize = new Sequelize('mysql://newhavenuser:newhavenpass@localhost:3306/newhaven');


//bcrypt is for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

console.log("entering Models.js");
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

  //Councils are groups of Users with special administration authorities within a Chapter of the Church
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
    ChapterName: {
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
  

  class User extends Model {}
  User.init ({
    UserName: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        len: {
          args: [3,30], //User Name must be between 3 and 30 characters
          message: 'Error: User Name must be between 3 and 30 characters'
        }
      }
    },
    Password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5,30],
          message: 'Error: Password must be between 3 and 30 characters'
        }
      }
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
      validate: {
        isEmail: {
          args: [true],
          msg: 'Error: Not an Email Address'
        }
      },
      allowNull: false
    },

    //A user may belong to a chapter, possibly no value here could infere a default "New Haven" Chapter
    ChapterName: {
      type: DataTypes.STRING,
      references: {
          model: Chapter,
          key: 'Name'
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => { //either beforeCreate or AfterValidate is fine
      //afterValidate: (user) => {
        //user.Password = bcrypt.hashSync(user.Password, 8); //copied from Pluralsight Sequelize tutorial
        user.Password = bcrypt.hashSync('${user.Password}', 8); //copied from Pluralsight Sequelize tutorial
        //user.Password = bcrypt.hashSync('password', 8); //copied from Pluralsight Sequelize tutorial
        
        //To check if password is correct for authentication:
        //bcrypt.compareSync(myPlaintextPassword, hash); // true
      }
    },
  ///This was in the "Column Options" section of the sequilize manual
    sequelize,
    modelName: 'User',
  
    // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    indexes: [{ unique: true, fields: ['UserName'] }]
  });

  console.log(User === sequelize.models.User); // true
  module.exports = {User};

  //Which users belong to which councils? Users may belong to multiple councils.
  // class CouncilUser extends Model {}
  // CouncilUser.init ({
  //   CouncilUserID: {
  //     type: DataTypes.INTEGER.UNSIGNED,
  //     autoIncrement: true,
  //     primaryKey: true
  //   },
  //   CouncilID: {
  //       type: DataTypes.INTEGER.UNSIGNED,
  //       //foreign key
  //       references: { 
  //           model: Council,
  //           key: 'CouncilID'
  //       }
  //   },
  //   UserName: {
  //       type: DataTypes.STRING,
  //       references: {
  //         model: User,
  //         key: 'UserName'
  //       }
  //   },
  // }, {
  //   sequelize,
  //   modelName: 'CouncilUser',
  //   indexes: [{ unique: true, fields: ['CouncilUserID'] }]
  // });
  // console.log(CouncilUser === sequelize.models.CouncilUser); // true


//This table will store the names of the various Roles that people within the church play
//"web admin", "Church Member", "Visitor", "Teacher", "medicine person", "peyote roadman", "ayahuasca roadman"
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


  //Users may play multiple roles in the church, "web admin", "church user", "medicine person", 
  class UserRole extends Model {}
  UserRole.init({
    UserRoleID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserName: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'UserName'
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
      modelName: 'UserRole',
      indexes: [{ unique: true, fields: ['UserRoleID'] }]
  });
  
  console.log(UserRole === sequelize.models.UserRole); // true

//This table will store the names of the various Roles that people within church councils play
//"principle stone carrier", "treasurer", "member"
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
class CouncilUserRole extends Model {}
CouncilUserRole.init({
  //token primary key
 CouncilUserRoleID: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },

  UserName: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'UserName'
    }
  },
  CouncilID: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Council,
      key: 'CouncilID'
    }
  },
  CouncilRoleName: {
    type: DataTypes.STRING,
    references: {
      model: CouncilRole,
      key: 'Name'
    }
  }
}, {
  sequelize,
  modelName: 'CouncilUserRole',
  //not sure if Index is needed
  indexes: [{ unique: true, fields: ['CouncilUserRoleID'] }]
});
console.log(CouncilUserRole === sequelize.models.CouncilUserRole); // true

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
      //A Certificate belongs to a user.
      UserName: {
        type: DataTypes.STRING,
        references: {
          model: User,
          key: 'UserName'
        }
      }
    }, {
      sequelize,
      modelName: 'Certificate',
      indexes: [{ unique: true, fields: ['CertificateID'] }]
  });
  console.log(Certificate === sequelize.models.Certificate); // true

  class Course extends Model {}
  Course.init({
      CourseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      Name: {
        type: DataTypes.STRING
      },
      
      //A Course belongs to a user.
      UserName: {
        type: DataTypes.STRING,
        references: {
          model: User,
          key: 'UserName'
        }
      }
    }, {
      sequelize,
      modelName: 'Course',
      indexes: [{ unique: true, fields: ['CourseID'] }]
  });
  console.log(Course === sequelize.models.Course); // true

  class Quiz extends Model {}
  Quiz.init({
      QuizID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      Name: {
        type: DataTypes.STRING
      },
      
      //A Quiz belongs to a course.
      CourseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: Course,
          key: 'CourseID'
        }
      }
    }, {
      sequelize,
      modelName: 'Quiz',
      indexes: [{ unique: true, fields: ['QuizID'] }]
  });
  console.log(Quiz === sequelize.models.Quiz); // true

  class Question extends Model {}
  Question.init({
      QuestionID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      Text: {
        type: DataTypes.TEXT
      },
      
      //A Question belongs to a quiz.
      QuizID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: Quiz,
          key: 'QuizID'
        }
      }
    }, {
      sequelize,
      modelName: 'Question',
      indexes: [{ unique: true, fields: ['QuestionID'] }]
  });
  class Answer extends Model {}
  Answer.init({
      AnswerID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      Text: {
        type: DataTypes.TEXT
      },
      //Is this answer the correct answer to the question?
      Correct: {
        type: DataTypes.BOOLEAN
      },
      //A Answer belongs to a Question.
      QuestionID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: Question,
          key: 'QuestionID'
        }
      }
    }, {
      sequelize,
      modelName: 'Answer',
      indexes: [{ unique: true, fields: ['AnswerID'] }]
  });
  console.log(Answer === sequelize.models.Answer); // true

  

   User.belongsTo(Chapter);
   Chapter.hasMany(User);
   Council.belongsTo(Chapter);
   //Council.hasMany(User);

  Chapter.hasMany(Council);
   
  
  //User.hasMany(Role, {through: UserRole, foreignKey: UserName, otherKey: Role});
   User.belongsToMany(Role, {through: UserRole, foreignKey: 'UserName', otherKey: 'Role'});
   Role.belongsToMany(User, {through: UserRole, foreignKey: 'Role', otherKey: 'UserName'});

   //ambiguous and unsure about what to do with tablels that have more than two foreign keys
    Council.belongsToMany(User, {through: CouncilUserRole, foreignKey: 'CouncilID', otherKey: 'UserName'});
  //Council.belongsToMany(CouncilRole, {through: CouncilUserRole, foreignKey: 'CouncilID', otherKey: 'CouncilRole'});
  //User.belongsToMany(Council, {through: CouncilUserRole, foreignKey: 'UserName', otherKey: 'CouncilId'});
    User.belongsToMany(CouncilRole, {through: CouncilUserRole, foreignKey: 'UserName', otherKey: 'CouncilRole'});
    CouncilRole.belongsToMany(Council, {through: CouncilUserRole, foreignKey: 'CouncilRole', otherKey: 'CouncilID'});
  //  CouncilRole.belongsToMany(User, {through: CouncilUserRole, foreignKey: 'CouncilRole', otherKey: 'UserName'});

   User.belongsToMany(Role, {through: UserRole, foreignKey: 'UserName', otherKey: 'Role'});
   Role.belongsToMany(User, {through: UserRole, foreignKey: 'Role', otherKey: 'UserName'});

  // User.belongsTo(Chapter, {foreignKey: 'Name'});
  // Quiz.hasMany(Question);
  // Question.belongsTo(Quiz);
  // Question.hasMany(Answer);
  // Answer.belongsTo(Question);

sequelize.sync({ force: true });

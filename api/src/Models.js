"use strict";
// NOTE: Role and UserRole still need associations.
// Use config.json to load proper database. Refer to https://github.com/Zandy12/FSJS-Project-Ten/blob/master/api/config/config.json. - Zane

//var babel = require("@babel/core");
//import { transform } from "@babel/core";
//import * as babel from "@babel/core";

const {Sequelize, DataTypes, Model} = require('sequelize');
const { types } = require('util');
const { type } = require('os');
const enableLogging = process.env.DB_ENABLE_LOGGING === 'true';
const database = new Database(data, enableLogging);
const db = process.env.DB || "mysql://root:@localhost:3306/newhaven";
let logging = null;

if (enableLogging) {
  logging = { logging: console.log };
}

//const sequelize = new Sequelize(db, logging); 
const sequelize = new Sequelize('newhaven', 'newhavenuser', 'newhavenpass',{
  host: 'localhost',
  dialect: 'mysql',
  //storage: 'newhaven.mysql' // not sure if this is necessary; I already created the "newhaven" database
  operatorsAliases: false // prevents us from receiving certain deprecation warnings inside console
});

//bcrypt is for password hashing
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALTROUNDS) || 1;
const myPlaintextPassword = process.env.MYPLAINTEXTPASSWORD || "password1";
const someOtherPlaintextPassword = SOMEOTHERPLAINTEXTPASSWORD || "password2";

// For validation
const date = new Date();
const currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
const filePathRegex = /^[A-Z]:[\/\\]{0,2}(?:[.\/\\ ](?![.\/\\\n])|[^<>:"|?*.\/\\ \n])+$/;

console.log("entering Models.js");

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

//Multiple Chapters (branches of the church) managed by database
class Chapter extends Model{}
  Chapter.init ({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: {
          args: [true],
          message: 'Error: Chapter names can only have letters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Chapter name field must not be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Chapter',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("ChapterLoaded: " + (Chapter === sequelize.models.Chapter)); //true

//Councils are groups of Users with special administration authorities within a Chapter of the Church
class Council extends Model{}
  Council.init ({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: [true],
            message: 'Error: Council names can only have letters'
          },
          notEmpty: {
            args: [true],
            message: 'Error: Council name field must not be empty'
          }
        }
    },
    //A council belongs to a Chapter
    ChapterID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
          model: Chapter,
          key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Chapter reference in Council must not be empty'
        }
      }
    }
  },{
    sequelize,
    modelName: 'Council',
    //Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("CouncilLoaded: " + (Council === sequelize.models.Council)); //true

class Address extends Model{}
Address.init({
  ID: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  Street: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      max: {
        args: [150],
        message: 'Error: Address street field must contain less than 150 characters'
      }
    }
  },
  Country: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: [true],
        message: 'Error: Country field must not be empty'
      }
    }
  },
  State: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: [true],
        message: 'Error: State field must not be empty'
      }
    }
  },
  City: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: [true],
        message: 'Error: City field must not be empty'
      }
    }
  },
  Zip: {
    type: DataTypes.STRING(12),
    allowNull: false,
    validate: {
      notEmpty: {
        args: [true],
        message: 'Error: Zip field must not be empty'
      }
    }
  }
}, {
    sequelize,
    modelName: 'Address',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("AddressLoaded: " + (Address === sequelize.models.Address)); //true

class User extends Model{}
  User.init ({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    //A user may belong to a chapter, possibly no value or default value "0" here could infere a default "New Haven" Chapter
    ChapterID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
          model: Chapter,
          key: 'ID'
      },
      defaultValue: '0' //changed from string "new haven"
    },
    AddressID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Address,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Address reference in User must not be empty'
        }
      }
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: 'Error: Not a valid email address'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Email field must not be empty'
        }
      }
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Password field must not be empty'
        },
        len: {
          args: [3,30],
          message: 'Error: Password must be between 3 and 30 characters'
        }
      }
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: First name field must not be empty'
        },
      }
    },
    NickName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Last name field must not be empty'
        },
      }
    },
    // No minimum age required as of current notice. Format is unknown. - Zane
    Birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Birthday field must not be empty'
        },
        isBefore: {
          args: [currentDate],
          message: 'Error: Birthday must be before current date ' + currentDate
        }
      }
    },
    Gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Gender field must not be empty'
        },
      }
    },
    SecurityQuestion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Security question field must not be empty'
        },
      }
    },
    SecurityAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Security answer field must not be empty'
        }
      }
    },
    // E-signature will be stored into a pdf in the server hard drive.
    ESignatureFilePath: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to user e-signature document must contain a hard drive directory and"
        },
        is: {
          args: [/\.(pdf)$/i],
          message: "Error: File extension needs to be .pdf"
        }
      }
    },
    // Uses a boolean to determine if user is subscribed to newsletter or not.
    SubscribedToNewsLetter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Uses a boolean to determine if user is subscribed to podcast or not.
    SubscribedToPodcast: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Points: {
      type: DataTypes.SMALLINT.UNSIGNED,
      defaultValue: 0,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: User points input must be a number'
        }
      }
    },
    Status: {
      type: DataTypes.STRING(32),
      allowNull: true,
      validate: {
        max: {
          args: [32],
          message: 'Error: Status length can\'t be greater than 32 characters'
        }
      }
    },
    ProfilePic: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to profile image file must contain a hard drive directory"
        }
      }
    },
    DateLoggedIn: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Logged-in date field must contain a date'
        }
      }
    },
    TimeLoggedIn: {
      type: DataTypes.TIME,
      allowNull: false
    },
    Facebook: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          args: [true],
          message: "Error: Link field must be a URL"
        }
      }
    },
    Instagram: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          args: [true],
          message: "Error: Link field must be a URL"
        }
      }
    },
    Twitter: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          args: [true],
          message: "Error: Link field must be a URL"
        }
      }
    },
    // Strikes are used to tally up no. of times a the user has been warned to not post offensive content
    // (max 2 before being suspended). - Zane
    Strikes: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Strikes input must be a number'
        }
      }
    },
    /**
     * // If a user is suspended after having 2 or more strikes, they will be prevented from accessing their
     * // account with this field. - Zane
     *
     * @deprecated
     */
    /* Suspended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }, */
    // Once user is suspended, they will not be able to access their account within 30 days following the date
    // they've been suspended. - Zane
    DateSuspended: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Suspended date field must contain a date'
        }
      }
    },
    AgreedToTerms: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    // hooks: {
    //   beforeCreate: (user) => {
    //     //either beforeCreate or AfterValidate is fine
    //     //afterValidate: (user) => {
    //     user.Password = bcrypt.hashSync('${user.Password}', 8); //copied from Pluralsight Sequelize tutorial

    //     //To check if password is correct for authentication:
    //     //bcrypt.compareSync(myPlaintextPassword, hash); // true
    //   }
    // },
    //This was in the "Column Options" section of the sequilize manual
    sequelize,
    modelName: 'User',

    //Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("UserLoaded: " + (User === sequelize.models.User)); //true

class Connection extends Model{}
  Connection.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    User1: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User 1 reference in Connection must not be empty'
        }
      }
    },
    User2: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User 2 reference in Connection must not be empty'
        }
      }
    },
    // Status can either only be Pending or Approved. - Zane
    Status: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        isIn: {
          args: [['Pending', 'Approved']],
          message: 'Error: Status input can only either be Pending or Approved'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Connection',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("ConnectionLoaded: " + (Connection === sequelize.models.Role)); // true

//Roles: systemRole, userRole, councilRole, churchRole

//This table will store the names of the various Roles that people within the church play
//"web admin", "Church Member", "Visitor", "Teacher", "medicine person", "peyote roadman", "ayahuasca roadman"
class Role extends Model{}
  Role.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: [true],
          message: 'Error: Role names can only have letters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Role name field must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Role',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("RoleLoaded: " + (Role === sequelize.models.Role)); // true

//Users may play multiple roles in the church, "web admin", "church user", "medicine person",
class UserRole extends Model{}
  UserRole.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    RoleID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Role,
        key: 'ID'
      }
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      }
    }
  }, {
    sequelize,
    modelName: 'UserRole',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("UserRoleLoaded: " + (UserRole === sequelize.models.UserRole)); //true

//This table will store the names of the various Roles that people within church councils play
//"principle stone carrier", "treasurer", "member"
class CouncilRole extends Model{}
  CouncilRole.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: [true],
          message: 'Error: Council role names can only have letters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Council role field must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CouncilRole',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("CouncilRoleLoaded: " + (CouncilRole === sequelize.models.CouncilRole)); //true

//This table will store roles that the people in a council play
//"Johnny is the Principle Stone Carrier of the Land Management Council"
class CouncilUserRole extends Model{}
  CouncilUserRole.init({
    //token primary key
    ID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    CouncilID: {  //edited by Nathan
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Council,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Council reference in Council user-role must not be empty'
        }
      }
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
    },
    CouncilRoleID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: CouncilRole,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Council role reference must not be empty'
        }
      }
    }
  }, {
      sequelize,
      modelName: 'CouncilUserRole',
      indexes: [{ unique: true, fields: ['ID'] }]
    }
);
console.log("CouncilUserRoleLoaded: " + (CouncilUserRole === sequelize.models.CouncilUserRole)); //true

// Badge tags and references to images stored in the server hard drive
class Badge extends Model{}
  Badge.init ({
    ID:{
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: {
        args: [true],
        message: 'Error: Badge name field must not be empty'
      }
    },
    // Reference to where the image file is stored in the hard drive.
    Image: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to badge image file must contain a hard drive directory"
        },
        is: {
          args: [/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i],
          message: "Error: File extension needs to be either .gif, .jpg, .jpeg, .tiff, .png, .webp, or .bmp"
        },
        notEmpty: {
          args: [true],
          message: 'Error: Badge image field must not be empty'
        }
      }
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        max: {
          args: [50],
          message: 'Error: Badge description can\'t be greater than 50 characters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Badge description field must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Badge',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("BadgeLoaded: " + (Badge === sequelize.models.Badge)); //true

class UserBadge extends Model{}
  UserBadge.init ({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    BadgeID: { //Changed by Nathan to fix associtation
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
          model: Badge,
          key: 'ID'
      },
    },
    UserID: {  //Changed by Nathan to fix association
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in User badge must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserBadge',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("UserBadgeLoaded: " + (UserBadge === sequelize.models.UserBadge)); //true


class UpdatesTable extends Model{}
  UpdatesTable.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in updates table must not be empty'
        }
      }
    },
    // State determines whether this table is collapsed or not.
    State: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // Position that the table has on the profile page (.profile_container1_and_half has 0-2, .profile_container2 has 3-10).
    Position: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Updates position input must be an number between 0-10'
        }
      }
    },
    // Length can only be two values, 1 or 0. table1 of length 0 -> table2 of length 1 is table1*2 length.
    Length: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Updates length input must be an number between 0-10'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UpdatesTable',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("UpdatesTableLoaded: " + (UpdatesTable === sequelize.models.UpdatesTable)); //true

class CertificationsTable extends Model{}
  CertificationsTable.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: { //Nathan
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in certifications table must not be empty'
        }
      }
    },
    // State determines whether this table is collapsed or not.
    State: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // Position that the table has on the profile page (.profile_container1_and_half has 0-2, .profile_container2 has 3-10).
    Position: {
      type: DataTypes.TINYINT,
      defaultValue: 2,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Certifications position input must be an number between 0-10'
        }
      }
    },
    // Length can only be two values, 1 or 0. table1 of length 0 -> table2 of length 1 is table1*2 length.
    Length: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Certifications length input must be an number between 0-10'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CertificationsTable',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("CertificationsTableLoaded: " + (CertificationsTable === sequelize.models.CertificationsTable)); //true

class RecentActivityTable extends Model{}
  RecentActivityTable.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: { //Nathan
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in recent activity table must not be empty'
        }
      }
    },
    // State determines whether this table is collapsed or not.
    State: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // Position that the table has on the profile page (.profile_container1_and_half has 0-2, .profile_container2 has 3-10).
    Position: {
      type: DataTypes.TINYINT,
      defaultValue: 3,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Recent activity position input must be an number between 0-10'
        }
      }
    },
    // Length can only be two values, 1 or 0. table1 of length 0 -> table2 of length 1 is table1*2 length.
    Length: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Recent activity length input must be an number between 0-10'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'RecentActivityTable',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("RecentActivityTableLoaded: " + (RecentActivityTable === sequelize.models.RecentActivityTable)); //true

class RecentBadgesTable extends Model{}
  RecentBadgesTable.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: { //Nathan
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in recent badges table must not be empty'
        }
      }
    },
    // State determines whether this table is collapsed or not.
    State: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // Position that the table has on the profile page (.profile_container1_and_half has 0-2, .profile_container2 has 3-10).
    Position: {
      type: DataTypes.TINYINT,
      defaultValue: 5,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Recent badges position input must be an number between 0-10'
        }
      }
    },
    // Length can only be two values, 1 or 0. table1 of length 0 -> table2 of length 1 is table1*2 length.
    Length: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Recent badges length input must be an number between 0-10'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'RecentBadgesTable',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("RecentBadgesTableLoaded: " + (RecentBadgesTable === sequelize.models.RecentBadgesTable)); //true

class RecentAchievementsTable extends Model{}
RecentAchievementsTable.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: { //Nathan
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in recent achievements table must not be empty'
        }
      }
    },
    // State determines whether this table is collapsed or not.
    State: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // Position that the table has on the profile page (.profile_container1_and_half has 0-2, .profile_container2 has 3-10).
    Position: {
      type: DataTypes.TINYINT,
      defaultValue: 7,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Recent achievements position input must be an number between 0-10'
        }
      }
    },
    // Length can only be two values, 1 or 0. table1 of length 0 -> table2 of length 1 is table1*2 length.
    Length: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Recent achievements length input must be an number between 0-10'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'RecentAchievementsTable',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("RecentAchievementsTableLoaded: " + (RecentAchievementsTable === sequelize.models.RecentAchievementsTable)); //true

class CouncilsTable extends Model{}
  //token primary key
  CouncilsTable.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: { //Nathan
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in councils table must not be empty'
        }
      }
    },
    // State determines whether this table is collapsed or not.
    State: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // Position that the table has on the profile page (.profile_container1_and_half has 0-2, .profile_container2 has 3-10).
    Position: {
      type: DataTypes.TINYINT,
      defaultValue: 9,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Councils position input must be an number between 0-10'
        }
      }
    },
    // Length can only be two values, 1 or 0. table1 of length 0 -> table2 of length 1 is table1*2 length.
    Length: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Councils length input must be an number between 0-10'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CouncilsTable',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("CouncilsTableLoaded: " + (CouncilsTable === sequelize.models.CouncilsTable)); //true

class Message extends Model{}
  Message.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Sender: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Sender reference in Message must not be empty'
        }
      }
    },
    Receiver: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Receiver reference in Message must not be empty'
        }
      }
    },
    Content: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: {
          args: [500],
          message: 'Error: Message length can\'t be greater than 500 characters'
        }
      }
    },
    Archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Message date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Message date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    // Using this to check if message has been read by receiver for alert purposes on profile page. - Zane
    Read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'Message',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("MessageLoaded: " + (Message === sequelize.models.Message)); //true

class Comment extends Model{}
  Comment.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in Comment must not be empty'
        }
      }
    },
    Content: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: {
          args: [500],
          message: 'Error: Comment length can\'t be greater than 500 characters'
        }
      }
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Comment date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Comment date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("CommentLoaded: " + (Comment === sequelize.models.Comment)); //true

class Tag extends Model{}
  Tag.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    //token primary key
    Tag: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: {
          args: [150],
          message: 'Error: Tag length can\'t be greater than 150 characters'
        }
      }
    },
  }, {
      sequelize,
      modelName: 'Tag',
      indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("TagLoaded: " + (Tag === sequelize.models.Tag)); //true

class Article extends Model{}
  Article.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    TagID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Tag,
        key: 'ID'
      },
      allowNull: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in Article must not be empty'
        }
      }
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Article name field must not be empty'
        }
      }
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to article image file must contain a hard drive directory"
        },
        is: {
          args: [/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i],
          message: "Error: File extension needs to be either .gif, .jpg, .jpeg, .tiff, .png, .webp, or .bmp"
        }
      }
    },
    ImageDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        max: {
          args: [50],
          message: 'Error: Image description can\'t be greater than 50 characters'
        }
      }
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        max: {
          args: [1e+11],
          message: 'Error: Article content length can\'t be greater than 100,000,000,000 characters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Article content field must not be empty'
        }
      }
    },
    Likes: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Article likes input must be an integer'
        }
      }
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Article date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Article date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Article',
    indexes: [{ unique: true, fields: ['ID'] }]
});
console.log("ArticleLoaded: " + (Article === sequelize.models.Article)); //true

class Blog extends Model{}
  Blog.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    TagID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Tag,
        key: 'ID'
      },
      allowNull: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in Blog must not be empty'
        }
      }
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Blog name field must not be empty'
        },
      }
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to blog image file must contain a hard drive directory"
        },
        is: {
          args: [/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i],
          message: "Error: File extension needs to be either .gif, .jpg, .jpeg, .tiff, .png, .webp, or .bmp"
        }
      }
    },
    ImageDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        max: {
          args: [50],
          message: 'Error: Image description can\'t be greater than 50 characters'
        }
      }
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        max: {
          args: [100000000000],
          message: 'Error: Blog content can\'t be greater than 100,000,000,000 characters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Blog content field must not be empty'
        }
      }
    },
    Likes: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Blog likes input must be an integer'
        }
      }
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Blog date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Blog date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Blog',
    indexes: [{ unique: true, fields: ['ID'] }]
});
console.log("BlogLoaded: " + (Blog === sequelize.models.Blog)); //true

class Podcast extends Model{}
  Podcast.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    TagID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Tag,
        key: 'ID'
      },
      allowNull: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in Podcast must not be empty'
        }
      }
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Podcast name field must not be empty'
        }
      }
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to podcast image file must contain a hard drive directory"
        },
        is: {
          args: [/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i],
          message: "Error: File extension needs to be either .gif, .jpg, .jpeg, .tiff, .png, .webp, or .bmp"
        }
      },
    },
    ImageDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        max: {
          args: [50],
          message: 'Error: Image description can\'t be greater than 50 characters'
        }
      }
    },
    PodcastLink: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: {
          args: [true],
          message: "Error: Link field must be a URL"
        },
        notEmpty: {
          args: [true],
          message: 'Error: Link field must not be empty'
        }
      }
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        max: {
          args: [100000000000],
          message: 'Error: Podcast content can\'t be greater than 100,000,000,000 characters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Podcast content field must not be empty'
        }
      }
    },
    Likes: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Podcast likes input must be an integer'
        }
      }
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Podcast date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Podcast date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Podcast',
    indexes: [{ unique: true, fields: ['ID'] }]
});
console.log("PodcastLoaded: " + (Podcast === sequelize.models.Podcast)); //true

class Update extends Model{}
  Update.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    TagID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Tag,
        key: 'ID'
      },
      allowNull: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in Update must not be empty'
        }
      }
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Update name field must not be empty'
        }
      }
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to update image file must contain a hard drive directory"
        },
        is: {
          args: [/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i],
          message: "Error: File extension needs to be either .gif, .jpg, .jpeg, .tiff, .png, .webp, or .bmp"
        }
      }
    },
    ImageDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        max: {
          args: [50],
          message: 'Error: Image description can\'t be greater than 50 characters'
        }
      }
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        max: {
          args: [100000000000],
          message: 'Error: Update content can\'t be greater than 100,000,000,000 characters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Update content field must not be empty'
        }
      }
    },
    Likes: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Update likes input must be an integer'
        }
      }
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Update date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Update date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Update',
    indexes: [{ unique: true, fields: ['ID'] }]
});
console.log("UpdateLoaded: " + (Update === sequelize.models.Update)); //true

class Event extends Model{}
  Event.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    TagID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Tag,
        key: 'ID'
      },
      allowNull: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in Event must not be empty'
        }
      }
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Event name field must not be empty'
        }
      }
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to event image file must contain a hard drive directory"
        },
        is: {
          args: [/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i],
          message: "Error: File extension needs to be either .gif, .jpg, .jpeg, .tiff, .png, .webp, or .bmp"
        }
      }
    },
    ImageDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        max: {
          args: [50],
          message: 'Error: Image description can\'t be greater than 50 characters'
        }
      }
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        max: {
          args: [100000000000],
          message: 'Error: Event content can\'t be greater than 100,000,000,000 characters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Event content field must not be empty'
        }
      }
    },
    EventTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Event time field must not be empty'
        }
      }
    },
    EventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Event content date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Event content date field must not be empty'
        }
      }
    },
    EventDayOfWeek: {
      type: DataTypes.STRING(9),
      allowNull: false,
      validate: {
        isAlpha: {
          args: [true],
          message: 'Error: Event day-of-week input can only contain letters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Event day-of-week field must not be empty'
        }
      }
    },
    EventLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Event location field must not be empty'
        }
      }
    },
    EventMaxPeopleAllowed: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validation: {
        isInt: {
          args: [true],
          message: 'Error: Max people allowed input must be an integer'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Max people allowed field must not be empty'
        }
      }
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Event date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Event date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("EventLoaded: " + (Event === sequelize.models.Event)); //true

// Links comment to content type (article, podcast, update, etc.). - Zane
class CommentContent extends Model{}
  CommentContent.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    CommentID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Comment,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Comment reference in comment-content must not be empty'
        }
      }
    },
    ArticleID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Article,
        key: 'ID'
      },
      allowNull: true
    },
    BlogID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Blog,
        key: 'ID'
      },
      allowNull: true
    },
    PodcastID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Podcast,
        key: 'ID'
      },
      allowNull: true
    },
    UpdateID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Update,
        key: 'ID'
      },
      allowNull: true
    },
    EventID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Event,
        key: 'ID'
      },
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'CommentContent',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("CommentContent: " + (CommentContent === sequelize.models.CommentContent)); //true

class ForumPost extends Model{}
  ForumPost.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: true
    },
    // Posts on the forum can be archived for future reference by User.
    Archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Likes: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Forum post likes input must be an integer'
        }
      }
    },
    Resolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Forum post date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Forum post date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ForumPost',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("ForumPostLoaded: " + (ForumPost === sequelize.models.ForumPost)); //true


// Links comment to forum post and checks if solution. - Zane
class CommentForumPost extends Model{}
  CommentForumPost.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    CommentID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Comment,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Comment reference in comment-forum post must not be empty'
        }
      }
    },
    ForumPostID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: ForumPost,
        key: 'ID'
      },
      allowNull: true
    },
    Solution: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'CommentForumPost',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("CommentForumPost: " + (CommentForumPost === sequelize.models.CommentForumPost)); //true

// Each response belongs to a comment
class Response extends Model{}
  Comment.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    // How the response will be linked to a comment
    CommentID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Comment,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Comment reference in Response must not be empty'
        }
      }
    },
    Content: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: {
          args: [500],
          message: 'Error: Response content can\'t be greater than 500 characters'
        }
      }
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Response date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Response date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Response',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("ResponseLoaded: " + (Response === sequelize.models.Response)); //true

class Certification extends Model{}
  Certification.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: [true],
          message: 'Error: Certification names can only have letters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Certification name field must not be empty'
        }
      }
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        max: {
          args: [5000],
          message: 'Error: Certification description can\'t be greater than 5000 characters'
        }
      }
    },
    IntroVideo: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to certification video file must contain a hard drive directory"
        },
        is: {
          args: [/\.(mp4)$/i],
          message: "Error: File extension needs to be .mp4"
        }
      }
    },
    IntroImage: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to certification image file must contain a hard drive directory"
        },
        is: {
          args: [/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i],
          message: "Error: File extension needs to be either .gif, .jpg, .jpeg, .tiff, .png, .webp, or .bmp"
        },
        notEmpty: {
          args: [true],
          message: 'Error: Certification image field must not be empty'
        }
      }
    },
    CertFilePath: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to certification pdf file must contain a hard drive directory"
        },
        is: {
          args: [/\.(pdf)$/i],
          message: "Error: File extension needs to be .pdf"
        },
        notEmpty: {
          args: [true],
          message: 'Error: File path for certification field must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Certification',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("CertificationLoaded: " + (Certification === sequelize.models.Certification)); //true

// This table is for the actual PDF data documents that people have earned
// or for references to the PDF documents on the server storage
class Certificate extends Model{}
  Certificate.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    CertificationID: { //Nathan
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Certification,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Certification reference in Certificate must not be empty'
        }
      }
    },
    UserID: { //Nathan
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in Certificate must not be empty'
        }
      }
    },
    // This field holds either the binary PDF file, or a pointer to that file on the server storage
    UserCertFilePath: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to certificate pdf file must contain a hard drive directory"
        },
        is: {
          args: [/\.(pdf)$/i],
          message: "Error: File extension needs to be .pdf"
        },
        notEmpty: {
          args: [true],
          message: 'Error: File path to certificate field must not be empty'
        }
      }
    },
    Started: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Certificate date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Certificate date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Certificate',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("CertificateLoaded: " + (Certificate === sequelize.models.Certificate)); //true

class Course extends Model{}
  Course.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in Course must not be empty'
        }
      }
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: [true],
          message: 'Error: Course names can only have letters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Course name field must not be empty'
        }
      }
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        max: {
          args: [5000],
          message: 'Error: Course description can\'t be greater than 5000 characters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Course description field must not be empty'
        }
      }
    },
    IntroVideo: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to course video file must contain a hard drive directory"
        },
        is: {
          args: [/\.(mp4)$/i],
          message: "Error: File extension needs to be .mp4"
        }
      }
    },
    IntroImage: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to course image file must contain a hard drive directory"
        },
        is: {
          args: [/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i],
          message: "Error: File extension needs to be either .gif, .jpg, .jpeg, .tiff, .png, .webp, or .bmp"
        },
        notEmpty: {
          args: [true],
          message: 'Error: File path to course image field must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("CourseLoaded: " + (Course === sequelize.models.Course)); //true

class CoursePreReq extends Model{}
  CoursePreReq.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    CoursePreReqID: {
      type: DataTypes.STRING,
      references: {
        model: Course,
        key: 'ID'
      },
      allowNull: true
    },
    CourseID: {
      type: DataTypes.STRING,
      references: {
        model: Course,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Course reference in Course pre-requisite must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CoursePreReq',
    indexes: [{ unique: true, fields: ['CoursePreReqID'] }]
  }
);
console.log("CoursePreReqLoaded: " + CoursePreReq === sequelize.models.CoursePreReq); //true

class CertificationPreReq extends Model{}
  CertificationPreReq.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    CoursePreReqID: {
      type: DataTypes.STRING,
      references: {
        model: CoursePreReq,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Course pre-requisite reference in Certification pre-requisite must not be empty'
        }
      }
    },
    CertificationID: {
      type: DataTypes.STRING,
      references: {
        model: Certification,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Certification reference in Certification pre-requisite must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CertificationPreReq',
    indexes: [{ unique: true, fields: ['CertificationPreReqID'] }]
  }
);
console.log("CertificationPreReqLoaded: " + CoursePreReq === sequelize.models.CertificationPreReq); //true

class UserCourse extends Model{}
  UserCourse.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in user-course must not be empty'
        }
      }
    },
    CourseID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Course,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Course reference in user-course must not be empty'
        }
      }
    },
    Started: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: User course date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: User course date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserCourse',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("UserCourseLoaded: " + (UserCourse === sequelize.models.UserCourse)); //true

class Section extends Model{}
  Section.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    CourseID: { //Nathan
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Course,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Course reference in Section must not be empty'
        }
      }
    },
    Number: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Section number field must contain an integer'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Section',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("SectionLoaded: " + (Section === sequelize.models.Section)); //true

class UserSection extends Model{}
  UserSection.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: { //nathan
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in user-section must not be empty'
        }
      }
    },
    SectionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Section,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Section reference in user-section must not be empty'
        }
      }
    },
    Started: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: User section date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: User section field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserSection',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("UserSectionLoaded: " + (UserSection === sequelize.models.UserSection)); //true

// Content that belongs to a section of a course. - Zane
class Content extends Model{}
  Content.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    SectionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Section,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Section reference in Content must not be empty'
        }
      }
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: [true],
          message: 'Error: Content names can only have letters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Content name field must not be empty'
        }
      }
    },
    Video: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to content video file must contain a hard drive directory"
        },
        is: {
          args: [/\.(mp4)$/i],
          message: "Error: File extension needs to be .mp4"
        }
      }
    },
    Page: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to content page file must contain a hard drive directory"
        },
        notEmpty: {
          args: [true],
          message: 'Error: File path to content page field must not be empty'
        }
      }
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        max: {
          args: [5000],
          message: 'Error: Content description can\'t be greater than 5000 characters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Content description field must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Content',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("ContentLoaded: " + (Content === sequelize.models.Content)); //true

class UserContent extends Model{}
  UserContent.init({
    //token primary key
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: { //Nathan
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in user-content must not be empty'
        }
      }
    },
    ContentID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Content, //nathan changed from Section? to content table
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Content reference in user-content must not be empty'
        }
      }
    },
    Started: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: User content date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: User content date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserContent',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("UserContentLoaded: " + (UserContent === sequelize.models.UserContent)); //true

class EventUser extends Model{}
  EventUser.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: true
    },
    GuestName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Name field must not be empty'
        },
        // Custom validator
        isCapitalized(name) {
          if (name[0] !== name[0].toUpperCase()) {
            throw new Error('Error: First letter of name must be capitalized');
          }
        }
      }
    },
    EventID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Event,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Event reference in event-user must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'EventUser',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("EventUser: " + (EventUser === sequelize.models.EventUser)); //true

class Resource extends Model{}
  Resource.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: {
        args: [true],
        message: 'Error: Resource name field must not be empty'
      }
    },
    FilePath: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to resource file must contain a hard drive directory"
        },
        notEmpty: {
          args: [true],
          message: 'Error: File path to resource field must not be empty'
        }
      }
    }
  }, {
      sequelize,
      modelName: 'Resource',
      indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("ResourceLoaded: " + (Resource === sequelize.models.Resource)); //true

class UserResource extends Model{}
  UserResource.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in user-resource must not be empty'
        }
      }
    },
    ResourceID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Resource,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Resource reference in user-resource must not be empty'
        }
      }
    },
    Archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
      sequelize,
      modelName: 'UserResource',
      indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("UserResourceLoaded: " + (UserResource === sequelize.models.UserResource)); //true

class Quiz extends Model{}
  Quiz.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    CourseID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Course,
        key: 'ID'
      },
      allowNull: true
    },
    SectionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Section,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Section reference in Quiz must not be empty'
        }
      }
    },
    Number: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
      allowNull: false,
      validate: {
        isInt: {
          args: [true],
          message: 'Error: Quiz number field must contain an integer'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Quiz number field must not be empty'
        }
      }
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Quiz',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("QuizLoaded: " + (Quiz === sequelize.models.Quiz)); //true

class UserQuiz extends Model{}
  UserQuiz.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: User reference in user-quiz must not be empty'
        }
      }
    },
    CourseID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Course,
        key: 'ID'
      },
      allowNull: true
    },
    SectionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Section,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Section reference in user-quiz must not be empty'
        }
      }
    },
    Completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: User quiz date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: User quiz date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserQuiz',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("UserQuizLoaded: " + (UserQuiz === sequelize.models.UserQuiz)); //true

class Question extends Model{}
  Question.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    //A Question belongs to a quiz.
    QuizID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Quiz,
        key: 'ID'
      },
      allowNull: true
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: {
          args: [filePathRegex],
          message: "Error: File path to question image file must contain a hard drive directory"
        }
      }
    },
    Text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        max: {
          args: [500],
          message: 'Error: Question text can\'t be greater than 500 characters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Question text field must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Question',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("QuestionLoaded: " + (Question === sequelize.models.Question)); //true

class Answer extends Model{}
  Answer.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    //A Answer belongs to a Question.
    QuestionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Question,
        key: 'ID'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          message: 'Error: Question reference in Answer must not be empty'
        }
      }
    },
    Text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        max: {
          args: [150],
          message: 'Error: Answer text can\'t be greater than 150 characters'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Answer text field must not be empty'
        }
      }
    },
    //Is this answer the correct answer to the question?
    Correct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: [true],
          message: 'Error: Answer date field must contain a date'
        },
        notEmpty: {
          args: [true],
          message: 'Error: Answer date field must not be empty'
        }
      }
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
      sequelize,
      modelName: 'Answer',
      indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("AnswerLoaded: " + (Answer === sequelize.models.Answer)); //true

// Report table exists to document reports that have been made. - Zane
class Report extends Model{}
  Report.init({
    // As of 1/24/2020, only the ID field is needed to show report no. - Zane
    ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
  }, {
    sequelize,
    modelName: 'Report',
    indexes: [{ unique: true, fields: ['ID'] }]
  }
);
console.log("ReportLoaded: " + (Report === sequelize.models.Report)); //true

// NOTE: Refer to https://github.com/Zandy12/FSJS-Project-Ten/tree/master/api/models for proper use of associations. - Zane

// Chapter Associations
User.belongsTo(Chapter);
Chapter.hasMany(User);

// Council Associations
Council.belongsTo(Chapter);
Chapter.hasMany(Council);

// Connection Associations
User.belongsTo(Connection);
Connection.hasMany(User);

// CouncilUserRole and CouncilRole Associations
CouncilUserRole.belongsTo(Council);
Council.hasMany(CouncilUserRole);
CouncilUserRole.belongsTo(CouncilRole); //edited by Nathan
CouncilRole.hasMany(CouncilUserRole); //edited by nathan

// UserBadge Associations
UserBadge.belongsTo(Badge);
Badge.hasMany(UserBadge);
UserBadge.belongsTo(User);
User.hasMany(UserBadge);

// Address Associations
User.hasOne(Address);
Address.belongsTo(User);
User.hasMany(Address);

// UpdatesTable Associations
UpdatesTable.belongsTo(User);
User.hasMany(UpdatesTable);

// CertificationsTable Associations
CertificationsTable.belongsTo(User);
User.hasMany(CertificationsTable);

// RecentActivityTable Associations
RecentActivityTable.belongsTo(User);
User.hasMany(RecentActivityTable);

// RecentBadgesTable Associations
RecentBadgesTable.belongsTo(User);
User.hasMany(RecentBadgesTable);

// CouncilsTable Associations
CouncilsTable.belongsTo(User);
User.hasMany(CouncilsTable);

// RecentAchievementsTable Associations
RecentAchievementsTable.belongsTo(User);
User.hasMany(RecentAchievementsTable);

// Message Associations
Message.belongsTo(Sender);
Message.belongsTo(User, {as: 'Email', foreignKey: 'Sender'}); //Nathan
Sender.hasMany(Message); //nathan
Message.belongsTo(Receiver); //nathan
Message.belongsTo(User, {as: 'Email', foreignKey: 'Receiver'}); //nathan
Receiver.hasMany(Message); //nathan
User.hasMany(Message);

// Comment Associations
Comment.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(CommentContent);
CommentContent.hasMany(Comment);

// Certificate Associations
Certificate.belongsTo(User);
User.hasMany(Certificate);
Certificate.belongsTo(Certification);
Certification.hasMany(Certificate);

// Course Associations
Course.belongsTo(User);
User.hasMany(Course);

// CoursePreReq Associations
CoursePreReq.belongsTo(CoursePreReq);
CoursePreReq.hasMany(CoursePreReq);
CoursePreReq.belongsTo(Course);
Course.hasMany(CoursePreReq);

// CertificationPreReq Associations
CertificationPreReq.belongsTo(CoursePreReq);
CoursePreReq.hasMany(CertificationPreReq);
CertificationPreReq.belongsTo(Certification);
Certification.hasMany(CertificationPreReq);

// UserCourse Associations
UserCourse.belongsTo(User);
User.hasMany(UserCourse);
UserCourse.belongsTo(Course);
Course.hasMany(UserCourse);

// Sections Associations
Section.belongsTo(Course);
Course.hasMany(Section);

// UserSection Associations
UserSection.belongsTo(User);
User.hasMany(UserSection);
UserSection.belongsTo(Section);
Section.hasMany(UserSection);

// Content Associations
Content.belongsTo(Section);
Section.hasMany(Content);

// UserContent Associations
UserContent.belongsTo(User);
User.hasMany(UserContent);
UserContent.belongsTo(Content);
Content.hasMany(UserContent);

// Article Associations
Article.belongsTo(Tag);
Tag.hasMany(Article);
Article.belongsTo(User);
User.hasMany(Article);
Article.belongsTo(Comment);
Comment.hasMany(Article);
Article.belongsTo(CommentContent);
CommentContent.hasMany(Article);

// Blog Associations
Blog.belongsTo(Tag);
Tag.hasMany(Blog);
Blog.belongsTo(User);
User.hasMany(Blog);
Blog.belongsTo(Comment);
Comment.hasMany(Blog);
Blog.belongsTo(CommentContent);
CommentContent.hasMany(Blog);

// Podcast Associations
Podcast.belongsTo(Tag);
Tag.hasMany(Podcast);
Podcast.belongsTo(User);
User.hasMany(Podcast);
Podcast.belongsTo(Comment);
Comment.hasMany(Podcast);
Podcast.belongsTo(CommentContent);
CommentContent.hasMany(Podcast);

// Event Associations
Event.belongsTo(Tag);
Tag.hasMany(Event);
Event.belongsTo(User);
User.hasMany(Event);
Event.belongsTo(Comment);
Comment.hasMany(Event);
Event.belongsTo(CommentContent);
CommentContent.hasMany(Event);

// EventUser Associations
EventUser.belongsTo(User);
User.hasMany(EventUser);
EventUser.belongsTo(Event);
Event.hasMany(EventUser);

// Update Associations
Update.belongsTo(Tag);
Tag.hasMany(Update);
Update.belongsTo(User);
User.hasMany(Update);
Update.belongsTo(Comment);
Comment.hasMany(Update);
Update.belongsTo(CommentContent);
CommentContent.hasMany(Update);

// UserResource Associations
UserResource.belongsTo(User);
User.hasMany(UserResource);
UserResource.belongsTo(Resource);
Resource.hasMany(UserResource);

// Quiz Associations
Quiz.belongsTo(Course);
Course.hasMany(Quiz);
Quiz.belongsTo(Section);
Section.hasMany(Quiz);

// UserQuiz Associations
UserQuiz.belongsTo(User);
User.hasMany(UserQuiz);
UserQuiz.belongsTo(Course);
Course.hasMany(UserQuiz);
UserQuiz.belongsTo(Section);
Section.hasMany(UserQuiz);

// Question Associations
Question.belongsTo(Quiz);
Quiz.hasMany(Question);

// ForumPost Associations //nathan
ForumPost.belongsTo(Tag);
Tag.hasMany(ForumPost);
ForumPost.belongsTo(User);
User.hasMany(ForumPost);
ForumPost.belongsTo(Comment);
Comment.hasMany(ForumPost);
ForumPost.belongsTo(CommentForumPost);
CommentForumPost.hasMany(ForumPost);

// Answer Associations
Answer.belongsTo(Question);
Question.hasMany(Answer);

// Response Associations
Response.belongsTo(Comment);
Comment.hasMany(Response);

// NOTE: Kept this in file for future reference. - Zane
/* //User.hasMany(Role, {through: UserRole, foreignKey: UserName, otherKey: Role});
User.belongsToMany(Role, {through: UserRole, foreignKey: 'UserName', otherKey: 'Role'});
Role.belongsToMany(User, {through: UserRole, foreignKey: 'Role', otherKey: 'UserName'});

//ambiguous and unsure about what to do with tablels that have more than two foreign keys
Council.belongsToMany(User, {through: CouncilUserRole, foreignKey: 'Name', otherKey: 'UserID'});
//Council.belongsToMany(CouncilRole, {through: CouncilUserRole, foreignKey: 'CouncilID', otherKey: 'CouncilRole'});
//User.belongsToMany(Council, {through: CouncilUserRole, foreignKey: 'UserName', otherKey: 'CouncilId'});
User.belongsToMany(CouncilRole, {through: CouncilUserRole, foreignKey: 'UserName', otherKey: 'CouncilRole'});
CouncilRole.belongsToMany(Council, {through: CouncilUserRole, foreignKey: 'CouncilRole', otherKey: 'CouncilID'});
//CouncilRole.belongsToMany(User, {through: CouncilUserRole, foreignKey: 'CouncilRole', otherKey: 'UserName'});
User.belongsToMany(Role, {through: UserRole, foreignKey: 'UserName', otherKey: 'Role'});
Role.belongsToMany(User, {through: UserRole, foreignKey: 'Role', otherKey: 'UserName'});*/

sequelize.sync({ force: true });

module.exports = {
  Chapter,
  Council,
  //Role,
  //UserRole,
  CouncilRole,
  CouncilUserRole,
  Badge,
  User,
  Connection,
  UserBadge,
  Address,
  UpdatesTable,
  CertificationsTable,
  RecentActivityTable,
  RecentBadgesTable,
  RecentAchievementsTable,
  CouncilsTable,
  Message,
  Comment,
  CommentContent,
  CommentForumPost,
  Response,
  Certification,
  Certificate,
  Course,
  CertificationPreReq,
  CoursePreReq,
  UserCourse,
  Section,
  UserSection,
  Content,
  UserContent,
  Tag,
  Article,
  Blog,
  Podcast,
  Update,
  Event,
  EventUser,
  Resource,
  UserResource,
  Quiz,
  UserQuiz,
  Question,
  ForumPost,
  Answer,
  Report
}
console.log("Exiting Models.js");

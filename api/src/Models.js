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

//Badge tags and references to images stored in the server hard drive
class Badge extends Model{}
  Badge.init ({
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    //reference to where the image file is stored in the hard drive. 
    FilePath: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Badge',
    indexes: [{ unique: true, fields: ['Name'] }]
  }
); 
console.log("BadgeLoaded: " + Badge === sequelize.models.Badge); //true

//Multiple Chapters (branches of the church) managed by database
class Chapter extends Model{}
  Chapter.init ({
    ChapterID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    }, 
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Chapter',
    indexes: [{ unique: true, fields: ['ChapterID'] }]
  }
);
console.log("ChapterLoaded: " + Chapter === sequelize.models.Chapter); //true

//Councils are groups of Users with special administration authorities within a Chapter of the Church
class Council extends Model{}
  Council.init ({
    CouncilID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    }, 
    Name: {
        type:DataTypes.STRING,
        allowNull: false
    },
    //A council belongs to a Chapter
    ChapterID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
          model: Chapter,
          key: 'ChapterID'
      },
      allowNull: false
    }
  },{
    sequelize,
    modelName: 'Council',
    //Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    indexes: [{ unique: true, fields: ['CouncilID'] }]
  }
);
console.log("CouncilLoaded: " + Council === sequelize.models.Council); //true

//Roles: systemRole, userRole, councilRole, churchRole

//This table will store the names of the various Roles that people within the church play
//"web admin", "Church Member", "Visitor", "Teacher", "medicine person", "peyote roadman", "ayahuasca roadman"
class Role extends Model{}
  Role.init({
    Name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Role',
    indexes: [{ unique: true, fields: ['Name'] }]
  }
);
console.log("RoleLoaded: " + Role === sequelize.models.Role); // true

//Users may play multiple roles in the church, "web admin", "church user", "medicine person", 
class UserRole extends Model{}
  UserRole.init({
    UserRoleID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
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
  }
);
console.log("UserRoleLoaded: " + UserRole === sequelize.models.UserRole); //true

//This table will store the names of the various Roles that people within church councils play
//"principle stone carrier", "treasurer", "member"
class CouncilRole extends Model{}
  CouncilRole.init({
    Name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'CouncilRole',
    indexes: [{ unique: true, fields: ['Name'] }]
  }
);
console.log("CouncilRoleLoaded: " + CouncilRole === sequelize.models.CouncilRole); //true

//This table will store roles that the people in a council play
//"Johnny is the Principle Stone Carrier of the Land Management Council"
class CouncilUserRole extends Model{}
  CouncilUserRole.init({
    //token primary key
    CouncilUserRoleID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    CouncilName: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Council,
        key: 'CouncilID'
      },
      allowNull: false
    },
    CouncilRoleName: {
      type: DataTypes.STRING,
      references: {
        model: CouncilRole,
        key: 'Name'
      },
      allowNull: false
    }
  }, {
      sequelize,
      modelName: 'CouncilUserRole',
      indexes: [{ unique: true, fields: ['CouncilUserRoleID'] }]
    }
);
console.log("CouncilUserRoleLoaded: " + CouncilUserRole === sequelize.models.CouncilUserRole); //true

class User extends Model{}
  User.init ({
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        isEmail: {
          args: [true],
          msg: 'Error: Not an Email Address'
        }
      }
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3,30],
          message: 'Error: Password must be between 3 and 30 characters'
        }
      }
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    NickName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //No minimum age required as of current notice
    Birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Gender: {
      type: DataTypes.STRING
    },
    SecurityQuestion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    SecurityAnswer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //E-signature will be stored into a pdf in the server hard drive.
    ESignatureFilePath: {
      type: DataTypes.TEXT,
      allowNull: false     
    },
    //Uses a boolean to determine if user is subscribed to newsletter or not
    SubscribedToNewsletter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false     
    },
    //Uses a boolean to determine if user is subscribed to podcast or not
    SubscribedToPodcast: {
      type: DataTypes.BOOLEAN,
      defaultValue: false     
    },
    Points: {
      type: DataTypes.SMALLINT.UNSIGNED,
      defaultValue: 0
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: true    
    },
    ProfilePicLarge: {
      type: DataTypes.STRING,
      allowNull: true    
    },
    ProfilePicMedium: {
      type: DataTypes.STRING,
      allowNull: true    
    },
    ProfilePicSmall: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    DateLoggedIn: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    TimeLoggedIn: {
      type: DataTypes.TIME,
      allowNull: false 
    },
    Facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Instagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //A user may belong to a chapter, possibly no value here could infere a default "New Haven" Chapter
    ChapterID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
          model: Chapter,
          key: 'ChapterID'
      },
      defaultValue: 'New Haven'
    }
  }, {
    hooks: {
      beforeCreate: (user) => { 
        //either beforeCreate or AfterValidate is fine
        //afterValidate: (user) => {
        user.Password = bcrypt.hashSync('${user.Password}', 8); //copied from Pluralsight Sequelize tutorial
        
        //To check if password is correct for authentication:
        //bcrypt.compareSync(myPlaintextPassword, hash); // true
      }
    },
    //This was in the "Column Options" section of the sequilize manual
    sequelize,
    modelName: 'User',
  
    //Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    indexes: [{ unique: true, fields: ['Email'] }]
  }
);
console.log("UserLoaded: " + User === sequelize.models.User); //true

class UserBadge extends Model{}
  UserBadge.init ({
    //token primary key
    UserBadgeID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Badge: {
      type: DataTypes.STRING,
      references: {
          model: Badge,
          key: 'Name'
      },
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserBadge',
    indexes: [{ unique: true, fields: ['UserBadgeID'] }]
  }
); 
console.log("UserBadgeLoaded: " + UserBadge === sequelize.models.UserBadge); //true

class Address extends Model{}
Address.init({
  //token primary key
 AddressID: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  Address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  State: {
    type: DataTypes.STRING,
    allowNull: true
  },
  City: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Zip: {
    type: DataTypes.MEDIUMINT.UNSIGNED,
    allowNull: true
  },
  User: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'Email'
    },
    allowNull: false
  }
}, {
    sequelize,
    modelName: 'Address',
    indexes: [{ unique: true, fields: ['AddressID'] }]
  }
);
console.log("AddressLoaded: " + Address === sequelize.models.Address); //true

class UpdatesTable extends Model{}
  UpdatesTable.init({
    //token primary key
    UpdatesTableID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    State: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    Position: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    Length: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UpdatesTable',
    indexes: [{ unique: true, fields: ['UpdatesTableID'] }]
  }
);
console.log("UpdatesTableLoaded: " + UpdatesTable === sequelize.models.UpdatesTable); //true

class CertificationsTable extends Model{}
  CertificationsTable.init({
    //token primary key
    CertificationsTableID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    State: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    Position: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    },
    Length: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CertificationsTable',
    indexes: [{ unique: true, fields: ['CertificationsTableID'] }]
  }
);
console.log("CertificationsTableLoaded: " + CertificationsTable === sequelize.models.CertificationsTable); //true

class RecentActivityTable extends Model{}
  RecentActivityTable.init({
    //token primary key
    RecentActivityTableID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    State: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    Position: {
      type: DataTypes.TINYINT,
      defaultValue: 2
    },
    Length: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RecentActivityTable',
    indexes: [{ unique: true, fields: ['RecentActivityTableID'] }]
  }
);
console.log("RecentActivityTableLoaded: " + RecentActivityTable === sequelize.models.RecentActivityTable); //true

class RecentBadgesTable extends Model{}
  //token primary key
  RecentBadgesTable.init({
    RecentBadgesTableID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    State: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    Position: {
      type: DataTypes.TINYINT,
      defaultValue: 3
    },
    Length: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RecentBadgesTable',
    indexes: [{ unique: true, fields: ['RecentBadgesTableID'] }]
  }
);
console.log("RecentBadgesTableLoaded: " + RecentBadgesTable === sequelize.models.RecentBadgesTable); //true

class CouncilsTable extends Model{}
  //token primary key
  CouncilsTable.init({
    CouncilsTableID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    State: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    Position: {
      type: DataTypes.TINYINT,
      defaultValue: 4
    },
    Length: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CouncilsTable',
    indexes: [{ unique: true, fields: ['CouncilsTableID'] }]
  }
);
console.log("CouncilsTableLoaded: " + CouncilsTable === sequelize.models.CouncilsTable); //true

class Message extends Model{} 
  Message.init({
    //token primary key
    MessageID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false 
    },
    Sender: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    },
    Receiver: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Message',
    indexes: [{ unique: true, fields: ['MessageID'] }]
  }
);
console.log("MessageLoaded: " + Message === sequelize.models.Message); //true

class Comment extends Model{}
  Comment.init({
    //token primary key
    CommentID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false 
    },
    Author: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    indexes: [{ unique: true, fields: ['CommentID'] }]
  }
);
console.log("CommentLoaded: " + Comment === sequelize.models.Comment); //true

class Certification extends Model{}
  Certification.init({
    //token primary key
    Name: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    IntroVideo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IntroImageMedium: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IntroImageLarge: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    CertFilePath: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Certification',
    indexes: [{ unique: true, fields: ['Name'] }]
  }
);
console.log("CertificationLoaded: " + Certification === sequelize.models.Certification); //true

//This table is for the actual PDF data documents that people have earned
//or for references to the PDF documents on the server storage
class UserCertificate extends Model{}
  UserCertificate.init({
    //token primary key
    UserCertificateID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    //This field holds either the binary PDF file, or a pointer to that file on the server storage
    UserCertFilePath: {
      type: DataTypes.TEXT,
      allowNull: false
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
      allowNull: false 
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false 
    },
    //A Certificate belongs to a user.
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    },
    Certification: {
      type: DataTypes.STRING,
      references: {
        model: Certification,
        key: 'Name'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserCertificate',
    indexes: [{ unique: true, fields: ['UserCertificateID'] }]
  }
);
console.log("UserCertificateLoaded: " + UserCertificate === sequelize.models.UserCertificate); //true

class Course extends Model{}
  Course.init({
    //token primary key
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IntroVideo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IntroImageMedium: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IntroImageLarge: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    //A Course belongs to a author.
    Author: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Course',
    indexes: [{ unique: true, fields: ['Name'] }]
  }
);
console.log("CourseLoaded: " + Course === sequelize.models.Course); //true

class CoursePreReq extends Model{}
  CoursePreReq.init({
    //token primary key
    CoursePreReqsID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    CoursePreReq: {
      type: DataTypes.STRING,
      references: {
        model: Course,
        key: 'Name'
      },
      allowNull: false
    },
    Course: {
      type: DataTypes.STRING,
      references: {
        model: Course,
        key: 'Name'
      },
      allowNull: false
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
    CertificationPreReqID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    CoursePreReq: {
      type: DataTypes.STRING,
      references: {
        model: Course,
        key: 'Name'
      },
      allowNull: false
    },
    Certification: {
      type: DataTypes.STRING,
      references: {
        model: Certification,
        key: 'Name'
      },
      allowNull: false
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
    UserCourseID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
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
      allowNull: false 
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false 
    }, 
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    },
    Course: {
      type: DataTypes.STRING,
      references: {
        model: Course,
        key: 'Name'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserCourse',
    indexes: [{ unique: true, fields: ['UserCourseID'] }]
  }
);
console.log("UserCourseLoaded: " + UserCourse === sequelize.models.UserCourse); //true

class Section extends Model{} 
  Section.init({
    //token primary key
    SectionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Number: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    },
    Course: {
      type: DataTypes.STRING,
      references: {
      model: Course,
      key: 'Name'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Section',
    indexes: [{ unique: true, fields: ['SectionID'] }]
  }
);
console.log("SectionLoaded: " + Section === sequelize.models.Section); //true

class UserSection extends Model{}
  UserSection.init({
    //token primary key
    UserSectionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
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
      allowNull: false 
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false 
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    },
    SectionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Section,
        key: 'SectionID'
      },
      allowNull: false      
    }
  }, {
    sequelize,
    modelName: 'UserSection',
    indexes: [{ unique: true, fields: ['UserSectionID'] }]
  }
);
console.log("UserSectionLoaded: " + UserSection === sequelize.models.UserSection); //true

class Content extends Model{} 
  Content.init({
    //token primary key
    ContentID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Video: {
      type: DataTypes.STRING,
      allowNull: true      
    },
    Page: {
      type: DataTypes.STRING,
      allowNull: false      
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false         
    },
    SectionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
      model: Course,
      key: 'SectionID'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Content',
    indexes: [{ unique: true, fields: ['ContentID'] }]
  }
);
console.log("ContentLoaded: " + Content === sequelize.models.Content); //true

class UserContent extends Model{}
  UserContent.init({
    //token primary key
    UserContentID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
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
      allowNull: false 
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false 
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    },
    ContentID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Section,
        key: 'ContentID'
      },
      allowNull: false      
    }
  }, {
    sequelize,
    modelName: 'UserContent',
    indexes: [{ unique: true, fields: ['UserContentID'] }]
  }
);
console.log("UserContentLoaded: " + UserContent === sequelize.models.UserContent); //true

class Tag extends Model{} 
  Tag.init({
    //token primary key
    Tag: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    }
  }, {
      sequelize,
      modelName: 'Tag',
      indexes: [{ unique: true, fields: ['Tag'] }]
  }
);
console.log("TagLoaded: " + Tag === sequelize.models.Tag); //true

class Article extends Model{}
  Article.init({
    //token primary key
    ArticleID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ImageMedium: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ImageLarge: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Likes: {       
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false 
    },
    Tag: {
      type: DataTypes.STRING,
      references: {
        model: Tag,
        key: 'Tag'
      },
      allowNull: true    
    },
    Author: {
      type: DataTypes.STRING,
      references: {
        model: Course,
        key: 'Email'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Article',
    indexes: [{ unique: true, fields: ['ArticleID'] }]
});
console.log("ArticleLoaded: " + Article === sequelize.models.Article); //true

class Event extends Model{}
  Event.init({
    //token primary key
    EventID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ImageMedium: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ImageLarge: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    EventTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    EventDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EventDayOfWeek: {
      type: DataTypes.STRING
    },
    EventLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false 
    },
    Tag: {
      type: DataTypes.STRING,
      references: {
        model: Tag,
        key: 'Tag'
      },
      allowNull: true    
    },
    Author: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    indexes: [{ unique: true, fields: ['EventID'] }]
  }
);
console.log("EventLoaded: " + Event === sequelize.models.Event); //true

class EventUser extends Model{}
  EventUser.init({
    EventUserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    GoingToEvent: {
      type: DataTypes.STRING
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      }
    },
    EventID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Event,
        key: 'EventID'
      }
    },
  }, {
    sequelize,
    modelName: 'EventUser',
    indexes: [{ unique: true, fields: ['EventUserID'] }]
  }
);
console.log("EventUser: " + EventUser === sequelize.models.EventUser); //true

class Resource extends Model{} 
  Resource.init({
    ResourceID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FilePath: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
      sequelize,
      modelName: 'Resource',
      indexes: [{ unique: true, fields: ['ResourceID'] }]
  }
);
console.log("ResourceLoaded: " + Resource === sequelize.models.Resource); //true

class UserResource extends Model{} 
  UserResource.init({
    UserResourceID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      }
    },
    Archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false  
    },
    ResourceID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Resource,
        key: 'ResourceID'
      }
    },
  }, {
      sequelize,
      modelName: 'UserResource',
      indexes: [{ unique: true, fields: ['UserResourceID'] }]
  }
);
console.log("UserResourceLoaded: " + UserResource === sequelize.models.UserResource); //true

class Quiz extends Model{}
  Quiz.init({
    QuizID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Number: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Course: {
      type: DataTypes.STRING,
      references: {
        model: Course,
        key: 'Name'
      },
      allowNull: true
    },
    SectionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Section,
        key: 'SectionID'
      },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Quiz',
    indexes: [{ unique: true, fields: ['QuizID'] }]
  }
);
console.log("QuizLoaded: " + Quiz === sequelize.models.Quiz); //true

class UserQuiz extends Model{}
  UserQuiz.init({
    UserQuizID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false 
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: false
    },
    Course: {
      type: DataTypes.STRING,
      references: {
        model: Course,
        key: 'Name'
      },
      allowNull: true
    },
    SectionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Section,
        key: 'SectionID'
      },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'UserQuiz',
    indexes: [{ unique: true, fields: ['UserQuizID'] }]
  }
);
console.log("UserQuizLoaded: " + UserQuiz === sequelize.models.UserQuiz); //true

class Question extends Model{}
  Question.init({
    QuestionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Resolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Likes: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    },
    //A Question belongs to a quiz.
    QuizID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Quiz,
        key: 'QuizID'
      },
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Question',
    indexes: [{ unique: true, fields: ['QuestionID'] }]
  }
);
console.log("QuestionLoaded: " + Question === sequelize.models.Question); //true

class UserQuestion extends Model{}
  UserQuestion.init({
    //Questions on the forum can be archived for future reference by User.
    Archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    QuestionID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Quiz,
        key: 'QuestionID'
      },
      allowNull: true
    },
    User: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'Email'
      },
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserQuestion',
    indexes: [{ unique: true, fields: ['UserQuestionID'] }]
  }
);
console.log("UserQuestionLoaded: " + UserQuestion === sequelize.models.UserQuestion); //true

class Answer extends Model{}
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
      },
      allowNull: false
    }
  }, {
      sequelize,
      modelName: 'Answer',
      indexes: [{ unique: true, fields: ['AnswerID'] }]
  }
);
console.log("AnswerLoaded: " + Answer === sequelize.models.Answer); //true

//Council Associations
Council.belongsTo(Chapter);
Chapter.hasMany(Council);

//CouncilUserRole Associations
CouncilUserRole.belongsTo(Council);
Council.hasMany(CouncilUserRole);
CouncilUserRole.belongsTo(CouncilRoleName);
CouncilRoleName.hasMany(CouncilUserRole);

//User Associations
User.belongsTo(Chapter);
Chapter.hasMany(User);

//UserBadge Associations
UserBadge.belongsTo(Badge);
Badge.hasMany(UserBadge);
UserBadge.belongsTo(User);
User.hasMany(UserBadge);

//Address Associations
Address.belongsTo(User);
User.hasMany(Address);

//UpdatesTable Associations
UpdatesTable.belongsTo(User);
User.hasMany(UpdatesTable);

//CertificationsTable Associations
CertificationsTable.belongsTo(User);
User.hasMany(CertificationsTable);

//RecentActivityTable Associations
RecentActivityTable.belongsTo(User);
User.hasMany(RecentActivityTable);

//RecentBadgesTable Associations
RecentBadgesTable.belongsTo(User);
User.hasMany(RecentBadgesTable);

//CouncilsTable Associations
CouncilsTable.belongsTo(User);
User.hasMany(CouncilsTable);

//Message Associations
Message.belongsTo(Sender);
Sender.hasMany(Message);
Message.belongsTo(Receiver);
Receiver.hasMany(Message);

//Comment Associations
Comment.belongsTo(User);
User.hasMany(Comment);

//UserCertificate Associations
UserCertificate.belongsTo(User);
User.hasMany(UserCertificate);
UserCertificate.belongsTo(Certification);
Certification.hasMany(UserCertificate);

//Course Associations
Course.belongsTo(User);
User.hasMany(Course);

//CoursePreReq Associations
CoursePreReq.belongsTo(CoursePreReq);
CoursePreReq.hasMany(CoursePreReq);
CoursePreReq.belongsTo(Course);
Course.hasMany(CoursePreReq);

//CertificationPreReq Associations
CertificationPreReq.belongsTo(CoursePreReq);
CoursePreReq.hasMany(CertificationPreReq);
CertificationPreReq.belongsTo(Certification);
Certification.hasMany(CertificationPreReq);

//UserCourse Associations
UserCourse.belongsTo(User);
User.hasMany(UserCourse);
UserCourse.belongsTo(Course);
Course.hasMany(UserCourse);

//Sections Associations
Section.belongsTo(Course);
Course.hasMany(Section);

//UserSection Associations
UserSection.belongsTo(User);
User.hasMany(UserSection);
UserSection.belongsTo(Section);
Section.hasMany(UserSection);

//Content Associations
Content.belongsTo(Section);
Section.hasMany(Content);

//UserContent Associations
UserContent.belongsTo(User);
User.hasMany(UserContent);
UserContent.belongsTo(Content);
Content.hasMany(UserContent);

//Article Associations
Article.belongsTo(Tag);
Tag.hasMany(Article);
Article.belongsTo(Author);
Author.hasMany(Article);

//Event Associations
Event.belongsTo(Tag);
Tag.hasMany(Event);
Event.belongsTo(Author);
Author.hasMany(Event);

//EventUser Associations
EventUser.belongsTo(User);
User.hasMany(EventUser);
EventUser.belongsTo(Event);
Event.hasMany(EventUser);

//UserResource Associations
UserResource.belongsTo(User);
User.hasMany(UserResource);
UserResource.belongsTo(Resource);
Resource.hasMany(UserResource);

//Quiz Associations
Quiz.belongsTo(Course);
Course.hasMany(Quiz);
Quiz.belongsTo(Section);
Section.hasMany(Quiz);

//UserQuiz Associations
UserQuiz.belongsTo(User);
User.hasMany(UserQuiz);
UserQuiz.belongsTo(Course);
Course.hasMany(UserQuiz);
UserQuiz.belongsTo(Section);
Section.hasMany(UserQuiz);

//Question Associations
Question.belongsTo(Quiz);
Quiz.hasMany(Question);

//UserQuestion Associations
UserQuestion.belongsTo(Question);
Question.hasMany(UserQuestion);
UserQuestion.belongsTo(User);
User.hasMany(UserQuestion);

//Answer Associations
Answer.belongsTo(Question);
Question.hasMany(Answer);
   
  
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
  Badge,
  Chapter,
  Council,
  Role,
  UserRole,
  CouncilRole,
  CouncilUserRole,
  User,
  UserBadge,
  Address,
  UpdatesTable,
  CertificationsTable,
  RecentActivityTable,
  RecentBadgesTable,
  CouncilsTable,
  Message,
  Comment,
  Certification,
  UserCertificate,
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
  Event,
  EventUser,
  Resource,
  UserResource,
  Quiz,
  UserQuiz,
  Question,
  UserQuestion,
  Answer
}
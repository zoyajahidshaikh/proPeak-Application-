# Instructions

## Propeak Setup

### Download Setup and install

- Visual Studio Code - [Download](https://code.visualstudio.com/)

- Nodejs - [Download](https://nodejs.org/en/download/current/)

- Mongodb - [Download](https://www.mongodb.com/download-center/community)

- Rabbitmq - [Download for windows](https://www.rabbitmq.com/install-windows.html)

- Redis - [Download](https://redis.io/download)

## Production deployment tools

- FileZilla - [Download x64](https://filehippo.com/download_filezilla_64) - [Download win64](https://download.filezilla-project.org/client/FileZilla_3.41.2_win64_sponsored-setup.exe)

- Putty - [Download for windows](https://www.ssh.com/a/putty-0.70-installer.msi)

- Plugin - [Install React DevTools for Chrome/Brave/Chromium](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

## Get the Source Code

1. Create your account on git
2. Clone repository

   1. open cmd(windows) or terminal(Mac/Linux)

   2. run clone command - `git clone https://BITBUCKET_USERNAME@bitbucket.org/rajeshpillai/propeak.git`

   3. Change Directory to `proPeak` using the command `cd proPeak`

## Create database

1. Open terminal/command prompt
2. Run `mongo` (make sure `mongo` is in your PATH variable - [How to?](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#add-mongodb-binaries-to-the-system-path))
3. Create a new database by running `use DATABASE_NAME` inside mongo shell
4. Fill-up database with some mock data to work with. For that follow these steps:
   1. Open a new terminal window and change directory to propeak using `cd path/to/proPeak`
   2. Inside terminal, run `node scripts/db`. Before that, make sure you have MongoDB daemon is running. On Linux/Mac, use `sudo systemctl start mongodb`. On windows, run `mongod.exe`
   3. Wait for the program to finish execution.
5. If the script doesn't work for you(because of OS and other factor), please consider running commands manually from [here](#Initial-data-Script)(Section: **Initial Data Script**). (Obviously inside mongo shell)

## Open project

1. Open Visual Studio Code
2. Click `File` -> `Open Folder...` and select the `proPeak` folder
3. Install all dependencies - open Terminal(`View` -> `Terminal` OR `ctrl + ~`) and run `npm install`

## How to run application

1. Open a terminal window inside VS Code using `Ctrl + ~`, then split it into two by using split button or `Ctrl` + `Shift` + `5`.

2. Inside the first terminal, run: `node index`. This will start our node server on port 3001, i.e. The API server.

3. Inside the second terminal, run `npm start`. `npm start` will start a server on port `3000`, i.e. the React Server. Visit `localhost:3000` from a browser to see the changes.

4. Admin user name and password -
   - username - `admin123@algorisys.com`
   - password - `1234`

## Initial data Script

\***\*\*\*\*\*** Create Project  \***\*\*\*\*\*\*\***\*\*\*\***\*\*\*\*\*\*\***
db.createCollection("applevelaccessrights", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["entitlementId", "group", "access", "createdBy", "createdOn", "isDeleted", "userId"],
      properties: {
        entitlementId: { bsonType: "string" },
        group: { bsonType: "string" },
        access: { bsonType: "bool" },
        createdBy: { bsonType: "string" },
        createdOn: { bsonType: "date" },
        isDeleted: { bsonType: "bool" },
        userId: { bsonType: "string" }
      }
    }
  }
})

\***\*\*\*\*\*** userroles \***\*\*\*\*\*\*\***\*\*\*\***\*\*\*\*\*\*\***

db.createCollection('userroles')
db.userroles.insert({"role":"admin","displayName":"Admin"})
db.userroles.insert({"role":"user","displayName":"User"})
db.userroles.insert({"role":"owner","displayName":"Owner"})
db.userroles.insert({"role":"support","displayName":"Support"})

\***\*\*\*\*\*** users \***\*\*\*\*\*\*\***\*\*\*\***\*\*\*\*\*\*\***

db.createCollection('users')
db.users.insert({"name" : "Admin","role" : "admin","email" : "admin123@algorisys.com","password" : "$2a$10\$mrNsZYArt4Oq3NOp0225vuYVwvMf6714w2954OCGjw/qRhvD6tTOa","isDeleted" : false,"companyId" : "5b473ec371066e243c7789b9","isActive" : true,"reportingManagerId" : "5b49adcde6860ed4c376366c","profilePicture" : "images (3)\_2018-12-19_10-0-33.jpg","isLocked" : false,"lockedDateTime" : ISODate("2018-11-12T06:10:16.986Z"),"resetPasswordExpires" : ISODate("2018-11-02T11:28:47.933Z"),"resetPasswordToken" : "83323ce05af6fcac5deb508ae9deb0e6d7ee8f6f","dob" : "2018-11-17","gender" : "female","alternateNumber" : "","contactNumber" : "1234546747","dateOfJoining" : "","designation" : "","bloodGroup" : "","currentAddress" : "","permanentAddress" : "","panNo" : "","addharNo" : "","passportNo" : "","passportName" : "","passportissueDate" : "","passportexpiryDate" : "","placeOfIssue" : ""})

\***\*\*\*\*\*\*** tasktypes- \***\*\*\*\*\*\*\***\*\*\*\*\***\*\*\*\*\*\*\***

db.createCollection('tasktypes')
db.tasktypes.insert({ "displayName" : "Issue","title" : "issue"})
db.tasktypes.insert({"displayName" : "Task","title" : "task"})

\***\*\*\*\*\*\*** taskpriorities \***\*\*\*\*\*\*\***\*\***\*\*\*\*\*\*\***

db.createCollection('taskpriorities')
db.taskpriorities.insert({'priority':'urgent','displayName':'Urgent'})
db.taskpriorities.insert({'priority':'high','displayName':'High'})
db.taskpriorities.insert({'priority':'medium','displayName':'Medium'})
db.taskpriorities.insert({'priority':'low','displayName':'Low'})

\***\*\*\*\*\*\*\*** schedulertokens **\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***

db.createCollection('schedulertokens')
db.schedulertokens.insert({"ip" : "127.0.0.1","token" : "123" ,"active":true})
or
db.schedulertokens.insert({"ip" : "::ffff:127.0.0.1","token" : "123" ,"active":true})

**\*\***\*\*\***\*\*** projectstatus- **\*\*\*\***\*\***\*\*\*\***\*\*\***\*\*\*\***\*\***\*\*\*\***

db.createCollection('projectstatus')
db.projectstatus.insert({ "displayName" : "New","title" : "new"})
db.projectstatus.insert({"displayName" : "On Hold","title" : "onHold"})
db.projectstatus.insert({"displayName" : "In Progress","title" : "inprogress"})
db.projectstatus.insert({"displayName" : "Completed","title" : "completed"})

**\*\*\*\***\*\***\*\*\*\*** categories- \***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***
db.createCollection('categories')
db.categories.insert({ "displayName" : "todo","title" : "todo" ,"show":false,"sequence":1})
db.categories.insert({ "displayName" : "inprogress","title" : "inprogress" ,"show":false,"sequence":2})
db.categories.insert({ "displayName" : "completed","title" : "completed" ,"show":false,"sequence":3})

\***\*\*\*\*\*** leavetype \***\*\*\*\*\*\*\***\*\*\*\***\*\*\*\*\*\*\***
db.createCollection('leavetype')
db.leavetype.insert({ "id" : "1","LeaveTypeName" : "Sick Leave","isActive" : "true"})
db.leavetype.insert({ "id" : "2","LeaveTypeName" : "Casual Leave","isActive" : "true"})
db.leavetype.insert({ "id" : "3","LeaveTypeName" : "Maternity Leave","isActive" : "false"})
db.leavetype.insert({ "id" : "4","LeaveTypeName" : "Paternity Leave","isActive" : "false"})
db.leavetype.insert({ "id" : "5","LeaveTypeName" : "Comp Off","isActive" : "false"})
db.leavetype.insert({ "id" : "6","LeaveTypeName" : "Un-paid","isActive" : "false"})

\***\*\*\*\*\*** leaves \***\*\*\*\*\*\*\***\*\*\*\***\*\*\*\*\*\*\***
db.createCollection('leaves')
db.leaves.insert({"leaveTypeId" : "1","type" : "sick","maxinyear" : "6","financialyear" : "2018"})
db.leaves.insert({"leaveTypeId" : "2","type" : "casual","maxinyear" : "16","monthly" : "1","addeom" : "Yes", "months" : "1,1,2,1,2,1,1,2,1,1,2,1","joinedInMId" : "0","financialyear" : "2018","maxaccumulation" : "26"})
db.leaves.insert({"leaveTypeId" : "1","type" : "sick","maxinyear" : "6","financialyear" : "2019"})
db.leaves.insert({"leaveTypeId" : "2","type" : "casual","maxinyear" : "16","monthly" : "1","addeom" : "Yes", "months" : "1,1,2,1,2,1,1,2,1,1,2,1","joinedInMId" : "0","financialyear" : "2019","maxaccumulation" : "26"})

\***\*\*\*\*\*** applevelaccessrightsentitlments \***\*\*\*\*\*\*\***\*\*\*\***\*\*\*\*\*\*\***

db.createCollection('applevelaccessrightsentitlments')

db.applevelaccessrightsentitlments.insert({ "id" : 1,"Group" : "Projects", "EntitlementId" : "Edit", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 2,"Group" : "Projects", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 3,"Group" : "Projects", "EntitlementId" : "Delete", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 4,"Group" : "Projects", "EntitlementId" : "Clone", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 5,"Group" : "Projects", "EntitlementId" : "Create", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 47,"Group" : "Projects", "EntitlementId" : "Archive", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 6,"Group" : "Task", "EntitlementId" : "Edit", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 7,"Group" : "Task", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 8,"Group" : "Task", "EntitlementId" : "Delete", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 9,"Group" : "Task", "EntitlementId" : "Clone", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 10,"Group" : "Task", "EntitlementId" : "Create", "Value" : false })

db.applevelaccessrightsentitlments.insert({ "id" : 99,"Group" : "Dashboard", "EntitlementId" : "View", "Value" : true })

db.applevelaccessrightsentitlments.insert({ "id" : 14,"Group" : "Notification", "EntitlementId" : "Edit", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 15,"Group" : "Notification", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 16,"Group" : "Notification", "EntitlementId" : "Delete", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 17,"Group" : "Notification", "EntitlementId" : "Create", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 21,"Group" : "Users", "EntitlementId" : "Edit", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 22,"Group" : "Users", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 23,"Group" : "Users", "EntitlementId" : "Delete", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 24,"Group" : "Users", "EntitlementId" : "Create", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 25,"Group" : "Category", "EntitlementId" : "Edit", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 26,"Group" : "Category", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 27,"Group" : "Category", "EntitlementId" : "Delete", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 28,"Group" : "Category", "EntitlementId" : "Create", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 29,"Group" : "Company", "EntitlementId" : "Edit", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 30,"Group" : "Company", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 31,"Group" : "Company", "EntitlementId" : "Delete", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 32,"Group" : "Company", "EntitlementId" : "Create", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 18,"Group" : "Favorite Projects", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 19,"Group" : "Task Report", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 11,"Group" : "Summary", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 12,"Group" : "Audit Report", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 13,"Group" : "Upload Tasks", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 20,"Group" : "User Report", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 33,"Group" : "User Groups", "EntitlementId" : "Edit", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 34,"Group" : "User Groups", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 35,"Group" : "User Groups", "EntitlementId" : "Delete", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 36,"Group" : "User Groups", "EntitlementId" : "Create", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 37,"Group" : "Access Rights", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 38,"Group" : "Chat", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 39,"Group" : "Leave Application", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 40,"Group" : "Active User Report", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 41,"Group" : "StoryPoint Statistics", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 42,"Group" : "Incompelete task Reports", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 43,"Group" : "Project Progress Reports", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 44,"Group" : "User Performance Reports", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 45,"Group" : "Global Document Repository", "EntitlementId" : "View", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 46,"Group" : "Global Document Repository", "EntitlementId" : "Create", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 47,"Group" : "Category Order", "EntitlementId" : "Edit", "Value" : false })
db.applevelaccessrightsentitlments.insert({ "id" : 48,"Group" : "Category Order", "EntitlementId" : "View", "Value" : false })

\***\*\*\*\*\*** defaultapplevelaccessrights \***\*\*\*\*\*\*\***\*\*\*\***\*\*\*\*\*\*\***

db.createCollection('defaultapplevelaccessrights')

db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Access Rights"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Edit", "group" : "Access Rights"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Delete", "group" : "Access Rights"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Clone", "group" : "Access Rights"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Create", "group" : "Access Rights"})

db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Edit", "group" : "Projects"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Projects"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Delete", "group" : "Projects"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Clone", "group" : "Projects"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Create", "group" : "Projects"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Edit", "group" : "Task"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Task"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Delete", "group" : "Task"})  
 db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Clone", "group" : "Task"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Create", "group" : "Task"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Dashboard"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Audit Report"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Upload Tasks"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Edit", "group" : "Notification"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Notification"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Delete", "group" : "Notification"})  
 db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Create", "group" : "Notification"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Favorite Projects"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Task Report"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "User Report"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Edit", "group" : "Users"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Users"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Delete", "group" : "Users"})  
 db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Create", "group" : "Users"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Edit", "group" : "Category"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Category"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Delete", "group" : "Category"})  
 db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Create", "group" : "Category"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Edit", "group" : "Company"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Company"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Delete", "group" : "Company"})  
 db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Create", "group" : "Company"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Edit", "group" : "User Groups"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "User Groups"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Delete", "group" : "User Groups"})  
 db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Create", "group" : "User Groups"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Chat"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Leave Application"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Active User Report"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "StoryPoint Statistics"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Incompelete task Reports"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Project Progress Reports"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "User Performance Reports"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Global Document Repository"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Create", "group" : "Global Document Repository"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Archive", "group" : "Projects"})

db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "Edit", "group" : "Category Order"})
db.defaultapplevelaccessrights.insert({ "userRole" : "admin","entitlement" : "View", "group" : "Category Order"})

\***\*\*\*\*\*\*** applevelaccessrights **\*\***\*\***\*\***\*\***\*\***\*\***\*\***

db.createCollection('applevelaccessrights')

/_
Get userId, createdBy from the users table and replace it in the below
script
_/

db.applevelaccessrights.insert({ "entitlementId" : "Edit","group" : "Access Rights","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2018-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "Create","group" : "Access Rights","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2018-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "View","group" : "Access Rights","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2018-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "Delete","group" : "Access Rights","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2018-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "Clone","group" : "Access Rights","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2018-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "Archive","group" : "Projects","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f",
"createdOn" : ISODate("2019-03-15T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})
db.applevelaccessrights.insert({ "entitlementId" : "Archive","group" : "Projects","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f",
"createdOn" : ISODate("2019-03-15T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})
db.applevelaccessrights.insert({ "entitlementId" : "Archive","group" : "Projects","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f",
"createdOn" : ISODate("2019-03-15T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})
db.applevelaccessrights.insert({ "entitlementId" : "Archive","group" : "Projects","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f",
"createdOn" : ISODate("2019-03-15T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "View","group" : "Access Rights","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2019-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "View","group" : "Access Rights","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2019-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "View","group" : "Access Rights","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2019-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "Edit","group" : "Category Order","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2018-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "Create","group" : "Category Order","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2018-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "View","group" : "Category Order","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2018-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "Delete","group" : "Category Order","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2018-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

db.applevelaccessrights.insert({ "entitlementId" : "Clone","group" : "Category Order","access" : true,"createdBy" : "5d1f2e407cfeb4bc12a1581f", "createdOn"
: ISODate("2018-12-24T11:15:05.040Z"),"isDeleted" : false,"userId" : "5d1f2e407cfeb4bc12a1581f"})

\***\*\*\*\*\*** holidays \***\*\*\*\*\*\*\***\*\*\*\***\*\*\*\*\*\*\***
db.createCollection('holidays')

db.holidays.insert({"year":2019,"month":1,"monthName":"Jan","date":1,"fullDate":"2019-01-01","description":"New Year","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
db.holidays.insert({"year":2019,"month":1,"monthName":"Jan","date":26,"fullDate":"2019-01-26","description":"Republic day","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
db.holidays.insert({"year":2019,"month":3,"monthName":"Mar","date":21,"fullDate":"2019-03-21","description":"Holi","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
db.holidays.insert({"year":2019,"month":5,"monthName":"May","date":1,"fullDate":"2019-05-01","description":"Labour Day","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
db.holidays.insert({"year":2019,"month":6,"monthName":"Jun","date":5,"fullDate":"2019-06-05","description":"Ramzan Id","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
db.holidays.insert({"year":2019,"month":8,"monthName":"Aug","date":15,"fullDate":"2019-08-15","description":"Independence Day","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
db.holidays.insert({"year":2019,"month":9,"monthName":"Sep","date":2,"fullDate":"2019-09-02","description":"Ganesh Chaturthi","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
db.holidays.insert({"year":2019,"month":10,"monthName":"Oct","date":2,"fullDate":"2019-10-02","description":"Gandhi Jayanti","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
db.holidays.insert({"year":2019,"month":10,"monthName":"Oct","date":8,"fullDate":"2019-10-08","description":"Dussehra","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
db.holidays.insert({"year":2019,"month":10,"monthName":"Oct","date":28,"fullDate":"2019-10-28","description":"Diwali Laxmi Pooja","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
db.holidays.insert({"year":2019,"month":10,"monthName":"Oct","date":29,"fullDate":"2019-10-29","description":"Diwali-Bhaubeej","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
db.holidays.insert({"year":2019,"month":12,"monthName":"Dec","date":25,"fullDate":"2019-12-25","description":"X-mas Eve","type":"","frequency":"yearly","all":"","day":"","dayName":"","isActive":"1"});
# proPeak-Application-

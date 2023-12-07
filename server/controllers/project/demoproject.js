// CREATE
// exports.createProject = (req, res) => {
//   try {
//     console.log('Incoming request body:', req.body);

//     let userRole = req.userInfo.userRole.toLowerCase();
//     let accessCheck = access.checkEntitlements(userRole);

//     if (!accessCheck) {
//       console.log('User not authorized');
//       return res.status(403).json({ err: errors.NOT_AUTHORIZED });
//     }

//     let userId = req.userInfo.userId;
//     let userName = req.body.userName;

//     const projectUsers = req.body.newprojects.projectUsers.map((puser) => puser);
//     const notifyUsers = req.body.newprojects.notifyUsers.map((nuser) => nuser);

//     const newProject = new Project({
//       _id: req.body.newprojects._id,
//       title: req.body.newprojects.title,
//       description: req.body.newprojects.description,
//       startdate: req.body.newprojects.startdate,
//       enddate: req.body.newprojects.enddate,
//       status: req.body.newprojects.status,
//       // category: Array.isArray(req.body.newprojects.category)
//       //   ? req.body.newprojects.category
//       //   : [req.body.newprojects.category], // Convert to array if it's not already
//       category: Array.isArray(req.body.newprojects.category)
//   ? req.body.newprojects.category
//   : [req.body.newprojects.category], // Convert to array if it's not already

//       userid: req.body.newprojects.userid,
//       group: req.body.newprojects.group,
//       companyId: req.body.newprojects.companyId,
//       userGroups: req.body.newprojects.userGroups,
//       sendnotification: req.body.newprojects.sendnotification,
//       createdBy: req.body.newprojects.createdBy,
//       createdOn: req.body.newprojects.createdOn,
//       modifiedBy: req.body.newprojects.modifiedBy,
//       modifiedOn: req.body.newprojects.modifiedOn,
//       isDeleted: req.body.newprojects.isDeleted,
//       projectUsers: projectUsers,
//       notifyUsers: notifyUsers,
//       miscellaneous: req.body.newprojects.miscellaneous,
//       archive: req.body.newprojects.archive
//       // Add other properties here...
//     });

//     newProject.save()
//       .then((result) => {
//         console.log('Project created successfully:', result);

//         let userIdToken = req.userInfo.userName;
//         let fields = Object.keys(result._doc).filter((key) => !['_id', 'createdBy', 'createdOn', 'modifiedBy', 'modifiedOn', 'tasks'].includes(key));

//         fields.forEach((field) => {
//           if (result[field] && result[field].length) {
//             if (field === 'userid') {
//               audit.insertAuditLog('', result.title, 'Project', field, userName, userIdToken, result._id);
//             } else if (field === 'projectUsers') {
//               result[field].forEach((p) => {
//                 audit.insertAuditLog('', result.title, 'Project', field, p.name, userIdToken, result._id);
//               });
//             } else if (field === 'notifyUsers') {
//               result[field].forEach((n) => {
//                 audit.insertAuditLog('', result.title, 'Project', field, n.name, userIdToken, result._id);
//               });
//             } else if (field === 'userGroups') {
//               result[field].forEach((n) => {
//                 audit.insertAuditLog('', result.title, 'Project', field, n.groupName, userIdToken, result._id);
//               });
//             } else {
//               audit.insertAuditLog('', result.title, 'Project', field, result[field], userIdToken, result._id);
//             }
//           }
//         });

//         res.status(200).json({
//           success: true,
//           msg: `Successfully added!`
//         });
//       })
//       .catch((err) => {
//         console.error('Error while creating project:', err);
//         if (err.errors) {
//           res.status(500).json({
//             err: errors.ADD_PROJECT_ERROR
//           });
//         } else {
//           res.status(500).json({
//             err: 'Unexpected error occurred'
//           });
//         }
//       });
//   } catch (error) {
//     console.error('Error occurred in createProject:', error);
//     res.status(500).json({
//       err: 'Unexpected error occurred'
//     });
//   }
// };


//second one 
// exports.createProject = (req, res) => {
//   try {
//     console.log('Incoming request body:', req.body);

//     // Assuming these dependencies are properly imported and defined (access, Project, audit)
//     let userRole = req.userInfo.userRole.toLowerCase();
//     let accessCheck = access.checkEntitlements(userRole);
    
//     if (!accessCheck) {
//       console.log('User not authorized');
//       return res.status(403).json({ err: errors.NOT_AUTHORIZED });
//     }

//     let userId = req.userInfo.userId;
//     let userName = req.body.userName;

//     const projectUsers = req.body.newprojects.projectUsers.map((puser) => puser);
//     const notifyUsers = req.body.newprojects.notifyUsers.map((nuser) => nuser);

//     const newProject = new Project({
//       // Assuming these properties exist in the request body
//       _id: req.body.newprojects._id,
//       title: req.body.newprojects.title,
//       description: req.body.newprojects.description,
//       startdate: req.body.newprojects.startdate,
//       enddate: req.body.newprojects.enddate,
//       status: req.body.newprojects.status,
//       category: req.body.newprojects.category,
//       userid: req.body.newprojects.userid,
//       group: req.body.newprojects.group,
//       companyId: req.body.newprojects.companyId,
//       userGroups: req.body.newprojects.userGroups,
//       sendnotification: req.body.newprojects.sendnotification,
//       createdBy: req.body.newprojects.createdBy,
//       createdOn: req.body.newprojects.createdOn,
//       modifiedBy: req.body.newprojects.modifiedBy,
//       modifiedOn: req.body.newprojects.modifiedOn,
//       isDeleted: req.body.newprojects.isDeleted,
//       projectUsers: projectUsers,
//       notifyUsers: notifyUsers,
//       miscellaneous: req.body.newprojects.miscellaneous,
//       archive: req.body.newprojects.archive
//       // Add other properties here...
//     });

//     newProject.save()
//       .then((result) => {
//         console.log('Project created successfully:', result);

//         let userIdToken = req.userInfo.userName;
//         let fields = Object.keys(result._doc).filter((key) => !['_id', 'createdBy', 'createdOn', 'modifiedBy', 'modifiedOn', 'tasks'].includes(key));

//         fields.forEach((field) => {
//           if (result[field] && result[field].length) {
//             if (field === 'userid') {
//               audit.insertAuditLog('', result.title, 'Project', field, userName, userIdToken, result._id);
//             } else if (field === 'projectUsers') {
//               result[field].forEach((p) => {
//                 audit.insertAuditLog('', result.title, 'Project', field, p.name, userIdToken, result._id);
//               });
//             } else if (field === 'notifyUsers') {
//               result[field].forEach((n) => {
//                 audit.insertAuditLog('', result.title, 'Project', field, n.name, userIdToken, result._id);
//               });
//             } else if (field === 'userGroups') {
//               result[field].forEach((n) => {
//                 audit.insertAuditLog('', result.title, 'Project', field, n.groupName, userIdToken, result._id);
//               });
//             } else {
//               audit.insertAuditLog('', result.title, 'Project', field, result[field], userIdToken, result._id);
//             }
//           }
//         });

//         res.status(200).json({
//           success: true,
//           msg: `Successfully added!`
//         });
//       })
//       .catch((err) => {
//         console.error('Error while creating project:', err);
//         if (err.errors) {
//           res.status(500).json({
//             err: errors.ADD_PROJECT_ERROR
//           });
//         } else {
//           res.status(500).json({
//             err: 'Unexpected error occurred'
//           });
//         }
//       });
//   } catch (error) {
//     console.error('Error occurred in createProject:', error);
//     res.status(500).json({
//       err: 'Unexpected error occurred'
//     });
//   }
// };

// exports.createProject = ((req, res) => {
//   // console.log("req.body",req.body);
//   let userRole = req.userInfo.userRole.toLowerCase();
//   let accessCheck = access.checkEntitlements(userRole);
//   if (accessCheck === false) {
//     res.json({ err: errors.NOT_AUTHORIZED });
//     return;
//   }
//   let userId = req.userInfo.userId;
//   // let addProject = false;
//   // console.log("accessConfig",accessConfig);
//   // addProject = accessConfig.validateEntitlementsAppLevel(userId, 'Projects', 'Create',userRole);
//   // console.log("addProject",addProject);

//   logInfo(req.body, "createProject req.body");
//   let userName = req.body.userName;

//   var projectUser = req.body.newprojects.projectUsers.map((puser) => {
//     return puser;
//   });

//   var notifyUser = req.body.newprojects.notifyUsers.map((nuser) => {
//     return nuser;
//   });

//   let newProject = new Project({
//     _id: req.body.newprojects._id,
//     title: req.body.newprojects.title,
//     description: req.body.newprojects.description,
//     startdate: req.body.newprojects.startdate,
//     enddate: req.body.newprojects.enddate,
//     status: req.body.newprojects.status,
//     category: req.body.newprojects.category,
//     userid: req.body.newprojects.userid,
//     group: req.body.newprojects.group,
//     companyId: req.body.newprojects.companyId,
//     userGroups: req.body.newprojects.userGroups,
//     sendnotification: req.body.newprojects.sendnotification,
//     createdBy: req.body.newprojects.createdBy,
//     createdOn: req.body.newprojects.createdOn,
//     modifiedBy: req.body.newprojects.modifiedBy,
//     modifiedOn: req.body.newprojects.modifiedOn,
//     isDeleted: req.body.newprojects.isDeleted,
//     projectUsers: projectUser,
//     notifyUsers: notifyUser,
//     miscellaneous: req.body.newprojects.miscellaneous,
//     archive: req.body.newprojects.archive
//   });

//   newProject.save()
//     .then((result) => {
//       logInfo(result, "createProject result");
//       let userIdToken = req.userInfo.userName;
//       let fields = [];
//       var res1 = Object.assign({}, result);
//       for (let keys in res1._doc) {
//         if (keys !== 'createdBy' && keys !== 'createdOn' && keys !== 'modifiedBy' && keys !== 'modifiedOn' &&
//           keys !== '_id' && keys !== 'tasks') {
//           fields.push(keys);
//         }
//       }

//       fields.filter((field) => {
//         if (result[field] !== undefined && result[field] !== null && result[field].length !== 0 && result[field] !== '') {
//           if (field === 'userid') {
//             audit.insertAuditLog('', result.title, 'Project', field, userName, userIdToken, result._id);
//           } else if (field === 'projectUsers') {
//             result[field].map((p) => {
//               audit.insertAuditLog('', result.title, 'Project', field, p.name, userIdToken, result._id);
//             })
//           } else if (field === 'notifyUsers') {
//             result[field].map((n) => {
//               audit.insertAuditLog('', result.title, 'Project', field, n.name, userIdToken, result._id);
//             })
//           } else if (field === 'userGroups') {
//             // console.log("result[field]",result[field]);
//             result[field].map((n) => {
//               audit.insertAuditLog('', result.title, 'Project', field, n.groupName, userIdToken, result._id);
//             })
//             // audit.insertAuditLog('', result.title, 'Project', field, result[field], userIdToken, result._id);
//           } else {
//             audit.insertAuditLog('', result.title, 'Project', field, result[field], userIdToken, result._id);
//           }
//         }
//       })

//       res.json({
//         success: true,
//         msg: `Successfully added!`
//       });

//     })
//     .catch((err) => {
//       if (err.errors) {
//         // Show failed if all else fails for some reasons
//         res.json({
//           err: errors.ADD_PROJECT_ERROR
//         });
//       }
//     });
// });









// exports.getAllProjectsSummary = ((req, res) => {
//   console.log('Request body:', req.body);

//   try {
//     let selectedUserId = req.body.userId;
//     let selectedUserRole = req.body.userRole;
//     let selectedProjectId=req.body.projectId;
//     let showArchive=req.body.showArchive

//     logInfo("getAllProjectsSummary");
//     logInfo(req.userInfo, "getAllProjectsSummary userInfo=");

//     let userRole = req.userInfo.userRole.toLowerCase();
//     let userId = req.userInfo.userId;

//     if (!userRole) {
//       res.json({
//         err: errors.NOT_AUTHORIZED
//       });
//       return;
//     }
//     let projects = [];
//     let condition = {};
//     let projectFields = {
//       $project: {
//         _id: 1,
//         title: 1,
//         description: 1,
//         startdate: 1,
//         enddate: 1,
//         userid: 1,
//         status: 1,
//         projectUsers: 1,
//         notifyUsers: 1,
//         uploadFiles: 1,
//         group: 1,
//         miscellaneous: 1,
//         archive: 1,
//         "tasks.status": 1,
//         "tasks.completed": 1,
//         "tasks.category": 1,
//         "tasks.isDeleted": 1,
//         "tasks.userId": 1,
//         "tasks.endDate":1,
        
//       }
//     };
//     let projectCondition = "";
//     let taskFilterCondition = {
//       $match: condition
//     };
//     let userCondition = {
//       isDeleted: false,
//       // archive: false
//     };
//     if(showArchive===false){
//       userCondition["archive"] =false;
//     }
//     if(selectedProjectId){
//       userCondition["_id"] = ObjectId(selectedProjectId);
//     }
//     if (selectedUserId) {
//       if (userRole === "admin" || userRole === "owner") {
//         if (selectedUserRole === "owner" || selectedUserRole === "admin") {
//           userCondition.$and = [{
//             $or: [{
//               userid: selectedUserId
//             }, {
//               "projectUsers.userId": selectedUserId
//             }]
//           }, { $or: [{ miscellaneous: null }, { miscellaneous: false }] }];
//         } else {
//           userCondition = {
//             isDeleted: false,
//             $or: [{ miscellaneous: null }, { miscellaneous: false }],
//             "projectUsers.userId": selectedUserId
//           };
//         }
//       } else {
//         res.json({
//           err: errors.NOT_AUTHORIZED
//         });
//         return;
//       }
//     } else {
//       if (userRole !== "admin") {
//         if (userRole === "owner") {
//           userCondition.$or = [{
//             userid: userId
//           }, {
//             "projectUsers.userId": userId,
//           }];
//         } else {
//           userCondition = {
//             isDeleted: false,
//             "projectUsers.userId": userId
//           };
//         }
//       }
//     }

//     let projectCond = {
//       $match: userCondition
//     };
//     logInfo([projectCond, projectFields], "getAllProjectsSummary filtercondition");
//     Project.aggregate([projectCond, projectFields])//.sort({title:1})
//       .then((result) => {
//         console.log('Projects retrieved:', result.length);

//         let userIds =[];
        
      
      
//         let date = dateUtil.DateToString(new Date().toISOString())
//         // let onHoldTaskArray=[], overDueTaskArray=[];
//         let projects = result.map((p) => {
//           p.totalTasks = 0;
//           p.completedTasks = 0;
//           p.inProgressTasks = 0;
//           p.activeTasks = 0;
//           p.overDueTasks=0;
//           p.onHoldTasks=0;
//           p.incompleteTasks=0;
//           onHoldTaskArray=[];
//           overDueTaskArray=[];
//           incompletetaskArray=[];
//           p.totalProjectUser=0;
          
//           p.projectUsers= p.projectUsers.filter((p) => p.name !== undefined && p.name!== null);
         
//         p.totalProjectUser=p.projectUsers.length;

//         for(let j=0;j<p.projectUsers.length;j++){
//           userIds.push(p.projectUsers[j].userId);
//         }
        
//           let attachments = p.uploadFiles.filter((u) => u.isDeleted === false);
//           p.attachments = attachments.length;
//           if (p.tasks && Array.isArray(p.tasks)) {
        
//             p.tasks = p.tasks.filter((t) =>
//             {
//               if (userRole === "user") {
//                 return t.isDeleted === false && t.userId=== userId
//               }
//               else  {
//                 return t.isDeleted === false 
//               }
//             });
//             p.totalTasks = p.tasks.length;
//             for (let i = 0; i < p.tasks.length; i++) {
//               if(p.tasks[i].endDate !== undefined && p.tasks[i].endDate !== null && p.tasks[i].endDate !==''){
//                 if (dateUtil.DateToString(p.tasks[i].endDate)< date && p.tasks[i].status !== 'completed') {
//                   overDueTaskArray.push(p.tasks[i]);
//                 } 
//               } 
//               if (p.tasks[i].status === "onHold") 
//               {
//                    onHoldTaskArray.push(p.tasks[i])
//               }
//               if(p.tasks[i].status==='inprogress'){
//                 incompletetaskArray.push(p.tasks[i])
//               }
//             }
//             p.overDueTasks=overDueTaskArray.length;
           
//             p.onHoldTasks=onHoldTaskArray.length
        
//             p.incompleteTasks=incompletetaskArray.length

//             p.tasks.map((t) => {
//               if (t.completed) {
//                 p.completedTasks++;
//               } else if (t.category === "inprogress") {
//                 p.inProgressTasks++;
//                 if (selectedUserId) {
//                   if (t.userId === selectedUserId) p.activeTasks++;
//                 }
//               }
//               return t;
//             });

//             p.tasks = [];
//           }
//           return p;
//         });
//         let projUsers=[]
        
//         if(userIds.length > 0){
//           for(let i=0;i<userIds.length;i++){
//             if(!projUsers.includes(userIds[i].toString())) {
//               projUsers.push(userIds[i].toString());
              
//             }
//           }
//         }
      
//         let  totalProjectUser=projUsers.length;
        
//         logInfo("getAllProjectsSummary projects");
//         var result1 = sortData.sort(projects, 'title');
//         res.json({
//           success: true,
//           data: projects,
//           count:userRole === 'user' ? 1 : totalProjectUser
         
//         });
//       })
//       .catch((err) => {
//         console.error('Error in project aggregation:', err);

//         logError(err, "getAllProjectsSummary err");
//         res.json({
//           err: errors.SERVER_ERROR
//         });
//       });
//   } catch (e) {
//     logError("e getAllProjectsSummary", e);
//   }
// });


                       {/* <div className="col-sm-2">
                                                
                                                        <input type="submit" id="btnApplyLeave" value="Apply" className="btn btn-info btn-block"
                                                           
                                                            disabled={this.state.leaveType === "Comp Off" ?
                                                                !(workingDays && fromDate && toDate && leaveType && leaveReason && leaveCategory)
                                                                : this.state.leaveType === 'Sick Leave' || this.state.leaveType === 'Casual Leave' ? !(isElegible && workingDays && fromDate && toDate && leaveType && leaveCategory) : !(workingDays && fromDate && toDate && leaveType && leaveCategory)}
                                                            onSubmit={this.onApplyLeave} />
                                                </div> */}







  // async postLeaveApplication(leaveApplication, user) {
  //     console.log('Data being sent:', leaveApplication);
  //     let response = { response: "", err: "" }
  //     console.log("Attempting to post leave application...");
  //     if (!isNullOrUndefined(leaveApplication.leaveId)) {
  //         response = await leaveApplicationService.editLeaveApplication(leaveApplication, user);

  //     } else {
  //         response = await leaveApplicationService.saveLeaveApplication(leaveApplication, user);
  //     }

  //     this.setState({
  //         isLoaded: true
  //     });
  //     if (response.err) {
  //         this.setState({
  //             isLoaded: false,
  //             fromDate: dateUtil.DateToString(new Date()),
  //             toDate: dateUtil.DateToString(new Date()),
  //             workingDays: "1",
  //             leaveReason: "",
  //             leaveType: "",
  //             balanceMessage: '',
  //             errorMessage: 'Error : ' + response.err
  //         });
  //     } else if (response.response && response.response.data.err) {
  //         this.setState({
  //             isLoaded: false,
  //             fromDate: dateUtil.DateToString(new Date()),
  //             toDate: dateUtil.DateToString(new Date()),
  //             workingDays: "1",
  //             leaveReason: "",
  //             leaveType: "",
  //             balanceMessage: '',
  //             errorMessage: 'Error : ' + response.response.data.err
  //         });
  //     } else {
  //         this.setState({
  //             isLoaded: false,
  //             fromDate: dateUtil.DateToString(new Date()),
  //             toDate: dateUtil.DateToString(new Date()),
  //             workingDays: "1",
  //             leaveReason: "",
  //             leaveType: "",
  //             balanceMessage: '',
  //             successMessage: response.response.data.message,
  //             leaveCategory: ''
  //         });
  //         // setTimeout(function () {
  //         //     window.location.href = "/leave"
  //         // }, 5000);
  //     }
  //     console.log('Response:', response);

  // }
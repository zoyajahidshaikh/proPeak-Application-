import { serviceHost } from "../../common/const";
import ServiceRequest from "../../utils/service-request";

const handleResponse = (response, err) => {
  if (err) {
    return { response: null, err };
  }
  return { response, err: null };
};

export const getAllLeaves = async () => {
  try {
    const response = await ServiceRequest(
      "get",
      "json",
      `${serviceHost}/leaves`
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const saveLeaveApplication = async (leaveApplication, userName) => {
  try {
    const data = { leaveApplication, userName };
    const response = await ServiceRequest(
      "post",
      "json",
      `${serviceHost}/leaves`,
      data
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const getAllAppliedLeaves = async (flag) => {
  try {
    const data = { flag };
    const response = await ServiceRequest(
      "post",
      "json",
      `${serviceHost}/leaves/getAllLeaves`,
      data
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const getDetails = async (leaveId) => {
  try {
    const response = await ServiceRequest(
      "get",
      "json",
      `${serviceHost}/leaves/getDetails/${leaveId}`
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const ApprovedReject = async (leaveApprovedReject) => {
  try {
    const data = leaveApprovedReject;
    const response = await ServiceRequest(
      "post",
      "json",
      `${serviceHost}/leaves/approveReject`,
      data
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const editLeaveApplication = async (leaveApplication) => {
  try {
    const data = leaveApplication;
    const response = await ServiceRequest(
      "post",
      "json",
      `${serviceHost}/leaves/editLeave`,
      data
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const deleteLeave = async (leaveId) => {
  try {
    const data = { leaveId };
    const response = await ServiceRequest(
      "post",
      "json",
      `${serviceHost}/leaves/deleteLeave`,
      data
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const approveLeave = async (leaveId) => {
  try {
    const data = { leaveId };
    const response = await ServiceRequest(
      "post",
      "json",
      `${serviceHost}/leaves/approveLeave`,
      data
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const getHolidays = async () => {
  try {
    const response = await ServiceRequest(
      "get",
      "json",
      `${serviceHost}/leaves/getHolidays/`
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const checkEligibility = async (leaveApplication) => {
  try {
    const data = leaveApplication;
    const response = await ServiceRequest(
      "post",
      "json",
      `${serviceHost}/leaves/checkEligibility/`,
      data
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const getAllLeavesForCalendar = async () => {
  try {
    const response = await ServiceRequest(
      "get",
      "json",
      `${serviceHost}/leaves/getAllLeavesForCalendar/`
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const getAllAppliedLeavesforAdmin = async () => {
  try {
    const response = await ServiceRequest(
      "get",
      "json",
      `${serviceHost}/leaves/getAllAppliedLeavesforAdmin/`
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

export const getUserOnLeaveDetails = async (userId) => {
  try {
    const data = { userId };
    const response = await ServiceRequest(
      "post",
      "json",
      `${serviceHost}/leaves/getUserOnLeaveDetails/`,
      data
    );
    return handleResponse(response, null);
  } catch (err) {
    return handleResponse(null, err);
  }
};

// import { serviceHost } from '../../common/const';
// import ServiceRequest from '../../utils/service-request';

// export const getAllLeaves = async () => {
//     try {
//         let response = await ServiceRequest('get', 'json', serviceHost + '/leaves');
//         return { response, err: null };
//     }
//     catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     };
// }

// export const saveLeaveApplication = async (leaveApplication, userName) => {
//     try {
//         let data = { leaveApplication, userName };
//         let response = await ServiceRequest("post", "json", serviceHost + "/leaves", data)
//         return { response, err: null };
//     }
//     catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }
// export const getAllAppliedLeaves = async (flag) => {
//     try {
//         let data = { flag: flag };
//         let response = await ServiceRequest('post', 'json', serviceHost + '/leaves/getAllLeaves', data);
//         return { response, err: null };

//     } catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }
// //Details
// export const getDetails = async (leaveId) => {
//     try {
//         let response = await ServiceRequest('get', 'json', serviceHost + '/leaves/getDetails/' + leaveId);
//         return { response, err: null };
//     }
//     catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }
// //Approved Rejected
// export const ApprovedReject = async (leaveApprovedReject) => {
//     try {
//         let data = leaveApprovedReject
//         let response = await ServiceRequest('post', "json", serviceHost + '/leaves/approveReject', data);
//         return { response, err: null }
//     }
//     catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }
// //edit request
// export const editLeaveApplication = async (leaveApplication) => {
//     try {
//         let data = leaveApplication
//         let response = await ServiceRequest('post', "json", serviceHost + '/leaves/editLeave', data);
//         return { response, err: null }
//     }
//     catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }
// //deleteLeave
// export const deleteLeave = async (leaveId) => {
//     try {
//         let data = { leaveId: leaveId }
//         let response = await ServiceRequest('post', "json", serviceHost + '/leaves/deleteLeave', data);
//         return { response, err: null }
//     }
//     catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }

// //approveLeave
// export const approveLeave = async (leaveId) => {
//     try {
//         let data = { leaveId: leaveId }
//         let response = await ServiceRequest('post', "json", serviceHost + '/leaves/approveLeave', data);
//         return { response, err: null }
//     }
//     catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }

// //get holidays for the current month
// export const getHolidays = async () => {
//     try {
//         let response = await ServiceRequest("get", "json", serviceHost + '/leaves/getHolidays/');
//         return { response, err: null }
//     } catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }

// //check for eligiblity
// export const checkEligibility = async (leaveApplication) => {
//     try {
//         let data = leaveApplication;
//         let response = await ServiceRequest("post", "json", serviceHost + "/leaves/checkEligibility/", data);
//         return { response, err: null }
//     } catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }
// //getAllLeavesForCalendar
// export const getAllLeavesForCalendar = async () => {
//     try {
//         let response = await ServiceRequest("get", "json", serviceHost + '/leaves/getAllLeavesForCalendar/');
//         return { response, err: null }
//     } catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }

// export const getAllAppliedLeavesforAdmin = async ()=>{
//     try {
//         let response = await ServiceRequest("get", "json", serviceHost + '/leaves/getAllAppliedLeavesforAdmin/');
//         return { response, err: null }
//     } catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }

// export const getUserOnLeaveDetails = async (userId) => {
//     try {
//         let data = {userId}
//         let response = await ServiceRequest("post", "json", serviceHost + '/leaves/getUserOnLeaveDetails/', data);
//         return { response, err: null }
//     } catch (err) {
//         if (err) {
//             return { response: null, err }
//         }
//     }
// }

import React, { Component } from "react";
//import axios from 'axios';
import * as dateUtil from "../../../utils/date-util";
import { Link } from "react-router-dom";
import Auth from "../../../utils/auth";
import * as leaveApplicationService from "../../../Services/leave-service/leave-service";
// import { isNullOrUndefined } from "util";
import Calendar from "../../../Components/calendar/calendar";
import "./leave.css";
// import { isBuffer } from "util";
// Use direct comparisons instead
function isNullOrUndefined(obj) {
  return obj === null || obj === undefined;
}
class LeaveApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveReason: "",
      workingDays: "1",
      leaveTypes: this.props.context.state.leaveTypes,
      fromDate: dateUtil.DateToString(new Date()),
      toDate: dateUtil.DateToString(new Date()),
      errorMessage: "",
      successMessage: "",
      users: this.props.context.state.users,
      isLoaded: false,
      leaveId: this.props.leaveId,
      holidayList: [],
      isElegible: false,
      balanceMessage: "",
      isHolidayList: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.dateCheck = this.dateCheck.bind(this);
    //this.redirect=this.redirect.bind(this);
    this.onApplyLeave = this.onApplyLeave.bind(this);
    this.postLeaveApplication = this.postLeaveApplication.bind(this);
    this.setValues = this.setValues.bind(this);
    this.getAllHolidays = this.getAllHolidays.bind(this);
    this.getHoliday = this.getHoliday.bind(this);
    this.onCheckEligibility = this.onCheckEligibility.bind(this);
    this.closeHolidayList = this.closeHolidayList.bind(this);
  }
  closeHolidayList() {
    this.setState({
      ...this.state,
      isHolidayList: false,
    });
  }
  componentDidMount() {
    if (this.state.leaveTypes.length === 0) {
      this.props.context.actions.setLeaveType();
    }
    if (this.state.users.length === 0) {
      this.props.context.actions.setUsers();
    }
    if (this.props.leaveId !== undefined) {
      this.setValues();
    }
  }
  async setValues() {
    let leaveId = this.props.leaveId;
    let { response, err } = await leaveApplicationService.getDetails(leaveId);
    this.setState({
      isLoaded: true,
    });

    if (err) {
      this.setState({
        isLoaded: false,
      });
    } else if (response && response.data.err) {
      this.setState({
        isLoaded: false,
      });
    } else {
      this.setState({
        isLoaded: false,
        fromDate: response.data.leaveDetails.fromDate,
        toDate: response.data.leaveDetails.toDate,
        workingDays: response.data.leaveDetails.workingDays,
        leaveType: response.data.leaveDetails.leaveType,
        leaveReason: response.data.leaveDetails.reason,
        leaveCategory: response.data.leaveDetails.leaveCategory,
        isElegible: true,
      });

      document.getElementById("leaveType").value =
        response.data.leaveDetails.leaveType;
    }
  }
  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "leaveType") {
      if (value === "") {
        this.setState({
          [name]: value,
          errorMessage: "Please select the type of leave",
        });
      } else {
        this.setState(
          {
            [name]: value,
            errorMessage: "",
            successMessage: "",
            balanceMessage: "",
          },
          this.dateCheck
        );
      }
    } else {
      this.setState(
        {
          [name]: value,
          errorMessage: "",
          successMessage: "",
          balanceMessage: "",
        },
        this.dateCheck
      );
    }
  }
  dateCheck() {
    if (this.state.fromDate !== "" && this.state.toDate !== "") {
      if (Date.parse(this.state.fromDate) > Date.parse(this.state.toDate)) {
        document.querySelector("#workingDays").value = "";
        this.setState({
          submitDisabled: true,
          errorMessage: "From Date is Greater Than To Date",
          duration: "",
        });
      } else {
        let fromDate = new Date(this.state.fromDate);
        let toDate = new Date(this.state.toDate);
        let timeDiff = Math.abs(fromDate.getTime() - toDate.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays === 0) {
          if (this.state.leaveCategory === "Half Day") {
            diffDays = 1 - 0.5;
          } else {
            diffDays = 1;
          }

          document.querySelector("#workingDays").value = 1;
        } else {
          diffDays = diffDays + 1;
          document.querySelector("#workingDays").value = diffDays;
        }

        this.setState({
          submitDisabled: false,
          errorMessage: "",
          workingDays: diffDays,
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      leaveTypes: nextProps.context.state.leaveTypes,
      users: nextProps.context.state.users,
    });
  }
  redirect() {
    this.props.history.push("/leave");
  }
  getAllHolidays(e) {
    let object = e.target;

    this.getHoliday(object);
  }
  async getHoliday(object) {
    // let html = "";
    let { response, err } = await leaveApplicationService.getHolidays();
    this.setState({
      isLoaded: true,
    });
    if (err) {
      this.setState({
        isLoaded: false,
      });
    } else if (response && response.data.err) {
      this.setState({
        isLoaded: false,
      });
    } else {
      this.setState({
        isLoaded: false,
      });
      this.setState({
        ...this.state,
        holidayList: response.data.holidayList,
        isHolidayList: true,
      });
    }
  }
  onCheckEligibility(event) {
    var dropdwn = document.getElementById("leaveType");
    let datavalue =
      dropdwn.options[dropdwn.selectedIndex].getAttribute("data-value");
    let leaveApplication = {
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      workingDays: this.state.workingDays,
      reason: this.state.leaveReason,
      leaveTypeId: datavalue,
    };
    // console.log("leaveApplication", leaveApplication);
    this.checkEligibility(leaveApplication);
  }

  async checkEligibility(leaveApplication) {
    // console.log("leaveApplication", leaveApplication);
    console.log("Data being sent for eligibility check:", leaveApplication);

    let { response, err } = await leaveApplicationService.checkEligibility(
      leaveApplication
    );
    this.setState({
      isLoaded: true,
    });
    if (err) {
      this.setState({
        isLoaded: false,
      });
    } else if (response && response.data.err) {
      this.setState({
        isLoaded: false,
      });
    } else {
      this.setState({
        isLoaded: false,
      });
      if (response.data.leaveValidationResult.isEligible) {
        this.setState({
          ...this.state,
          // leaveType: "",
          balanceMessage:
            "The balance is : " + response.data.leaveValidationResult.balance,
          isElegible: true,
        });
      } else {
        this.setState({
          ...this.state,
          leaveType: "",
          errorMessage: "SORRY LEAVES OUT OF BALANCE.",
        });
      }
    }
    console.log("Response for eligibility check:", response);
  }

  onApplyLeave(event) {
    event.preventDefault();
    let createdBy = Auth.get("userId");
    let modifiedBy = Auth.get("userId");
    let createdOn = new Date();
    let modifiedOn = new Date();
    let email = this.state.users.filter((user, index) => {
      return user._id === Auth.get("userId");
    });
    let emailId = email.length > 0 ? email[0].email : "";
    let userName = Auth.get("userName");
    var dropdwn = document.getElementById("leaveType");
    let datavalue =
      dropdwn.options[dropdwn.selectedIndex].getAttribute("data-value");
    let leaveApplication = {
      userName: userName,
      fromEmail: emailId,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      workingDays: this.state.workingDays,
      reason: this.state.leaveReason,
      leaveTypeId: datavalue,
      leaveType: this.state.leaveType,
      leaveCategory: this.state.leaveCategory,
      createdBy: createdBy,
      createdOn: createdOn,
      modifiedBy: modifiedBy,
      modifiedOn: modifiedOn,
      isDeleted: "false",
      leaveId: "",
    };
    if (this.state.leaveId !== "") {
      leaveApplication.leaveId = this.state.leaveId;
    }
    let users = this.state.users;

    this.postLeaveApplication(leaveApplication, users);
  }
  async postLeaveApplication(leaveApplication, user) {
    console.log("Data being sent:", leaveApplication);
    console.log("Attempting to post leave application...");

    try {
      let response = {};

      if (!isNullOrUndefined(leaveApplication.leaveId)) {
        response = await leaveApplicationService.editLeaveApplication(
          leaveApplication,
          user
        );
      } else {
        response = await leaveApplicationService.saveLeaveApplication(
          leaveApplication,
          user
        );
      }

      this.setState({
        isLoaded: false,
        fromDate: dateUtil.DateToString(new Date()),
        toDate: dateUtil.DateToString(new Date()),
        workingDays: "1",
        leaveReason: "",
        leaveType: "",
        balanceMessage: "",
      });

      if (response.err || (response.response && response.response.data.err)) {
        const errorMessage = response.err || response.response.data.err;
        this.setState({
          errorMessage: "Error : " + errorMessage,
        });
      } else {
        this.setState({
          successMessage: response.response.data.message,
          leaveCategory: "",
        });
        // Perform additional actions upon successful submission here
      }

      console.log("Response:", response);
    } catch (error) {
      console.error(
        "Error occurred while posting leave application:",
        error.message
      );
      // Handle the error, display a message, or perform any necessary actions
    }
  }

  isApplyButtonDisabled() {
    const {
      leaveType,
      workingDays,
      fromDate,
      toDate,
      leaveReason,
      leaveCategory,
      isElegible,
    } = this.state;

    if (leaveType === "Comp Off") {
      return !(
        workingDays &&
        fromDate &&
        toDate &&
        leaveType &&
        leaveReason &&
        leaveCategory
      );
    } else if (leaveType === "Sick Leave" || leaveType === "Casual Leave") {
      return !(
        (
          isElegible &&
          workingDays &&
          fromDate &&
          toDate &&
          leaveType &&
          leaveCategory &&
          leaveReason
        ) // Ensuring leave reason is also present for Sick and Casual Leave
      );
    } else {
      return !(
        (
          workingDays &&
          fromDate &&
          toDate &&
          leaveType &&
          leaveCategory &&
          leaveReason
        ) // Ensuring leave reason is also present for other leave types
      );
    }
  }

  dateUpdate = (name, updatedDate) => {
    // console.log("updatedDate", updatedDate);
    // console.log("name", name);
    this.setState(
      {
        [name]: updatedDate,
        errorMessage: "",
        successMessage: "",
        // balanceMessage:''
      },
      this.dateCheck
    );
    // console.log(`updated Date after setState ${name}`, this.state.startdate)
  };

  render() {
    // console.log("Leave -App _page")
    let leaveTypeDrpDown = [];
    let HolidayList = [];
    let taskClass = "col-sm-8 contentWrapper";
    let noTaskClass = "col-sm-12 contentWrapper";
    let LeaveCategoryArray = [];
    leaveTypeDrpDown.push(
      <option value="" key="mod">
        Select Leave Type
      </option>
    );
    this.state.leaveTypes.forEach(function (module, i) {
      leaveTypeDrpDown.push(
        <option
          value={module.LeaveTypeName}
          data-value={module.id}
          key={"mod_" + i}
        >
          {module.LeaveTypeName}
        </option>
      );
    });
    LeaveCategoryArray.push(
      <option value="" key="mod">
        Select Leave Category
      </option>
    );
    window.propeakConfigData.leaveCategory.forEach(function (cate, i) {
      LeaveCategoryArray.push(
        <option value={cate} key={cate}>
          {cate}
        </option>
      );
    });
    if (this.state.holidayList.length > 0) {
      this.state.holidayList.forEach(function (module, i) {
        HolidayList.push(
          <tr>
            <td key={"mod_" + i}>{module.date}</td>
            <td key={"mod_" + i + 1}>{module.holiday}</td>
          </tr>
        );
      });
    } else {
      HolidayList.push(
        <tr>
          <td colSpan="2">No records found!!!</td>
        </tr>
      );
    }
    const fontStyle = {
      fontSize: "small",
    };
    let {
      leaveType,
      workingDays,
      fromDate,
      toDate,
      isElegible,
      leaveCategory,
      leaveReason,
    } = this.state;
    return (
      // <>
      // {errorMessage && (
      //   <span className="alert alert-danger">{errorMessage}</span>
      // )}
      // {successMessage && (
      //   <span className="alert alert-success">{successMessage}</span>
      // )}
      <div>
        {this.state.isLoaded ? (
          <div className="logo">
            <img src="/images/loading.svg" alt="loading" />
          </div>
        ) : (
          <div className="container bg-white">
            <div className="row">
              <div
                className={this.state.isHolidayList ? taskClass : noTaskClass}
              >
                <h4 className="project-title">Apply for Leave</h4>
                <hr />

                <div className="row">
                  <div className="col-sm-12">
                    <a
                      href=""
                      className="text-info  float-right"
                      data-toggle="modal"
                      data-target="#holidayCenter"
                      onClick={this.getAllHolidays}
                    >
                      {" "}
                      Holidays in current year{" "}
                    </a>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-wrapper">
                      {this.state.errorMessage ? (
                        <span
                          htmlFor="project"
                          className="alert alert-danger"
                          value={this.state.labelvalue}
                        >
                          {this.state.errorMessage}
                        </span>
                      ) : this.state.successMessage ? (
                        <span
                          htmlFor="project"
                          className=" alert alert-success"
                          value={this.state.labelsuccessvalue}
                        >
                          {this.state.successMessage}
                        </span>
                      ) : (
                        ""
                      )}

                      <form onSubmit={this.onApplyLeave}>
                        <div className="row">
                          <div className="col-sm-3">
                            <div className="form-group">
                              <label htmlFor="leaveType">Leave Type</label>
                              <span style={{ color: "red" }}>*</span>
                              <select
                                value={leaveType}
                                id="leaveType"
                                name="leaveType"
                                className="form-control rounded-0"
                                onChange={this.handleChange}
                              >
                                {leaveTypeDrpDown}
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="form-group">
                              <label htmlFor="leaveCategory">
                                Leave Category
                              </label>
                              <span style={{ color: "red" }}>*</span>
                              <select
                                value={leaveCategory}
                                id="leaveCategory"
                                name="leaveCategory"
                                className="form-control rounded-0"
                                onChange={this.handleChange}
                              >
                                {LeaveCategoryArray}
                              </select>
                            </div>
                          </div>

                          <div className="col-sm-3">
                            <div className="input-group">
                              <div>
                                <label htmlFor="fromDate">From Date</label>{" "}
                                <span style={{ color: "red" }}>*</span>
                              </div>

                              {/* <input type="date" className="form-control rounded-0" name="fromDate" id="fromDate" onChange={this.handleChange} value={this.state.fromDate} /> */}
                              <Calendar
                                width="267px"
                                height="225px"
                                className="form-control rounded-0"
                                dateformat={"YYYY-MM-DD"}
                                selectedDate={this.state.fromDate}
                                dateUpdate={this.dateUpdate.bind(
                                  this,
                                  "fromDate"
                                )}
                                id="fromDate"
                                calendarModalId="fromDateModal"
                              />
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="input-group">
                              <div>
                                <label htmlFor="toDate">To Date</label>{" "}
                                <span style={{ color: "red" }}>*</span>
                              </div>

                              <Calendar
                                width="267px"
                                height="225px"
                                className="form-control rounded-0"
                                dateformat={"YYYY-MM-DD"}
                                selectedDate={this.state.toDate}
                                dateUpdate={this.dateUpdate.bind(
                                  this,
                                  "toDate"
                                )}
                                id="toDate"
                                calendarModalId="toDateModal"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-3">
                            <div className="form-group">
                              <label htmlFor="workingDays">
                                Total Working Days &nbsp;
                              </label>
                              <label name="workingDays" id="workingDays">
                                {this.state.workingDays}{" "}
                              </label>
                              {/* <input type="text" readOnly="readOnly" style={{ cursor: "not-allowed", backgroundColor: "#6c757d !important" }} className="form-control rounded-0" name="workingDays" id="workingDays" value={this.state.workingDays} /> */}
                            </div>
                          </div>
                          {this.state.leaveType === "Sick Leave" ||
                          this.state.leaveType === "Casual Leave" ? (
                            <div className="col-sm-3">
                              <div className="form-group">
                                <span>
                                  <a
                                    className="linkstyle"
                                    style={{ cursor: "pointer" }}
                                    id="btnCheckEligibility"
                                    disabled={
                                      !(
                                        leaveType &&
                                        workingDays &&
                                        fromDate &&
                                        toDate
                                      )
                                    }
                                    onClick={this.onCheckEligibility}
                                  >
                                    <span>Check Eligiblity</span>
                                  </a>
                                </span>
                                <br />
                                {this.state.balanceMessage ? (
                                  <span>{this.state.balanceMessage}</span>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="leaveReason">Reason</label>
                              {this.state.leaveType === "Comp Off" ? (
                                <span style={{ color: "red" }}>*</span>
                              ) : (
                                ""
                              )}
                              <textarea
                                className="form-control rounded-0"
                                rows="3"
                                name="leaveReason"
                                id="leaveReason"
                                onChange={this.handleChange}
                                value={this.state.leaveReason}
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-sm-8"></div>
                          <div className="col-sm-2">
                            <input
                              type="submit"
                              id="btnApplyLeave"
                              value="Apply"
                              className="btn btn-info btn-block"
                              disabled={this.isApplyButtonDisabled()}
                            />
                          </div>
                          <div className="col-sm-2">
                            <Link
                              to="/leave"
                              className="btn btn-default btn-block"
                            >
                              Cancel
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.isHolidayList ? (
                <div className="col-sm-4">
                  <h4 className="project-title">
                    Holiday List
                    <span
                      onClick={this.closeHolidayList}
                      className="float-right"
                    >
                      <i className="fas fa-times close"></i>
                    </span>
                  </h4>
                  <hr />
                  <div className="scroll">
                    <table className="table table-hover table-condensed table-bordered">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Name of holiday</th>
                        </tr>
                      </thead>
                      <tbody>{HolidayList}</tbody>
                    </table>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
      //   </>
    );
  }
}
export default LeaveApplication;

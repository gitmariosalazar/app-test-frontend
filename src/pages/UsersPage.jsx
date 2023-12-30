import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "../css/DataTableDemo.css";
import { MDBBadge } from "mdb-react-ui-kit";
import { getUsers, getUser, getGenders, getRols } from "../api/backend.api";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Users } from "../models/Models";
import { ToastCustom } from "../utils/Message";
import "../css/user_style.css";
import { Password } from "primereact/password";
import { InputsValidate, myDate } from "../utils/Validations";
import { ToastContainer } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [genders, setGenders] = useState([]);
  const [rols, setRols] = useState([]);
  const url = "https://app-9f0a1fa0-f478-4848-a93a-b9847d089c72.cleverapps.io/";

  useEffect(() => {
    async function loadUsers() {
      try {
        const u = await (await getUsers()).data;
        setUsers(u);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    }
    loadUsers();
  }, []);

  useEffect(() => {
    async function loadGenders() {
      const u = await (await getGenders()).data;
      setGenders(u);
    }
    async function loadRols() {
      const u = await (await getRols()).data;
      setRols(u);
    }
    loadGenders();
    loadRols();
  }, []);

  var usermodel = {
    user: {
      email: "",
      id_user: 0,
      login_code: "",
      password: "",
      person: {
        address: 0,
        card_id_person: "",
        date_born: new Date(),
        first_name: "",
        gender: {
          gender_name: "",
          id_gender: 0,
        },
        id_person: "",
        last_name: "",
        phone: "",
      },
      register_date: new Date(),
      rol_user: {
        id_rol: 0,
        rol_name: "",
      },
      user_name: "",
      user_state: false,
      user_delete: false,
    },
  };

  const [user, setUser] = useState(usermodel);

  const data = {
    card_id_person: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    gender: 1,
    date_born: new Date(),
    email: "",
    id_rol: 1,
    password: "",
    rep_password: "",
  };
  // ? New User and edit user
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [card_id, setCardId] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [date_born, setDateBorn] = React.useState(new Date());
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rep_password, setRepPassword] = React.useState("");
  const [rol_user, setRolUser] = React.useState("");

  // ? Dialog window to see more details of the users
  const [detailUser, setDetailUser] = useState(false);
  // ? Dialog window to add new user
  const [userDialog, setUserDialog] = useState(false);
  // ? Dialog window to edit user
  const [editDialog, setEditDialog] = useState(false);
  // ? Dialog window to delete user
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  // ? Dialog window to set enable user
  const [enableUserDialog, setEnableUserDialog] = useState(false);
  // ? Filter user
  const [globalFilterUsers, setGlobalFilterUsers] = useState(null);
  // ? Message Toast
  const toast = useRef(null);
  const dt = useRef(null);

  const clearData = async () => {
    data.card_id_person = "";
    data.first_name = "";
    data.last_name = "";
    data.phone = "";
    data.address = "";
    data.date_born = "";
    data.email = "";
    data.password = "";
    data.rep_password = "";
    setCardId("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setAddress("");
    setDateBorn(new Date());
    setEmail("");
    setPassword("");
    setRepPassword("");
  };

  const editData = async (user) => {
    data.card_id_person = user.user.person.card_id_person;
    data.first_name = user.user.person.first_name;
    data.last_name = user.user.person.last_name;
    data.phone = user.user.person.phone;
    data.address = user.user.person.address;
    data.date_born = myDate(user.user.person.date_born);
    data.email = user.user.email;
    data.gender = user.user.person.gender.id_gender;
    data.rol_user = user.user.rol_user.id_rol;
    setCardId(data.card_id_person);
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setPhone(data.phone);
    setAddress(data.address);
    setDateBorn(new Date(data.date_born));
    setEmail(data.email);
    setRolUser(data.rol_user);
    setGender(data.gender);
  };

  const handleChangeFirstName = async (e) => {
    setFirstName(e.target.value);
  };

  data.first_name = first_name;
  const handleChangeLastName = async (e) => {
    setLastName(e.target.value);
  };
  data.last_name = last_name;

  const handleChangeCardId = async (e) => {
    setCardId(e.target.value);
  };

  data.card_id_person = card_id;
  const handleChangePhone = async (e) => {
    setPhone(e.target.value);
  };

  data.phone = phone;
  const handleChangeAddress = async (e) => {
    setAddress(e.target.value);
  };

  data.address = address;
  const handleChangeGender = async (e) => {
    setGender(e.target.value);
  };

  data.gender = gender;

  data.date_born = date_born;
  const handleChangePassword = async (e) => {
    setPassword(e.target.value);
  };

  data.password = password;
  const handleChangeRepeatPassword = async (e) => {
    setRepPassword(e.target.value);
  };
  data.rep_password = rep_password;
  const handleChangeUserRol = async (e) => {
    setRolUser(e.target.value);
  };

  data.id_rol = rol_user;
  const handleChangeEmail = async (e) => {
    setEmail(e.target.value);
  };

  data.email = email;

  // * Testing if is PC or movile (phone)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
  }, []);

  const handleSMSPress = async (phone) => {
    try {
      if (isMobile) {
        //await Linking.openURL("sms:" + phone + "?body=Message");
        console.log(phone);
        ToastCustom("info", "Open app successfully", "Info");
      } else {
        ToastCustom("error", "Error, Can not open message app!", "Error");
      }
    } catch (error) {
      const js = {
        error: error,
      };
      console.log(js);
    }
  };

  const handleEmailPress = async (email) => {
    //await Linking.openURL("mailto:" + email);
    console.log(email);
  };

  const handleWhatsAppPress = async (phone) => {
    //await Linking.openURL("https://wa.me/+593" + phone);
    console.log(phone);
  };

  const handleCallPress = async (phone) => {
    try {
      if (isMobile) {
        //await Linking.openURL("tel:" + phone);
        ToastCustom("info", "Open app successfully", "Info");
      } else {
        ToastCustom("error", "Error, Can not open app! " + phone, "Error");
      }
    } catch (error) {
      const js = {
        error: error,
      };
      console.log(js);
    }
  };

  // * Add new user *********************************************************************************

  const handleSubmitSaveUser = (e) => {
    e.preventDefault();
    const inputarray = [
      data.card_id_person,
      data.first_name,
      data.last_name,
      data.phone,
      data.address,
      data.gender,
      data.date_born,
      data.email,
      data.id_rol,
      data.password,
      data.rep_password,
    ];
    const valuesarray = [
      "Card Id",
      "First Name",
      "Last Name",
      "Phone",
      "Addres",
      "Gender",
      "Date born",
      "Email",
      "User rol",
      "Password",
      "Repeat Password",
    ];
    const validate = InputsValidate(inputarray, valuesarray);
    if (validate.length === 0) {
      if (data.password === data.rep_password) {
        axios
          .post(url + "users/create_user", data)
          .then((res) => {
            let response = res.data;
            if (response.token != null) {
              Users.user = response.token.user;
              clearData();
              ToastCustom("success", response.message, "Successful!");
            } else {
              ToastCustom("error", response.message, "Create user error!");
            }
          })
          .catch((error) => {
            const js = {
              error: error,
            };
            console.log(js);
          });
      } else {
        ToastCustom(
          "error",
          "Pasword's are not equals, please enter password's equals to continue!",
          "Error password confirm!"
        );
      }
    } else {
      //toast.current.show(validate);

      validate.forEach((element) => {
        ToastCustom(element.severety, element.detail, element.summary);
      });
    }
  };

  const openNew = () => {
    setUser(usermodel);
    setUserDialog(true);
  };

  const hideDialog = () => {
    setUserDialog(false);
    clearData();
    ToastCustom("success", "Cancel transaction!", "Success!");
  };

  const userDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="Cancel"
            icon="pi pi-times-circle"
            className="p-button-danger"
            text
            raised
            onClick={hideDialog}
          />
        </div>
        <div className="b-add">
          <Button
            label="Save"
            icon="pi pi-save"
            className="p-button-success"
            text
            raised
            onClick={handleSubmitSaveUser}
          />
        </div>
      </div>
    </React.Fragment>
  );
  // * Edit user    *********************************************************************************
  const hideEditDialog = () => {
    setEditDialog(false);
    clearData();
    ToastCustom("success", "Cancel transaction!", "Success!");
  };

  const openEditUser = (id) => {
    getUser(id).then((resp) => {
      setUser(resp.data.token);
      usermodel.user = resp.data.token.user;
      editData(resp.data.token);
      ToastCustom(
        "warning",
        "User " + usermodel.user.email + " found to edit!",
        "Successful!"
      );
    });
    setEditDialog(true);
  };

  const handleSubmitEditUser = (e) => {
    e.preventDefault();
    const inputarray = [
      data.card_id_person,
      data.first_name,
      data.last_name,
      data.phone,
      data.address,
      data.gender,
      data.date_born,
      data.email,
      data.id_rol,
    ];
    const valuesarray = [
      "Card Id",
      "First Name",
      "Last Name",
      "Phone",
      "Addres",
      "Gender",
      "Date born",
      "Email",
      "User rol",
    ];
    const validate = InputsValidate(inputarray, valuesarray);
    if (validate.length === 0) {
      console.log(user.user.id_user);
      if (data.password === data.rep_password) {
        axios
          .put(url + "users/update_user/" + user.user.id_user, data)
          .then((res) => {
            let response = res.data;
            if (response.token != null) {
              Users.user = response.token.user;
              clearData();
              hideEditDialog();
              ToastCustom("success", response.message, "Successful!");
            } else {
              ToastCustom("error", response.message, "Create user error!");
            }
          })
          .catch((error) => {
            const js = {
              error: error,
            };
            console.log(js);
          });
      } else {
        ToastCustom(
          "error",
          "Pasword's are not equals, please enter password's equals to continue!",
          "Error password confirm!"
        );
      }
    } else {
      //toast.current.show(validate);

      validate.forEach((element) => {
        ToastCustom(element.severety, element.detail, element.summary);
      });
    }
  };

  const editUserDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="Cancel"
            icon="pi pi-times-circle"
            className="p-button-danger"
            text
            raised
            onClick={hideEditDialog}
          />
        </div>
        <div className="b-add">
          <Button
            label="Save"
            icon="pi pi-save"
            className="p-button-success"
            text
            raised
            onClick={handleSubmitEditUser}
          />
        </div>
      </div>
    </React.Fragment>
  );
  // * Delete user  *********************************************************************************
  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const confirmDeleteUser = (id) => {
    getUser(id).then((resp) => {
      setUser(resp.data.token);
      usermodel.user = resp.data.token.user;
      ToastCustom(
        "warning",
        "User " + usermodel.user.email + " found to remove!",
        "Successful!"
      );
    });
    setDeleteUserDialog(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();
    e.preventDefault();
    const inputarray = [data.password];
    const valuesarray = ["Password"];
    const validate = InputsValidate(inputarray, valuesarray);
    if (validate.length === 0) {
      axios
        .delete(url + "users/delete_user/" + user.user.user_name, {
          data: { password: password },
        })
        .then((res) => {
          let response = res.data;
          if (response.token === 1) {
            setDeleteUserDialog(false);
            clearData();
            ToastCustom(
              "success",
              "User Deleted: " + user.user.email,
              "Successful!"
            );
          } else {
            ToastCustom("error", response.message, "Delete user failed!");
          }
        })
        .catch((error) => {
          const js = {
            error: error,
          };
          console.log(js);
        });
    } else {
      validate.forEach((element) => {
        ToastCustom(element.severety, element.detail, element.summary);
      });
    }

    clearData();
  };

  const deleteUserDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="No"
            icon="pi pi-times-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-help"
            onClick={hideDeleteUserDialog}
          />
        </div>
        <div className="b-add">
          <Button
            label="Yes"
            icon="pi pi-check-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-danger"
            onClick={deleteUser}
          />
        </div>
      </div>
    </React.Fragment>
  );
  // * Enable or disable user ***********************************************************************
  const confirmsetEnableUser = (id) => {
    getUser(id).then((resp) => {
      setUser(resp.data.token);
      usermodel.user = resp.data.token.user;
      ToastCustom(
        "warning",
        "User " + usermodel.user.email + " found to change state!",
        "Successful"
      );
    });
    setEnableUserDialog(true);
  };
  const setEnableUser = (e) => {
    e.preventDefault();
    axios
      .post(url + "users/setenable_user/" + user.user.user_name)
      .then((res) => {
        let response = res.data;
        if (response.token === 1) {
          ToastCustom(
            "success",
            "User state change to: " + user.user.email,
            "Successful!"
          );
        } else {
          ToastCustom("error", response.message, "Change user state failed!");
        }
      })
      .catch((error) => {
        const js = {
          error: error,
        };
        console.log(js);
      });
    setEnableUserDialog(false);
  };
  const hidesetEnableUserDialog = () => {
    setEnableUserDialog(false);
  };

  const setEnableUserDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="No"
            icon="pi pi-times-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-help"
            onClick={hidesetEnableUserDialog}
          />
        </div>
        <div className="b-add">
          <Button
            label="Yes"
            icon="pi pi-check-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-danger"
            onClick={setEnableUser}
          />
        </div>
      </div>
    </React.Fragment>
  );
  // * View more details about user   ***************************************************************
  const hideDetailUserDialog = () => {
    setDetailUser(false);
    clearData();
    ToastCustom("success", "Cancel transaction!", "Success!");
  };

  const openDetailUser = (id) => {
    getUser(id).then((resp) => {
      setUser(resp.data.token);
      usermodel.user = resp.data.token.user;
      editData(resp.data.token);
      ToastCustom(
        "info",
        "User " + usermodel.user.email + " found to view more details!",
        "Successful!"
      );
    });
    setDetailUser(true);
  };

  const detailUserDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-detail">
          <Button
            label="Exit"
            icon="pi pi-times-circle"
            className="p-button-danger"
            text
            raised
            onClick={hideDetailUserDialog}
          />
        </div>
      </div>
    </React.Fragment>
  );

  // * Columns body of users table - Start    *******************************************************

  function nameUser(rowData) {
    if (rowData != null) {
      return (
        <div className="d-flex align-items-center" key={rowData.user.id_user}>
          <img
            src="https://bit.ly/3lRKeeD"
            alt=""
            style={{ width: "40px", height: "40px" }}
            className="rounded-circle"
          />
          <div className="ms-2">
            <p className="fw-bold mb-0 p-text">
              {rowData.user.person.first_name} {rowData.user.person.last_name}
            </p>
            <div className="text-muted mb-0">
              <div className="address">
                <div className="icon-address">
                  <div className="icon-a">
                    <i
                      className="pi pi-envelope a"
                      style={{ fontSize: "0.7rem", fontWeight: "bold" }}
                      title="Send message by email"
                      onClick={() => {
                        handleEmailPress(rowData.user.email);
                      }}
                    ></i>
                  </div>
                  <p className="text-muted mb-0 sub-column">
                    {rowData.user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  function userRol(rowData) {
    if (rowData != null) {
      return (
        <div className="rol-user">
          <p className="fw-normal mb-1 p-text">
            {rowData.user.rol_user.rol_name}
          </p>
          <p className="text-muted mb-0 sub-column">{rowData.user.user_name}</p>
        </div>
      );
    }
  }

  function userEnable(rowData) {
    if (rowData != null) {
      return (
        <>
          <MDBBadge color={rowData.user.user_state ? "success" : "danger"} pill>
            {rowData.user.user_state ? "Active" : "Inactive"}
          </MDBBadge>
        </>
      );
    }
  }

  function userAddress(rowData) {
    if (rowData != null) {
      return (
        <div className="column-address">
          <p className="mb-0 p-text">{rowData.user.person.address}</p>
          <div className="text-muted mb-0">
            <div className="address">
              <div className="icon-address">
                <div className="icon-a">
                  <i
                    className="pi pi-phone a"
                    title="Call"
                    style={{ fontSize: "0.7rem", fontWeight: "bold" }}
                    onClick={() => {
                      handleCallPress(rowData.user.person.phone);
                    }}
                  ></i>
                </div>
                <div className="icon-a">
                  <i
                    className="pi pi-whatsapp a"
                    title="Send message by WhatsApp"
                    style={{ fontSize: "0.7rem", fontWeight: "bold" }}
                    onClick={() => {
                      handleWhatsAppPress(rowData.user.person.phone);
                    }}
                  ></i>
                </div>
                <div className="icon-a">
                  <i
                    className="pi pi-send a"
                    title="Send message"
                    style={{ fontSize: "0.7rem", fontWeight: "bold" }}
                    onClick={() => {
                      handleSMSPress(rowData.user.person.phone);
                    }}
                  ></i>
                </div>
                <div className="sub-column">{rowData.user.person.phone}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  function userActions(rowData) {
    if (rowData != null) {
      return (
        <>
          <div className="column-actions">
            <div className="icon-u">
              <i
                className="fa-solid fa-circle-plus lang-icon-u-detail"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                title="View more details"
                onClick={() => openDetailUser(rowData.user.user_name)}
              ></i>
            </div>
            <div className="icon-u">
              <i
                className={
                  rowData.user.user_state
                    ? "fa-solid fa-circle-xmark lang-icon-u-remove"
                    : "fa-solid fa-circle-check lang-icon-u-active"
                }
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                title={
                  rowData.user.user_state
                    ? "Set disable user"
                    : "Set enable user"
                }
                onClick={() => confirmsetEnableUser(rowData.user.user_name)}
              ></i>
            </div>
            <div className="icon-u">
              <i
                className="fa-solid fa-edit lang-icon-u-edit"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                title="Edit user"
                onClick={() => openEditUser(rowData.user.user_name)}
              ></i>
            </div>
            <div className="icon-u">
              <i
                className="fa-solid fa-trash-can lang-icon-u-remove"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                title="Delete user"
                onClick={() => confirmDeleteUser(rowData.user.user_name)}
              ></i>
            </div>
          </div>
        </>
      );
    }
  }

  // ? Columns body of users table - End

  const header = (
    <React.Fragment>
      <div className="table-header">
        <Button
          label="Add User"
          icon="pi pi-user-plus"
          className="head-div "
          onClick={openNew}
          aria-label="Submit"
        />
        <span className="p-input-icon-left head-div">
          <i className="pi pi-search" />
          <InputText
            className="head-div"
            type="search"
            onInput={(e) => setGlobalFilterUsers(e.target.value)}
            placeholder="Search User..."
          />
        </span>
      </div>
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo container-table">
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          ref={dt}
          value={users}
          paginator
          rows={10}
          index="i"
          rowsPerPageOptions={[10, 15, 20, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate={
            users[0] != null
              ? "Showing {first} to {last} of {totalRecords} users"
              : "Showing 0 to 0 of 0 users"
          }
          globalFilter={globalFilterUsers}
          header={header}
          size="smaller"
          className="p-datatable-striped table-users"
        >
          <Column
            header="User Name"
            field="user.person.first_name"
            sortable
            body={nameUser}
            className="p-text s"
          ></Column>
          <Column
            header="Title"
            sortable
            body={userRol}
            className="p-text s"
          ></Column>
          <Column
            header="Status"
            body={userEnable}
            className="p-text s"
          ></Column>
          <Column
            header="Address"
            sortable
            body={userAddress}
            className="p-text s"
          ></Column>
          <Column
            field="user.register_date"
            header="Date Register"
            sortable
            className="p-text s"
          ></Column>
          <Column
            header="Actions"
            body={userActions}
            className="p-text s"
          ></Column>
        </DataTable>
      </div>
      <Dialog
        visible={userDialog}
        style={{ width: "550px" }}
        header="Register new User"
        modal
        className="p-fluid"
        footer={userDialogFooter}
        onHide={hideDialog}
      >
        <div className="dialog">
          <div className="add-user">
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <span className="p-float-label">
                    <InputText
                      required
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      placeholder="First Name"
                      value={first_name}
                      onChange={handleChangeFirstName}
                    />
                    <label className="input-label" htmlFor="first_name">
                      First Name
                    </label>
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className="p-float-label">
                    <InputText
                      required
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      value={last_name}
                      placeholder="Last Name"
                      onChange={handleChangeLastName}
                    />
                    <label className="input-label" htmlFor="last_name">
                      Last Name
                    </label>
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className="p-float-label">
                    <InputText
                      required
                      id="card-id"
                      name="card-id"
                      label="Card ID"
                      value={card_id}
                      placeholder="Card ID"
                      onChange={handleChangeCardId}
                    />
                    <label className="input-label" htmlFor="card_id">
                      Card Id
                    </label>
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className="p-float-label">
                    <InputText
                      required
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      value={phone}
                      placeholder="Phone Number"
                      onChange={handleChangePhone}
                    />
                    <label className="input-label" htmlFor="phone">
                      Phone
                    </label>
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className="p-float-label">
                    <InputText
                      required
                      id="email"
                      name="email"
                      label="Email"
                      value={email}
                      placeholder="Email"
                      onChange={handleChangeEmail}
                    />
                    <label className="input-label" htmlFor="email">
                      Email
                    </label>
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className="p-float-label">
                    <Calendar
                      required
                      id="date_born"
                      name="date_born"
                      className="input-user"
                      label="Date Born"
                      placeholder="Date Born"
                      onChange={(e) => setDateBorn(e.value)}
                      showIcon
                    />
                    <label className="input-label" htmlFor="date">
                      Date Born
                    </label>
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className="p-float-label">
                    <Dropdown
                      id="gender"
                      options={genders}
                      optionLabel="gender_name"
                      value={gender}
                      optionValue="id_gender"
                      placeholder="Gender"
                      onChange={handleChangeGender}
                    />
                    <label className="input-label" htmlFor="gender">
                      Gender
                    </label>
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className="p-float-label">
                    <Dropdown
                      id="rol"
                      options={rols}
                      optionLabel="rol_name"
                      value={rol_user}
                      optionValue="id_rol"
                      placeholder="User Rol"
                      onChange={handleChangeUserRol}
                    />
                    <label className="input-label" htmlFor="rol_name">
                      User Rol
                    </label>
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <span className="p-float-label">
                    <InputText
                      required
                      id="address"
                      name="address"
                      label="Address"
                      value={address}
                      placeholder="Address"
                      onChange={handleChangeAddress}
                    />
                    <label className="input-label" htmlFor="address">
                      Address
                    </label>
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className="p-float-label">
                    <Password
                      required
                      name="password"
                      label="Password"
                      placeholder="****************"
                      value={password}
                      id="password"
                      onChange={handleChangePassword}
                      toggleMask
                    />
                    <label className="input-label" htmlFor="password">
                      Password
                    </label>
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className="p-float-label">
                    <Password
                      required
                      name="rep_password"
                      label="Repeat Password"
                      placeholder="****************"
                      value={rep_password}
                      id="rep_password"
                      onChange={handleChangeRepeatPassword}
                      toggleMask
                    />
                    <label className="input-label" htmlFor="password">
                      Repeat Password
                    </label>
                  </span>
                </Grid>
              </Grid>
            </React.Fragment>
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "550px" }}
        header="Edit User"
        modal
        className="p-fluid"
        footer={editUserDialogFooter}
        onHide={hideEditDialog}
      >
        {user && (
          <div className="dialog">
            <div className="add-user">
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <span className="p-float-label">
                      <InputText
                        required
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={data.first_name}
                        placeholder="First Name"
                        onChange={handleChangeFirstName}
                      />
                      <label className="input-label" htmlFor="first_name">
                        First Name
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <span className="p-float-label">
                      <InputText
                        required
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={data.last_name}
                        placeholder="Last Name"
                        onChange={handleChangeLastName}
                      />
                      <label className="input-label" htmlFor="last_name">
                        Last Name
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <span className="p-float-label">
                      <InputText
                        required
                        id="card-id"
                        name="card-id"
                        label="Card ID"
                        value={data.card_id_person}
                        placeholder="Card ID"
                        onChange={handleChangeCardId}
                      />
                      <label className="input-label" htmlFor="card_id">
                        Card Id
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <span className="p-float-label">
                      <InputText
                        required
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        value={data.phone}
                        placeholder="Phone Number"
                        onChange={handleChangePhone}
                      />
                      <label className="input-label" htmlFor="phone">
                        Phone
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <span className="p-float-label">
                      <InputText
                        required
                        id="email"
                        name="email"
                        label="Email"
                        value={data.email}
                        placeholder="Email"
                        onChange={handleChangeEmail}
                      />
                      <label className="input-label" htmlFor="email">
                        Email
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <span className="p-float-label">
                      <Calendar
                        required
                        id="date_born"
                        name="date_born"
                        className="input-user"
                        label="Date Born"
                        placeholder="Date Born"
                        value={new Date(data.date_born)}
                        onChange={(e) => setDateBorn(e.value)}
                        showIcon
                      />
                      <label className="input-label" htmlFor="date">
                        Date Born
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <span className="p-float-label">
                      <Dropdown
                        id="gender"
                        options={genders}
                        optionLabel="gender_name"
                        value={data.gender}
                        optionValue="id_gender"
                        placeholder="Gender"
                        onChange={handleChangeGender}
                      />
                      <label className="input-label" htmlFor="gender">
                        Gender
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <span className="p-float-label">
                      <Dropdown
                        id="rol"
                        options={rols}
                        optionLabel="rol_name"
                        value={data.id_rol}
                        optionValue="id_rol"
                        placeholder="User Rol"
                        onChange={handleChangeUserRol}
                      />
                      <label className="input-label" htmlFor="rol">
                        Gender
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <span className="p-float-label">
                      <InputText
                        required
                        id="address"
                        name="address"
                        label="Address"
                        value={data.address}
                        placeholder="Addres"
                        onChange={handleChangeAddress}
                      />
                      <label className="input-label" htmlFor="address">
                        Address
                      </label>
                    </span>
                  </Grid>
                </Grid>
              </React.Fragment>
            </div>
          </div>
        )}
      </Dialog>
      <Dialog
        visible={deleteUserDialog}
        style={{ width: "400px" }}
        header="Register new User"
        modal
        className="p-fluid"
        footer={deleteUserDialogFooter}
        onHide={hideDeleteUserDialog}
      >
        <div className="dialog">
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-2 warn"
              style={{ fontSize: "4rem" }}
            />
            {user && (
              <div className="question" style={{ fontSize: "1.1rem" }}>
                Are you sure you want to delete the user:
                <b> {user.user.email}</b>?
                <br />
                <br />
                <b>
                  <p>Please, Enter the password to continue!</p>
                </b>
              </div>
            )}
          </div>
          <div className="add-user">
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <span className="p-float-label">
                    <Password
                      required
                      id="password"
                      name="password"
                      label="Password confirmation"
                      value={password}
                      placeholder="Password confirmation"
                      toggleMask
                      onChange={handleChangePassword}
                    />
                    <label className="input-label" htmlFor="password">
                      Password confirmation
                    </label>
                  </span>
                </Grid>
              </Grid>
            </React.Fragment>
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={enableUserDialog}
        style={{ width: "450px" }}
        header={user.user.user_state ? "Disable confirm" : "Enable confirm"}
        modal
        footer={setEnableUserDialogFooter}
        onHide={hidesetEnableUserDialog}
        className="confirm-dialog"
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-2 warn"
            style={{ fontSize: "4rem" }}
          />
          {user && (
            <div className="question" style={{ fontSize: "1.1rem" }}>
              Are you sure you want to{" "}
              {user.user.user_state ? "disable" : "enable"} to:{" "}
              <b>{user.user.email}</b>?
            </div>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={detailUser}
        style={{ width: "450px" }}
        header="User Details"
        modal
        footer={detailUserDialogFooter}
        onHide={hideDetailUserDialog}
        className="confirm-dialog"
      >
        <div className="confirmation-content">
          <img
            src="https://bit.ly/3lRKeeD"
            alt=""
            className="rounded-circle warn img-user"
          />
          {user && (
            <>
              <div className="detail-main">
                <div className="detail-title">
                  <i className="fa-solid fa-circle-user detail-icon"></i>
                  <p>Personal Data</p>
                </div>
                <div className="detail">
                  <div className="detail-right">
                    <h3>First Name:</h3>
                    <h3>Last Name:</h3>
                    <h3>Card ID:</h3>
                    <h3>Email Address:</h3>
                  </div>
                  <div className="detail-left">
                    <h3>{user.user.person.first_name}</h3>
                    <h3>{user.user.person.last_name}</h3>
                    <h3>{user.user.person.card_id_person}</h3>
                    <h3>{user.user.email}</h3>
                  </div>
                </div>
              </div>
              <div className="detail-main">
                <div className="detail-title">
                  <i className="fa-regular fa-address-book detail-icon"></i>
                  <p>Contact</p>
                </div>
                <div className="detail">
                  <div className="detail-right">
                    <h3>Phone Number:</h3>
                    <h3>Email Address:</h3>
                    <h3>Addres:</h3>
                  </div>
                  <div className="detail-left">
                    <h3>{user.user.person.phone}</h3>
                    <h3>{user.user.email}</h3>
                    <h3>{user.user.person.address}</h3>
                  </div>
                </div>
              </div>
              <div className="detail-main">
                <div className="detail-title">
                  <i className="fa-solid fa-circle-user detail-icon"></i>
                  <p>User Info</p>
                </div>
                <div className="detail">
                  <div className="detail-right">
                    <h3>Username:</h3>
                    <h3>User Rol:</h3>
                    <h3>Date Register:</h3>
                    <h3>User State:</h3>
                  </div>
                  <div className="detail-left">
                    <h3>{user.user.user_name}</h3>
                    <h3>{user.user.rol_user.rol_name}</h3>
                    <h3>{myDate(user.user.register_date)}</h3>
                    <h3>
                      <MDBBadge
                        color={user.user.user_state ? "success" : "danger"}
                        pill
                      >
                        {user.user.user_state ? "Active" : "Inactive"}
                      </MDBBadge>
                    </h3>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default UsersPage;

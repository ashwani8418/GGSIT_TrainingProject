sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "sap/m/Dialog",
        "sap/ui/layout/form/SimpleForm",
        "sap/m/Label",
        "sap/m/Input",
        "sap/m/DatePicker",
        "sap/m/Button"

    ],
    function (Controller, MessageToast, Dialog, SimpleForm, Label, Input, DatePicker, Button) {
        "use strict";

        return Controller.extend("com.ingenx.studentfronted.controller.StudentRecord", {
            onInit: function () {

            },

            onPressAddRecord: async function () {
                if (!this.oDialog) {
                    this.oDialog = await this.loadFragment({
                        name: "com.ingenx.studentfronted.fragments.AddRecord"
                    });
                    this.oDialog.open()
                } else {
                    this.oDialog.open()
                }
            },

            onCloseDialog: function () {
                let oDialog = this.byId("AddRecord");
                oDialog.close();
                console.log("oDialog", oDialog);
            },

            calculateAge: function (oEvent) {
                let oDatePicker = oEvent.getSource();
                let ODateValue = oDatePicker.getValue();

                console.log(typeof ODateValue);

                // Converting Selected Date from String datatype to Date Date Format;
                let oBirthDate = new Date(ODateValue);
                let currentDate = new Date();

                console.log("oBirthDate ", oBirthDate);
                let age = undefined;

                let personBirthYear = oBirthDate.getFullYear();
                let personBirthMonth = oBirthDate.getMonth();
                let personBirthDay = oBirthDate.getDay();

                let currentYear = currentDate.getFullYear();
                let currentMonth = currentDate.getMonth();
                let currentDay = currentDate.getDay();

                age = currentYear - personBirthYear;

                let monthDiff = currentMonth - personBirthMonth;

                if (monthDiff < 0 || (monthDiff === 0 && currentDay < personBirthDay)) {
                    age--;
                }

                console.log("age", age);

                let ageInput = this.byId("inputAge")

                ageInput.setValue(age);
                ageInput.setVisible(true);
            },

            onSubmitAddRecord: async function () {
                try {
                    let sFirstName = this.byId("inputFirstName").getValue();
                    let sLastName = this.byId("inputLastName").getValue();
                    let sEmail = this.byId("inputEmail").getValue();
                    let sPhoneNumber = this.byId("inputPhone").getValue();
                    let sDateofBirth = this.byId("inputDateOfBirth").getValue();
                    let sAge = this.byId("inputAge").getValue();

                    let studentData = {
                        firstName: sFirstName,
                        lastName: sLastName,
                        email: sEmail,
                        phone: sPhoneNumber,
                        dateOfBirth: sDateofBirth,
                        age: parseInt(sAge)
                    }
                    console.log("studentData", studentData);

                    this.onCloseDialog();

                    // Getting Model of the View 
                    let oModel = this.getView().getModel();

                    //bindList is a method to post Data bindList("/pathName Or Entity")
                    let oBinding = oModel.bindList("/studentsRecord");
                    // create is a function to insert Data into the table.
                    await oBinding.create(studentData);
                    MessageToast.show("Data Successful Submitted!")
                    // To fetch the Latest Record from the Table after POST Operation
                    oModel.refresh();


                } catch (error) {
                    MessageToast.show("Some Error Occured");
                }
            },

            onPressUpdate: function () {
                let that = this
                let studTable = this.byId("studentTable");
                let selectedRow = studTable.getSelectedItem().getBindingContext().getObject();
                let studentDataModel = this.getView().getModel();

                console.log("studTable", selectedRow);

                let ID = selectedRow.ID;
                let sFirstName = selectedRow.firstName;
                let sLastName = selectedRow.lastName;
                let sEmail = selectedRow.email;
                let sPhoneNumber = selectedRow.phone;
                let sDateofBirth = selectedRow.dateOfBirth;
                let sAge = selectedRow.age;

                console.log("ID: ", ID);
                console.log("First Name: ", sFirstName);
                console.log("Last Name: ", sLastName);
                console.log("Email: ", sEmail);
                console.log("Phone Number: ", sPhoneNumber);
                console.log("Date of Birth: ", sDateofBirth);
                console.log("Age: ", sAge);


                let oForm = new SimpleForm({
                    content: [
                        new Label({
                            text: "ID"
                        }),
                        new Input({
                            id: "inputID",
                            value: "",
                            editable: false
                        }).setValue(ID),
                        new Label({

                            text: "First Name"
                        }),
                        new Input({
                            id: "inputFirstName",
                            value: ""
                        }).setValue(sFirstName),
                        new Label({
                            text: "Last Name"
                        }),
                        new Input({
                            id: "inputLastName",
                            value: ""
                        }).setValue(sLastName),
                        new Label({
                            text: "Email"
                        }),
                        new Input({
                            id: "inputEmail",
                            value: ""
                        }).setValue(sEmail),
                        new Label({
                            text: "Phone Number"
                        }),
                        new Input({
                            id: "inputPhoneNumber",
                            value: ""
                        }).setValue(sPhoneNumber),
                        new Label({
                            text: "Date of Birth"
                        }),
                        new DatePicker({
                            id: "inputDateOfBirth",
                            value: "",
                            displayFormat: "YYYY-MM-dd",
                            valueFormat: "YYYY-MM-dd"
                        }).setValue(sDateofBirth),
                        new Label({
                            text: "Age"
                        }),
                        new Input({
                            id: "inputAge",
                            value: ""
                        }).setValue(sAge)
                    ]
                });

                let updateDialog = new Dialog({
                    title: "Update Record",
                    content: oForm,
                    beginButton: new Button({
                        text: "Save",
                        type: "Emphasized",
                        press: async function () {
                            let uID = sap.ui.getCore().byId("inputID").getValue();
                            let uFirstName = sap.ui.getCore().byId("inputFirstName").getValue();
                            let uLastName = sap.ui.getCore().byId("inputLastName").getValue();
                            let uEmail = sap.ui.getCore().byId("inputEmail").getValue();
                            let uPhoneNumber = sap.ui.getCore().byId("inputPhoneNumber").getValue();
                            let uDateOfBirth = sap.ui.getCore().byId("inputDateOfBirth").getValue();
                            let uAge = sap.ui.getCore().byId("inputAge").getValue();

                            let oBinding = studentDataModel.bindList("/studentsRecord");

                            await oBinding.requestContexts().then( function(aContexts){
                                for(let i = 0; i < aContexts.length; i++){
                                    
                                    if(aContexts[i].getProperty("ID") == uID){
                                        aContexts[i].setProperty("firstName", uFirstName);
                                        aContexts[i].setProperty("lastName", uLastName);
                                        aContexts[i].setProperty("email", uEmail);
                                        aContexts[i].setProperty("phone", uPhoneNumber);
                                        aContexts[i].setProperty("dateOfBirth", uDateOfBirth);
                                        aContexts[i].setProperty("age", parseInt(uAge));

                                    }
                                }
                            })
                            
                            studentDataModel.refresh();
                            updateDialog.close();
                            updateDialog.destroy();
                            
                            
                        }
                    }),
                    endButton: new Button({
                        text: "Close",
                        press: function () {
                            updateDialog.close();
                            updateDialog.destroy();
                            
                        }
                    })
                })

                updateDialog.open();

            },

            onPressDelete: function () {

            }

            // onPressUpdate: async function () {
            //     // Get the Table control
            //     let oTable = this.byId("studentTable");

            //     // Get the selected item
            //     let oSelectedItem = oTable.getSelectedItem();

            //     if (oSelectedItem) {
            //         // Retrieve the data from the selected item
            //         let oContext = oSelectedItem.getBindingContext();
            //         let oData = oContext.getObject();
            //         // For example, log the data or perform an update
            //         console.log("Selected Item Data:", oData);
            //         await this.openDialogToUpdate(oData);
            //         // You can now use oData to update or process as needed
            //         // Example: Open a dialog or perform an action with the selected data
            //     } else {
            //         // Handle case when no item is selected
            //         sap.m.MessageToast.show("Please select a record to update.");
            //     }
            // },

            // openDialogToUpdate: function (OData) {
            //     let that = this;
            //     // Create a SimpleForm instance for adding student information
            //     let oForm = new sap.ui.layout.form.SimpleForm({
            //         // Define form content
            //         content: [
            //             // Define input fields for student information
            //             new sap.m.Label({
            //                 text: "ID"
            //             }),
            //             new sap.m.Input({
            //                 id: "inputID",
            //                 editable: false // Set to false to make input non-editable
            //             }).setValue(OData.ID),
            //             new sap.m.Label({
            //                 text: "First Name"
            //             }),
            //             new sap.m.Input("inputFirstName").setValue(OData.firstName),
            //             new sap.m.Label({
            //                 text: "Last Name"
            //             }),
            //             new sap.m.Input("inputLastName").setValue(OData.lastName),
            //             new sap.m.Label({
            //                 text: "Email"
            //             }),
            //             new sap.m.Input("inputEmail").setValue(OData.email),
            //             new sap.m.Label({
            //                 text: "Phone"
            //             }),
            //             new sap.m.Input("inputPhone").setValue(OData.phone),
            //             new sap.m.Label({
            //                 text: "Date of Birth"
            //             }),
            //             new sap.m.DatePicker({
            //                 id: "inputDateOfBirth",
            //                 displayFormat: "dd.MM.yyyy", // Display format
            //                 valueFormat: "yyyy-MM-dd", // Value format
            //             }).setValue(OData.dateOfBirth),
            //             new sap.m.Label({
            //                 text: "Age"
            //             }),
            //             new sap.m.Input({
            //                 id: "inputAge",
            //                 change: "calculateAge",
            //                 editable: false // Set to false to make input non-editable
            //             }).setValue(OData.age)
            //         ]
            //     });

            //     // Create a dialog box with the SimpleForm as content
            //     let oDialog = new Dialog({
            //         width: "auto", // Adjust the width as needed
            //         title: "Add Student", // Set dialog title
            //         content: oForm, // Set the SimpleForm as the content
            //         beginButton: new Button({
            //             text: "Update", // Set button text
            //             press: async function (oEvent) {
            //                 // Function triggered when the "Save" button is pressed
            //                 // Retrieve input values from the dialog
            //                 let ID = sap.ui.getCore().byId("inputID").getValue();
            //                 let firstName = sap.ui.getCore().byId("inputFirstName").getValue();
            //                 let lastName = sap.ui.getCore().byId("inputLastName").getValue();
            //                 let email = sap.ui.getCore().byId("inputEmail").getValue();
            //                 let phone = sap.ui.getCore().byId("inputPhone").getValue();
            //                 let dateOfBirth = sap.ui.getCore().byId("inputDateOfBirth").getValue();
            //                 let age = sap.ui.getCore().byId("inputAge").getValue();


            //                 // Log input values
            //                 console.log("First Name:", firstName);
            //                 console.log("Last Name:", lastName);
            //                 console.log("email:", email);
            //                 console.log("email:", phone);

            //                 // Construct student data object
            //                 let studentData = {
            //                     ID: ID,
            //                     firstName: firstName,
            //                     lastName: lastName,
            //                     email: email,
            //                     email: phone,
            //                     dateOfBirth: dateOfBirth,
            //                     age: age
            //                 };
            //                 let oModel = that.getView().getModel();
            //                 let oBindList = oModel.bindList("/studentsRecord");

            //                 let aFilter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, ID);

            //                 await oBindList.filter(aFilter).requestContexts().then(function (aContexts) {
            //                     aContexts[0].setProperty("firstName", firstName);
            //                     aContexts[0].setProperty("lastName", lastName);
            //                 });
            //                 oDialog.close(); // Close the dialog
            //                 oDialog.destroy(); // Destroy the dialog
            //                 oModel.refresh();
            //             }
            //         }),

            //     });

            //     // Open the dialog
            //     oDialog.open();
            // }


        });
    });
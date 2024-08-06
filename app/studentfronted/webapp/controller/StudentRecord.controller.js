sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/format/DateFormat",
        "sap/m/Dialog",
        "sap/m/BusyDialog",
        "sap/m/Button"

    ],
    function (Controller, DateFormat, Dialog, BusyDialog, Button) {
        "use strict";

        return Controller.extend("com.ingenx.studentfronted.controller.StudentRecord", {
            onInit: function () {

            },

            onPressAddRecord : async function(){
                if(!this.oDialog){
                    this.oDialog = await this.loadFragment({
                        name: "com.ingenx.studentfronted.fragments.AddRecord"
                    });
                    this.oDialog.open()
                }
                else{
                    this.oDialog.open()
                }
            },

            onCloseDialog : function(){
                let oDialog = this.byId("AddRecord");
                oDialog.close();
                console.log("oDialog", oDialog);
            },

            onPressSaveDialog: function (oEvent) {


                // Get the input values
                let oView = this.getView();
                let sFirstName = oView.byId("inputFirstName").mProperties.value;
                let sLastName = oView.byId("inputLastName").mProperties.value;;
                let sEmail = oView.byId("inputEmail").mProperties.value;;
                let sPhone = oView.byId("inputPhone").mProperties.value;;
                let sDateofBirth = oView.byId("inputDateofBirth").mProperties.value;
                let sAge = oView.byId("Age").mProperties.value;

                // You can now use these values as needed
                console.log("First Name: " + sFirstName);
                console.log("Last Name: " + sLastName);
                console.log("Email: " + sEmail);
                console.log("Phone: " + sPhone);
                console.log("Date of Birth: " + sDateofBirth);
                console.log("Age: " + sAge);
            },


            // onCloseDialog: function () {
            //     // note: We don't need to chain to the pDialog promise, since this event handler
            //     // is only called from within the loaded dialog itself.
            //     this.byId("helloDialog").close();
            // },

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

                if (monthDiff < 0 || (monthDiff === 0 && currentDay <personBirthDay)) {
                    age--;
                }

                console.log("age", age);

                let ageInput = this.byId("inputAge")
               
                ageInput.setValue(age);
                ageInput.setVisible(true);
            },

            onSubmitAddRecord : async function(){
                let sFirstName = this.byId("inputFirstName").getValue();
                let sLastName = this.byId("inputLastName").getValue();
                let sEmail = this.byId("inputEmail").getValue();
                let sPhoneNumber = this.byId("inputPhone").getValue();
                let sDateofBirth = this.byId("inputDateOfBirth").getValue();
                let sAge = this.byId("inputAge").getValue();

                let studentData = {
                    firstName : sFirstName,
                    lastName : sLastName,
                    email : sEmail,
                    phone : sPhoneNumber,
                    dateOfBirth : sDateofBirth,
                    age : parseInt(sAge)
                }
                console.log("studentData", studentData);

                this.onCloseDialog();

                // Getting Model of the View 
                let oModel = this.getView().getModel();

                //bindList is a method to post Data bindList("/pathName Or Entity")
                let oBinding = oModel.bindList("/studentsRecord");
                // create is a function to insert Data into the table.

                await oBinding.create(studentData);

                // To fetch the Latest Record from the Table after POST Operation
                oModel.refresh();
            },








            onPressUpdate: async function () {
                // Get the Table control
                let oTable = this.byId("studentTable");

                // Get the selected item
                let oSelectedItem = oTable.getSelectedItem();

                if (oSelectedItem) {
                    // Retrieve the data from the selected item
                    let oContext = oSelectedItem.getBindingContext();
                    let oData = oContext.getObject();
                    // For example, log the data or perform an update
                    console.log("Selected Item Data:", oData);
                    await this.openDialogToUpdate(oData);
                    // You can now use oData to update or process as needed
                    // Example: Open a dialog or perform an action with the selected data
                } else {
                    // Handle case when no item is selected
                    sap.m.MessageToast.show("Please select a record to update.");
                }
            },

            openDialogToUpdate: function (OData) {
                // Create a SimpleForm instance for adding student information
                let oForm = new sap.ui.layout.form.SimpleForm({
                    // Define form content
                    content: [
                        // Define input fields for student information
                        new sap.m.Label({
                            text: "ID"
                        }),
                        new sap.m.Input({
                            id: "inputID",
                            editable: false // Set to false to make input non-editable
                        }).setValue(OData.ID),
                        new sap.m.Label({
                            text: "First Name"
                        }),
                        new sap.m.Input("inputFirstName").setValue(OData.firstName),
                        new sap.m.Label({
                            text: "Last Name"
                        }),
                        new sap.m.Input("inputLastName").setValue(OData.lastName),
                        new sap.m.Label({
                            text: "Email"
                        }),
                        new sap.m.Input("inputEmail").setValue(OData.email),
                        new sap.m.Label({
                            text: "Phone"
                        }),
                        new sap.m.Input("inputPhone").setValue(OData.phone),
                        new sap.m.Label({
                            text: "Date of Birth"
                        }),
                        new sap.m.DatePicker({
                            id: "inputDateOfBirth",
                            displayFormat: "dd.MM.yyyy", // Display format
                            valueFormat: "yyyy-MM-dd", // Value format
                        }).setValue(OData.dateOfBirth),
                        new sap.m.Label({
                            text: "Age"
                        }),
                        new sap.m.Input({
                            id: "inputAge",
                            change: "calculateAge",
                            editable: false // Set to false to make input non-editable
                        }).setValue(OData.age)
                    ]
                });

                // Create a dialog box with the SimpleForm as content
                let oDialog = new Dialog({
                    width: "auto", // Adjust the width as needed
                    title: "Add Student", // Set dialog title
                    content: oForm, // Set the SimpleForm as the content
                    beginButton: new Button({
                        text: "Update", // Set button text
                        press: async function () {
                            // Function triggered when the "Save" button is pressed
                            // Retrieve input values from the dialog
                            let ID = sap.ui.getCore().byId("inputID").getValue();
                            let firstName = sap.ui.getCore().byId("inputFirstName").getValue();
                            let lastName = sap.ui.getCore().byId("inputLastName").getValue();
                            let email = sap.ui.getCore().byId("inputEmail").getValue();
                            let phone = sap.ui.getCore().byId("inputPhone").getValue();
                            let dateOfBirth = sap.ui.getCore().byId("inputDateOfBirth").getValue();
                            let age = sap.ui.getCore().byId("inputAge").getValue();


                            // Log input values
                            console.log("First Name:", firstName);
                            console.log("Last Name:", lastName);
                            console.log("email:", email);
                            console.log("email:", phone);

                            // Construct student data object
                            let studentData = {
                                ID: ID,
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                email: phone,
                                dateOfBirth: dateOfBirth,
                                age: age
                            };
                            oDialog.close(); // Close the dialog
                            oDialog.destroy(); // Destroy the dialog
                        }
                    }),
                    endButton: new Button({
                        text: "Cancel", // Set button text
                        press: function () {
                            // Function triggered when the "Cancel" button is pressed
                            oDialog.close(); // Close the dialog
                            oDialog.destroy(); // Destroy the dialog
                        }
                    })
                });

                // Open the dialog
                oDialog.open();
            }


        });
    });
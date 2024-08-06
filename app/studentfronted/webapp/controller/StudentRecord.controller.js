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

        });
    });
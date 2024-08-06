using { managed } from '@sap/cds/common';


namespace trainingprojectdb;

entity studentsRecord : managed{
    key ID : Integer @Core.Computed;
    firstName : String(15);
    lastName : String(15);
    email : String(30);
    phone : String(15);
    dateOfBirth : Date;
    age : Integer;
}



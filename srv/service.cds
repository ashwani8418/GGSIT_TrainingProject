using { trainingprojectdb  } from '../db/schema';

service trainingprojectSrv{

    entity studentsRecord as projection on trainingprojectdb.studentsRecord;

}

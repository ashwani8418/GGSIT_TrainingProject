const  cds = require('@sap/cds');

module.exports = cds.service.impl( function(req) {


    // GET Request is called READ
    this.on('READ', 'studentsRecord', async function(req){
        try {
            let responseData = undefined;
            responseData = await SELECT.from('trainingprojectdb.studentsRecord');
            return responseData;

        } catch (error) {
           throw error
        }
    })

    // POST Request is called CREATE
    // this.on('CREATE', 'studentsRecord', async function(req){
    //     try {

    //         console.log("User Data", req.data);
    //         // console.log("User Data ID", req.data.ID);
    //         await INSERT.into('trainingprojectdb.studentsRecord').entries(req.data)
    //         return;
    //     } catch (error) {
    //        throw error
    //     }
    // })

    this.on('UPDATE', 'studentsRecord', async function(req){
        try {
            console.log("User Data", req.data);
            let ID = req.data.ID;

            await UPDATE('trainingprojectdb.studentsRecord')
            .set(req.data)
            .where({ ID: ID })
           
        } catch (error) {
           throw error
        }
    })
})
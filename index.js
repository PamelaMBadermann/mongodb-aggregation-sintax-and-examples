// *** MONGODB AGGREGATE: -----------------------------------------------------
// 		- SINTAX:
//      db.<colection>.aggregate([
//          <stage1>,
//          <stage2>,
//           ...
//          <stageN>
// ])

// *** EXPRESSION: ------------------------------------------------------------
// 		- EXPRESSION REFERS TO THE NAME OF THE FIELD IN INPUT DOCUMENTS
//          "$<fieldName>""

// *** AGGREGATE STAGES: ------------------------------------------------------
// 		- SINTAX:
//      { $<stageOperator> : {} }
//
//
// 		- STAGE 1:
//      - $match: *** FILTER DOCUMENTS BY CERTAIN QUERY -----------------------
//          - SINTAX:
//              { $match : <query> } }
//
//          - EXAMPLES:
//              { $match : { "name" : "John", "age" : 25 }
//              db.persons.aggregate([
//                   { $match: {age: {$gt: 25} } }              
//              ]);
//
//              db.persons.aggregate([
//                   { $match: {$and: [ {gender: "female"} ,
//                          {age: {$gt: 25}} ] } }
//              ]);
// 
//
//      - $group: *** GROUP DOCUMENTS BY CERTAIN EXPRESSIONS ------------------
//          - SINTAX:
//              { $group: { _id: <expression>, <field1>:
//                  { <acumulator1> : <expression1> }, ... } }
//
//          - EXAMPLES:
//              db.persons.aggregate([         * notice: _id is Mandatory field
//                  { $group: { _id: "$age"} }   
//              ]);
//
//              db.persons.aggregate([
//                  { $group: { _id: "$gender"} }
//              ]);
//
//              db.persons.aggregate(       * example of group by nested fields
//                  { $group: { _id: "$company.location.country"} }
//              ]);
//
//      - $project: *** FILTER FIELDS IN SOME DOCUMENTS -----------------------
//          - SINTAX:
//              { $project : <fields>
//
//      - $sort: *** SORT OBJECTS
//          - SINTAX:
//              { $sort : <fields>
//
//      - $count: *** COUNT NUMBER OF OBJECTS DOCUMENTS
//          - SINTAX:
//              { $count : <fields>
//
//      - $limit: *** LIMIT NUMBER OF DOCUMENTS
//          - SINTAX:
//              { $limit : <number>
//
//      - $skip: *** SKIP CERTAIN AMOUNT OF DOCUMENTS
//          - SINTAX:
//              { $skip : <number>
//
//
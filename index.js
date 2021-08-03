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
// * 1           db.persons.aggregate([
//                   { $match : { "name" : "John", "age" : 25 }              
//              ]);
//              
// * 2           db.persons.aggregate([
//                   { $match: {age: {$gt: 25} } }              
//              ]);
//
// * 3           db.persons.aggregate([
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
// * 1          db.persons.aggregate([         * notice: _id is Mandatory field
//                  { $group: { _id: "$age"} }   
//              ]);
//
// * 2          db.persons.aggregate([
//                  { $group: { _id: "$gender"} }
//              ]);
//
// * 3          db.persons.aggregate(       * example of group by nested fields
//                  { $group: { _id: "$company.location.country"} }
//              ]);
//
// * 4          db.persons.aggregate(     * example of group by multiple fields
//                  { $group: { _id: {age: "$age", gender: "$gender"} } }
//              ]);
//
// * 5.1        db.persons.aggregate(        * combination of $match and $group
//                  // STAGE ONE:
//                  { $match: {favouriteFruit: "banana" } },
//                  // STAGE TWO:
//                  { $group: { _id: {age: "$age", eyeColor: "$eyeColor"} } }
//              ]);
//
// * 5.2        db.persons.aggregate(
//                  { $match: {favouriteFruit: "banana" } },
//                  { $group: { _id: {age: "$age", age: "$age", gender: "$gender"} } }
//              ]);
//
// * 6        db.persons.aggregate(                  * swap $match and $group
//                  // STAGE ONE:
//                  { $match: {gender: "female"} },
//                  // STAGE TWO:
//                  { $group: { _id: {age: "$age", age: "$age"} } }
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
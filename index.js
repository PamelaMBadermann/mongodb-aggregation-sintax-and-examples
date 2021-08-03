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
// ------ $match: *** FILTER DOCUMENTS BY CERTAIN QUERY -----------------------
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
// ------ $group: *** GROUP DOCUMENTS BY CERTAIN EXPRESSIONS ------------------
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
//                  { $match: {gender: "female"} },
//                  { $group: { _id: {age: "$age", age: "$age"} } }
//              ]);
//
// * 7.1      db.persons.aggregate(                 * example $group and $match
//                  { $group: { _id: {age: "$age", eyeColor: "$eyeColor"} } }
//                  { $match: { "_id.age": {$gt: 30} } }
//              ]);
//
// * 7.2      db.persons.aggregate(                 
//                  { $group: { _id: {eyeColor: "$eyeColor", age: "$age"} } }
//                  { $match: { "_id.eyeColor": "blue" } }
//              ]);
//
// ------ $count: *** COUNT NUMBER OF OBJECTS DOCUMENTS -----------------------
//          - SINTAX:
//            { $count : "<title>" }
//
//          - EXAMPLES:
// * 8.1       db.persons.aggregate([
//                  { $count: "allDocumentsCount" }
//             ]);
//
// * 8.2      db.persons.aggregate([
//                  { $count: "allDocumentsCount" }
//             ]);
//
//          - different count methods:
//
// * 8.3      db.persons.aggregate([]).toArray().length   
//                                       (is the same as 9.2) client-side count
//
// * 8.4      db.persons.aggregate([]).itCount()         
//                                      (is fastier than 9.1) client-side count
//
// * 5.5      db.persons.aggregate([{$count: "total"}])  
//                                      (is fastier than 9.2) server-side count
//
//                    * notice: Find count() is wrapper of the Aggregate $count
//                                              
// * 9.1      db.persons.aggregate([                *example of group and count
//                  { $group: { _id: "$company.location.country"}},
//                  { $count: "contriesCount"}
//            ]);
//
// * 9.2      db.persons.aggregate([
//                  { $group: { _id: "$age"}},
//                  { $count: "age"}
//            ]);
//
// * 9.3      db.persons.aggregate([
//                  { $group: { _id: "$eyeColor"}},
//                  { $count: "eyeColor"}
//            ]);
//
// * 9.4      db.persons.aggregate([
//                  { $group: { _id: {eyeColor: "$eyeColor", gender: "$gender"}}},
//                  { $count: "eyeColorAndGender"}
//            ]);
//
// * 9.5      db.persons.aggregate([
//                  // STAGE ONE
//                  { $match: {age: {$gte: 25}}},
//                  // STAGE TWO
//                  { $group: { _id: {eyeColor: "$eyeColor", age: "$age"}}},
//                  // STAGE THREE
//                  { $count: "eyeColorAndAge"}
//            ]);
//
// ------ $sort: *** SORT INPUT DOCUMENTS BY CERTAIN FIELD --------------------
//          - SINTAX:
//              { $sort : <field1>: <-1 | 1>, <field2>: <-1 | 1> ... } }
//                                   where: -1 is descending and 1 is ascending
//
//          - EXAMPLES:
// * 10.1     db.persons.aggregate([
//                  { $sort: {score: -1} } 
//            ]);
//
// * 10.2     db.persons.aggregate([
//                  { $sort: {age: 1, country: 1} } 
//            ]);
//
// * 10.3     db.persons.aggregate([
//                  { $sort: {age: -1, gender: -1, eyeColor: 1 } } 
//            ]);
//
// * 11.1     db.persons.aggregate([
//                  { $group: { _id: "$favoriteFruit" } },
//                  { $sort: { _id: 1 } }
//            ]);
//
// * 11.2     db.persons.aggregate([
//                  { $group: { _id: "$age"}},
//                  { $sort: { _id: 1 } }
//            ]);
//
// * 11.3     db.persons.aggregate([
//                  { $group: { _id: { eyeColor: "$eyeColor", favoriteFruit: "$favoriteFruit"}}},
//                  { $sort: { "_id.eyeColor": 1, "_id.favoriteFruit": -1 } }
//            ]);
//
// ------ $project: *** FILTER FIELDS IN SOME DOCUMENTS -----------------------
//          - SINTAX:
//              { $project : <fields>
//
//
// ------ $limit: *** LIMIT NUMBER OF DOCUMENTS -------------------------------
//          - SINTAX:
//              { $limit : <number>
//
// ------ $skip: *** SKIP CERTAIN AMOUNT OF DOCUMENTS -------------------------
//          - SINTAX:
//              { $skip : <number>
//
//
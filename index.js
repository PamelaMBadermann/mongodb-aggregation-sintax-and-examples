// *** MONGODB AGGREGATE: -----------------------------------------------------
// 		    - SINTAX:
//            db.<colection>.aggregate([
//                  <stage1>,
//                  <stage2>,
//                  ...
//                  <stageN>
//            ]);

// *** EXPRESSION: ------------------------------------------------------------
// 		    - EXPRESSION REFERS TO THE NAME OF THE FIELD IN INPUT DOCUMENTS
//                  "$<fieldName>""

// *** AGGREGATE STAGES: ------------------------------------------------------
// 		    - SINTAX:
//                  { $<stageOperator> : {} }
//
// ------ $match: *** FILTER DOCUMENTS BY CERTAIN QUERY -----------------------
//          - SINTAX:
//              { $match : <query> } }
//
//          - EXAMPLES:
// * 1        db.persons.aggregate([
//                  { $match : { "name" : "John", "age" : 25 }              
//            ]);
//              
// * 2        db.persons.aggregate([
//                  { $match: {age: {$gt: 25} } }              
//            ]);
//
// * 3        db.persons.aggregate([
//                  { $match: {$and: [ {gender: "female"} ,
//                          {age: {$gt: 25}} ] } }
//            ]);
// 
//
// ------ $group: *** GROUP DOCUMENTS BY CERTAIN EXPRESSIONS ------------------
//          - SINTAX:
//              { $group: { _id: <expression>, <field1>:
//              { <acumulator1> : <expression1> }, ... } }
//
//          - NOTICE: _id is Mandatory field
//
//          - EXAMPLES:
// * 1        db.persons.aggregate([
//                  { $group: { _id: "$age"} }   
//            ]);
//
// * 2        db.persons.aggregate([
//                  { $group: { _id: "$gender"} }
//            ]);
//
// * 3        db.persons.aggregate(       * example of group by nested fields
//                  { $group: { _id: "$company.location.country"} }
//            ]);
//
// * 4        db.persons.aggregate(     * example of group by multiple fields
//                  { $group: { _id: {age: "$age", gender: "$gender"} } }
//            ]);
//
// * 5.1      db.persons.aggregate(        * combination of $match and $group
//              // STAGE ONE:
//                  { $match: {favouriteFruit: "banana" } },
//              // STAGE TWO:
//                  { $group: { _id: {age: "$age", eyeColor: "$eyeColor"} } }
//            ]);
//
// * 5.2      db.persons.aggregate(
//                  { $match: {favouriteFruit: "banana" } },
//                  { $group: { _id: {age: "$age", age: "$age", gender: "$gender"} } }
//            ]);
//
// * 6        db.persons.aggregate(                  * swap $match and $group
//                  { $match: {gender: "female"} },
//                  { $group: { _id: {age: "$age", age: "$age"} } }
//            ]);
//
// * 7.1      db.persons.aggregate(                 * example $group and $match
//                  { $group: { _id: {age: "$age", eyeColor: "$eyeColor"} } }
//                  { $match: { "_id.age": {$gt: 30} } }
//            ]);
//
// * 7.2      db.persons.aggregate(                 
//                  { $group: { _id: {eyeColor: "$eyeColor", age: "$age"} } }
//                  { $match: { "_id.eyeColor": "blue" } }
//            ]);
//
// ------ $count: *** COUNT NUMBER OF OBJECTS DOCUMENTS -----------------------
//          - SINTAX:
//            { $count : "<title>" }
//
//          - EXAMPLES:
// * 8.1      db.persons.aggregate([
//                  { $count: "allDocumentsCount" }
//            ]);
//
// * 8.2      db.persons.aggregate([
//                  { $count: "allDocumentsCount" }
//            ]);
//
//                                             * different count methods below:
//
// * 8.3      db.persons.aggregate([]).toArray().length   
//                                     * (is the same as 9.2) client-side count
//
// * 8.4      db.persons.aggregate([]).itCount()         
//                                    * (is fastier than 9.1) client-side count
//
// * 5.5      db.persons.aggregate([{$count: "total"}])  
//                                    * (is fastier than 9.2) server-side count
//
//          - NOTICE: Find count() is wrapper of the Aggregate $count
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
//              // STAGE ONE
//                  { $match: {age: {$gte: 25}}},
//              // STAGE TWO
//                  { $group: { _id: {eyeColor: "$eyeColor", age: "$age"}}},
//              // STAGE THREE
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
//              { $project: { <field1>: <1>, <field2>: <0>, <newField1>: <expression> ... } }
//
//          - EXAMPLES:
// * 12.1     db.persons.aggregate([
//                  { $project: {name: 1, "company.title": 1} } 
//            ]);
//
// * 12.2     db.persons.aggregate([
//                  { $project: { _id: 0, name: 1, age: 1} } 
//            ]);
//
// * 12.3     db.persons.aggregate([
//                  { $project: { eyeColor: 0, age: 0 } }
//            ]);
//
// * 12.4     db.persons.aggregate([
//                  { $project: { name: 1, newAge: "$age" } }
//            ]);
//
// * 12.5     db.persons.aggregate([
//                  { $project: { name: 1, "company.location.country": 1 } }
//            ]);
//
// * 12.6     db.persons.aggregate([
//                  { $project: { isActive: 1, name: 1, gender: 1 } }
//            ]);
//
// * 12.7     db.persons.aggregate([
//                  { $project: { isActive: 1, name: 1, gender: 1 } }
//            ]);
//
// * 12.8     db.persons.aggregate([
//                  { $project: { isActive: 0, name: 0, gender: 0 } }
//            ]);                          *get all fields, except those above.
//
//                                  
// * 13.1     db.persons.aggregate([                  *project with new fields:
//                  { $project: { 
//                      _id: 0,
//                      name: 1,
//                      info: {
//                          eyes: "$eyeColor",
//                          fruit: "$favoriteFruit",
//                          country: 
//                          "$company.location.country"
//                      }
//                  } } 
//            ]);
//
// * 13.2     db.persons.aggregate([
//                  { $project: { 
//                      _id: 0,
//                      index: 1,
//                      name: 1,
//                      info: {
//                          eyes: "$eyeColor",
//                          company: "$company.title",
//                          country: "$company.location.country"
//                      }
//                  } }
//            ]);                  
//
// ------ $limit: *** OUTPUTS FIRST N DOCUMENTS FROM THE INPUT ----------------
//          - SINTAX: 
//              { $limit : <number> }
//
//          * NOTICE: $limit is usually used in:
//                - sampled aggregation requests with $limit as first stage
//                - after $sort to produce topN results. make smaller documents
//
//          - EXAMPLES:
// * 14.1     db.persons.aggregate([
//                  { $limit: 100 },
//                  { $match: { age: { $gt: 27 } } },
//                  { $group: { _id: "$company.location.country" } }
//            ]);
//
// * 14.2     db.persons.aggregate([
//              // STAGE ZERO
//                  { $limit : 100 },
//              // STAGE ONE
//                  { $match: { eyeColor: {$ne: "blue"}}},
//              // STAGE TWO
//                  { $group: { _id: {eyeColor: "$eyeColor",
//                      favoriteFruit: "$favoriteFruit"}}},
//              // STAGE THREE
//                  { $sort: {"_id.eyeColor": 1, "_id.favoriteFruit": -1 } }
//            ]);
//
// ------ $unwind: *** SPLITS EACH DOCUMENT WITH SPECIFIED ARRAY---------------
//                              TO SEVERAL DOCUMENTS: ONE DOC PER ARRAY ELEMENT
//          - SINTAX:
//              { $unwind : <arrayReferencedExpression> }
//
//          - EXAMPLES:
// * 15.1     db.persons.aggregate([
//                  { $unwind: "$tags" }
//                  { $unwind: "$hobbies" }
//            ]);
//
// * 15.2     db.persons.aggregate([
//                  { $unwind: "$tags" }
//                  { $project: { name: 1, gender: 1, tags: 1} }
//            ]);
//
// * 15.3     db.persons.aggregate([
//              // STAGE ONE
//                  { $unwind: "$tags" }
//              // STAGE TWO
//                  { $project: { name: 1, index: 1, tags: 1} }
//            ]);
//
// * 16.1     db.persons.aggregate([
//              // STAGE ONE
//                  { $unwind: "$tags" }
//              // STAGE TWO
//                  { $groups: { _id: "$tags"} }
//            ]);
//
// ------ $skip: *** SKIP CERTAIN AMOUNT OF DOCUMENTS -------------------------
//          - SINTAX:
//              { $skip : <number> }



// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻



// *** MONGODB AGGREGATE: ACCUMULATORS ----------------------------------------
//                                                       $sum, $avg, $max, $min
//          - LOGIC:
//              - $sum: example in documents group by age with sum accumulator.
//                      before output, we go to each of those documents, and 
//                      count total quantity. the result, is only one document
//                      per with new field called TOTAL.
//
//          - SINTAX:
//              { $<accumulatorOperator>: <expression> }
//
// ------ $sum Accumulator: ---------------------------------------------------
//                       *** SUMS NUMERIC VALUES FOR THE DOCUMENT IN EACH GROUP
//
//          - SINTAX:
//            { $sum: <expression | number> }
//
// * 17.1     db.persons.aggregate([
//                  { total: { $sum: "$quantity" } }
//            ]);
//
// * 17.2     db.persons.aggregate([                         * $sum and $group:
//                  {
//                      $group: {
//                          _id: "$age",
//                          count: { $sum: 1 }
//                      }
//                  }
//            ]);
//
// * 17.3     db.persons.aggregate([                         * $sum and $group:
//                  {
//                      $group: {
//                          _id: "$age",
//                          count: { $sum: 1 }
//                      }
//                  }
//            ]);
//
// * 18.1     db.persons.aggregate([                 * $sum $unwind and $group:
//                  { $unwind: "$tags" },
//                  {
//                      $group: {
//                          _id: "$tags",
//                          count: { $sum: 1 }
//                      }
//                  }
//            ]);
//
// * 18.2     db.persons.aggregate([                 * $sum $unwind and $group:
//                  { $unwind: "$tags" },
//                  {
//                      $group: {
//                          _id: "$tags",              * to convert to integer:
//                          count: {$sum: NumberInt(1)} 
//                      }
//                  }
//            ]);
//
// ------ $avg Accumulator: ---------------------------------------------------
//                          *** CALCULATES AVERAGE VALUE OF THE CERTAIN VALUES
//                              IN THE DOCUMENTS FOR EACK GROUP
//
//          - SINTAX:
//              { $avg: <expression> }
//
//          - EXAMPLES:
// * 19.1     db.persons.aggregate([
//                  { avgAge: { $avg: "$age" } }
//            ]);
//
// * 19.2     db.persons.aggregate([                         * $avg and $group:
//                  {
//                      $group: {
//                          _id: "$eyeColor",
//                          avgAge: { $avg: "$age" }
//                      }
//                  }
//            ]);
//
// * 19.3     db.persons.aggregate([                         * $avg and $group:
//                  {
//                      $group: {
//                          _id: "$favoriteFruit",
//                          avgAge: { $avg: "$age" }
//                      }
//                  }
//            ]);
//
// * 19.4     db.persons.aggregate([                         * $avg and $group:
//                  {
//                      $group: {
//                          _id: "$company.location.country",
//                          avgAge: { $avg: "$age" }
//                      }
//                  }
//            ]);
//



// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻
// -⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻-⎽__⎽--⎻⎺⎺⎻--⎽__⎽-⎻⎺⎺⎻



// *** MONGODB AGGREGATE: UNARY OPERATORS -------------------------------------
//                                        $type, $or, $lt, $gt, $and, $multiply
//
//          - LOGIC: query operators provide to locale data within the database
//                   and projection operators modig=fy how data is presented.
//
//          - NOTICE: Unary Operators are usually used in the $project stage.
//                    In the $group stage Unary Operators can be used only in
//                    conjuction with Accumulators.
//
//          - SINTAX:
//              { <operator>: <expression> }
//
// ------ $type Unary Operator: -----------------------------------------------
//                                     *** RETURN BSON TYPE OF THE FIELDS VALUE
//
//          - SINTAX:
//              { $type: <expression> }
//
//          - EXAMPLES:
// * 20.1     db.persons.aggregate([
//                  { $type: "$age" }
//                  { $type: "$name" }
//            ]);
//
// * 20.2     db.persons.aggregate([
//                  {
//                      $project: {
//                          name: 1,
//                          eyeColorType: { $type: "$eyeColor" },
//                          ageType: { $type: "$age" }
//                      }
//                  }
//            ]);
//
// * 20.3     db.persons.aggregate([
//                  {
//                      $project: {
//                          name: 1,
//                          nameType: { $type: "$name" },
//                          ageType: { $type: "$age" },
//                          tagsType: { $type: "$tags" },
//                          companyType: { $type: "$company" }
//                      }
//                  }
//            ]);
//
// ------ $out Stage: ---------------------------------------------------------
//                     *** WRITES RESULTING DOCUMENTS TO THE MONGODB COLLECTION
//
//          - NOTICE: $out MUST be last stage in the pipeline. If output
//                    collection doesn't existt exist, it will be created
//                    automatically
//
//          - SINTAX:
//              { $out: "<outputCollectionName>" }
//
//          - EXAMPLES:
// * 21.1     db.persons.aggregate([
//                  { $out: "newCollection" }
//            ]);
//
// * 21.2     db.persons.aggregate([
//                  { $group: { _id: { age: "$age", eyeColor: "$eyeColor"}}},
//                  { $out: "aggregrationResults" }
//            ]);             * documents from the $group stage will be
//                              written to the collection "aggregrationResults"
//                          
// * 21.3     db.persons.aggregate([
//                  {
//                      $project: {
//                          name: 1,
//                          nameType: { $type: "$name" },
//                          ageType: { $type: "$age" },
//                          tagsType: { $type: "$tags" },
//                          companyType: { $type: "$company" }
//                      }
//                  },
//                  { $out: "outCollection" }
//            ]);
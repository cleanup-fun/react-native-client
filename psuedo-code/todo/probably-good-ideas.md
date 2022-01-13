# Probably good ideas

- i18next integration
- typescript or at the very least a linter
- video support?
- music support? Not even sure how to access the persons music files
- store the indexes in async storage

- Allow the user to customize their notifications

- Make sure every response comes with a secret key
  - Then every update to the cloud (like payments), the user has to send that key
  - then when they get the response they get a new key
  - If they send the wrong key they have to relogin
- Make sure to send expiration date as well
  - Every write updates the expiration date


- certain getters and setters should become get and set properties instead of functions

- the dbs like fake dbs are not abstract
  - they should take in a schema, check which properties are indexes

- Right now I'm storing the indexes in an object instead of a sorted list
  - not sure which is faster
  - could probably write a test

- make transactions for the database
  - perhaps I can make the transaction only for a single document and its indexes?
    - or maybe multiple documents and its indexes?
  - read lock
    - prevents writes from happening
  - write lock
    - prevents both reads and writes from happening


- Allow the query to store the current buffer so it doesn't have to re-execute
  - listen to the underlying dbs events
    - if file is removed
      - check if the file is one of the files in the buffer
        - must reset is true
    - if file is added
      - check if the file passes the tests
        - must reset is true
  - if the filters change
    - must reset is true
  - if the greaterthan or lessthan change
    - must reset is true
  - if sort changes
    - must reset is true
  - if start or end changes
    - doesn't change must reset
  - when setting must reset to true
    - create a promise resolve that emits an event next tick
    - done to prevent the exec happening over and over again for each time the filters are triggered
  - on exec
    - if must reset is false
      - return the buffer sliced
    - if its true
      - re execute


- Create an Object ID types
  - the object id is specified within an object which
    - the schema its referencing0
    - the value of the primary key
  - populating an ObjectID
    - you can run schema.populate(ObjectID)
      - that runs db.populate(ObjectID)
  - populating a document in to depth
```javascript
async function populatedDocument(db, initialDoc, targetDepth = Number.POSITIVE_INFINITY){

  function getPopulatableReferences(schema, doc){
    return Object.values(schema.properties).filter((prop)=>{
      if(prop.type !== "objectid"){
        return false;
      }
      const docValue = doc[prop.name];
      if(typeof docValue !== "object"){
        throw new Error(`value at ${prop.name} is not an object, got ${typeof docValue}`)
      }
      if(!docValue.isObjectID){
        logger.warn(`value at doc[${prop.name}] seems to already been populaed`)
        return false
      }
      if(!(await db.hasSchema(docValue.schemaName))){
        throw new Error(`db doesn't have the schema ${docValue.schemaName}`)
      }
      if(docValue.primaryKeyValue === false){
        logger.warn("empty primary key value")
        return false
      }
      return true;
    }).map((prop)=>{
      return {
        ...docValue,
        propname: prop.name,
      }
    })
  }

  async function populateReference(schema, { schemaName, primaryKeyValue }){
    const schema = db.getSchema(schemaName);
    const doc = await schema.getItem(primaryKeyValue)    
    return JSON.parse(JSON.stringify(doc));
  }

  function extractPointer(schema, doc){
    return {
      schemaName: schema.name,
      primaryKey: schema.primaryKey,
      primaryKeyValue: doc[schema.primaryKey]
    }
  }

  // need deep because i
  const topDoc = JSON.parse(JSON.stringify(initialDoc))
  var itemsToPopulate = [topDoc];
  const alreadyPopulatedItems = {};
  const prepareedRefs = {}

  var currentDepth = 0;
  var refWithCircular = {};
  const refsEachDepth = [];
  const populateableRefsEachDepth = [];
  const pointers = {}

  function addCircular(schema, popRef){
    if(!(schema.name in refsWithCircular)){
      refsWithCircular[schema.name] = [];
    }
    if(!(popRef.primaryKeyValue in refsWithCircular[schema.name])){
      refsWithCircular[schema.name][popRef.primaryKeyValue] = 1
    } else {
      refsWithCircular[schema.name][popRef.primaryKeyValue] += 1
    }
  }

  while(currentDepth < targetDepth && itemsToPopulate.length > 0){
    const newItems = [];
    await Promise.all(
      itemsToPopulate.map(async (doc)=>{
        const schema = await db.getSchema(doc.schemaName);
        const primaryKeyValue = doc[schema.primaryKey];
        const populatableRefs = (
          prepareedRefs[schema.name][primaryKeyValue]
        ) || (
          getPopulatableReferences(schmea, doc)
        )
        delete prepareedRefs[schema.name][primaryKeyValue];
        const pointers = {};
        await Promise.allI(
          populatableRefs.map(async (popRef)=>{
            pointers[popRef.propName] = {...popRef}
            if(popRef.schemaName === schema.name && popRef.primaryKeyValue === primaryKeyValue){
              doc[popRef] = doc
              addCircular(schema, popRef)
              return;
            }
            if(alreadyPopulated[popRef.schemName][popRef.primaryKeyValue]){
              doc[popRef.propname] = alreadyPopulated[popRef.schemName][popRef.primaryKeyValue];
              addCircular(schema, popRef)
              return;
            }
            const populatedRef = await populateReference(schema, popRef);
            newItems.push(populatedRef);
            doc[propRef.propname] = populatedRef
          })
        );
        if(!schema.name in pointers){
          pointers[schema.name] = {};
        }
        pointers[schema.name][primaryKeyValue] = pointers
      })
    )
    const currentDepthRefs = [];
    const filterableItems = await Promise.all(
      newItems.map(async (doc)=>{
        const schema = await db.getSchema(schema.name);
        if(doc in alreadyPopulatedItems[schema.name]){
          return false;
        }
        const populatableRefs = await getPopulatableReferences(schmea, doc)
        if(populatableRefs.length === 0){
          alreadyPopulatedItems[schema.name] = doc[schema.primaryKey]
          return false
        }
        prepareedRefs[schema.name][doc[schema.primaryKey]] = populatedRefs
        return doc
      })
    )

    refsEachDepth.push(currentDepthRefs)

    const currentPopDepthRefs = []
    itemsToPopulate = filterableItems.filter((item)=>{
      return item !== false
    })
    populateableRefsEachDepth.push(currentPopDepthRefs);
    currentDepth++
  }

  return {
    doc: topDoc,
    maxDepth: currentDepth
    numberOfCircularRefs: numberOfCircularRefs,
    refsEachDepth: refsEachDepth,
    populateableRefsEachDepth: populateableRefsEachDepth
  };
}

function getCircularLists(refsWithCircular, allRefs){
  return Object.keys(refsWithCircular).reduce((finalObj, schemaName)=>{
    finalObj[schemaName] = Object.keys(
      refsWithCircular[schemaName][primaryKeyValue]
    ).reduce((docsObj, primaryKeyValue)=>{
      const finishedBranches = [];
      const activeBranches = [];
      const deadBranches = [];

      const firstBranch = [];
      activeBranches.push(firstBranch);
      createBranches(firstBranch, refsWithCircular[schemaName][primaryKeyValue]);
      docsObj[primaryKeyValue] = {
        finishedBranches, deadBranches
      };

      return docsObj;

      function removeBranch(branch){
        activeBranches.splice(activeBranches.indexOf(branch), 1)
      }
      function createBranches(currentBranch, currentItem){
        const { primaryKeyValue, schemaName } = currentItem;
        const itemRefKeys = Object.keys(allRefs[schemaName][primaryKeyValue]);
        if(itemRefKeys.length === 0){
          logger.log("ref points to a doc with no refs")
          removeBranch(currentBranch)
          deadBranches.push(currentBranch)
          return;
        }
        currentBranch.items.push(currentItem)
        itemRefKeys.forEach((refKey, i)=>{
          if(i === 0){
            return runBranches(currentBreach, allRefs[schemaName][primaryKeyValue][refKey])
          }
          const newBranch = {
            items: [...currentBranch]
          };
          activeBranches.push(newBranch);
          return runBranches(newBranch, allRefs[schemaName][primaryKeyValue][refKey])
        })
      }
      function runBranches(currentBranch, currentItem){
        const { primaryKeyValue, schemaName } = currentItem;
        if(!(primaryKeyValue in allRefs[schemaName])){
          logger.log("ref points to a doc with no refs")
          removeBranch(currentBranch)
          deadBranches.push(currentBranch)
          return
        }
        const firstItem = currentBranch[0];
        if(firstItem.schemaName === schemaName && firstItem.primaryKeyValue === primaryKeyValue){
          currentBranch.push(currentItem)
          removeBranch(currentBranch)
          finishedBranches.push(currentBranch)
          return;
        }
        return createBranches(currentBranch, currentItem)
      }
    }, {})
    return finalObj
  }, {})
}

function calculateSchemasReferenced(returnValue){
  return returnValue.circularBranches.

}

/*

To figure out how to solve a circular ref, it may require some brute force
- itemsToCheck = [firDoc]
- circular references for that doc
- for each doc
  - Get all the docs it references
  - filter
    - if the doc has references
      - return true


*/

function getMaxDepth(returnValue){
  return returnValue.refsEachDepth.length
}

function getTotalRefsAtEachDepth(returnValue){
  return returnValue.refsEachDepth.map((refs)=>{
    return refs.length
  })
}

function getTotalRefs(returnValue){
  return getTotalRefsAtEachDepth(returnValue).reduce((total, length)=>{
    return total + length
  }, 0)
}

function getTotalPopulatableRefsAtEachDepth(returnValue){
  return returnValue.populateableRefsEachDepth.map((refs)=>{
    return refs.length
  })
}

function getTotalPopulatedRefs(returnValue){
  return getTotalPopulatableRefsAtEachDepth(returnValue).reduce((total, length)=>{
    return total + length
  }, 0)
}

function numberOfRefsPerDoc(returnValue){
  const pointers = returnValue.pointers;
  return Object.keys(pointers).reduce((finalObj, schemaName)=>{
    finalObj[schemaName] = Object.keys(pointers[schemaName]).reduce((docsObj, primaryKeyValue)=>{
      docsObj[primaryKeyValue] = Object.keys(pointers[schemaName][primaryKeyValue]).length
      return docsObj
    }, {})
    return finalObj
  }, {})
}

function numberOfRefsPerSchema(returnValue){
  const refsPerDoc = numberOfRefsPerDoc(returnValue);
  return Object.keys(refsPerDoc).reduce((schemaName)=>{
    finalObj[schemaName] = Object.keys(refsPerDoc[schemaName]).reduce((total, primaryKeyValue)=>{
      return total + refsPerDoc[schemaName][primaryKeyValue];
    }, 0)
  }, {})
}

function numberOfDocsPerSchema(returnValue){
  const pointers = returnValue.pointers;
  return Object.keys(pointers).reduce((finalObj, schemaName)=>{
    finalObj[schemaName] = Object.keys(pointers[schemaName]).length
    return finalObj
  }, {})
}

function getCircularRefsBySchema(retrurnValue){

}

function getTotalCircularRefs(){

}

```
  - when deleting a document
    - within the write lock
      - delete all the own edges that are from the document
      - for each other schema
        - get current edges = otherSchema.otherEdges\[document.schemaName\]\[document[primaryKey]\]
        - for each edge
          - get the source document
          - update the source document to point to false

  - when updating a document
    - must also update documents that are pointing to it
    - so I guess i have to store the "edges"
    - Would probably be a good idea to
      - create a write lock
        - get the new primarykey
        - get the old primaryKey
        - retrieve all the edges pointing towards the documents old primaryKey
          - foreach edge
          - if they are not the same
            - update all the pointers
            - update all the documents



  - when populating
    - retrieve the Schema from the DB
      - lazy is better
    -

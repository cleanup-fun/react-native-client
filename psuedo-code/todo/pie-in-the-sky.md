# Pie in the Sky

- Filecoin integration
  - an issue with filecoin is that the individualhas to own both eth and filecoin
    - eth for the gas fees
    - filecoin for the storage
- NEAR smart contract
  - it'd be nice if I could also make it based on the bittorrent protocol
    - allow more people to get a slice
    - ask the first person for the bittorrent header (gives the hashes of all the chunks
      - ask everyone else for the headers to make sure all the headers are the same
      - download one chunk from each person


- Allow the database to store arbitrary Bytes
  - possibly with the ability to stream it
  - has a length property
  - can set the filename elsewhere

- Interdatabase communication like water line
  - probably a good idea to create it in typescript
  - create a bunch of interfaces for
    - query
    - DB
      - stores paths
    - Paths
      - stores schemas
    - Schemas
      - stores documents
  - Create one big object which
    - stores databases

- Hot swap schemas and databases
  - if try to populate
    - try to get the database
      - if can't throw an error
    - try to get the path from the database
      - some databases are seperated by path
      - if can't throw an error
    - try to get the schema from the path
      - if not throw an error
    - try to get the document from the schema
      - if not throw an error
    - return document

- Support BigNumber Arrays
  - The number of pictures a person has on their phone is unpredictable
  - And with the advent of PedaByte External Hardrives, we might need an array that supports a length greater than 2^32 or Number.MAX_VALUE
    - Note: that Max value is somewhat unusable in its current form
  - as a result, Need to be able to have a list that can hold an arbitrary amount of keys
  - another note, we may need to "split up" an index into multiple documents if it gets too crazy to be loaded all at once

- Fairness
  - So apparently the turns ABABABAB is actually not fair.
  - Apparently something more fair is something like
    - AB BA, BA AB, BA AB, AB BA
    - Theres math involved I thnk
    - So the simple part is
      - Maybe a Random Number generator to figure out who goes first
    - Starts With A, then B
    - Seems like if(log(4)) 4 is a "semi circle"
      - if(log(currentTurn) / log(4) % 1 === 0) - Switch

  - Long term maybe supporting more than 2 parties

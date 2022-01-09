const MarkedFilesSchema = {
  name: "MarkedFile",
  properties: {
    filename: {
      type: "string",
      indexed: true
    },
    fileuri: {
      type: "string",
      indexed: true
    },
    markedTimestamp: {
      type: "int",
      indexed: true
    },
    shouldStore: "bool"
  },
  primaryKey: "markedTimestamp",
};

export {MarkedFilesSchema}

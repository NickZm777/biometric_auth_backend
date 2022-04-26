const { v4: uuidv4 } = require("uuid");

const generateServerMakeCredRequest2 = (username, displayName, id) => {
  return {
    // challenge: randomBase64URLBuffer(32),
    // challenge: "randomchallengefromgenerateServerMakeCredRequest",
    challenge: uuidv4(),

    rp: { name: "Test TouchID" },

    user: {
      id: id,
      name: username,
      displayName: displayName,
    },

    pubKeyCredParams: [
      {
        type: "public-key",
        alg: -7,
      },
    ],

    authenticatorSelectionCriteria: {
      attachment: "platform",
      userVerification: "required",
    },
    attestation: "direct",
  };
};

module.exports = generateServerMakeCredRequest2;

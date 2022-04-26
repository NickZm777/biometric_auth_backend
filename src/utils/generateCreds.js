const { v4: uuidv4 } = require("uuid")

const generateServerMakeCredRequest = (username, displayName, id) => {
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
    // authenticatorSelection: {
    //   authenticatorAttachment: "platform",
    //   userVerification: "required",
    // },
    authenticatorSelectionCriteria: {
      attachment: "platform",
      userVerification: "required",
    },
    attestation: "direct",
  }
}

module.exports = generateServerMakeCredRequest

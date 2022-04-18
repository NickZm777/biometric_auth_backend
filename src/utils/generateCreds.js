const generateServerMakeCredRequest = (username, displayName, id) => {
  return {
    // challenge: randomBase64URLBuffer(32),
    challenge: "randomchallengefromgenerateServerMakeCredRequest",

    rp: { name: "My test TouchID" },

    user: {
      id: id,
      name: username,
      displayName: displayName,
    },

    pubKeyCredParams: [
      {
        type: "public-key",
        alg: -7, // "ES256" IANA COSE Algorithms registry
        transports: ["internal"],
      },
    ],
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required",
    },
  }
}

module.exports = generateServerMakeCredRequest

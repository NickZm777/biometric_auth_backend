const generateVerificationCreds = (publicKey) => {
  return {
    // challenge: randomBase64URLBuffer(32),
    //   rp: { name: "My test TouchID" },
    // challenge: base64urlDecode(challenge),
    challenge: "randomchallengefromgenerateServerVerificationCredRequest",
    rpId: "domain",
    allowCredentials: [
      {
        type: "public-key",
        // id: base64urlDecode(publicKey),
        id: publicKey,
        // transports: ["internal"],
      },
    ],
    userVerification: "required",
    //   authenticatorSelection: {
    //     authenticatorAttachment: "platform",
    //     userVerification: "required",
    //   },
  }
}

module.exports = generateVerificationCreds

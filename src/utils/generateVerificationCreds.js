const generateVerificationCreds = (publicKey) => {
  return {
    challenge: "randomchallengefromgenerateServerVerificationCredRequest",
    rpId: "domain",
    allowCredentials: [
      {
        type: "public-key",
        id: publicKey,
        transports: ["internal"],
      },
    ],
    userVerification: "required",
    attestation: "direct",
  }
}

module.exports = generateVerificationCreds

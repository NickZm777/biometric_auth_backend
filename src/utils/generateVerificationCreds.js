const { v4: uuidv4 } = require("uuid")

const generateVerificationCreds = (publicKey) => {
  return {
    challenge: uuidv4(),
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

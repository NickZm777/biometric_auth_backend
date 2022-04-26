const { v4: uuidv4 } = require("uuid");

const generateVerificationCreds2 = (publicKey) => {
  return {
    // challenge: "randomchallengefromgenerateServerVerificationCredRequest",
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
  };
};

module.exports = generateVerificationCreds2;

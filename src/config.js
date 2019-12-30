const dev = {
  STRIPE_KEY: "pk_test_LFPfy75whPn43YMRCOZ1WHH2",
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://bf7zlf90i8.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_FBe22yOil",
    APP_CLIENT_ID: "6qlm7a8f4nd99h2d9teb0um3gt",
    IDENTITY_POOL_ID: "us-east-1:79af84b3-12c1-46b5-839a-a4f865f3716c"
  }
};

const prod = {
  STRIPE_KEY: "",
  apiGateway: {
    REGION: "us-east-1",
    URL: ""
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "",
    APP_CLIENT_ID: "",
    IDENTITY_POOL_ID: ""
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};


const dev = {
  STRIPE_KEY: "pk_test_LFPfy75whPn43YMRCOZ1WHH2",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-107auotmz1bt2"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://2lr3yuor68.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_IJBNPQtVl",
    APP_CLIENT_ID: "7ahdhpe0t04vl7hcmup2ofbl24",
    IDENTITY_POOL_ID: "us-east-1:892a23fc-ad50-481a-b0ec-3fb2a8538294"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_LFPfy75whPn43YMRCOZ1WHH2",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-serverlessdeploymentbucket-1srafhlh0952k"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://q38wtalnh2.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_99lTbSqDI",
    APP_CLIENT_ID: "28kjtqrds07kmd2s6kuu48s8ho",
    IDENTITY_POOL_ID: "us-east-1:6708f72b-3869-4d40-bf7e-acedc80b32f5"
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
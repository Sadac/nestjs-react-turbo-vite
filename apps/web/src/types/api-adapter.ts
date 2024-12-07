export type Login = {
  request: {
    email: string;
    password: string;
  };
  response: {
    success: boolean;
  };
};

export type Logout = {
  request: {
    userId: string;
  };
  response: {
    success: boolean;
  };
};

export type Register = {
  request: {
    email: string;
    confirmEmail: string;
    password: string;
  };
};

export type Status = {
  request: {};
  response: {
    authenticated: boolean;
  };
};

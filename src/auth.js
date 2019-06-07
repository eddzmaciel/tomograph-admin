import feathers from './feathers';

export default {
  authenticate: async () => {
    let token = await feathers.passport.getJWT();
    let authenticated = await feathers.authenticate({
      strategy: 'jwt',
      accessToken: token
    });
    let payload = await feathers.passport.verifyJWT(authenticated.accessToken);
    let user = await feathers.service('users').get(payload.userId);
    feathers.set('user', user);

    console.log('authenticated', authenticated, user);
  },
  login: async (email, password) => {
    let authenticated = await feathers.authenticate({
      strategy: 'local',
      email: email,
      password: password
    });
    let payload = await feathers.passport.verifyJWT(authenticated.accessToken);
    let user = await feathers.service('users').get(payload.userId);
    feathers.set('user', user);
    // window.location.href = '/';
    // this.props.history.push("/");
    console.log('Login', authenticated, user);
  },
  logout: async () => {
    let logout = await feathers.logout();
    console.log('Logout', logout);
    // window.location.href = '/';
  }
};

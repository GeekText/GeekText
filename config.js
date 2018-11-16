const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export default{
  mongodbUri: 'mongodb://lperr027:password2018@ds251022.mlab.com:51022/geektext',
  port: env.PORT || 8080,
  expireTime: 24 * 60 * 10,
  secrets:{
    jwt: env.JWT || 'gumball'
  },
  usersObjectId: '5b5c709daf2fe1c0fe9acd8c',
  username: ''
};

import User from "../models";
import admin from "../../Firebase-admin/admin";

module.exports = {
  Query: {
    //contextを使うには{}を引数に必要
    async allUsers(_: any, {}) {
      try {
        const users = await User.find();
        return users;
      } catch (err: any) {
        console.log(err.message);
      }
    },
  },
  
  Mutation: {
    async SignIn(_: any, { inputUser: { email } }: any, context: any) {
      await admin
        .auth()
        .verifyIdToken(context.AuthContext)
        .then(async (user) => {
          const _id = user.uid;
          console.log(_id);
          const existUser = await User.findById(_id);
          if (existUser) {
            console.log("exist");
            return null;
          }
          try {
            return null; //user;
          } catch (err: any) {
            console.log(err.message);
          }
        })
        .catch(() => console.log("error"));
    },
    async Login(_: any, { props }: any, context: any) {
      await admin
        .auth()
        .verifyIdToken(context.AuthContext)
        .then(async (user) => {
          const _id = user.uid;
          const email = user.email;
          //tryのcatchにawaitのrejectは入らない
          const existUser = await User.findById(_id).catch(() =>
            console.log("catch error")
          );
          if (existUser) {
            console.log("exist");
            return null;
          }
          try {
            console.log("register usr");
            const newUser = new User({
              _id,
              email,
            });
            const user = newUser.save();
            return null; //user;
          } catch (err: any) {
            console.log(err.message);
          }
        })
        .catch(() => console.log("error"));
    },
  },
  /*
  User: {
    __resolveReference(user: any) {
      //参照される関数に入る引数が返される
      return User.find((u) => u.id === user.id);
    },
  },
  */
  //Graphにuserを追加する
  Graph: {
    user(props: any) {
      const user = User.findById(props.userId);
      return user;
    },
  },
};

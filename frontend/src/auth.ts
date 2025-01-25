import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

import { signInSchema } from "@/api/modules/zod";
import { getUserFromDb } from "@/utils/db";

export const { handlers, signIn, auth } = NextAuth({
  providers: [
    Credentials({
      // 您可以通过向 'credentials' 对象添加键来指定应提交哪些字段。
      // 例如域、用户名、密码、2FA 令牌等。
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password } =
            await signInSchema.parseAsync(credentials);

          // Salt 和 Hash 密码的逻辑
          // const pwHash = password;

          // 验证用户是否存在的逻辑
          user = await getUserFromDb(email, password);

          if (!user) {
            // 未找到用户，因此这是他们第一次尝试登录
            // 或者，这也是您可以进行用户注册的地方
            throw new Error("Invalid credentials.");
          }

          // return user 对象及其配置文件数据
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // 返回 'null' 以指示凭据无效
            return null;
          }
        }
      },
    }),
  ],
});

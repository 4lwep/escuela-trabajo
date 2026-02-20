import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Discord from "@auth/core/providers/discord";
import Credentials from "@auth/core/providers/credentials";
import { getUserByEmail } from "@/lib/data";

export default {
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Discord({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      async authorize(credentials) {
        console.log("AUTHORIZE");
        const user = await getUserByEmail(credentials.email);
        return user;
      },
    }),
  ],
};

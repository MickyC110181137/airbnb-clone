import { getServerSession } from "next-auth";

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import prisma from "../libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: unknown) {
    //TypeScript 預設允許 any，但 ESLint 的規則 no-explicit-any 會強制你用更嚴格的型別。
    return null;
  }
}

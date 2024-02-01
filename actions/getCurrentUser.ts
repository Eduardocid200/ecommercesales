import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        if (!currentUser) {
            return null;
        }

        // Fetch the hashed password from the currentUser object or wherever it is stored
        const hashedPassword = currentUser.hashedPassword;

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updateAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
            hashedPassword: hashedPassword,
        };
    } catch (error) {
        console.error("Error in getCurrentUser:", error);
        return null;
    }
}

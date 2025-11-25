import prisma from "../libs/prismadb";

export interface IListingsParams {
  userId?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const resolvedParams = await params;
    const { userId } = resolvedParams;

    // const { userId } = params;

    // let query: any = {};
    const query: Record<string, unknown> = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error");
  }
  // catch (error: any) {
  //     throw new Error(String(error));
  // }
}

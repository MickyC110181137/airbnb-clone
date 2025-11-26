import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import getCurrentUser from "../../../actions/getCurrentUser";

export async function DELETE(
  request: Request,
  context: { params: { listingId: string } },
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = context.params;
  if (!listingId) return NextResponse.error();

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}

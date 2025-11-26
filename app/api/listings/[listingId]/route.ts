import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import getCurrentUser from "../../../actions/getCurrentUser";

interface Iparams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  // const resolvedParams = await params; // <- 必須 await
  // const listingId = resolvedParams.listingId;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}

import { NextResponse } from "next/server";

import getCurrentUser from "../../../actions/getCurrentUser";
import prisma from "../../../libs/prismadb";

// interface IParams {
//   listingId?: string;
// }

export async function POST(
  request: Request,
  { params }: { params: Promise<{ listingId: string }> },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = await params;

  // if (!listingId || typeof listingId !== "string") {
  //   throw new Error("Invalid ID");
  // }
  // const resolvedParams = await params; // <- 必須 await
  // const listingId = resolvedParams.listingId;

  if (!listingId) return NextResponse.error();
  // 'favoriteIds' is never reassigned. Use 'const' instead.
  // let favoriteIds = [...(currentUser.favoriteIds || [])];

  const favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ listingId: string }> }, // 直接指定 string
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  //https://nextjs.org/docs/messages/sync-dynamic-apis

  // const { listingId } = params;

  // if (!listingId || typeof listingId !== "string") {
  //   throw new Error("Invalid ID");
  // }

  const { listingId } = await params;

  if (!listingId) return NextResponse.error();

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

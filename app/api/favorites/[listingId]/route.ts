import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUser";
import prisma from "../../../libs/prismadb";

export async function POST(
  request: Request,
  context: { params: { listingId: string } },
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = context.params;
  if (!listingId) return NextResponse.error();

  const favoriteIds = [...(currentUser.favoriteIds || []), listingId];

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  context: { params: { listingId: string } },
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = context.params;
  if (!listingId) return NextResponse.error();

  const favoriteIds = (currentUser.favoriteIds || []).filter(
    (id) => id !== listingId,
  );

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}

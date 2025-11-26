import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import getCurrentUser from "../../../actions/getCurrentUser";

interface Iparams {
  reservationId?: string;
}

export async function DELETE(req: Request, { params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const reservationId = params?.reservationId;

  if (!reservationId || typeof reservationId !== "string") {
    return NextResponse.json(
      { error: "Invalid reservation ID" },
      { status: 400 },
    );
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}

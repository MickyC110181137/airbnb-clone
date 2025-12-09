import React from "react";
import getListingById from "../../actions/getListingByid";
import getCurrentUser from "../../actions/getCurrentUser";

import ClientOnly from "../../component/ClientOnly";
import EmptyState from "../../component/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "../../actions/getReservation";

// 注意：params 是 Promise
interface PageProps {
  params: Promise<{
    listingId?: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const listingId = await params;
  const listing = await getListingById(listingId);
  const reservations = await getReservations(listingId);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default page;

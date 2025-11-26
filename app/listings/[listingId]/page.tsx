import React from "react";
import getListingById from "../../actions/getListingByid";
import getCurrentUser from "../../actions/getCurrentUser";

import ClientOnly from "../../component/ClientOnly";
import EmptyState from "../../component/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "../../actions/getReservation";

interface Params {
  listingId?: string;
}

interface PageProps {
  params: Params;
}
const page = async ({ params }: PageProps) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
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

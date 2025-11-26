import React from "react";
import getListingById from "../../actions/getListingByid";
import getCurrentUser from "../../actions/getCurrentUser";

import ClientOnly from "../../component/ClientOnly";
import EmptyState from "../../component/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "../../actions/getReservation";

interface PageProps {
  params: {
    listingId: string; // 可選改成必填，或使用 '?'
  };
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

import React from "react";
import getListingById from "../../actions/getListingByid";
import getCurrentUser from "../../actions/getCurrentUser";

import ClientOnly from "../../component/ClientOnly";
import EmptyState from "../../component/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
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
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;

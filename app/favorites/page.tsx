import EmptyState from '../component/EmptyState';
import ClientOnly from '../component/ClientOnly';

import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoriteClient from './FavoriteClient';

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
      </ClientOnly>
    );
  }

  if (listings.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings"
        ></EmptyState>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoriteClient
        listings={listings}
        currentUser={currentUser}
      ></FavoriteClient>
    </ClientOnly>
  );
};
export default ReservationPage;

import EmptyState from '../component/EmptyState';
import ClientOnly from '../component/ClientOnly';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservation';
import TripsClient from './TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserved any trips"
        ></EmptyState>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      ></TripsClient>
    </ClientOnly>
  );
};
export default TripsPage;

import EmptyState from '../component/EmptyState';
import ClientOnly from '../component/ClientOnly';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservation';
import ReservationClient from './ReservationClient';

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your props"
        ></EmptyState>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      ></ReservationClient>
    </ClientOnly>
  );
};
export default ReservationPage;

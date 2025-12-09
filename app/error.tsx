"use client";

import { useEffect } from "react";
import EmptyState from "./component/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh oh" subtitle="Something wrong!" />;
};

export default ErrorState;

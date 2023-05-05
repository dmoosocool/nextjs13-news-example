"use client";
import { useEffect } from "react";

interface IErrorProps {
  error: Error;
  reset: () => void;
}
export default function Error({ error, reset }: IErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

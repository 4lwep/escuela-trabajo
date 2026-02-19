"use client";
import { useState } from "react";
import { BarLoader, PulseLoader, ClipLoader } from "react-spinners";

const styles = {
  display: "block",
  margin: "0 auto",
};

export const Spinner1 = () => {
  let [loading, setLoading] = useState(true);

  return (
    <PulseLoader
      color={"currentcolor"}
      size={10}
      loading={loading}
      cssOverride={styles}
      aria-label="Loading Spinner1"
      data-testid="loader"
    />
  );
};

export const Spinner2 = () => {
  let [loading, setLoading] = useState(true);

  return (
    <BarLoader
      color={"currentcolor"}
      size={10}
      loading={loading}
      // cssOverride={styles}
      aria-label="Loading Spinner2"
      data-testid="loader"
    />
  );
};

export const Spinner3 = () => {
  let [loading, setLoading] = useState(true);

  return (
    <ClipLoader
      color={"currentcolor"}
      size={20}
      loading={loading}
      // cssOverride={styles}
      aria-label="Loading Spinner3"
      data-testid="loader"
    />
  );
};

"use client";

import React, { useState, useEffect, createContext, useMemo } from "react";
export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [settings, setSettings] = useState([]);
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        const [settingsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`),
        ]);
        
        const settingsData = await settingsRes.json();
        setCountry("America");
        setSettings(settingsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    // const fetchAllData = async () => {
    //   setLoading(true);

    //   try {
    //     const [countryRes, settingsRes] = await Promise.all([
    //       fetch("http://ip-api.com/json/"),
    //       fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`),
    //     ]);
        
    //     const countryData = await countryRes.json();
    //     console.log(countryData);
    //     const settingsData = await settingsRes.json();
    //     setCountry(countryData.country);
    //     setSettings(settingsData);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchAllData();
  }, []);

  const settingsInfo = useMemo(
    () => ({
      country,
      loading,
      settings,
    }),
    [country, loading, settings]
  );

  return (
    <SettingsContext.Provider value={settingsInfo}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

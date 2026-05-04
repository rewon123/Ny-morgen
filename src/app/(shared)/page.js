"use client";
import Accessories from "@/components/Accessories/Accessories";
import BannerFirstPage from "@/components/BannerFirstPage/BannerFirstPage";
import Compromising from "@/components/Compromising/Compromising";
import CrossbodyBags from "@/components/CrossBodyBags/CrossBodyBags";
import Forside from "@/components/Forside/Forside";
import LandingInsta from "@/components/Instagram/LandingInsta";
import SecondBanner from "@/components/SecondBanner/SecondBanner";
import SelectedFavor from "@/components/SelectedFavor/SelectedFavor";
import SelectedSuede from "@/components/SelectedSuede/SelectedSuede";
import { SettingsContext } from "@/hooks/SettingsProvider";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [best, setBest] = useState([]);
  const [promote1, setPromote1] = useState([]);
  const [promote2, setPromote2] = useState([]);
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    const fetchTopSales = async () => {
      try {
        const bestRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/top-sales`);
        const bestData = await bestRes.json();
        setBest(bestData?.products || []);
      } catch (error) {
        console.error("Error fetching top sales:", error);
        setBest([]);
      }
    };

    fetchTopSales();
  }, []);

  useEffect(() => {
    const promote1Ids = settings?.promote1?.checkedId?.length
      ? settings.promote1.checkedId.join(",")
      : null;
    const promote2Ids = settings?.promote2?.checkedId?.length
      ? settings.promote2.checkedId.join(",")
      : null;

    const fetchPromotedProducts = async () => {
      try {
        const [promote1Res, promote2Res] = await Promise.all([
          promote1Ids
            ? fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/promoted-products?ids=${promote1Ids}`
              )
            : Promise.resolve(null),
          promote2Ids
            ? fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/promoted-products?ids=${promote2Ids}`
              )
            : Promise.resolve(null),
        ]);

        const [promote1Data, promote2Data] = await Promise.all([
          promote1Res ? promote1Res.json() : Promise.resolve([]),
          promote2Res ? promote2Res.json() : Promise.resolve([]),
        ]);

        setPromote1(promote1Data || []);
        setPromote2(promote2Data || []);
      } catch (error) {
        console.error("Error fetching promoted products:", error);
        setPromote1([]);
        setPromote2([]);
      }
    };

    fetchPromotedProducts();
  }, [settings]);

  return (
    <div className="min-h-screen container mx-auto -mt-24 md:-mt-26 z-0 mb-20">
      <BannerFirstPage settings={settings} />
      <div className="text-center mt-20">
        <p className=" font-sans text-2xl">
          <b className="font-semibold"> NY MORGEN </b> STANDS FOR ELEGANCE, VERSATILITY, AND REFLECTION OF PERSONALITY.
        </p>
        <p className=" font-sans text-2xl">
          TO DESIGN NY MORGEN PRODUCTS THAT MAKE WOMEN FEEL EMPOWERED AND MEN FEEL CONFIDENT IN THEIR LIFE
        </p>
      </div>
      {promote2.length > 0 && (
        <Accessories promote2={promote2} settings={settings} />
      )}
      <Compromising />
      <SecondBanner />
      {promote1.length > 0 && (
        <SelectedSuede promote1={promote1} settings={settings} />
      )}
      <CrossbodyBags />
      <Forside />
      {best.length > 0 && <SelectedFavor best={best} settings={settings} />}
      <LandingInsta />
    </div>
  );
}

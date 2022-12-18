import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { Areas, Genders } from "..";
import { TreeService } from "../client/Tree";
import GenericDataList from "../components/trees/GenericDataList";

const Home: NextPage = () => {
  const [areas, setAreas] = useState<Areas>({
    areas: null,
    loading: false,
    error: null,
  });

  const [genders, setGenders] = useState<Genders>({
    genders: null,
    loading: false,
    error: null,
  });

  const fetchAreas = async () => {
    setAreas((state) => ({ ...state, loading: true, error: null }));
    try {
      const areas = await TreeService.getAreaWithCount();
      setAreas((state) => ({ ...state, areas, loading: false }));
    } catch (error: any) {
      if (error.message) {
        setAreas((state) => ({
          ...state,
          loading: false,
          error: error.message,
        }));
      } else {
        setAreas((state) => ({
          ...state,
          loading: false,
          error: "An error occured",
        }));
      }
    }
  };

  const fetchGenders = async () => {
    setGenders((state) => ({ ...state, loading: true, error: null }));
    try {
      const genders = await TreeService.getGenderWithCount();
      setGenders((state) => ({ ...state, genders, loading: false }));
    } catch (error: any) {
      if (error.message) {
        setGenders((state) => ({
          ...state,
          loading: false,
          error: error.message,
        }));
      } else {
        setGenders((state) => ({
          ...state,
          loading: false,
          error: "An error occured",
        }));
      }
    }
  };

  useEffect(() => {
    fetchAreas();
    fetchGenders();
  }, []);

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex items-start justify-around">
      <div className="">
        <GenericDataList
          title="Areas"
          description="A list of all Paris areas with the number of trees in each area."
          data={areas.areas}
          fetch={fetchAreas}
          error={areas.error}
          loading={areas.loading}
        />
      </div>
      <div className="">
        <GenericDataList
          title="Genders"
          description="A list of all Paris' tree's genders with the number of trees for each gender."
          data={genders.genders}
          fetch={fetchGenders}
          error={genders.error}
          loading={genders.loading}
        />
      </div>
    </div>
  );
};

export default Home;

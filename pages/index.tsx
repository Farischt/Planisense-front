import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { GenderWithCount } from "..";
import { TreeService } from "../client/Tree";
import AreaList from "../components/trees/AreaList";

type Genders = {
  genders: GenderWithCount[] | null;
  loading: boolean;
  error: string | null;
};

const Home: NextPage = () => {
  const [genders, setGenders] = useState<Genders>({
    genders: null,
    loading: false,
    error: null,
  });

  const fetchGenders = async () => {
    setGenders((state) => ({ ...state, loading: true, error: null }));
    try {
      const genders = await TreeService.getGenderWithCount();
      setGenders((state) => ({ ...state, genders, loading: false }));
    } catch (error: any) {
      setGenders((state) => ({
        ...state,
        loading: false,
        error: error.message,
      }));
    }
  };

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex items-start justify-around">
      <div className="">
        <AreaList />
      </div>
      <div className="">
        <AreaList />
        {/* <button onClick={fetchGenders}>Refresh Genders</button>
        {genders.loading && <p>Loading...</p>}
        {genders.error && <p>{genders.error}</p>}
        {genders.genders && (
          <ul>
            {genders.genders.map((gender) => (
              <li key={gender.gender}>
                <p>{gender.gender}</p>
                <p>{gender._count._all}</p>
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
};

export default Home;

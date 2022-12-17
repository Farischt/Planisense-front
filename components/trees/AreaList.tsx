import { useEffect, useState } from "react";
import { AreaWithCount } from "../..";
import { TreeService } from "../../client/Tree";

type Areas = {
  areas: AreaWithCount[] | null;
  loading: boolean;
  error: string | null;
};

const AreaList: React.FC = () => {
  const [areas, setAreas] = useState<Areas>({
    areas: null,
    loading: false,
    error: null,
  });

  const fetchAreas = async () => {
    setAreas((state) => ({ ...state, loading: true, error: null }));
    try {
      const areas = await TreeService.getAreaWithCount();
      setAreas((state) => ({ ...state, areas, loading: false }));
    } catch (error: any) {
      setAreas((state) => ({ ...state, loading: false, error: error.message }));
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Areas</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all Paris areas with the number of trees in each area.
          </p>
          {areas.loading && (
            <p className="mt-2 font-bold animate-pulse text-sm text-blue-700">
              Loading...
            </p>
          )}
          {areas.error && (
            <p className="mt-2 font-bold text-sm text-red-700">{areas.error}</p>
          )}
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={fetchAreas}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Refresh data
          </button>
        </div>
      </div>

      {areas.areas && (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden max-h-[700px] overflow-y-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full relative divide-y divide-gray-300">
                  <thead className="sticky top-0 left-0 bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                      >
                        Area
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        Trees
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {areas.areas.map((area) => (
                      <tr key={area.area}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {area.area}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {area._count._all}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaList;

import Noresults from "@/components/search/no-results";
import SearchResult from "@/components/search/search-result";
import { resultData, searchHistory } from "@/lib/placeholder-data";
import { FaSearch } from "react-icons/fa";

const page = () => {
  return (
    <div className="w-full flex gap-12">
      <div className="w-[60%] flex flex-col justify-center items-start gap-10">
        <span className="text-base text-gray-700">
          {resultData.length} results found
        </span>
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          {resultData.length > 0 ? (
            resultData.map((result, idx) => {
              return <SearchResult {...result} key={idx} />;
            })
          ) : (
            <>
              <Noresults />
              <span>Try something else</span>
            </>
          )}
        </div>
      </div>
      <div className="w-[40%] h-full flex flex-col items-center justify-center gap-16">
        <span className="text-base">Search history</span>
        <div className="w-full flex h-full min-h-[50vh] flex-col p-4 items-center justify-center gap-3 shadow rounded-xl ring-1 ring-black/5 mr-3">
          {searchHistory.length > 0 ? (
            searchHistory.map((item, idx) => {
              return (
                <div
                  className="w-full flex items-center justify-between p-1 py-3 text-sm border-b"
                  key={idx}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FaSearch className="" />
                    <span>{item.content}</span>
                  </div>
                  <span className="text-gray-400">{item.searchDate}</span>
                </div>
              );
            })
          ) : (
            <span className="text-base text-gray-500 text-center">
              No history
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

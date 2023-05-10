import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PagePagination from "../utils/PagePagination";
import { status_colors } from "../../data";

const PublicSearchTable = ({ data, setCurrentPageFetch }) => {
  const { total_pages } = useSelector((state) => state.auth);

  const [totalPages, setTotalPages] = useState([]);

  useEffect(() => {
    let count = 1;
    const pages = [];

    if (total_pages) {
      for (var i = 0; i < total_pages; i++) {
        pages.push(count);
        count++;
      }

      setTotalPages(pages);
    }
  }, [total_pages]);
  console.log(data);

  return (
    <div className="flex flex-col w-full overflow-y-auto h-[90%]">
      <Fragment>
        <div class="relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 border-2 border-gray-800">
            <thead class="sticky left-0 top-0 text-sm text-gray-400 uppercase bg-gray-800">
              <tr>
                <th scope="col" className="py-3 px-6">
                  S/N
                </th>
                <th scope="col" class="py-3 px-6">
                  <div class="pl-3">DETAILS</div>
                </th>
                <th scope="col" class="py-3 px-6">
                  LOCATION
                </th>
                <th scope="col" class="py-3 px-6">
                  TYPE
                </th>
                <th scope="col" class="py-3 px-6">
                  CATEGORY
                </th>
                <th scope="col" class="py-3 px-6">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((organization, index) => (
                <tr
                  key={`${index}`}
                  className="bg-[#e7e5e3] text-left border-t dark:border-gray-300 hover:bg-[#e9e9e9] uppercase"
                >
                  <td className="pl-8 py-4 text-center whitespace-nowrap text-sm font-light text-gray-500">
                    {index + 1}
                  </td>
                  <th
                    scope="row"
                    class="flex items-center py-4 px-6 whitespace-nowrap"
                  >
                    <div class="pl-3">
                      <div class="text-base font-medium capitalize">
                        {organization.org_name}
                      </div>
                      <div class="font-normal text-gray-500 capitalize">
                        {organization.office_address}, {organization.city},{" "}
                        {organization.lga}
                      </div>
                      <div class="font-light lowercase text-amber-700 dark:hover:text-primary-2">
                        <a
                          href={`https://${organization.website}`}
                          target="_blank"
                        >
                          {organization.website}
                        </a>
                      </div>
                      {/* <div class=" E0DFDE font-normal text-gray-500">Registered on 2</div> */}
                    </div>
                  </th>
                  <td class="py-4 px-6">{organization.state}</td>
                  <td class="py-4 px-6">{organization.organization_type}</td>
                  <td class="py-4 px-6">{organization.affiliation_category}</td>
                  <td class="py-4 px-6">
                    <div class="flex items-center">
                      <div
                        class="h-2.5 w-2.5 rounded-full mr-2"
                        style={{
                          background:
                            status_colors[organization.organization_status],
                        }}
                      ></div>
                      {organization.organization_status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {(data === null || data?.length === 0) && (
              <tr className="text-center">
                <td colspan="6" className="py-[30vh] text-3xl font-medium">
                  Sorry... No Results found!
                </td>
              </tr>
            )}
          </table>
        </div>
      </Fragment>
      {data?.length > 0 && (
        <div className="mb-6">
          <PagePagination
            data={totalPages}
            setCurrentPageFetch={setCurrentPageFetch}
          />
        </div>
      )}
    </div>
  );
};

export default PublicSearchTable;

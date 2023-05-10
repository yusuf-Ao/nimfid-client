import * as React from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { cat_colors, status_colors } from "../../data";


const Marker = (options) => {
    const [marker, setMarker] = React.useState();
    const map = options.map;
    const data = options.data;

    function setColor(name) {
        return cat_colors[name]
    }

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {

        if (marker) {
            marker.setOptions(options);
        }

        if (data !== null) {
            data.forEach(element => {
                const lat = element.latitude;
                const lng = element.longitude;
                const latLng = new google.maps.LatLng(lat, lng);


                const infowindow = new google.maps.InfoWindow({
                    ariaLabel: element.org_name,
                    content: `<div
        class="uppercase block min-w-[300px] max-w-[420px] p-6 border rounded-lg shadow-md dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 font-roboto">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${element.org_name}</h5>
        <h4 class="capitalize mb-2 text-xl font-light tracking-tight text-gray-300">${element.office_address},
            ${element.city}, ${element.lga}.</h4>
        <a href="https://${element.website}" target="_blank">
            <p class="font-normal lowercase text-lg text-primary-2 dark:hover:text-primary-1">${element.website}</p>
        </a>
        <p class="font-normal text-lg text-gray-700 dark:text-gray-400">Type of Org: ${element.organization_type}</p>
        <p class="font-normal text-lg text-gray-700 dark:text-gray-400">Category: ${element.affiliation_category}</p>
        <p class="font-normal text-lg text-gray-700 dark:text-gray-400">Location: ${element.state}</p>
        <div class="flex">
            <p class="font-normal text-lg text-gray-700 dark:text-gray-400">Status: ${element.organization_status}
            <div class="h-2.5 w-2.5 rounded-full m-2 bg-[${status_colors[element.organization_status]}]"></div>
            </p>
        </div>
    </div>`,
                });

                const marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    // label: element.affiliation_category,
                    title: element.organization_type,
                    draggable: false,
                    fullscreenControl: false,
                    icon: {
                        path: faLocationDot.icon[4],
                        fillColor: setColor(element.affiliation_category),
                        fillOpacity: 1,
                        anchor: new google.maps.Point(
                            faLocationDot.icon[0] / 2, // width
                            faLocationDot.icon[1] // height
                        ),
                        strokeWeight: 0.75,
                        strokeColor: "#000000",
                        scale: 0.077,
                    },
                });

                marker.addListener("click", () => {
                    infowindow.open({
                        anchor: marker,
                        map,
                    });
                });
            });
        }


    }, [marker, options]);
    return null;
};

export default Marker
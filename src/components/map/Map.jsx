import * as React from "react";
import { createCustomEqual } from "fast-equals";

const Map = ({ onClick, onIdle, children, style, ...options }) => {
    // [START maps_react_map_component_add_map_hooks]
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();

    const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
        if (
            isLatLngLiteral(a) ||
            a instanceof google.maps.LatLng ||
            isLatLngLiteral(b) ||
            b instanceof google.maps.LatLng
        ) {
            return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
        }
        // TODO extend to other types
        // use fast-equals for other objects
        return deepEqual(a, b);
    });

    function useDeepCompareMemoize(value) {
        const ref = React.useRef();

        if (!deepCompareEqualsForMaps(value, ref.current)) {
            ref.current = value;
        }
        return ref.current;
    }

    function useDeepCompareEffectForMaps(callback, dependencies) {
        React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
    }

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);
    // [END maps_react_map_component_add_map_hooks]
    // [START maps_react_map_component_options_hook]
    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);
    // [END maps_react_map_component_options_hook]
    // [START maps_react_map_component_event_hooks]
    React.useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );
            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);
    // [END maps_react_map_component_event_hooks]
    // [START maps_react_map_component_return]
    return (
        <>
            <div ref={ref} style={style} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    // @ts-ignore
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
    // [END maps_react_map_component_return]
};

export default Map
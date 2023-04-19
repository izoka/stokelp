import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {Band} from "./CsvTable";

interface FiltersProps {
    bands: Band[]
    setFilteredBands: (bands: Band[]) => void;
}

interface Filters {
    style: string;
    origin: string;
}

const Filters: React.FC<FiltersProps> = ({ bands, setFilteredBands }: FiltersProps) => {
    const [filters, setFilters] = useState<Filters>({ style: '', origin: '' });
    const uniqueStyles = useMemo(() => {
        const styles = bands.map((band) => band.style);
        const uniqueStyles = Array.from(new Set(styles));
        return uniqueStyles
            .filter((style) => style !== null && style !== undefined)
            .sort((a, b) => a.localeCompare(b));
    }, [bands]);

    const uniqueOrigins = useMemo(() => {
        const origins = bands.map((band) => band.origin);
        const uniqueOrigins = Array.from(new Set(origins));
        return uniqueOrigins
            .filter((origin) => origin !== null && origin !== undefined)
            .sort((a, b) => a.localeCompare(b));
    }, [bands]);

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFiltersAndSort = () => {
        let newFilteredBands = bands.filter(
            (band) =>
                (filters.style === '' || band.style === filters.style) &&
                (filters.origin === '' || band.origin === filters.origin)
        );

        if (filters.origin || filters.style) {
            newFilteredBands.sort((a, b) => a.formed - b.formed);
        } else {
            newFilteredBands.sort((a, b) => {
                if (typeof a.band_name === 'string' && typeof b.band_name === 'string') {
                    return a.band_name.localeCompare(b.band_name);
                } else {
                    return 0;
                }
            });
        }

        setFilteredBands(newFilteredBands);
    };

    useEffect(() => {
        applyFiltersAndSort();
    }, [bands, filters]);

    return (
        <div className="mt-4">
            <label className="mr-2" htmlFor="style">
                Style:
            </label>
            <select
                name="style"
                id="style"
                onChange={handleFilterChange}
                className="border rounded px-2"
            >
                <option value="">All</option>
                {uniqueStyles.map((style, index) => (
                    <option key={index} value={style}>
                        {style}
                    </option>
                ))}
            </select>

            <label className="ml-4 mr-2" htmlFor="origin">
                Origin:
            </label>
            <select
                name="origin"
                id="origin"
                onChange={handleFilterChange}
                className="border rounded px-2"
            >
                <option value="">All</option>
                {uniqueOrigins.map((origin, index) => (
                    <option key={index} value={origin}>
                        {origin}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Filters;

// CsvTable.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { parse } from 'papaparse';
import Filters from "./Filters";

export interface Band {
    band_name: string;
    fans: number;
    formed: number;
    origin: string;
    split: number;
    style: string;
}

export const CsvTable: React.FC = () => {
    const [bands, setBands] = useState<Band[]>([]);
    const [filteredBands, setFilteredBands] = useState<Band[]>([]);

    const loadCsvFile = async (filename: string) => {
        const response = await fetch(filename);
        const csvData = await response.text();
        const parsedData = parse(csvData, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
        }).data as Band[];

        setBands(parsedData);
    };

    useEffect(() => {
        loadCsvFile('metal_bands_2017.csv');
    }, []);


    return (
        <div className="container mx-auto">
            {bands.length > 0 && <Filters bands={bands} setFilteredBands={setFilteredBands} />}
            <table className="table-auto mt-4 w-full">
                <thead>
                <tr>
                    <th>Band Name</th>
                    <th>Fans</th>
                    <th>Formed</th>
                    <th>Origin</th>
                    <th>Split</th>
                    <th>Style</th>
                </tr>
                </thead>
                <tbody>
                {filteredBands.map((band, index) => (
                    <tr key={index}>
                        <td>{band.band_name}</td>
                        <td>{band.fans}</td>
                        <td>{band.formed}</td>
                        <td>{band.origin}</td>
                        <td>{band.split}</td>
                        <td>{band.style}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
);
};

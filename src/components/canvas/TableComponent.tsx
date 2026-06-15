import type { CanvasComponentDefinition } from './types';
import '../../styles/components/TableComponent.css';

export const TableComponent: CanvasComponentDefinition = {
    defaultProps: {
        headers: ['Name', 'Age', 'City'],
        rows: [
            ['Alice', '30', 'New York'],
            ['Bob', '25', 'London'],
            ['Charlie', '35', 'Paris'],
        ],
    },
    render: (props) => {
        const headers: string[] = Array.isArray(props.headers) ? props.headers : [];
        const rows: string[][] = Array.isArray(props.rows) ? props.rows : [];
        return (
            <div className="canvas-cmp-table-wrapper">
                <table className="canvas-cmp-table">
                    {headers.length > 0 && (
                        <thead>
                            <tr>
                                {headers.map((h, i) => (
                                    <th key={i} className="canvas-cmp-table__th">{h}</th>
                                ))}
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {rows.map((row, ri) => (
                            <tr key={ri}>
                                {row.map((cell, ci) => (
                                    <td key={ci} className="canvas-cmp-table__td">{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    },
};

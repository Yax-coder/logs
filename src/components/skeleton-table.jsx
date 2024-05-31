import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTable = ({ rows, columns }) => {
  const skeletonRows = Array.from({ length: rows }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {Array.from({ length: columns }, (_, colIndex) => (
        <td key={colIndex}>
          <Skeleton height={20} />
        </td>
      ))}
    </tr>
  ));

  return (
    <div style={{ width: "100%", padding: "10px 0" }}>
      <table>
        <thead>
          <tr>
            {Array.from({ length: columns }, (_, index) => (
              <th key={index}>
                <Skeleton height={20} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{skeletonRows}</tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;

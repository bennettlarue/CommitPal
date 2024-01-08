import React, { useEffect, useState } from "react";
import {
    VictoryChart,
    VictoryBar,
    VictoryArea,
    VictoryAxis,
    VictoryTheme,
    VictoryLine,
    VictoryAnimation,
} from "victory";

const LineGraph = ({ data }) => {
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (data.length > 0) {
            setIsDataLoaded(true);
        }
    }, [data]);

    const chartStyles = {
        // Container styles
        container: {
            background: "#0B0835",
            padding: "5px",
            borderRadius: "0px",
        },

        // Area styles
        area: {
            data: {
                stroke: "#E5340B",
                strokeWidth: 2.4,
            },
        },

        // Axis styles
        axis: {
            axis: {
                stroke: "#FFFFFF",
                strokeWidth: 1,
            },
            tickLabels: {
                fill: "#FFFFFF",
                fontSize: 9,
                fontFamily: "Arial, sans-serif",
                angle: -40, // Rotate the tick labels by 45 degrees
                textAnchor: "end", // Align the tick labels at the end
                dy: 5, // Adjust vertical positioning of the labels
            },
        },

        // Grid styles
        grid: {
            stroke: "#000000",
            strokeWidth: 2,
        },
    };

    const getMaxCount = () => {
        // Find the maximum count value in the data array
        const counts = data.map((item) => item.count);
        return Math.max(...counts);
    };

    const maxYDomain = getMaxCount() + 1; // Adjust the padding as needed

    console.log(data);
    return (
        <div style={chartStyles.container}>
            {isDataLoaded && (
                <VictoryChart
                    height={160}
                    width={800}
                    padding={{ top: 20, bottom: 50, left: 40, right: 10 }}
                    theme={VictoryTheme.material}
                >
                    <VictoryAxis
                        style={chartStyles.axis}
                        dependentAxis
                        tickFormat={(tick) => tick} // Format y-axis ticks if needed
                        domain={[0, maxYDomain]} // Adjust the y-axis domain
                    />
                    <VictoryAxis
                        style={chartStyles.axis}
                        tickFormat={
                            data.length != 12
                                ? (date) =>
                                      new Date(date).toLocaleDateString(
                                          "en-US",
                                          {
                                              month: "short",
                                              day: "numeric",
                                          }
                                      )
                                : null
                        } // Format x-axis date labels as "MMM DD"
                    />
                    <VictoryLine
                        data={data}
                        x="date"
                        y="count"
                        interpolation={"linear"}
                        style={chartStyles.area} // Adjust area fill and stroke color
                    />
                </VictoryChart>
            )}
        </div>
    );
};

export default LineGraph;

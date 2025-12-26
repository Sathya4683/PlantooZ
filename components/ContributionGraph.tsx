// import React, { useMemo } from "react";
// import { ScrollView, View, Text, StyleSheet } from "react-native";
// import Svg, { Rect } from "react-native-svg";

// const BOX_SIZE = 12;
// const GAP = 3;
// const DAYS_IN_WEEK = 7;

// const COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

// interface ContributionGraphProps {
//   data: Record<string, number>; 
//   endDate?: Date;
//   numDays?: number;
// }

// export function ContributionGraph({ 
//   data, 
//   endDate = new Date(), 
//   numDays = 120 
// }: ContributionGraphProps) {
  
//   const gridData = useMemo(() => {
//     const grid = [];
//     const startDate = new Date(endDate);
//     startDate.setDate(endDate.getDate() - numDays);

//     const dayOfWeek = startDate.getDay(); 
//     startDate.setDate(startDate.getDate() - dayOfWeek);

//     let currentDate = new Date(startDate);

//     while (currentDate <= endDate) {
//       const dateStr = currentDate.toISOString().split("T")[0];
//       grid.push({
//         date: dateStr,
//         count: data[dateStr] || 0,
//       });
//       currentDate.setDate(currentDate.getDate() + 1);
//     }
//     return grid;
//   }, [data, endDate, numDays]);

//   const weeks = Math.ceil(gridData.length / DAYS_IN_WEEK);
//   const width = weeks * (BOX_SIZE + GAP);
//   const height = DAYS_IN_WEEK * (BOX_SIZE + GAP);

//   const getColor = (count: number) => {
//     if (count === 0) return COLORS[0];
//     if (count <= 2) return COLORS[1];
//     if (count <= 5) return COLORS[2];
//     if (count <= 9) return COLORS[3];
//     return COLORS[4];
//   };

//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
//       <Svg height={height} width={width}>
//         {gridData.map((day, index) => {
//           const col = Math.floor(index / DAYS_IN_WEEK);
//           const row = index % DAYS_IN_WEEK;
          
//           return (
//             <Rect
//               key={day.date}
//               x={col * (BOX_SIZE + GAP)}
//               y={row * (BOX_SIZE + GAP)}
//               width={BOX_SIZE}
//               height={BOX_SIZE}
//               rx={2}
//               fill={getColor(day.count)}
//             />
//           );
//         })}
//       </Svg>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 10,
//   }
// });

import React, { useMemo } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Svg, { Rect } from "react-native-svg";

const CELL = 12;
const GAP = 3;
const ROWS = 7;

const COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

const WEEKDAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface Props {
  data: Record<string, number>;
  endDate?: Date;
  numDays?: number;
}

export function ContributionGraph({
  data,
  endDate = new Date(),
  numDays = 365,
}: Props) {
  const { weeks, cells, monthLabels } = useMemo(() => {
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);

    const start = new Date(end);
    start.setDate(start.getDate() - numDays);

    const jsDay = start.getDay();
    const mondayIndex = (jsDay + 6) % 7;
    start.setDate(start.getDate() - mondayIndex);

    const cells: { date: Date; count: number }[] = [];
    const monthLabels: { x: number; label: string }[] = [];

    let cursor = new Date(start);
    let lastMonth = -1;
    let weekIndex = 0;

    while (cursor <= end) {
      const iso = cursor.toISOString().split("T")[0];
      cells.push({
        date: new Date(cursor),
        count: data[iso] || 0,
      });

      const month = cursor.getMonth();
      if (month !== lastMonth && cursor.getDate() <= 7) {
        monthLabels.push({
          x: weekIndex * (CELL + GAP),
          label: MONTHS[month],
        });
        lastMonth = month;
      }

      cursor.setDate(cursor.getDate() + 1);
      if (cells.length % ROWS === 0) {
        weekIndex++;
      }
    }

    return {
      weeks: Math.ceil(cells.length / ROWS),
      cells,
      monthLabels,
    };
  }, [data, endDate, numDays]);

  const width = weeks * (CELL + GAP);
  const height = ROWS * (CELL + GAP);

  const getColor = (count: number) => {
    if (count === 0) return COLORS[0];
    if (count <= 2) return COLORS[1];
    if (count <= 5) return COLORS[2];
    if (count <= 9) return COLORS[3];
    return COLORS[4];
  };

  return (
    <View style={styles.wrapper}>
      {/* Month labels */}
      <View style={[styles.monthRow, { width }]}>
        {monthLabels.map((m, i) => (
          <Text key={i} style={[styles.monthLabel, { left: m.x }]}>
            {m.label}
          </Text>
        ))}
      </View>

      <View style={styles.graphRow}>
        {/* Weekday labels */}
        <View style={styles.weekdayCol}>
          {WEEKDAY_LABELS.map((d, i) => (
            <Text key={i} style={styles.weekdayLabel}>
              {d}
            </Text>
          ))}
        </View>

        {/* Heatmap */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Svg width={width} height={height}>
            {cells.map((cell, i) => {
              const col = Math.floor(i / ROWS);
              const row = i % ROWS;

              return (
                <Rect
                  key={cell.date.toISOString()}
                  x={col * (CELL + GAP)}
                  y={row * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={getColor(cell.count)}
                />
              );
            })}
          </Svg>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
  },

  monthRow: {
    height: 18,
    marginLeft: 36,
    marginBottom: 4,
    position: "relative",
  },

  monthLabel: {
    position: "absolute",
    fontSize: 11,
    color: "#B7E4C7",
  },

  graphRow: {
    flexDirection: "row",
  },

  weekdayCol: {
    width: 36,
    justifyContent: "space-between",
    paddingVertical: 2,
  },

  weekdayLabel: {
    fontSize: 11,
    color: "#B7E4C7",
  },
});

import React from "react";
import { format } from "date-fns";
import { Box, Text, Icon } from "@chakra-ui/react";
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';

const numberToMoodIcon = number => {
   switch (number) {
        case 1:
        return <FaFrown />;
        case 2:
        return <FaMeh />;
        case 3:
        return <FaSmile />;
        default:
        return "-";
    }
};
const CustomTooltip = props => {
  const { active, payload } = props;
  if (active) {
    const currData = payload && payload.length ? payload[0].payload : null;
    return (
      <Box className="area-chart-tooltip" bgColor="white" opacity={0.9} p={3} borderRadius={"md"}>
        <Text>
          {currData ? format(new Date(currData.date), "yyyy-MM-dd") : " -- "}
        </Text>
        <Box>
           { numberToMoodIcon(currData ? currData.mood : "-")}
            </Box>
      </Box>
    );
  }

  return null;
};

export default CustomTooltip;

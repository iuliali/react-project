import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from "date-fns";
import CustomTooltip from './CustomTooltip';

const MoodGraph = (props) => {
    const data = props.data;

    const dateFormatter = date => {
        return format(new Date(date), "dd/MMM");
      };
    const modifiedData = data.map((entry) => {
        return {
            date: entry.date.getTime(),
            mood: entry.mood,
        };
    }).sort((a, b) => {
        return a.date - b.date;
    });

    

    const domain = modifiedData.length > 0 ? [modifiedData[0].date, modifiedData[modifiedData.length - 1].date] : [0, 0];
    console.log(modifiedData);

    return (
        <LineChart
            width={500}
            height={300}
            data={modifiedData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <XAxis dataKey="date" type="number"  tickFormatter={dateFormatter} domain={domain}/>
            <YAxis domain={[0, 3]} type= "number" dataKey={"mood"} tickCount={4}/>
            <CartesianGrid strokeDasharray="1 1" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="mood" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>

    );
};

export default MoodGraph;

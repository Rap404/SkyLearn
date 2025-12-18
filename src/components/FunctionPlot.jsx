import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const FunctionPlot = ({ fungsi, range = [-10, 10], label = "f(x)" }) => {
  const xValues = [];
  const yValues = [];

  for (let x = range[0]; x <= range[1]; x += 0.1) {
    try {
      const y = eval(fungsi.replace(/x/g, `(${x})`));
      if (isFinite(y)) {
        xValues.push(x.toFixed(2));
        yValues.push(y);
      }
    } catch {}
  }

  const data = {
    labels: xValues,
    datasets: [
      {
        label,
        data: yValues,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
};

export default FunctionPlot;

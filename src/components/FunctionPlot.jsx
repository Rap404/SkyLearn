import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { evaluate } from "mathjs";

ChartJS.register(LineElement, LinearScale, PointElement, Tooltip, Legend);

const normalizeExpression = (f) =>
  f
    .replace(/\s+/g, "")
    .replace(/(\d)x/g, "$1*x") // 5x → 5*x
    .replace(/x(\d)/g, "x*$1") // x2 → x*2
    .replace(/(\d)\(/g, "$1*(") // 2(x+1)
    .replace(/\)(\d)/g, ")*$1") // (x+1)2
    .replace(/x\(/g, "x*(") // x(x+1)
    .replace(/\)\(/g, ")*("); // (x+1)(x-1)

const FunctionPlot = ({ fungsi, range = [-10, 10], label = "f(x)" }) => {
  const points = [];
  const normalized = normalizeExpression(fungsi);

  for (let x = range[0]; x <= range[1]; x += 0.01) {
    let y;
    try {
      y = evaluate(normalized, { x });
    } catch {
      y = NaN;
    }
    points.push({ x, y: isFinite(y) ? y : null });
  }

  const data = {
    datasets: [
      {
        label,
        data: points,
        borderWidth: 2,
        pointRadius: 0,
        spanGaps: false, // PENTING: jangan sambung grafik
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "linear",
        title: { display: true, text: "x" },
      },
      y: {
        title: { display: true, text: "y" },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default FunctionPlot;

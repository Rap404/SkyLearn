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
    .replace(/(\d)x/g, "$1*x")
    .replace(/x(\d)/g, "x*$1")
    .replace(/(\d)\(/g, "$1*(")
    .replace(/\)(\d)/g, ")*$1")
    .replace(/x\(/g, "x*(")
    .replace(/\)\(/g, ")*(");

const FunctionPlot = ({ fungsi, range = [-5, 5], label = "f(x)" }) => {
  const points = [];
  const normalized = normalizeExpression(fungsi || "0");

  // Loop dengan step yang disesuaikan agar performa tetap terjaga
  for (let x = range[0]; x <= range[1]; x += 0.1) {
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
        borderColor: label.includes("'") ? "#10b981" : "#3b82f6", // Hijau jika turunan, Biru jika asli
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.3, // Membuat garis sedikit lebih mulus
        spanGaps: false,
      },
    ],
  };

const options = {
  responsive: true,
  maintainAspectRatio: true, // Ubah kembali ke true agar proporsional
  aspectRatio: 1, // Memaksa grafik berbentuk kotak (persegi) agar pas di kolom desktop
  plugins: {
    legend: { display: true }
  },
  scales: {
    x: {
      type: "linear",
      grid: { color: "rgba(0,0,0,0.05)" },
    },
    y: {
      type: "linear",
      grid: { color: "rgba(0,0,0,0.05)" },
      // Biarkan Chart.js menentukan skala otomatis agar grafik memenuhi area
    },
  },
};

return (
  <div className="w-full flex justify-center items-center p-2"> 
    <div className="w-full max-w-[350px]"> {/* Membatasi lebar agar tidak gepeng */}
      <Line data={data} options={options} />
    </div>
  </div>
);
};

export default FunctionPlot;
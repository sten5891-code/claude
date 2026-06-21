import type { SizeSpec } from "@/types";

export default function SizeTable({ chart }: { chart: SizeSpec[] }) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">사이즈 실측 (cm)</h3>
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-mist-300">
            <tr>
              <th className="px-4 py-3 text-left font-medium">사이즈</th>
              <th className="px-4 py-3 text-center font-medium">가슴단면</th>
              <th className="px-4 py-3 text-center font-medium">총장</th>
              <th className="px-4 py-3 text-center font-medium">어깨너비</th>
              <th className="px-4 py-3 text-center font-medium">소매길이</th>
            </tr>
          </thead>
          <tbody>
            {chart.map((row) => (
              <tr key={row.size} className="border-t border-white/5">
                <td className="px-4 py-3 font-medium text-drop-light">
                  {row.size}
                </td>
                <td className="px-4 py-3 text-center text-mist-200">{row.chest}</td>
                <td className="px-4 py-3 text-center text-mist-200">{row.length}</td>
                <td className="px-4 py-3 text-center text-mist-200">{row.shoulder}</td>
                <td className="px-4 py-3 text-center text-mist-200">{row.sleeve}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-mist-400">
        ※ 실측 사이즈는 측정 방법에 따라 1~3cm 오차가 있을 수 있습니다. (실제
        측정값으로 교체하세요)
      </p>
    </div>
  );
}

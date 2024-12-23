export default function Consensus() {
  return (
    <div className="w-full">
      <div className="mb-10 text-16-500">컨센서스</div>
      <div className="flex w-full justify-between gap-8 text-center text-14-500 text-gray-100">
        <div className="flex-1">
          <div className="mb-6 h-9 w-full bg-green-900" />
          <span>적극 매도</span>
        </div>
        <div className="flex-1">
          <div className="mb-6 h-9 w-full bg-green-900" />
          <span>매도</span>
        </div>
        <div className="flex-1">
          <div className="mb-6 h-9 w-full bg-green-900" />
          <span>중립</span>
        </div>
        <div className="flex-1">
          <div className="mb-6 h-9 w-full bg-green-900" />
          <span>매수</span>
        </div>
        <div className="flex-1">
          <div className="mb-6 h-9 w-full bg-green-900" />
          <span>적극 매수</span>
        </div>
      </div>
    </div>
  );
}

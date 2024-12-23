export default function TargetPrice() {
  return (
    <div>
      <div className="mt-13 text-16-500">목표주가</div>
      <div className="flex justify-between">
        <div className="text-20-700">43.90</div>
        <div className="text-12-400">
          <div>목표가범위</div>
          <div>26.00~60.00</div>
          <div className="mt-5 h-6 w-260 rounded-2 bg-green-500">
            <span className="inline-block size-16 rounded-full bg-lime-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

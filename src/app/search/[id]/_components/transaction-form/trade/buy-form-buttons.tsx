import Button from "@/components/common/button";

interface BuyFormButtonsProps {
  handleReset: () => void;
  handleSubmit: () => void;
}

export default function BuyFormButtons({
  handleReset,
  handleSubmit,
}: BuyFormButtonsProps) {
  return (
    <div className="relative top-90 w-300">
      <Button variant="outline-gray" onClick={handleReset}>
        초기화
      </Button>
      <Button variant="red" className="ml-8 w-160" onClick={handleSubmit}>
        매수
      </Button>
    </div>
  );
}

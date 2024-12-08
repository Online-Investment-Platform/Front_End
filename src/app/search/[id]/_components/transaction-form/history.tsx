import TransactionTable from "./transaction-table";

export default function History() {
  return (
    <div className="flex h-500 flex-col gap-20 overflow-auto">
      <TransactionTable
        color="green"
        isSubmit={false}
        submittedData={{
          stockName: "어쩔",
          count: 5,
          bidding: 5,
          totalAmount: 12342341,
        }}
      />
      <TransactionTable
        color="red"
        isSubmit={false}
        submittedData={{
          stockName: "어쩔",
          count: 5,
          bidding: 5,
          totalAmount: 12342341,
        }}
      />
      <TransactionTable
        color="blue"
        isSubmit={false}
        submittedData={{
          stockName: "어쩔",
          count: 5,
          bidding: 5,
          totalAmount: 12342341,
        }}
      />
    </div>
  );
}

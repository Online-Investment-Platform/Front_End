import TransactionTable from "./transaction-table";

export default function EditCancel() {
  return (
    <div>
      <TransactionTable
        color="green"
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

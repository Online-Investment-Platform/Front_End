import TransactionTable from "./transaction-table";

export default function History() {
  return (
    <div className="flex h-500 flex-col gap-20 overflow-auto">
      <TransactionTable color="green" isSubmit={false} />
      <TransactionTable color="red" isSubmit={false} />
      <TransactionTable color="blue" isSubmit={false} />
    </div>
  );
}

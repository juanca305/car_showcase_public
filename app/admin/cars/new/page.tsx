// app/admin/cars/new/page.tsx
import AddCarForm from "../../components/AddCarForm";

export default function NewCarPage() {
  return (
    <main className="pt-[96px]">
      <section className="max-width padding-x padding-y">
        <h1 className="text-2xl font-bold text-white mb-6">
          Add New Car
        </h1>

        <AddCarForm />
      </section>
    </main>
  );
}

import Filters from "@/components/shop/Filters";
import MobileFilter from "@/components/shop/MobileFilter";
import FilterContextProvider from "@/context/FilterContext";
import { getOccasions, getRecipients } from "@/lib/data/getData";

export default async function ShopLayout({ children }) {
  const occasions = await getOccasions();
  const recipients = await getRecipients();
  return (
    <FilterContextProvider>
      <div className="mt-10">
        {/* Mobile filter dialog */}

        <MobileFilter occasions={occasions} recipients={recipients} />

        <main className="flex lg:flex-row-reverse gap-x-8 w-full">
          {/* Header and Product grid */}
          <div className="w-full">{children}</div>

          {/* Filters */}
          <div className="hidden lg:block lg:w-1/4 mt-8">
            <Filters occasions={occasions} recipients={recipients} />
          </div>
        </main>
      </div>
    </FilterContextProvider>
  );
}

import ProductFilter from "@/components/shopping-view/filter";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";

function ShoppingListing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex item-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground"> 10 Products</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <ArrowUpDown />
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;

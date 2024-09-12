import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal,  Sliders } from "lucide-react";  // Import the Plus icon
import StockForm from "../inventory/stockForm";

interface InventoryItem {
  name: string;
  stock: number;
  price: string;
  expirationDate: string;
}

interface InventoryTableProps {
  inventory: InventoryItem[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventory }) => {
  const [filter, setFilter] = React.useState<string | null>(null);

  const getStatus = (stock: number) => {
    if (stock === 0) return { text: "Out of Stock", color: "bg-red-500" };
    if (stock < 50) return { text: "Low Stock", color: "bg-yellow-500" };
    return { text: "In Stock", color: "bg-green-500" };
  };

  const filteredInventory = inventory.filter((item) => {
    const status = getStatus(item.stock).text;
    return filter ? status === filter : true;
  });

  return (
    <Card className="bg-indigo-50/5">
      <CardHeader>
        <CardTitle>Medicines & Equipment</CardTitle>
        <CardDescription>
          Manage your inventory of medicines and equipment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div>
            <Dialog>
              <DialogTrigger asChild>
               <StockForm onAddStock={function (_newStock: { name: string; stock: number; price: string; expirationDate: string | null; category: string; }): void {
                  throw new Error("Function not implemented.");
                } }/>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Inventory Item</DialogTitle>
                </DialogHeader>
                {/* Leave space for your component here */}
                <div className="space-y-4">
                
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center">
            <Sliders className="mr-2" /> {/* Filter icon */}
            <label htmlFor="stockFilter" className="mr-2">
              Filter by Status:
            </label>
            <select
              id="stockFilter"
              value={filter || ""}
              onChange={(e) => setFilter(e.target.value || null)}
              className="border rounded px-2 py-1"
            >
              <option value="">All</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Total Stock</TableHead>
              <TableHead className="hidden md:table-cell">Expiration Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatus(item.stock).color} text-white`}>
                      {getStatus(item.stock).text}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.price}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.stock}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.expirationDate}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          Showing <strong>{filteredInventory.length}</strong> of{" "}
          <strong>{inventory.length}</strong> items
        </div>
      </CardFooter>
    </Card>
  );
};

export default InventoryTable;
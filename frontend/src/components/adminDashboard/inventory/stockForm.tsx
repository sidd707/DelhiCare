import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StockFormProps {
  onAddStock: (newStock: {
    name: string;
    stock: number;
    price: string;
    expirationDate: string | null;
    category: string;
  }) => void;
}

const StockForm: React.FC<StockFormProps> = ({ onAddStock }) => {
  const [category, setCategory] = useState<string>('medicines');
  const [name, setName] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newStock = {
      name,
      stock: Number(stock),
      price,
      expirationDate: category === 'medicines' ? expirationDate : null,
      category,
    };

    onAddStock(newStock);

    // Clear the form fields
    setName('');
    setStock('');
    setPrice('');
    setExpirationDate('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Stock</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Stock Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            >
              <option value="medicines">Medicines</option>
              <option value="consumables">Consumables</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="stock">Stock Amount</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full"
            />
          </div>
          {category === 'medicines' && (
            <div>
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input
                id="expirationDate"
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required={category === 'medicines'}
                className="w-full"
              />
            </div>
          )}
          <Button type="submit" className="mt-4">Add Stock</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StockForm;
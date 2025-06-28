import { Button } from "../ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

function AdminBrandTile({
  brand,
  setFormData,
  setOpenCreateBrandDialog,
  setCurrentEditedId,
  handleDelete,
  counter,
}) {
  return (
    <TableRow>
      <TableCell>{counter}</TableCell>
      <TableCell>{brand.title}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            setOpenCreateBrandDialog(true);
            setCurrentEditedId(brand?._id);
            setFormData(brand);
          }}
          className="mr-5"
        >
          Edit
        </Button>
        <Button onClick={() => handleDelete(brand?._id)}>Delete</Button>
      </TableCell>
    </TableRow>
  );
}

export default AdminBrandTile;

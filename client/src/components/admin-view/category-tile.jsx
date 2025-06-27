import { Button } from "../ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

function AdminCategoryTile({
  category,
  setFormData,
  setOpenCreateCategoryDialog,
  setCurrentEditedId,
  handleDelete,
  counter,
}) {
  console.log(category);
  return (
    <TableRow>
      <TableCell>{counter}</TableCell>
      <TableCell>{category.title}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            setOpenCreateCategoryDialog(true);
            setCurrentEditedId(category?._id);
            setFormData(category);
          }}
          className="mr-5"
        >
          Edit
        </Button>
        <Button onClick={() => handleDelete(category?._id)}>Delete</Button>
      </TableCell>
    </TableRow>
  );
}

export default AdminCategoryTile;

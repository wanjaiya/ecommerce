import AdminCategoryTile from "@/components/admin-view/category-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addCategoryFormElements } from "@/config";
import {
  addNewCategory,
  deleteCategory,
  editCategory,
  fetchAllCategories,
} from "@/store/admin/category-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { toast } from "sonner";

const initialFormData = {
  title: "",
};

function AdminCategories() {
  const [openCreateCategoryDialog, setOpenCreateCategoryDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { categoryList } = useSelector((state) => state.adminCategories);
  let counter = 1;

  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editCategory({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            dispatch(fetchAllCategories());
            setFormData(initialFormData);
            setOpenCreateCategoryDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewCategory({
            ...formData,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllCategories());
            setOpenCreateCategoryDialog(false);
            setFormData(initialFormData);
            toast("Product added successfully");
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteCategory(getCurrentProductId)).then((data) => {
      if (data?.payload.success) {
        dispatch(fetchAllCategories());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateCategoryDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div>
        {categoryList && categoryList.length > 0 ? (
          <div className="rounded-md border">
            <Table className="w-full max-wsm mx-auto pt-0">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryList.map((categoryItem) => (
                  <AdminCategoryTile
                    category={categoryItem}
                    setCurrentEditedId={setCurrentEditedId}
                    setOpenCreateCategoryDialog={setOpenCreateCategoryDialog}
                    setFormData={setFormData}
                    handleDelete={handleDelete}
                    counter={counter++}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        ) : null}
      </div>

      <Sheet
        open={openCreateCategoryDialog}
        onOpenChange={() => {
          setOpenCreateCategoryDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto px-4">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <div className="py-6">
            <CommonForm
              formControls={addCategoryFormElements}
              buttonText={
                currentEditedId !== null ? "Edit Product" : "Add Product"
              }
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminCategories;

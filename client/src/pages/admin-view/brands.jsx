import AdminBrandTile from "@/components/admin-view/brand-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addBrandFormElements } from "@/config";
import {
  addNewBrand,
  deleteBrand,
  editBrand,
  fetchAllBrands,
} from "@/store/admin/brand-slice";
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

function AdminBrands() {
  const [openCreateBrandDialog, setOpenCreateBrandDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { brandList } = useSelector((state) => state.adminBrands);
  let counter = 1;

  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editBrand({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            dispatch(fetchAllBrands());
            setFormData(initialFormData);
            setOpenCreateBrandDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewBrand({
            ...formData,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllBrands());
            setOpenCreateBrandDialog(false);
            setFormData(initialFormData);
            toast("Brand added successfully");
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteBrand(getCurrentProductId)).then((data) => {
      if (data?.payload.success) {
        dispatch(fetchAllBrands());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [dispatch]);

  console.log(brandList);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateBrandDialog(true)}>
          Add New Brand
        </Button>
      </div>
      <div>
        {brandList && brandList.length > 0 ? (
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
                {brandList.map((brandItem) => (
                  <AdminBrandTile
                    brand={brandItem}
                    setCurrentEditedId={setCurrentEditedId}
                    setOpenCreateBrandDialog={setOpenCreateBrandDialog}
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
        open={openCreateBrandDialog}
        onOpenChange={() => {
          setOpenCreateBrandDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto px-4">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Brand" : "Add New Brand"}
            </SheetTitle>
          </SheetHeader>

          <div className="py-6">
            <CommonForm
              formControls={addBrandFormElements}
              buttonText={currentEditedId !== null ? "Edit Brand" : "Add Brand"}
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

export default AdminBrands;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import Loader from "@/components/dashboard/Loader";
import Image from "next/image";
import { getAllservicesByProvider } from "@/action/admin/getAllservicesByProvider";
import { getAllCategories } from "@/action/provider/getAllCategories";
import { createServiceProvider } from "@/action/provider/createServiceProvider";
import { updateServiceProvider } from "@/action/provider/updateServiceProvider";
import { deleteServiceProvider } from "@/action/provider/deleteServiceProvider";


type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string | null;
  location?: string;
  availability?: boolean;
  category: Category;
  createdAt: string;
};

type ServiceInput = {
  title: string;
  description: string;
  price: number | string;
  image?: string | null;
  location?: string;
  availability?: boolean;
  category: { id: string };
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<ServiceInput>({
    title: "",
    description: "",
    price: "0",
    image: "",
    location: "",
    availability: true,
    category: { id: "" },
  });

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [servicesRes, categoriesData] = await Promise.all([
        getAllservicesByProvider(),
        getAllCategories(),
      ]);
      setServices(servicesRes.data || []);
      setCategories(categoriesData || []);
    } catch (err) {
      toast.error("Failed to fetch data ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, image: data.secure_url }));
        setPreview(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleAddService = async () => {
    const price = parseFloat(formData.price as string);
    if (!formData.title || !formData.category.id || price <= 0) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      await createServiceProvider({ ...formData, price });
      toast.success("Service added successfully");
      setIsAddDialogOpen(false);
      resetForm();
      fetchData();
    } catch (err) {
      toast.error("Failed to add service ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditService = async () => {
    if (!selectedService) return;
    const price = parseFloat(formData.price as string);
    if (!formData.title || !formData.category.id || price <= 0) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      await updateServiceProvider(selectedService.id, { ...formData, price });
      toast.success("Service updated successfully");
      setIsEditDialogOpen(false);
      setSelectedService(null);
      resetForm();
      fetchData();
    } catch (err) {
      toast.error("Failed to update service ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteService = async () => {
    if (!selectedService) return;
    setSubmitting(true);
    try {
      await deleteServiceProvider(selectedService.id);
      toast.success("Service deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedService(null);
      fetchData();
    } catch (err) {
      toast.error("Failed to delete service ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const openEditDialog = (service: Service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      image: service.image || null,
      location: service.location || "",
      availability: service.availability ?? true,
      category: { id: service.category.id },
    });
    setPreview(service.image || null);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (service: Service) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "0",
      image: "",
      location: "",
      availability: true,
      category: { id: "" },
    });
    setPreview(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full relative">
      <Toaster position="top-right" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-5">
        <h1 className="lg:text-3xl md:lg:text-3xl text-2xl font-bold text-[#FF833B] mb-4">
          Services Management
        </h1>
        <Button
          onClick={() => {
            resetForm();
            setIsAddDialogOpen(true);
          }}
          className="bg-[#FF833B] hover:bg-[#ff6f1f] w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60 sm:h-80">
          <Loader />
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg shadow-sm">
          <Table className="min-w-250 w-full">
            <TableHeader>
              <TableRow className="bg-[#FF833B] text-white">
                <TableHead>No</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service, index) => (
                <TableRow key={service.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{service.title}</TableCell>
                  <TableCell>{service.category.name}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>{service.location || "N/A"}</TableCell>
                  <TableCell>{service.availability ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(service)}
                      >
                        <Pencil className="h-3 w-3 sm:mr-1" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteDialog(service)}
                      >
                        <Trash2 className="h-3 w-3 sm:mr-1" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {(isAddDialogOpen || isEditDialogOpen) && (
        <div className="fixed inset-0 z-50 p-4 flex items-start sm:items-center justify-center bg-black/50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 w-[85vw] sm:w-150 max-h-[90vh] rounded-3xl shadow-lg flex flex-col">
            <div className="px-4 sm:px-6 py-2 flex justify-end items-center rounded-t-3xl">
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() =>
                  isAddDialogOpen
                    ? setIsAddDialogOpen(false)
                    : setIsEditDialogOpen(false)
                }
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <h2 className="text-lg sm:text-xl text-center font-semibold">
                {isAddDialogOpen ? "Add New Service" : "Edit Service"}
              </h2>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category?.id || ""}
                    onValueChange={(id) =>
                      setFormData({ ...formData, category: { id } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={formData.availability ? "true" : "false"}
                    onValueChange={(v) =>
                      setFormData({ ...formData, availability: v === "true" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading || submitting}
                  />
                  {preview && (
                    <div className="flex justify-center mt-2">
                      <Image src={preview} alt="Preview" width={96} height={96} />
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-4 border-t flex justify-end">
              <Button
                variant="outline"
                onClick={() =>
                  isAddDialogOpen
                    ? setIsAddDialogOpen(false)
                    : setIsEditDialogOpen(false)
                }
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                onClick={isAddDialogOpen ? handleAddService : handleEditService}
                disabled={submitting || uploading}
                className="bg-[#FF833B] hover:bg-[#ff6f1f] ml-2"
              >
                {submitting
                  ? isAddDialogOpen
                    ? "Adding..."
                    : "Updating..."
                  : isAddDialogOpen
                  ? "Add Service"
                  : "Update Service"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="w-2xl sm:max-w-106.25">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete{" "}
              <strong>{selectedService?.title}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteService}
              disabled={submitting}
              className="bg-red-600"
            >
              {submitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Category, Service } from "@/types/service.type";

interface Props {
  services: Service[];
  categories: Category[];
}

export default function Card({ services, categories }: Props) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("100000");

  // modal
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const itemsPerPage = 9;

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const categoryMatch =
        activeTab === "All" || service.category?.name === activeTab;

      const priceMatch =
        service.price >= Number(minPrice || 0) &&
        service.price <= Number(maxPrice || Infinity);

      const searchMatch = service.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });
  }, [services, activeTab, minPrice, maxPrice, searchTerm]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentServices = filteredServices.slice(indexOfFirst, indexOfLast);

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <section className="mx-auto w-11/12 mt-10 rounded-[25px] py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center items-center">
          <input
            type="text"
            placeholder="Search service..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 w-48 border rounded"
          />

          {["All", ...(categories?.map((cat) => cat.name) || [])].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#5ce1e6] text-white"
                  : "bg-[#FFFBF5] border border-[#211F1A] text-[#21201B] hover:border-[#5ce1e6]"
              }`}
            >
              {tab}
            </button>
          ))}

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Min ৳"
              className="w-20 border rounded px-2 py-1"
            />

            <span className="text-gray-500">-</span>

            <input
              type="number"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Max ৳"
              className="w-20 border rounded px-2 py-1"
            />
          </div>
        </div>

        {/* Services Grid */}
        {currentServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentServices.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group bg-white rounded-2xl overflow-hidden duration-300 shadow hover:bg-[#F7F2E9] hover:shadow-xl cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden pt-3 px-3">
                  {service.image ? (
                    <Image
                      src={
                        service.image.startsWith("http")
                          ? service.image
                          : "/" + service.image
                      }
                      alt={service.title}
                      width={381}
                      height={222}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {service.description}
                  </p>

                  <p className="text-sm text-gray-600 mb-4">
                    Category: {service.category?.name || "Uncategorized"}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-[#5ce1e6] font-semibold text-lg">
                      ৳{service.price}
                    </span>

                    <span className="text-gray-500 font-medium">
                      {service.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16">
            <p className="text-lg font-semibold">
              No services found for these filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 disabled:opacity-40"
            >
              ‹
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${
                    currentPage === page
                      ? "bg-[#5ce1e6] text-white"
                      : "bg-[#FFF8F3] text-gray-800 hover:bg-[#FFE4D0]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 disabled:opacity-40"
            >
              ›
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-2xl hover:bg-gray-100"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative h-75 md:h-full min-h-87.5 bg-gray-100">
                {selectedService.image ? (
                  <Image
                    src={
                      selectedService.image.startsWith("http")
                        ? selectedService.image
                        : "/" + selectedService.image
                    }
                    alt={selectedService.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#5ce1e6]/15 text-[#5ce1e6] text-sm font-medium">
                    {selectedService.category?.name || "Service"}
                  </span>

                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedService.title}
                  </h2>

                  <p className="text-gray-600 leading-7 mb-6">
                    {selectedService.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Price</span>
                      <span className="font-semibold text-[#5ce1e6]">
                        ৳{selectedService.price}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Location</span>
                      <span className="font-medium">
                        {selectedService.location}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Availability</span>
                      <span
                        className={`font-medium ${
                          selectedService.availability
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {selectedService.availability
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Provider</span>
                      <span className="font-medium">
                        {selectedService.provider?.name || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    window.location.href = `/checkout?serviceId=${selectedService.id}`;
                  }}
                  className="w-full py-4 rounded-2xl bg-[#5ce1e6] text-white font-semibold text-lg hover:bg-[#48cfd4] transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* click outside close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setSelectedService(null)}
          />
        </div>
      )}
    </>
  );
}

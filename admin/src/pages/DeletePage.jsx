import React from "react";
import LeftBar from "../components/LeftBar";
import AddProductForm from "../components/AddProductForm";
import DeletePageComponent from "../components/DeletePageComponent";

const DeletePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <LeftBar />
      <div className="flex-grow ml-0 md:ml-56 pl-8  py-8  ">
        <DeletePageComponent/>
      </div>
    </div>
  );
};

export default DeletePage;

import React, { useEffect, useRef, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { CheckboxStates } from "../../types/all_interfaces";
import CustomCheckbox from "../../components/check_box/CustomCheckBox";
import DialogBox from "../../components/dialog_box/DialogBox";
import CaseEditColumnsDropdown from "../../components/cases_landing_page/CaseEditColumnsDropdown";

function EditColumnsGroup() {
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({
    case_title: false,
    case_number: false,
    description: false,
    priority: false,
    customer: false, 
    created_on: false,
    status: false,
    status_reason: false,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });

  // To close the dialog box
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // To handle the onchange on the checkboxes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("clicked, event:", event);
    const { name, checked } = event.target;
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [name]: checked,
    }));
  };

  // To handle the display of the dialog box
  const handleShowDialogBox = (event?: React.MouseEvent) => {
    console.log("Hey danny, event:", event);
    if (event) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      console.log("rect.left", rect.left);
      setDialogPosition({ top: rect.bottom, left: rect.left - 210 });
      setIsDialogOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    console.log("isDialogOpen", isDialogOpen);
  }, [isDialogOpen]);

  return (
    <div className="py-4 px-3">
      <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3 px-5">
        <div className="flex items-center">
          <CustomCheckbox
            width="18px"
            height="18px"
            onChange={handleCheckboxChange}
            checked={checkboxStates.case_title}
            name="case_title"
          />
          <span className="text-[#121524] text-sm ml-2 font-normal leading-5">
            Case Title
          </span>
        </div>
        <div
          className="cursor-pointer"
          ref={hamburgerRef}
          onClick={handleShowDialogBox}
        >
          <LuMenu size={24} className="text-[#6C757D]" />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3 px-5 mt-3">
        <div className="flex items-center">
          <CustomCheckbox
            width="18px"
            height="18px"
            onChange={handleCheckboxChange}
            checked={checkboxStates.case_number}
            name="case_number"
          />
          <span className="text-[#121524] text-sm ml-2 font-normal leading-5">
            Case Number
          </span>
        </div>
        <div
          className="cursor-pointer"
          ref={hamburgerRef}
          onClick={handleShowDialogBox}
        >
          <LuMenu size={24} className="text-[#6C757D]" />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3 px-5 mt-3">
        <div className="flex items-center">
          <CustomCheckbox
            width="18px"
            height="18px"
            onChange={handleCheckboxChange}
            checked={checkboxStates.description}
            name="description"
          />
          <span className="text-[#121524] text-sm ml-2 font-normal leading-5">
            Description
          </span>
        </div>
        <div
          className="cursor-pointer"
          ref={hamburgerRef}
          onClick={handleShowDialogBox}
        >
          <LuMenu size={24} className="text-[#6C757D]" />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3 px-5 mt-3">
        <div className="flex items-center">
          <CustomCheckbox
            width="18px"
            height="18px"
            onChange={handleCheckboxChange}
            checked={checkboxStates.priority}
            name="priority"
          />
          <span className="text-[#121524] text-sm ml-2 font-normal leading-5">
            Priority
          </span>
        </div>
        <div
          className="cursor-pointer"
          ref={hamburgerRef}
          onClick={handleShowDialogBox}
        >
          <LuMenu size={24} className="text-[#6C757D]" />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3 px-5 mt-3">
        <div className="flex items-center">
          <CustomCheckbox
            width="18px"
            height="18px"
            onChange={handleCheckboxChange}
            checked={checkboxStates.customer}
            name="customer"
          />
          <span className="text-[#121524] text-sm ml-2 font-normal leading-5">
            Customer
          </span>
        </div>
        <div
          className="cursor-pointer"
          ref={hamburgerRef}
          onClick={handleShowDialogBox}
        >
          <LuMenu size={24} className="text-[#6C757D]" />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3 px-5 mt-3">
        <div className="flex items-center">
          <CustomCheckbox
            width="18px"
            height="18px"
            onChange={handleCheckboxChange}
            checked={checkboxStates.created_on}
            name="created_on"
          />
          <span className="text-[#121524] text-sm ml-2 font-normal leading-5">
            Creatd On
          </span>
        </div>
        <div
          className="cursor-pointer"
          ref={hamburgerRef}
          onClick={handleShowDialogBox}
        >
          <LuMenu size={24} className="text-[#6C757D]" />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3 px-5 mt-3">
        <div className="flex items-center">
          <CustomCheckbox
            width="18px"
            height="18px"
            onChange={handleCheckboxChange}
            checked={checkboxStates.status}
            name="status"
          />
          <span className="text-[#121524] text-sm ml-2 font-normal leading-5">
            Status
          </span>
        </div>
        <div
          className="cursor-pointer"
          ref={hamburgerRef}
          onClick={handleShowDialogBox}
        >
          <LuMenu size={24} className="text-[#6C757D]" />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3 px-5 mt-3">
        <div className="flex items-center">
          <CustomCheckbox
            width="18px"
            height="18px"
            onChange={handleCheckboxChange}
            checked={checkboxStates.status_reason}
            name="status_reason"
          />
          <span className="text-[#121524] text-sm ml-2 font-normal leading-5">
            Status reason
          </span>
        </div>
        <div
          className="cursor-pointer"
          ref={hamburgerRef}
          onClick={handleShowDialogBox}
        >
          <LuMenu size={24} className="text-[#6C757D]" />
        </div>
      </div>

      {/* DIALOG BOX - DIALOG BOX - STARTS  */}
      <DialogBox
        isOpen={isDialogOpen}
        onClose={closeDialog}
        position={dialogPosition}
        element={<CaseEditColumnsDropdown setIsDialogOpen={setIsDialogOpen} />}
        dialogBoxWidth="220px"
      />
      {/* DIALOG BOX - DIALOG BOX - ENDS  */}
    </div>
  );
}

export default EditColumnsGroup;

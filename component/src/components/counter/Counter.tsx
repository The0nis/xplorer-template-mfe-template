import React, { useRef, useState } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import Card from '../card/Card';
import Table from '../table/Table';
import Tabs from '../tab/Tabs';
import Tab from '../tab/Tab';
import { RiSearch2Line } from "react-icons/ri";
import ProgressBar from '../progress/ProgressBar';
import Modal from '../modal/Modal';
import { CiCircleInfo } from "react-icons/ci";
// import ProgressBar from '../progress/ProgressBar';

const Counter: React.FC = () => {
  const headers = ['Name', 'Age', 'Email', 'Status', 'Phone', 'Address', 'City', 'State', 'Country',
    'Zip', 'Company', 'Position', 'Department', 'Start Date', 'End Date', 'Salary',
    'Manager', 'Performance', 'Bonus', 'Comments'];

  const data = [
    { Name: 'John Doe', Age: 28, Email: 'john@example.com', Status: 'Active', Phone: '123-456-7890', Address: '123 Main St', City: 'Anytown', State: 'CA', Country: 'USA', Zip: '12345', Company: 'ABC Corp', Position: 'Developer', Department: 'Engineering', "Start Date": '2020-01-01', "End Date": 'N/A', Salary: '70000', Manager: 'Alice Johnson', Performance: 'Excellent', Bonus: '5000', Comments: 'Great worker' },
    { Name: 'Jane Smith', Age: 34, Email: 'jane@example.com', Status: 'In Progress', Phone: '987-654-3210', Address: '456 Oak Ave', City: 'Othertown', State: 'NY', Country: 'USA', Zip: '67890', Company: 'XYZ Inc', Position: 'Designer', Department: 'Marketing', "Start Date": '2018-03-15', "End Date": 'N/A', Salary: '60000', Manager: 'Bob Brown', Performance: 'Good', Bonus: '4000', Comments: 'Creative' },
    { Name: 'Sam Green', Age: 45, Email: 'sam@example.com', Status: 'Inactive', Phone: '555-555-5555', Address: '789 Pine Rd', City: 'Sometown', State: 'TX', Country: 'USA', Zip: '11111', Company: 'Tech Solutions', Position: 'Manager', Department: 'Sales', "Start Date": '2015-05-20', "End Date": '2023-07-31', Salary: '80000', Manager: 'Carol White', Performance: 'Average', Bonus: '3000', Comments: 'Needs improvement' },
    { Name: 'Linda Brown', Age: 29, Email: 'linda@example.com', Status: 'Active', Phone: '111-222-3333', Address: '101 Elm St', City: 'Exampletown', State: 'FL', Country: 'USA', Zip: '22222', Company: 'Creative Agency', Position: 'Artist', Department: 'Design', "Start Date": '2021-11-11', "End Date": 'N/A', Salary: '65000', Manager: 'Daniel Blue', Performance: 'Excellent', Bonus: '4500', Comments: 'Very talented' },
    { Name: 'Michael White', Age: 32, Email: 'michael@example.com', Status: 'In Progress', Phone: '333-444-5555', Address: '202 Birch Blvd', City: 'Sampletown', State: 'NV', Country: 'USA', Zip: '33333', Company: 'HealthCare Plus', Position: 'Nurse', Department: 'Medical', "Start Date": '2019-08-01', "End Date": 'N/A', Salary: '75000', Manager: 'Emma Black', Performance: 'Good', Bonus: '3500', Comments: 'Caring' },
    { Name: 'Alice Blue', Age: 39, Email: 'alice@example.com', Status: 'Inactive', Phone: '777-888-9999', Address: '303 Cedar Cir', City: 'Testville', State: 'WA', Country: 'USA', Zip: '44444', Company: 'Finance Group', Position: 'Analyst', Department: 'Finance', "Start Date": '2016-02-29', "End Date": '2022-09-30', Salary: '90000', Manager: 'Frank Green', Performance: 'Average', Bonus: '2500', Comments: 'Dependable' },
    { Name: 'Robert Black', Age: 41, Email: 'robert@example.com', Status: 'Active', Phone: '666-777-8888', Address: '404 Spruce Ln', City: 'Newcity', State: 'OR', Country: 'USA', Zip: '55555', Company: 'Tech Innovators', Position: 'Engineer', Department: 'R&D', "Start Date": '2017-04-25', "End Date": 'N/A', Salary: '85000', Manager: 'Grace Pink', Performance: 'Excellent', Bonus: '6000', Comments: 'Innovative' },
    { Name: 'Emily Green', Age: 26, Email: 'emily@example.com', Status: 'In Progress', Phone: '444-555-6666', Address: '505 Maple Dr', City: 'Oldtown', State: 'IL', Country: 'USA', Zip: '66666', Company: 'Web Solutions', Position: 'Developer', Department: 'IT', "Start Date": '2020-07-01', "End Date": 'N/A', Salary: '72000', Manager: 'Henry Yellow', Performance: 'Good', Bonus: '4200', Comments: 'Quick learner' },
    { Name: 'David Yellow', Age: 37, Email: 'david@example.com', Status: 'Inactive', Phone: '888-999-0000', Address: '606 Willow St', City: 'Uptown', State: 'NJ', Country: 'USA', Zip: '77777', Company: 'Global Media', Position: 'Producer', Department: 'Media', "Start Date": '2014-06-15', "End Date": '2021-12-31', Salary: '95000', Manager: 'Irene Orange', Performance: 'Average', Bonus: '2800', Comments: 'Experienced' },
    { Name: 'Karen Pink', Age: 30, Email: 'karen@example.com', Status: 'Active', Phone: '000-111-2222', Address: '707 Ash Ave', City: 'Downtown', State: 'CO', Country: 'USA', Zip: '88888', Company: 'Consulting Pros', Position: 'Consultant', Department: 'Consulting', "Start Date": '2022-01-01', "End Date": 'N/A', Salary: '68000', Manager: 'Jack Brown', Performance: 'Excellent', Bonus: '4800', Comments: 'Client-focused' },
    { Name: 'Brian Orange', Age: 33, Email: 'brian@example.com', Status: 'In Progress', Phone: '222-333-4444', Address: '808 Beech Ct', City: 'Westside', State: 'MA', Country: 'USA', Zip: '99999', Company: 'Retail Experts', Position: 'Manager', Department: 'Retail', "Start Date": '2017-03-20', "End Date": 'N/A', Salary: '64000', Manager: 'Linda Purple', Performance: 'Good', Bonus: '3900', Comments: 'Good leader' },
    { Name: 'Sara Purple', Age: 40, Email: 'sara@example.com', Status: 'Inactive', Phone: '555-666-7777', Address: '909 Fir Ln', City: 'Eastside', State: 'PA', Country: 'USA', Zip: '10101', Company: 'Auto World', Position: 'Technician', Department: 'Maintenance', "Start Date": '2015-09-10', "End Date": '2023-05-20', Salary: '71000', Manager: 'James Violet', Performance: 'Average', Bonus: '2900', Comments: 'Skilled' },
    { Name: 'James Violet', Age: 29, Email: 'james@example.com', Status: 'Active', Phone: '111-222-3333', Address: '101 Elm St', City: 'Exampletown', State: 'FL', Country: 'USA', Zip: '22222', Company: 'Creative Agency', Position: 'Artist', Department: 'Design', "Start Date": '2021-11-11', "End Date": 'N/A', Salary: '65000', Manager: 'Daniel Blue', Performance: 'Excellent', Bonus: '4500', Comments: 'Very talented' },
    { Name: 'George Red', Age: 32, Email: 'george@example.com', Status: 'In Progress', Phone: '333-444-5555', Address: '202 Birch Blvd', City: 'Sampletown', State: 'NV', Country: 'USA', Zip: '33333', Company: 'HealthCare Plus', Position: 'Nurse', Department: 'Medical', "Start Date": '2019-08-01', "End Date": 'N/A', Salary: '75000', Manager: 'Emma Black', Performance: 'Good', Bonus: '3500', Comments: 'Caring' },
    { Name: 'Henry Black', Age: 39, Email: 'henry@example.com', Status: 'Inactive', Phone: '777-888-9999', Address: '303 Cedar Cir', City: 'Testville', State: 'WA', Country: 'USA', Zip: '44444', Company: 'Finance Group', Position: 'Analyst', Department: 'Finance', "Start Date": '2016-02-29', "End Date": '2022-09-30', Salary: '90000', Manager: 'Frank Green', Performance: 'Average', Bonus: '2500', Comments: 'Dependable' },
    { Name: 'Isabella White', Age: 41, Email: 'isabella@example.com', Status: 'Active', Phone: '666-777-8888', Address: '404 Spruce Ln', City: 'Newcity', State: 'OR', Country: 'USA', Zip: '55555', Company: 'Tech Innovators', Position: 'Engineer', Department: 'R&D', "Start Date": '2017-04-25', "End Date": 'N/A', Salary: '85000', Manager: 'Grace Pink', Performance: 'Excellent', Bonus: '6000', Comments: 'Innovative' },
    { Name: 'Lucas Green', Age: 26, Email: 'lucas@example.com', Status: 'In Progress', Phone: '444-555-6666', Address: '505 Maple Dr', City: 'Oldtown', State: 'IL', Country: 'USA', Zip: '66666', Company: 'Web Solutions', Position: 'Developer', Department: 'IT', "Start Date": '2020-07-01', "End Date": 'N/A', Salary: '72000', Manager: 'Henry Yellow', Performance: 'Good', Bonus: '4200', Comments: 'Quick learner' },
    { Name: 'Mia Yellow', Age: 37, Email: 'mia@example.com', Status: 'Inactive', Phone: '888-999-0000', Address: '606 Willow St', City: 'Uptown', State: 'NJ', Country: 'USA', Zip: '77777', Company: 'Global Media', Position: 'Producer', Department: 'Media', "Start Date": '2014-06-15', "End Date": '2021-12-31', Salary: '95000', Manager: 'Irene Orange', Performance: 'Average', Bonus: '2800', Comments: 'Experienced' },
    { Name: 'Noah Pink', Age: 30, Email: 'noah@example.com', Status: 'Active', Phone: '000-111-2222', Address: '707 Ash Ave', City: 'Downtown', State: 'CO', Country: 'USA', Zip: '88888', Company: 'Consulting Pros', Position: 'Consultant', Department: 'Consulting', "Start Date": '2022-01-01', "End Date": 'N/A', Salary: '68000', Manager: 'Jack Brown', Performance: 'Excellent', Bonus: '4800', Comments: 'Client-focused' },
    { Name: 'Olivia Orange', Age: 33, Email: 'olivia@example.com', Status: 'In Progress', Phone: '222-333-4444', Address: '808 Beech Ct', City: 'Westside', State: 'MA', Country: 'USA', Zip: '99999', Company: 'Retail Experts', Position: 'Manager', Department: 'Retail', "Start Date": '2017-03-20', "End Date": 'N/A', Salary: '64000', Manager: 'Linda Purple', Performance: 'Good', Bonus: '3900', Comments: 'Good leader' },
    { Name: 'Sophia Purple', Age: 40, Email: 'sophia@example.com', Status: 'Inactive', Phone: '555-666-7777', Address: '909 Fir Ln', City: 'Eastside', State: 'PA', Country: 'USA', Zip: '10101', Company: 'Auto World', Position: 'Technician', Department: 'Maintenance', "Start Date": '2015-09-10', "End Date": '2023-05-20', Salary: '71000', Manager: 'James Violet', Performance: 'Average', Bonus: '2900', Comments: 'Skilled' }
  ];

  const percentageSections = [
    { color: '#71CC98', percentage: 61 / 87 * 100 },
    { color: '#FDD757', percentage: 14 / 87 * 100 },
    { color: '#E3595D', percentage: 12 / 87 * 100 },
  ];

  const valueSections = [
    { color: '#FF9500', value: 246 },

  ];
  const valueSections1 = [
    { color: '#71CC98', value: 55 },

  ];
  const valueSections2 = [
    { color: '#004EEB', value: 424 },

  ];
  const valueSections3 = [
    { color: '#FF2E35', value: 76 },

  ];

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    console.log("Selected Value: ", event.target.value);
  };

  const handleClick = (tab1: any) => {
    console.log(tab1)
  }
  const handleRowClick = (row: any) => {
    console.log("Row clicked:", row);
  };

  // Function to determine the background color based on the value
  const getCellStyle = (key: string, value: any) => {
    if (key === 'Email') {
      return { backgroundColor: '#13D1AF1F', paddingLeft: '8px', paddingRight: '8px', borderRadius: "10px", color: "#11B89A" };
    }
    if (key === 'Status') {
      switch (value) {
        case 'Active':
          return { backgroundColor: 'green' };
        case 'Inactive':
          return { backgroundColor: 'red' };
        case 'In Progress':
          return { backgroundColor: 'yellow' };
        default:
          return {};
      }
    }
    return {};
  };

  const [isModalUnderButtonOpen, setIsModalUnderButtonOpen] = useState(false);
  const [isModalCenterOpen, setIsModalCenterOpen] = useState(false);
  const [isModalRightOpen, setIsModalRightOpen] = useState(false);
  const buttonRef1 = useRef<HTMLButtonElement>(null);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 ">
      <div className="p-4">
        <Button
          ref={buttonRef1}
          onClick={() => setIsModalUnderButtonOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Open Modal Under Button
        </Button>
        <Modal
          isOpen={isModalUnderButtonOpen}
          onClose={() => setIsModalUnderButtonOpen(false)}
          position="underButton"
          buttonRef={buttonRef1}
          height="300px"
          width="200px"
          headerText="Modal Header"
          closeXBtn={true}
        >
          <h1 className="text-xl font-bold">Under Button Modal</h1>
          <p>This modal is positioned under the button.</p>
        </Modal>

        <Button
          onClick={() => setIsModalCenterOpen(true)}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Open Modal Center
        </Button>
        <Modal
          isOpen={isModalCenterOpen}
          onClose={() => setIsModalCenterOpen(false)}
          position="center"
          height="400px"
          width="900px"
          headerText="Modal Header"
        >
          <h1 className="text-xl font-bold">Center Modal</h1>
          <p>This modal is positioned at the center of the screen.</p>
        </Modal>

        <Button
          onClick={() => setIsModalRightOpen(true)}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Open Modal Right
        </Button>
        <Modal
          isOpen={isModalRightOpen}
          onClose={() => setIsModalRightOpen(false)}
          position="right"
          height="100vh"
          width="50%"
          headerText={
            <div className='flex items-center justify-cente space-x-2'>
              <CiCircleInfo size={20} style={{ color: '#4EC3E0' }} />
              <span>Modal Header</span>
            </div>}
        >
          <h1 className="text-xl font-bold">Right Aligned Modal</h1>
          <p>This modal is aligned to the right of the screen.</p>
          <Button onClick={() => setIsModalRightOpen(false)} size={'small'}>Back</Button>
        </Modal>
      </div>
      {/* Display a message indicating this is a microfrontend */}
      <div className="text-xl font-semibold mb-4 text-blue-600">
        This is the Component microfrontend.
        <Button size={'large'}>Hello</Button>
        <div className='space-y-6'>
          <h2>Percentage-Based ProgressBar</h2>
          <ProgressBar sections={percentageSections} height="medium" />

          <h2>Value-Based ProgressBar</h2>
          <ProgressBar sections={valueSections} usePercentage={false} maxValue={801} />
          <ProgressBar sections={valueSections1} usePercentage={false} maxValue={801} />
          <ProgressBar sections={valueSections2} usePercentage={false} maxValue={801} />
          <ProgressBar sections={valueSections3} usePercentage={false} maxValue={801} />
        </div>
        <div>
          <Input
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            variant="filled"
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            error="Email is required"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            variant="outlined"
          />
          <Input
            id="search"
            type="text"
            placeholder="Search name, BVN, account number, phone number, email"
            variant="filled"
            icon={<RiSearch2Line />} // Icon to display
            iconPosition="end" // Display icon at start of input field
          />
          <div className="w-1/2 flex ">
            <span className="text-[#6C757D] text-[14px] mt-[13.5px]">Viewing data for:</span>
            <Input
              className="pt-2"
              type="select"
              options={[
                { value: "option1", label: "Past 24 hours" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
              value="option1"
              onChange={handleSelectChange} // Change event handler
            />
          </div>
        </div>
        <Card variant="small" backgroundColor="#6278FF" className='text-white'>
          <p>Small Card with Custom Background</p>
        </Card>
        <Card variant='medium'>
          <h1>Hiiiii</h1>
        </Card>
        <Card variant='large'>
          <p>hello</p>
        </Card>
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4">Reusable Table Component</h1>
        </div>
      </div>
      <div style={{ padding: '16px' }}>
        {/* Both approach works */}
        <Tabs defaultActiveTab="tab1">
          <Tab tabId="tab1" onClick={(tabId) => handleClick(tabId)}>Profile</Tab>
          <Tab tabId="tab2" onClick={(tabId) => handleClick(tabId)}>Dashboard</Tab>
          <Tab tabId="tab3" onClick={(tabId) => handleClick(tabId)}>Settings</Tab>
          <Tab tabId="tab4" onClick={(tabId) => handleClick(tabId)}>Contacts</Tab>
          <Tab tabId="tab5" onClick={(tabId) => handleClick(tabId)} className="disabled">Disabled</Tab>
        </Tabs>
        <Tabs defaultActiveTab="tab1">
          <Tab tabId="tab1" onClick={handleClick}>Profile</Tab>
          <Tab tabId="tab2" onClick={handleClick}>Dashboard</Tab>
          <Tab tabId="tab3" onClick={handleClick}>Settings</Tab>
          <Tab tabId="tab4" onClick={handleClick}>Contacts</Tab>
          <Tab tabId="tab5" onClick={handleClick} className="disabled">Disabled</Tab>
        </Tabs>
      </div>
      <div className='w-[100%]'>
        <Table
          headers={headers}
          data={data}
          itemsPerPage={5}
          showCheckbox={true}
          isVerticalDotIcon={true}
          isHavePagination={true}
          onRowClick={handleRowClick}
          getCellStyle={getCellStyle}
          title="User Information"
          withWrapper={true}
        />
        <Table headers={headers} data={data} itemsPerPage={5} showCheckbox={true} title="User Information"
          withWrapper={true} />
      </div>
    </div>
  );
};

export default Counter;

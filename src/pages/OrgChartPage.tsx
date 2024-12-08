import React from "react";
import { OrgChart } from "../components/OrgChart";

// Assuming you have a way to fetch or store this data
const mockAreas = [
  {
    _id: "000000000000000000000000",
    name: "Human Resources",
    departments: [
      {
        _id: "000000000000000000000000",
        name: "Recruitment",
        description:
          " Responsible for attracting, screening, and hiring new employees. This department manages job postings, conducts interviews, and collaborates with hiring managers to fill positions effectively.",
        head: {
          _id: "000000000000000000000001",
          firstName: "Alice",
          lastName: "Johnson",
        },
      },
      {
        _id: "000000000000000000000001",
        name: "Organizational Development",
        description:
          "Focuses on improving the organization's effectiveness through training, performance management, and leadership development. This department works on initiatives to enhance employee skills and workplace culture.",
        head: {
          _id: "000000000000000000000002",
          firstName: "Bob",
          lastName: "Smith",
        },
      },
    ],
    __v: 0,
  },
  {
    _id: "000000000000000000000001",
    name: "IT",
    departments: [
      {
        _id: "000000000000000000000002",
        name: "Software Development",
        description:
          "Designs, builds, and maintains software applications. This department works on developing new features, fixing bugs, and ensuring the software meets user needs.",
        head: {
          _id: "000000000000000000000003",
          firstName: "Charlie",
          lastName: "Davis",
        },
      },
      {
        _id: "000000000000000000000003",
        name: "Infrastructure",
        description:
          "Responsible for maintaining the IT infrastructure, including servers, networks, and databases. This department ensures system reliability, security, and scalability.",
        head: {
          _id: "000000000000000000000004",
          firstName: "Diana",
          lastName: "Moore",
        },
      },
      {
        _id: "000000000000000000000004",
        name: "Technical Support",
        description:
          "Provides assistance to employees and customers with technical issues. This department resolves problems related to software, hardware, and other IT services, ensuring smooth operations.",
        head: {
          _id: "000000000000000000000005",
          firstName: "Eva",
          lastName: "White",
        },
      },
    ],
    __v: 0,
  },
  {
    _id: "000000000000000000000002",
    name: "Sales",
    departments: [
      {
        _id: "000000000000000000000005",
        name: "Customer Service",
        description:
          "Handles customer inquiries, complaints, and support requests. This department ensures customer satisfaction by providing timely and effective solutions to issues and fostering positive relationships.",
        head: {
          _id: "000000000000000000000006",
          firstName: "Frank",
          lastName: "Taylor",
        },
      },
    ],
    __v: 0,
  },
];

const data = mockAreas.map((area) => ({
  name: area.name,
  children: area.departments.map((department) => ({
    name: department.name,
    children: [
      {
        name: department.head.firstName + " " + department.head.lastName,
      },
    ],
  })),
}));

const OrgChartPage: React.FC = () => {
  return (
    <div>
      <OrgChart data={[{ name: "CEO", children: data }]} />
    </div>
  );
};

export default OrgChartPage;

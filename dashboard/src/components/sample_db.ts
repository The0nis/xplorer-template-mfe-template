// For the tables
export const dashboardTableHeader = [
  "Case Title",
  "Customer",
  "Created On",
  "Status",
];

export const dashboardTableBody = [
  {
    caseTitle: "Complaint - Dispute",
    customer: "1234567890",
    createdOn: "05/04/2024 - 21:39",
    status: "Pending",
  },
  {
    caseTitle: "Request - Account",
    customer: "1234567890",
    createdOn: "12/08/2023 - 16:59",
    status: "Pending",
  },
  {
    caseTitle: "Complaint - Dispute",
    customer: "1234567890",
    createdOn: "05/04/2024 - 21:39",
    status: "Pending",
  },
  {
    caseTitle: "Request - Account",
    customer: "1234567890",
    createdOn: "12/08/2023 - 16:59",
    status: "Pending",
  },
  {
    caseTitle: "Complaint - Dispute",
    customer: "1234567890",
    createdOn: "05/04/2024 - 21:39",
    status: "Pending",
  },
  {
    caseTitle: "Request - Account",
    customer: "1234567890",
    createdOn: "12/08/2023 - 16:59",
    status: "Pending",
  },
];

// For the graphs
export const percentageSections = [
  { color: "#71CC98", percentage: (61 / 87) * 100 },
  { color: "#FDD757", percentage: (14 / 87) * 100 },
  { color: "#E3595D", percentage: (12 / 87) * 100 },
];

export const nipPercentageSections = {
  nip_inward: [{ color: "#71CC98", percentage: 0.997 * 100 }],
  new_nip_outward: [{ color: "#E3595D", percentage: 0.98 * 100 }],
  new_nip_outward_2: [{ color: "#009CBD", percentage: 0.99 * 100 }],
  naps: [{ color: "#E3595D", percentage: 0.96 * 100 }],
};

export const topCaseSourcesPercentage = {
  kiki: [{ color: "#FF9500", percentage: (246 / 801) * 100 }],
  social_media: [{ color: "#71CC98", percentage: (55 / 801) * 100 }],
  inbound_calls: [{ color: "#004EEB", percentage: (424 / 801) * 100 }],
  email: [{ color: "#E3595D", percentage: (76 / 801) * 100 }],
};

// Dashboard doughnut chart
export const chartData = {
  labels: ["Kiki", "Social Media", "Inbound Calls", "Email"],
  datasets: [
    {
      label: "Top Case Sources",
      data: [246, 55, 424, 76],
      backgroundColor: ["#FF9500", "#71CC98", "#004EEB", "#E3595D"],
    },
  ],
};

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || "";
          const value = context.raw || "";
          return `${label}: ${value}`;
        },
      },
    },
  },
  cutout: "70%",
  maintainAspectRatio: false,
};

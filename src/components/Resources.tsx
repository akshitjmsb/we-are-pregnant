import React from 'react';

const hospitals = [
  {
    name: "MUHC (Glen Site)",
    address: "1001 Decarie Blvd, Montreal, Quebec H4A 3J1",
    description: "A major teaching hospital affiliated with McGill University. Known for its modern facilities."
  },
  {
    name: "St. Mary's Hospital Center",
    address: "3830 Lacombe Ave, Montreal, Quebec H3T 1M5",
    description: "A McGill-affiliated hospital known for its family-centered approach to maternity care."
  },
  {
    name: "Jewish General Hospital",
    address: "3755 Cote-Sainte-Catherine Rd, Montreal, Quebec H3T 1E2",
    description: "A key McGill teaching hospital, also known for handling high-risk pregnancies."
  },
  {
    name: "CHU Sainte-Justine",
    address: "3175 Cote-Sainte-Catherine Rd, Montreal, Quebec H3T 1C5",
    description: "A leading mother and child university hospital. Primarily French-speaking."
  },
  {
    name: "CHUM (Centre hospitalier de l'Université de Montréal)",
    address: "1051 Sanguinet St, Montreal, Quebec H2X 3E4",
    description: "A large, modern French-speaking teaching hospital located downtown."
  }
];

export function Resources() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Montreal & Quebec Resources</h2>
        <p className="mt-2 text-gray-600">A list of helpful local and provincial services for expectant parents.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-[#FDFBF8] p-6 rounded-lg">
          <h3 className="font-bold text-lg text-[#AF6B51] mb-2">Government & Financial</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li><strong>RAMQ:</strong> Your Quebec public health insurance. Ensure your card is valid.</li>
            <li><strong>QPIP (Quebec Parental Insurance Plan):</strong> Provides benefits to new parents. Research eligibility and application process.</li>
            <li><strong>CLSC (Centre local de services communautaires):</strong> Your local community health centre for various services, including postnatal follow-ups.</li>
          </ul>
        </div>

        <div className="bg-[#FDFBF8] p-6 rounded-lg">
          <h3 className="font-bold text-lg text-[#AF6B51] mb-4">Main Birthing Hospitals</h3>
          <p className="text-gray-700 mb-4 text-sm">
            Your choice of hospital is often determined by where your doctor or midwife has admitting privileges. 
            Here are some of the main options in Montreal:
          </p>
          <div className="space-y-4">
            {hospitals.map((hospital, index) => (
              <div key={index}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-semibold text-[#AF6B51] hover:underline"
                >
                  {hospital.name}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-5.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </a>
                <p className="mt-1 text-gray-700 text-sm">{hospital.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FDFBF8] p-6 rounded-lg">
          <h3 className="font-bold text-lg text-[#AF6B51] mb-2">Prenatal Classes & Support</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li><strong>Hospitals:</strong> Most hospitals (e.g., CHUM, MUHC, St. Mary's) offer prenatal classes in English.</li>
            <li><strong>Private Educators:</strong> Many doulas and childbirth educators offer classes (e.g., Motherwit, PBB).</li>
            <li><strong>La Leche League:</strong> For breastfeeding support.</li>
          </ul>
        </div>

        <div className="bg-[#FDFBF8] p-6 rounded-lg">
          <h3 className="font-bold text-lg text-[#AF6B51] mb-2">Online Communities</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li><strong>Facebook Groups:</strong> Search for "Montreal Moms" or "Montreal Expectant Parents" for active communities.</li>
            <li><strong>Reddit:</strong> The r/babybumpscanada subreddit can be a useful resource.</li>
          </ul>
        </div>

        <div className="bg-[#FDFBF8] p-6 rounded-lg">
          <h3 className="font-bold text-lg text-[#AF6B51] mb-2">Important Contacts & Addresses</h3>
          <ul className="space-y-4 text-gray-700">
            <li>
              <p className="font-semibold">Emergency Services</p>
              <p className="text-sm">Phone: 911</p>
            </li>
            <li>
              <p className="font-semibold">Info-Santé (Non-urgent health questions)</p>
              <p className="text-sm">Phone: 811</p>
            </li>
            <li>
              <p className="font-semibold">RAMQ (Quebec Health Insurance)</p>
              <p className="text-sm">Phone (Montreal): (514) 864-3411</p>
              <p className="text-sm">Web: ramq.gouv.qc.ca</p>
              <p className="text-sm">Address: 425 De Maisonneuve Blvd W, Montreal, QC H3A 3G5</p>
            </li>
            <li>
              <p className="font-semibold">QPIP (Parental Insurance Plan)</p>
              <p className="text-sm">Phone: 1-888-610-7727</p>
              <p className="text-sm">Web: rqap.gouv.qc.ca</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

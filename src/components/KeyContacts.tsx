import React from 'react';

const contacts = [
  {
    category: 'health',
    title: 'General Health & Advice',
    items: [
      {
        name: 'Info-Santé 811',
        phone: '811',
        description: 'Free, confidential health advice 24/7 for any health concern.'
      },
      {
        name: 'Ma grossesse service',
        phone: '514-731-8531 ext. 42007',
        description: 'Quebec government service to connect you with professionals and resources.'
      },
      {
        name: 'Your Local CLSC',
        description: 'Find your neighborhood community clinic for local pregnancy and maternity care.'
      }
    ]
  },
  {
    category: 'emergency',
    title: 'Hospital & Birthing Centres (Urgent)',
    items: [
      {
        name: 'MUHC Birthing Centre (Royal Victoria)',
        phone: '514-843-1592',
        description: 'Open 24/7 for pregnancy advice, birthing, or urgent symptoms.'
      },
      {
        name: 'Jewish General Hospital Family Birthing Centre',
        phone: '514-340-8277',
        description: 'For advice or urgent pregnancy issues.'
      }
    ]
  },
  {
    category: 'support',
    title: 'Confidential Support Hotlines',
    items: [
      {
        name: 'grossesse-secours',
        phone: '1-877-271-0555',
        description: 'Confidential, pro-choice support, listening, and information line (9am–9pm).'
      },
      {
        name: 'SOS Grossesse',
        description: 'Info, support, and counselling for anyone affected by pregnancy (9am–9pm).'
      }
    ]
  },
  {
    category: 'private',
    title: 'Private Services',
    items: [
      {
        name: 'Prenato',
        phone: '1-888-721-7459',
        description: 'For private prenatal appointments, not covered by RAMQ.'
      }
    ]
  }
];

export function KeyContacts() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Key Montreal Pregnancy Contacts</h2>
        <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
          Quick-access numbers and services for advice, support, and urgent care.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {contacts.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-[#FDFBF8] p-6 rounded-lg">
            <h3 className="font-bold text-lg text-[#AF6B51] mb-3">{category.title}</h3>
            <ul className="space-y-4 text-gray-700">
              {category.items.map((contact, contactIndex) => (
                <li key={contactIndex}>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-sm">{contact.description}</p>
                  {contact.phone && (
                    <p className="text-sm font-semibold mt-1">
                      Phone: <a href={`tel:${contact.phone}`} className="text-[#AF6B51] hover:underline">{contact.phone}</a>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

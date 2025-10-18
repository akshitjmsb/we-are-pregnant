import React from 'react';

const wellnessTopics = [
  {
    title: 'Nutrition',
    content: 'Focus on a balanced diet rich in fruits, vegetables, lean protein, and whole grains. Stay hydrated by drinking plenty of water. Your doctor can provide a list of foods to avoid (like certain soft cheeses, raw fish, and deli meats).'
  },
  {
    title: 'Exercise',
    content: 'Moderate exercise is beneficial. Activities like walking, swimming, and prenatal yoga are excellent choices. Always consult with your healthcare provider before starting or continuing an exercise regimen.'
  },
  {
    title: 'Mental Health',
    content: 'It\'s normal to experience a wide range of emotions. Talk to your partner, friends, or a professional if you\'re feeling anxious or overwhelmed. Prioritize rest and activities that help you relax.'
  },
  {
    title: 'Rest & Sleep',
    content: 'Fatigue, especially in the first and third trimesters, is very common. Listen to your body and rest when you need to. Aim for 7-9 hours of sleep per night.'
  }
];

const massageProviders = [
  {
    name: 'Bota Bota, spa-sur-l\'eau',
    phone: '(514) 284-0333',
    email: 'info@botabota.ca',
    note: 'Offers specific prenatal packages.'
  },
  {
    name: 'Espace O Maternité',
    phone: '(514) 271-0777',
    email: 'info@espaceo.ca',
    note: 'A centre specializing in maternal wellness.'
  },
  {
    name: 'Kinatex Sports Physio',
    phone: 'Varies by clinic location',
    email: 'Varies by clinic location',
    note: 'Multiple locations, many with certified prenatal therapists.'
  }
];

export function Wellness() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Health & Wellness</h2>
        <p className="mt-2 text-gray-600">Tips for taking care of yourself during this important time.</p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {wellnessTopics.map((topic, index) => (
          <div key={index} className="bg-[#FDFBF8] p-6 rounded-lg">
            <h3 className="font-bold text-lg text-[#AF6B51] mb-3">{topic.title}</h3>
            <p className="text-gray-700">{topic.content}</p>
          </div>
        ))}

        <div className="bg-[#FDFBF8] p-6 rounded-lg md:col-span-2">
          <h3 className="font-bold text-lg text-[#AF6B51] mb-3">Prenatal Massage</h3>
          <p className="text-gray-700 mb-4">
            Prenatal massage can help relieve back pain, improve circulation, and reduce stress. 
            Ensure your massage therapist is certified in prenatal massage. Here are a few examples of places to look:
          </p>
          <ul className="space-y-3 text-gray-700">
            {massageProviders.map((provider, index) => (
              <li key={index}>
                <p className="font-semibold">{provider.name}</p>
                <p className="text-sm">Note: {provider.note}</p>
                <p className="text-sm">Phone: {provider.phone}</p>
                <p className="text-sm">Email: {provider.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

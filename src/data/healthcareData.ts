export const healthcareSteps = [
    {
        id: '1',
        title: 'Find a Provider',
        content: {
            title: 'Step 1: Find a Doctor (Obstetrician/GP) or a Midwife (Sage-Femme)',
            description: 'You have two main options for your care provider, both covered by RAMQ. Start looking immediately.',
            options: [
                {
                    title: 'Doctor (OB/GYN or Family Doctor)',
                    items: [
                        'Use the Quebec Family Doctor Finder (GAMF). Register online and indicate you are pregnant.',
                        'Call hospitals directly and ask if any obstetricians are accepting new patients.',
                        'Ask friends or colleagues for recommendations and call their clinics.'
                    ]
                },
                {
                    title: 'Midwife (Sage-Femme)',
                    items: [
                        'Contact a Maison de Naissance (birthing centre) in your area.',
                        'Places are limited and fill up very fast. Call as soon as you have a positive test.',
                        'Midwives offer care throughout pregnancy, labour, and postpartum.'
                    ]
                }
            ]
        }
    },
    {
        id: '2',
        title: 'Initial Tests',
        content: {
            title: 'Step 2: Get Your First Medical Tests',
            description: 'Once you find a provider, they will give you requisitions for your first set of tests.',
            items: [
                'Blood & Urine Tests: You\'ll get a requisition to take to a CLSC or private lab. These tests confirm the pregnancy, check your blood type, iron levels, and screen for infections.',
                'Dating Ultrasound: This is your first ultrasound, typically between 7-11 weeks. It confirms the due date and checks for the fetal heartbeat. Your doctor or midwife will refer you.'
            ]
        }
    },
    {
        id: '3',
        title: 'Ongoing Care',
        content: {
            title: 'Step 3: Establish Your Ongoing Care Plan',
            description: 'After your initial tests, you\'ll fall into a regular appointment schedule.',
            items: [
                'Regular Check-ups: Usually monthly until week 28, then bi-weekly, then weekly in the final month.',
                'Prenatal Screening: You will be offered screening for chromosomal abnormalities (e.g., Trisomy 21). This is optional and will be discussed with you.',
                'Hospital Registration: If you are with a doctor, you will need to register at the hospital where they deliver, usually in your second trimester.'
            ]
        }
    }
];

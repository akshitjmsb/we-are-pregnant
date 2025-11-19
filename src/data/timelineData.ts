import { TrimesterData, ChartData } from '../types';

export const timelineData: { [key: string]: TrimesterData } = {
  "1": {
    title: "Month 1 (Weeks 1-4)",
    baby: "The fertilized egg implants in the uterus and begins to grow. The amniotic sac and placenta start to form. Baby is a tiny embryo.",
    you: "You may not even know you're pregnant yet, but might experience fatigue, tender breasts, or mild spotting. This is a crucial time for development.",
    todo: "Start taking prenatal vitamins with folic acid. Avoid alcohol and smoking."
  },
  "2": {
    title: "Month 2 (Weeks 5-8)",
    baby: "The heart begins to beat. Major organs like the brain, lungs, and liver are forming. Facial features start to develop. Baby is about the size of a raspberry.",
    you: "Morning sickness, fatigue, and frequent urination are common. Your first prenatal visit is usually scheduled during this month.",
    todo: "Find a healthcare provider (doctor or midwife). Schedule your first appointment."
  },
  "3": {
    title: "Month 3 (Weeks 9-12)",
    baby: "The embryo is now a fetus. All essential organs have formed. Fingers and toes are distinct. The fetus can open and close its fists and mouth. Size of a lime.",
    you: "Morning sickness may start to subside by the end of this month. You might start to feel a bit more energetic. You'll likely have your dating ultrasound.",
    todo: "Have your first prenatal appointment and dating ultrasound. Consider when you'll share your news."
  },
  "4": {
    title: "Month 4 (Weeks 13-16)",
    baby: "The fetus can now suck its thumb, yawn, and make facial expressions. The nervous system is starting to function. You might be able to hear the heartbeat at your check-up. Size of an avocado.",
    you: "Welcome to the second trimester! Energy levels often return, and you may start to show a small baby bump. Morning sickness usually fades.",
    todo: "Start thinking about prenatal classes. Look into maternity leave (QPIP)."
  },
  "5": {
    title: "Month 5 (Weeks 17-20)",
    baby: "Hair, eyebrows, and eyelashes appear. The fetus becomes more active, and you might start to feel the first flutters of movement ('quickening'). Size of a banana.",
    you: "Your baby bump is more noticeable. You'll have your detailed anatomy scan ultrasound around week 20 to check on the baby's development.",
    todo: "Schedule and attend your anatomy scan. Start shopping for maternity clothes."
  },
  "6": {
    title: "Month 6 (Weeks 21-24)",
    baby: "The fetus's skin is reddish and wrinkled, and fingerprints and footprints are formed. The baby responds to sounds from outside the womb. Size of an ear of corn.",
    you: "You're likely feeling the baby move regularly now. You may experience backaches or swelling in your ankles as your uterus expands.",
    todo: "Register for prenatal and infant CPR classes. Continue with healthy eating and moderate exercise."
  },
  "7": {
    title: "Month 7 (Weeks 25-28)",
    baby: "The baby can now open and close its eyes and may be able to sense changes in light. Lungs are developing, but not yet mature. Size of an eggplant.",
    you: "You're in the third trimester. You might feel more tired and find it harder to get comfortable. You'll have your glucose screening test for gestational diabetes.",
    todo: "Take your glucose screening test. Start thinking about your birth plan."
  },
  "8": {
    title: "Month 8 (Weeks 29-32)",
    baby: "The baby is gaining weight rapidly. Bones are fully developed but still soft. The baby is likely in a head-down position now. Size of a pineapple.",
    you: "You may experience Braxton Hicks contractions. Appointments will become more frequent (every two weeks). Shortness of breath is common.",
    todo: "Pack your hospital bag. Finish setting up the nursery. Finalize your QPIP application."
  },
  "9": {
    title: "Month 9 (Weeks 33-40+)",
    baby: "The lungs are maturing, and the baby continues to gain fat. The baby 'drops' lower into your pelvis in preparation for birth. Average size of a small pumpkin.",
    you: "Appointments are now weekly. You may feel a mix of excitement and impatience. Rest as much as possible as you wait for labour to begin.",
    todo: "Install the car seat. Rest, rest, rest! Watch for signs of labour."
  }
};

export const chartData: { [key: string]: ChartData } = {
  "1": {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    growth: [0.2, 2.5, 7.5],
    symptoms: [3, 8, 6]
  },
  "2": {
    labels: ['Month 4', 'Month 5', 'Month 6'],
    growth: [13, 27, 30],
    symptoms: [4, 5, 6]
  },
  "3": {
    labels: ['Month 7', 'Month 8', 'Month 9'],
    growth: [36, 43, 51],
    symptoms: [7, 8, 9]
  }
};

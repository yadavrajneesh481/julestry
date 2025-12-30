import { LearningGuide } from '@/types/learning-guide';

const MOCK_GUIDES: Record<string, LearningGuide> = {
  photosynthesis: {
    topic: "Photosynthesis (Prakash-sanshleshan)",
    summary: "Photosynthesis wo process hai jisse plants apna khana banate hain sunlight ka use karke. Socho jaise hum kitchen mein khana banate hain, plants apni leaves mein khana banate hain!",
    glossary: [
      { term: "Chlorophyll", definition: "Ye plant ka green color pigment hai jo sunlight pakadta hai." },
      { term: "Stomata", definition: "Leaves ke neeche chhote holes jahan se hawa aati jaati hai." },
      { term: "Glucose", definition: "Plant ka khana (sugar)." }
    ],
    sections: [
      {
        id: "intro",
        title: "Introduction: Kya hai Photosynthesis?",
        content: [
          {
            type: "text",
            content: "Imagine karo agar tum dhoop (sunlight) se apna pet bhar paate? Plants bilkul wahi karte hain! \n\n**Photosynthesis** do words se bana hai:\n* **Photo** = Light (Roshni)\n* **Synthesis** = To make (Banana)\n\nMatlab, roshni se khana banana."
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b43?auto=format&fit=crop&q=80&w=800",
            alt: "Sunlight hitting a green leaf",
            caption: "Suraj ki roshni leaves par pad rahi hai."
          }
        ]
      },
      {
        id: "process",
        title: "Kaise hota hai ye magic?",
        content: [
          {
            type: "text",
            content: "Is process ke liye plants ko 3 cheezein chahiye:"
          },
          {
            type: "mermaid",
            chart: `graph TD
    A["Sunlight (Dhoop)"] --> D{"Leaf (Kitchen)"}
    B["Water (Paani)"] --> D
    C["CO2 (Hawa)"] --> D
    D --> E["Food (Glucose)"]
    D --> F["Oxygen (Saans lene ke liye)"]`,
            caption: "Photosynthesis ka simple flowchart"
          },
          {
            type: "toggle",
            title: "Aur detail mein samjhein? (Deep Dive)",
            content: [
              {
                type: "text",
                content: "Roots zameen se paani kheechti hain. Hawa se Carbon Dioxide (CO2) leaves ke chhote holes (Stomata) se andar aati hai. Chlorophyll (jo leaves ko green banata hai) sunlight ko pakadta hai aur in sabko milakar Glucose (Sugar) aur Oxygen banata hai."
              }
            ]
          }
        ]
      },
      {
        id: "quiz",
        title: "Chalo Check Karein (Quiz)",
        content: [
          {
            type: "quiz",
            question: "Plants ko khana banane ke liye kya nahi chahiye?",
            options: [
              { id: "a", text: "Sunlight", isCorrect: false },
              { id: "b", text: "Water", isCorrect: false },
              { id: "c", text: "Pizza", isCorrect: true },
              { id: "d", text: "Carbon Dioxide", isCorrect: false }
            ],
            explanation: "Sahi! Plants pizza nahi khate, wo sunlight, water aur CO2 se apna khana khud banate hain."
          }
        ]
      }
    ]
  },
  gravity: {
    topic: "Gravity (Gurutvakarshan)",
    summary: "Gravity wo force hai jo humein zameen se chipka ke rakhti hai. Bina gravity ke hum hawa mein udne lagte!",
    glossary: [
      { term: "Force", definition: "Taqat ya zor jo kisi cheez ko dhakka deta hai ya kheenchna hai." },
      { term: "Mass", definition: "Kisi cheez mein kitna material hai." },
      { term: "Orbit", definition: "Wo raasta jispe planets ghumte hain." }
    ],
    sections: [
      {
        id: "intro",
        title: "Introduction: Kyun girta hai apple?",
        content: [
          {
            type: "text",
            content: "Isaac Newton ek din ped ke neeche baithe the, aur ek apple gira. Unhone socha, 'Ye apple neeche hi kyun gira? Upar kyun nahi gaya?' \n\nJawab tha **Gravity**."
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
            alt: "Space and gravity concept",
            caption: "Earth ki gravity moon ko pakad ke rakhti hai."
          }
        ]
      },
      {
        id: "how-it-works",
        title: "Gravity kaise kaam karti hai?",
        content: [
          {
            type: "text",
            content: "Har cheez jisme wazan (mass) hai, wo doosri cheezon ko apni taraf kheenchti hai. Earth ka mass bohot zyada hai, isliye wo humein kheenchti hai."
          },
          {
            type: "mermaid",
            chart: `graph LR
    A["Mass (Wazan)"] -->|Zyada Mass = Zyada Gravity| B["Gravity Force"]
    B --> C["Pull (Khinchav)"]`,
            caption: "Mass aur Gravity ka rishta"
          }
        ]
      },
      {
        id: "quiz",
        title: "Quiz Time",
        content: [
          {
            type: "quiz",
            question: "Agar gravity khatam ho jaye to kya hoga?",
            options: [
              { id: "a", text: "Hum sab udne lagenge", isCorrect: true },
              { id: "b", text: "Hum zameen mein dhans jayenge", isCorrect: false },
              { id: "c", text: "Kuch nahi hoga", isCorrect: false }
            ],
            explanation: "Correct! Gravity hi humein neeche kheenchti hai. Uske bina hum float karne lagenge space mein."
          }
        ]
      }
    ]
  },
    computer: {
    topic: "Computer Basics",
    summary: "Computer ek aisi machine hai jo data leti hai (Input), uspe kaam karti hai (Process), aur result deti hai (Output).",
    glossary: [
      { term: "Hardware", definition: "Computer ke wo parts jinhe hum chhu sakte hain (Monitor, Keyboard)." },
      { term: "Software", definition: "Programs jo computer ko batate hain kya karna hai." },
      { term: "CPU", definition: "Central Processing Unit - Computer ka dimaag." }
    ],
    sections: [
      {
        id: "intro",
        title: "Computer kya hai?",
        content: [
          {
            type: "text",
            content: "Socho Computer ek **Magic Box** hai. Tum isse kuch poochte ho (Input), ye sochta hai (Processing), aur phir jawab deta hai (Output)."
          },
          {
            type: "mermaid",
            chart: `graph LR
    A[Input (Keyboard/Mouse)] --> B{CPU (Processing)}
    B --> C[Output (Monitor/Speaker)]
    B --> D[Storage (Hard Disk)]`,
            caption: "Computer ka basic kaam karne ka tareeka"
          }
        ]
      },
      {
        id: "parts",
        title: "Hardware vs Software",
        content: [
          {
            type: "toggle",
            title: "Difference samjhein?",
            content: [
              {
                type: "text",
                content: "**Hardware**: Body (Jaise haath, pair, aankhein). Example: Mouse, Screen.\n\n**Software**: Dimaag ki thoughts (Soch). Example: Windows, Games, Chrome."
              }
            ]
          }
        ]
      },
      {
        id: "quiz",
        title: "Quick Quiz",
        content: [
          {
            type: "quiz",
            question: "Inmein se Hardware kaunsa hai?",
            options: [
              { id: "a", text: "Microsoft Word", isCorrect: false },
              { id: "b", text: "Mouse", isCorrect: true },
              { id: "c", text: "Instagram App", isCorrect: false }
            ],
            explanation: "Sahi! Mouse ek physical part hai jise hum chhu sakte hain, isliye wo Hardware hai."
          }
        ]
      }
    ]
  }
};

export async function generateLearningGuide(input: string): Promise<LearningGuide> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const lowerInput = input.toLowerCase();

  // 1. Check for specific keywords
  if (lowerInput.includes('photo') || lowerInput.includes('plant')) {
    return MOCK_GUIDES['photosynthesis'];
  }
  if (lowerInput.includes('gravit') || lowerInput.includes('newton') || lowerInput.includes('apple')) {
    return MOCK_GUIDES['gravity'];
  }
  if (lowerInput.includes('computer') || lowerInput.includes('laptop') || lowerInput.includes('pc')) {
    return MOCK_GUIDES['computer'];
  }

  // 2. Generic Fallback (Dynamic Template)
  // If we don't recognize the topic, we create a generic structure that reuses the user's input.
  const topicTitle = input.length > 50 ? "Your Topic" : input; // Truncate if too long for title

  return {
    topic: `${topicTitle} (Made Simple)`,
    summary: `Humne aapke topic "${topicTitle}" ko analyze kiya hai. Filhal ye ek demo version hai, lekin hum is concept ko aasaan Hinglish mein tod rahe hain.`,
    glossary: [
      { term: "Key Concept 1", definition: `Ye ${topicTitle} ka sabse important part hai.` },
      { term: "Key Concept 2", definition: "Iska matlab hai ki kaise cheezein connect hoti hain." },
    ],
    sections: [
      {
        id: "intro",
        title: `Introduction: ${topicTitle} kya hai?`,
        content: [
          {
            type: "text",
            content: `**${topicTitle}** ek bohot interesting topic hai. \n\nSocho agar tum isse roz ki zindagi se connect karo. Ye concept humein samajhne mein madad karta hai ki duniya kaise kaam karti hai.`
          }
        ]
      },
      {
        id: "breakdown",
        title: "Iska Structure",
        content: [
          {
            type: "text",
            content: "Chalo isse ek flowchart se samajhte hain:"
          },
          {
            type: "mermaid",
            chart: `graph TD
    A[${topicTitle}] --> B[Part 1]
    A --> C[Part 2]
    B --> D[Result]
    C --> D`,
            caption: `${topicTitle} ka breakdown`
          }
        ]
      },
      {
        id: "quiz",
        title: "Test Your Knowledge",
        content: [
          {
            type: "quiz",
            question: `Kya aapko lagta hai ${topicTitle} useful hai?`,
            options: [
              { id: "a", text: "Haan, bilkul", isCorrect: true },
              { id: "b", text: "Nahi, shayad", isCorrect: true } // Both correct for generic
            ],
            explanation: "Bilkul! Har knowledge useful hoti hai."
          }
        ]
      }
    ]
  };
}

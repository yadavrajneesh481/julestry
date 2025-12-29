import { LearningGuide } from '@/types/learning-guide';

export async function generateLearningGuide(input: string): Promise<LearningGuide> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // In a real application, this would call an LLM API.
  // For now, we return a hardcoded guide on "Photosynthesis" to demonstrate the features.

  // Hinglish mock content
  return {
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
  };
}

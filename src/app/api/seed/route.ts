import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Assessment } from "@/models/Assessment";
import { Question } from "@/models/Question";
import { User } from "@/models/User";
import bcryptjs from "bcryptjs";

export async function GET() {
  try {
    await dbConnect();

    // 1. Clear existing data
    await Assessment.deleteMany({});
    await Question.deleteMany({});

    // 2. Create an admin user for testing if one doesn't exist
    const adminEmail = "admin@example.com";
    let adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      const hashedPassword = await bcryptjs.hash("admin123", 10);
      adminUser = await User.create({
        name: "Admin User",
        email: adminEmail,
        passwordHash: hashedPassword,
        role: "ADMIN",
      });
    }

    // 3. Create the Chakra Assessment
    const newAssessment = await Assessment.create({
      title: "Comprehensive Chakra Assessment",
      slug: "chakra-assessment",
      description: "Discover the balance of your 7 chakras through this 35-question deep dive.",
      instructions: "Please answer each question honestly to get the most accurate chakra reading.",
      status: "PUBLISHED"
    });

    // 4. Create Questions
    const questionsData = [
      {
        questionText: "I feel safe and secure in my life.",
        category: "Root Chakra - Muladhara",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel grounded and calm when life becomes stressful.",
        category: "Root Chakra - Muladhara",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel financially and practically secure about my future.",
        category: "Root Chakra - Muladhara",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel connected to my home, family and surroundings.",
        category: "Root Chakra - Muladhara",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I am able to handle unexpected changes without feeling completely overwhelmed.",
        category: "Root Chakra - Muladhara",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I allow myself to experience and express my emotions freely.",
        category: "Sacral Chakra - Svadhisthana",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I enjoy the simple pleasures of life without feeling guilty.",
        category: "Sacral Chakra - Svadhisthana",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel comfortable expressing my creativity.",
        category: "Sacral Chakra - Svadhisthana",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I can adapt easily when situations or plans change.",
        category: "Sacral Chakra - Svadhisthana",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I maintain healthy emotional boundaries in my relationships.",
        category: "Sacral Chakra - Svadhisthana",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I trust myself to make important decisions.",
        category: "Solar Plexus Chakra - Manipura",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel confident about my abilities and skills.",
        category: "Solar Plexus Chakra - Manipura",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I can say \"No\" when something does not feel right for me.",
        category: "Solar Plexus Chakra - Manipura",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I take action instead of constantly waiting for the perfect time.",
        category: "Solar Plexus Chakra - Manipura",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I believe that I am worthy of success, happiness and abundance.",
        category: "Solar Plexus Chakra - Manipura",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I genuinely love and accept myself as I am.",
        category: "Heart Chakra - Anahata",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I am comfortable giving and receiving love.",
        category: "Heart Chakra - Anahata",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I can forgive myself for mistakes from my past.",
        category: "Heart Chakra - Anahata",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I am able to maintain loving relationships without losing myself.",
        category: "Heart Chakra - Anahata",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel compassion and understanding toward myself and others.",
        category: "Heart Chakra - Anahata",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I express my feelings and needs clearly.",
        category: "Throat Chakra - Vishuddha",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I can speak my truth without excessive fear of being judged.",
        category: "Throat Chakra - Vishuddha",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel comfortable sharing my opinions, even when others disagree.",
        category: "Throat Chakra - Vishuddha",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I am able to communicate my boundaries respectfully.",
        category: "Throat Chakra - Vishuddha",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel that the important people in my life genuinely hear and understand me.",
        category: "Throat Chakra - Vishuddha",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I trust my intuition when making important decisions.",
        category: "Third Eye Chakra - Ajna",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I have clarity about what I truly want in life.",
        category: "Third Eye Chakra - Ajna",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I can observe my thoughts without allowing them to control me.",
        category: "Third Eye Chakra - Ajna",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I take time to reflect on my experiences and learn from them.",
        category: "Third Eye Chakra - Ajna",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I can distinguish between my intuition and my fears or overthinking.",
        category: "Third Eye Chakra - Ajna",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel that my life has a deeper meaning or purpose.",
        category: "Crown Chakra - Sahasrara",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I make time for silence, meditation, prayer or inner reflection.",
        category: "Crown Chakra - Sahasrara",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel connected to something greater than myself.",
        category: "Crown Chakra - Sahasrara",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I can find peace and meaning even during challenging experiences.",
        category: "Crown Chakra - Sahasrara",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
      {
        questionText: "I regularly experience gratitude for the life I have.",
        category: "Crown Chakra - Sahasrara",
        options: [
        {
                "text": "Needs Attention",
                "weight": 1
        },
        {
                "text": "Low",
                "weight": 2
        },
        {
                "text": "Developing",
                "weight": 3
        },
        {
                "text": "Balanced",
                "weight": 4
        },
        {
                "text": "Strong",
                "weight": 5
        }
]
      },
    ];

    // Add metadata (assessmentId, order) to each question
    const questionsToInsert = questionsData.map((q, index) => ({
      assessmentId: newAssessment._id,
      questionText: q.questionText,
      questionType: "MULTIPLE_CHOICE",
      category: q.category,
      order: index + 1,
      options: q.options
    }));

    await Question.insertMany(questionsToInsert);

    return NextResponse.json({ 
      message: "Successfully seeded database with 35 Chakra questions!",
      assessmentId: newAssessment._id 
    });

  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}

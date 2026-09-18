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
      description: "Discover the balance of your 7 chakras through this 28-question deep dive.",
      instructions: "Please answer each question honestly to get the most accurate chakra reading.",
      status: "PUBLISHED"
    });

    // 4. Create Questions
    const questionsData = [
      {
        questionText: "I feel safe and secure in my life.",
        questionTextMarathi: "\u092e\u0932\u093e \u092e\u093e\u091d\u094d\u092f\u093e \u0906\u092f\u0941\u0937\u094d\u092f\u093e\u0924 \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u0906\u0923\u093f \u0938\u094d\u0925\u093f\u0930 \u0935\u093e\u091f\u0924\u0947.",
        category: "Root Chakra - Muladhara",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel grounded and calm when life becomes stressful.",
        questionTextMarathi: "\u0906\u092f\u0941\u0937\u094d\u092f\u093e\u0924 \u0924\u093e\u0923\u0924\u0923\u093e\u0935 \u0905\u0938\u0924\u093e\u0928\u093e \u092e\u0932\u093e \u0936\u093e\u0902\u0924 \u0906\u0923\u093f \u0938\u094d\u0925\u093f\u0930 \u0935\u093e\u091f\u0924\u0947.",
        category: "Root Chakra - Muladhara",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel financially and practically secure about my future.",
        questionTextMarathi: "\u092e\u0932\u093e \u092e\u093e\u091d\u094d\u092f\u093e \u092d\u0935\u093f\u0937\u094d\u092f\u093e\u092c\u0926\u094d\u0926\u0932 \u0906\u0930\u094d\u0925\u093f\u0915 \u0906\u0923\u093f \u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u0926\u0943\u0937\u094d\u091f\u094d\u092f\u093e \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u0935\u093e\u091f\u0924\u0947.",
        category: "Root Chakra - Muladhara",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel connected to my home, family and surroundings.",
        questionTextMarathi: "\u092e\u0932\u093e \u092e\u093e\u091d\u0947 \u0918\u0930, \u0915\u0941\u091f\u0941\u0902\u092c \u0906\u0923\u093f \u0938\u092d\u094b\u0935\u0924\u093e\u0932\u091a\u094d\u092f\u093e \u0935\u093e\u0924\u093e\u0935\u0930\u0923\u093e\u0936\u0940 \u091c\u094b\u0921\u0932\u0947\u0932\u0947 \u0935\u093e\u091f\u0924\u0947.",
        category: "Root Chakra - Muladhara",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I allow myself to experience and express my emotions freely.",
        questionTextMarathi: "\u092e\u0940 \u092e\u093e\u091d\u094d\u092f\u093e \u092d\u093e\u0935\u0928\u093e \u092e\u094b\u0915\u0933\u0947\u092a\u0923\u093e\u0928\u0947 \u0905\u0928\u0941\u092d\u0935\u0924\u094b \u0906\u0923\u093f \u0935\u094d\u092f\u0915\u094d\u0924 \u0915\u0930\u0924\u094b.",
        category: "Sacral Chakra - Svadhisthana",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I enjoy the simple pleasures of life without feeling guilty.",
        questionTextMarathi: "\u0915\u094b\u0923\u0924\u093e\u0939\u0940 \u0905\u092a\u0930\u093e\u0927\u0917\u0902\u0921 \u0928 \u092c\u093e\u0933\u0917\u0924\u093e \u092e\u0940 \u0906\u092f\u0941\u0937\u094d\u092f\u093e\u0924\u0940\u0932 \u091b\u094b\u091f\u094d\u092f\u093e \u0906\u0928\u0902\u0926\u093e\u0902\u091a\u093e \u0909\u092a\u092d\u094b\u0917 \u0918\u0947\u0924\u094b.",
        category: "Sacral Chakra - Svadhisthana",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel comfortable expressing my creativity.",
        questionTextMarathi: "\u092e\u093e\u091d\u0940 \u0938\u0930\u094d\u091c\u0928\u0936\u0940\u0932\u0924\u093e \u0935\u094d\u092f\u0915\u094d\u0924 \u0915\u0930\u0924\u093e\u0928\u093e \u092e\u0932\u093e \u0938\u0939\u091c \u0935\u093e\u091f\u0924\u0947.",
        category: "Sacral Chakra - Svadhisthana",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I can adapt easily when situations or plans change.",
        questionTextMarathi: "\u092a\u0930\u093f\u0938\u094d\u0925\u093f\u0924\u0940 \u0915\u093f\u0902\u0935\u093e \u092f\u094b\u091c\u0928\u093e \u092c\u0926\u0932\u0932\u094d\u092f\u093e\u0938 \u092e\u0940 \u0938\u0939\u091c \u091c\u0941\u0933\u0935\u0942\u0928 \u0918\u0947\u090a \u0936\u0915\u0924\u094b.",
        category: "Sacral Chakra - Svadhisthana",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I trust myself to make important decisions.",
        questionTextMarathi: "\u092e\u0939\u0924\u094d\u0935\u093e\u091a\u0947 \u0928\u093f\u0930\u094d\u0923\u092f \u0918\u0947\u0924\u093e\u0928\u093e \u092e\u0932\u093e \u0938\u094d\u0935\u0924\u0903\u0935\u0930 \u0935\u093f\u0936\u094d\u0935\u093e\u0938 \u0905\u0938\u0924\u094b.",
        category: "Solar Plexus Chakra - Manipura",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel confident about my abilities and skills.",
        questionTextMarathi: "\u092e\u0932\u093e \u092e\u093e\u091d\u094d\u092f\u093e \u0915\u094d\u0937\u092e\u0924\u0947\u0935\u0930 \u0906\u0923\u093f \u0915\u094c\u0936\u0932\u094d\u092f\u093e\u0902\u0935\u0930 \u0906\u0924\u094d\u092e\u0935\u093f\u0936\u094d\u0935\u093e\u0938 \u0906\u0939\u0947.",
        category: "Solar Plexus Chakra - Manipura",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I can say \"No\" when something does not feel right for me.",
        questionTextMarathi: "\u091c\u0947\u0935\u094d\u0939\u093e \u092e\u0932\u093e \u0915\u093e\u0939\u0940\u0924\u0930\u0940 \u092f\u094b\u0917\u094d\u092f \u0935\u093e\u091f\u0924 \u0928\u093e\u0939\u0940, \u0924\u0947\u0935\u094d\u0939\u093e \u092e\u0940 \u0920\u093e\u092e\u092a\u0923\u0947 \"\u0928\u093e\u0939\u0940\" \u092e\u094d\u0939\u0923\u0942 \u0936\u0915\u0924\u094b.",
        category: "Solar Plexus Chakra - Manipura",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I take action instead of constantly waiting for the perfect time.",
        questionTextMarathi: "\u092f\u094b\u0917\u094d\u092f \u0935\u0947\u0933\u0947\u091a\u0940 \u0935\u093e\u091f \u092a\u093e\u0939\u0924 \u0930\u093e\u0939\u0923\u094d\u092f\u093e\u0910\u0935\u091c\u0940 \u092e\u0940 \u0915\u0943\u0924\u0940 \u0915\u0930\u0924\u094b.",
        category: "Solar Plexus Chakra - Manipura",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I genuinely love and accept myself as I am.",
        questionTextMarathi: "\u092e\u0940 \u091c\u0938\u093e \u0906\u0939\u0947 \u0924\u0938\u093e \u0938\u094d\u0935\u0924\u0903\u0935\u0930 \u092e\u0928\u093e\u092a\u093e\u0938\u0942\u0928 \u092a\u094d\u0930\u0947\u092e \u0915\u0930\u0924\u094b \u0906\u0923\u093f \u0938\u094d\u0935\u0924\u0903\u091a\u093e \u0938\u094d\u0935\u0940\u0915\u093e\u0930 \u0915\u0930\u0924\u094b.",
        category: "Heart Chakra - Anahata",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I am comfortable giving and receiving love.",
        questionTextMarathi: "\u092a\u094d\u0930\u0947\u092e \u0926\u0947\u0923\u094d\u092f\u093e\u0938 \u0906\u0923\u093f \u0938\u094d\u0935\u0940\u0915\u093e\u0930\u0923\u094d\u092f\u093e\u0938 \u092e\u0932\u093e \u0938\u0939\u091c \u0935\u093e\u091f\u0924\u0947.",
        category: "Heart Chakra - Anahata",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I can forgive myself for mistakes from my past.",
        questionTextMarathi: "\u092e\u093e\u091d\u094d\u092f\u093e \u092d\u0942\u0924\u0915\u093e\u0933\u093e\u0924\u0940\u0932 \u091a\u0941\u0915\u093e\u0902\u092c\u0926\u094d\u0926\u0932 \u092e\u0940 \u0938\u094d\u0935\u0924\u0903\u0932\u093e \u0915\u094d\u0937\u092e\u093e \u0915\u0930\u0942 \u0936\u0915\u0924\u094b.",
        category: "Heart Chakra - Anahata",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I am able to maintain loving relationships without losing myself.",
        questionTextMarathi: "\u0938\u094d\u0935\u0924\u0903\u091a\u0947 \u0905\u0938\u094d\u0924\u093f\u0924\u094d\u0935 \u0928 \u0917\u092e\u093e\u0935\u0924\u093e \u092e\u0940 \u092a\u094d\u0930\u0947\u092e\u0933 \u0928\u093e\u0924\u0940 \u091c\u092a\u0942 \u0936\u0915\u0924\u094b.",
        category: "Heart Chakra - Anahata",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I express my feelings and needs clearly.",
        questionTextMarathi: "\u092e\u0940 \u092e\u093e\u091d\u094d\u092f\u093e \u092d\u093e\u0935\u0928\u093e \u0906\u0923\u093f \u0917\u0930\u091c\u093e \u0938\u094d\u092a\u0937\u094d\u091f\u092a\u0923\u0947 \u0935\u094d\u092f\u0915\u094d\u0924 \u0915\u0930\u0924\u094b.",
        category: "Throat Chakra - Vishuddha",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I can speak my truth without excessive fear of being judged.",
        questionTextMarathi: "\u0907\u0924\u0930 \u0932\u094b\u0915 \u0915\u093e\u092f \u0935\u093f\u091a\u093e\u0930 \u0915\u0930\u0924\u0940\u0932 \u092f\u093e\u091a\u0940 \u091c\u093e\u0938\u094d\u0924 \u092d\u0940\u0924\u0940 \u0928 \u092c\u093e\u0933\u0917\u0924\u093e \u092e\u0940 \u092e\u093e\u091d\u0947 \u0916\u0930\u0947 \u092e\u0924 \u092e\u093e\u0902\u0921\u0942 \u0936\u0915\u0924\u094b.",
        category: "Throat Chakra - Vishuddha",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel comfortable sharing my opinions, even when others disagree.",
        questionTextMarathi: "\u0907\u0924\u0930\u093e\u0902\u091a\u0947 \u092e\u0924 \u0935\u0947\u0917\u0933\u0947 \u0905\u0938\u0932\u0947 \u0924\u0930\u0940\u0939\u0940, \u092e\u0940 \u092e\u093e\u091d\u0947 \u0935\u093f\u091a\u093e\u0930 \u0906\u0924\u094d\u092e\u0935\u093f\u0936\u094d\u0935\u093e\u0938\u093e\u0928\u0947 \u092e\u093e\u0902\u0921\u0942 \u0936\u0915\u0924\u094b.",
        category: "Throat Chakra - Vishuddha",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I am able to communicate my boundaries respectfully.",
        questionTextMarathi: "\u092e\u0940 \u092e\u093e\u091d\u094d\u092f\u093e \u092e\u0930\u094d\u092f\u093e\u0926\u093e \u0907\u0924\u0930\u093e\u0902\u0928\u093e \u0906\u0926\u0930\u093e\u0928\u0947 \u0938\u093e\u0902\u0917\u0942 \u0936\u0915\u0924\u094b.",
        category: "Throat Chakra - Vishuddha",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I trust my intuition when making important decisions.",
        questionTextMarathi: "\u092e\u0939\u0924\u094d\u0924\u094d\u0935\u092a\u0942\u0930\u094d\u0923 \u0928\u093f\u0930\u094d\u0923\u092f \u0918\u0947\u0924\u093e\u0928\u093e \u092e\u0940 \u092e\u093e\u091d\u094d\u092f\u093e \u0905\u0902\u0924\u0930\u094d\u091c\u094d\u091e\u093e\u0928\u093e\u0935\u0930 \u0935\u093f\u0936\u094d\u0935\u093e\u0938 \u0920\u0947\u0935\u0924\u094b.",
        category: "Third Eye Chakra - Ajna",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I have clarity about what I truly want in life.",
        questionTextMarathi: "\u092e\u0932\u093e \u0906\u092f\u0941\u0937\u094d\u092f\u093e\u0924 \u0916\u0930\u094b\u0916\u0930 \u0915\u093e\u092f \u0939\u0935\u0947 \u0906\u0939\u0947 \u092f\u093e\u092c\u0926\u094d\u0926\u0932 \u092e\u093e\u091d\u094d\u092f\u093e \u092e\u0928\u093e\u0924 \u0938\u094d\u092a\u0937\u094d\u091f\u0924\u093e \u0906\u0939\u0947.",
        category: "Third Eye Chakra - Ajna",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I can observe my thoughts without allowing them to control me.",
        questionTextMarathi: "\u092e\u0940 \u092e\u093e\u091d\u094d\u092f\u093e \u0935\u093f\u091a\u093e\u0930\u093e\u0902\u091a\u0947 \u0928\u093f\u0930\u0940\u0915\u094d\u0937\u0923 \u0915\u0930\u0942 \u0936\u0915\u0924\u094b \u0906\u0923\u093f \u0924\u094d\u092f\u093e\u0902\u0928\u093e \u092e\u093e\u091d\u094d\u092f\u093e\u0935\u0930 \u0928\u093f\u092f\u0902\u0924\u094d\u0930\u0923 \u0920\u0947\u0935\u0942 \u0926\u0947\u0924 \u0928\u093e\u0939\u0940.",
        category: "Third Eye Chakra - Ajna",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I take time to reflect on my experiences and learn from them.",
        questionTextMarathi: "\u092e\u0940 \u092e\u093e\u091d\u094d\u092f\u093e \u0905\u0928\u0941\u092d\u0935\u093e\u0902\u0935\u0930 \u0935\u093f\u091a\u093e\u0930 \u0915\u0930\u0923\u094d\u092f\u093e\u0938\u093e\u0920\u0940 \u0906\u0923\u093f \u0924\u094d\u092f\u093e\u0924\u0942\u0928 \u0936\u093f\u0915\u0923\u094d\u092f\u093e\u0938\u093e\u0920\u0940 \u0935\u0947\u0933 \u0926\u0947\u0924\u094b.",
        category: "Third Eye Chakra - Ajna",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel that my life has a deeper meaning or purpose.",
        questionTextMarathi: "\u092e\u093e\u091d\u094d\u092f\u093e \u091c\u0940\u0935\u0928\u093e\u0932\u093e \u090f\u0915 \u0938\u0916\u094b\u0932 \u0905\u0930\u094d\u0925 \u0915\u093f\u0902\u0935\u093e \u0909\u0926\u094d\u0926\u0947\u0936 \u0906\u0939\u0947, \u0905\u0938\u0947 \u092e\u0932\u093e \u0935\u093e\u091f\u0924\u0947.",
        category: "Crown Chakra - Sahasrara",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I make time for silence, meditation, prayer or inner reflection.",
        questionTextMarathi: "\u092e\u0940 \u0936\u093e\u0902\u0924\u0924\u093e, \u0927\u094d\u092f\u093e\u0928, \u092a\u094d\u0930\u093e\u0930\u094d\u0925\u0928\u093e \u0915\u093f\u0902\u0935\u093e \u0906\u0924\u094d\u092e\u091a\u093f\u0902\u0924\u0928\u093e\u0938\u093e\u0920\u0940 \u0935\u0947\u0933 \u0915\u093e\u0922\u0924\u094b.",
        category: "Crown Chakra - Sahasrara",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I feel connected to something greater than myself.",
        questionTextMarathi: "\u092e\u0932\u093e \u092e\u093e\u091d\u094d\u092f\u093e\u092a\u0947\u0915\u094d\u0937\u093e \u0905\u0927\u093f\u0915 \u092e\u0939\u093e\u0928 \u0936\u0915\u094d\u0924\u0940\u0936\u0940 \u091c\u094b\u0921\u0932\u0947\u0932\u0947 \u0935\u093e\u091f\u0924\u0947.",
        category: "Crown Chakra - Sahasrara",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
      {
        questionText: "I can find peace and meaning even during challenging experiences.",
        questionTextMarathi: "\u0906\u0935\u094d\u0939\u093e\u0928\u093e\u0924\u094d\u092e\u0915 \u092a\u094d\u0930\u0938\u0902\u0917\u093e\u0924\u0939\u0940 \u092e\u0932\u093e \u0936\u093e\u0902\u0924\u0940 \u0906\u0923\u093f \u0905\u0930\u094d\u0925 \u0936\u094b\u0927\u0924\u093e \u092f\u0947\u0924\u094b.",
        category: "Crown Chakra - Sahasrara",
        options: [
        {
                "text": "Never",
                "textMarathi": "\u0915\u0927\u0940\u091a \u0928\u093e\u0939\u0940",
                "weight": 1
        },
        {
                "text": "Rarely",
                "textMarathi": "\u0915\u094d\u0935\u091a\u093f\u0924\u091a",
                "weight": 2
        },
        {
                "text": "Sometimes",
                "textMarathi": "\u0915\u0927\u0940\u0915\u0927\u0940",
                "weight": 3
        },
        {
                "text": "Often",
                "textMarathi": "\u092c\u0931\u094d\u092f\u093e\u091a\u0926\u093e",
                "weight": 4
        },
        {
                "text": "Almost Always",
                "textMarathi": "\u091c\u0935\u0933\u091c\u0935\u0933 \u0928\u0947\u0939\u092e\u0940",
                "weight": 5
        }
]
      },
    ];

    // Add metadata (assessmentId, order) to each question
    const questionsToInsert = questionsData.map((q, index) => ({
      assessmentId: newAssessment._id,
      questionText: q.questionText,
      questionTextMarathi: q.questionTextMarathi,
      questionType: "MULTIPLE_CHOICE",
      category: q.category,
      order: index + 1,
      options: q.options
    }));

    await Question.insertMany(questionsToInsert);

    return NextResponse.json({ 
      message: "Successfully seeded database with 28 Chakra questions (including Marathi translations)!",
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

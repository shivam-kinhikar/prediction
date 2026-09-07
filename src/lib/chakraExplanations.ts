export interface ChakraExplanation {
  short: string;
  long: string;
}

export function getChakraExplanation(chakra: string, interpretation: string): ChakraExplanation {
  const isHigh = ["Strong", "Balanced"].includes(interpretation);
  const isMid = interpretation === "Developing";
  // The rest fall into Low or Needs Attention

  if (chakra.includes("Root")) {
    if (isHigh) return {
      short: "You feel deeply secure, grounded, and physically safe.",
      long: "Your foundational energy is incredibly solid. You feel deeply secure, grounded, and physically safe in your environment. You trust completely in your ability to survive and thrive, easily weathering unexpected changes without losing your center. This strong foundation allows you to build a fulfilling life without the constant hum of survival anxiety."
    };
    if (isMid) return {
      short: "You have a baseline of stability but may feel anxious during sudden changes.",
      long: "You have established a good baseline of stability, but you may occasionally experience anxiety or feel ungrounded when faced with sudden financial, physical, or practical stress. While you generally feel safe, unexpected disruptions can momentarily shake your confidence in your foundation."
    };
    return {
      short: "You are experiencing instability or fear regarding your basic needs.",
      long: "You are currently experiencing significant instability, fear, or anxiety regarding your basic needs. This might manifest as financial worry, physical insecurity, or a general feeling of not belonging. It is crucial to focus on grounding exercises, establishing reliable routines, and actively building a sense of physical and financial safety."
    };
  }

  if (chakra.includes("Sacral")) {
    if (isHigh) return {
      short: "Your emotional and creative energies flow freely without guilt.",
      long: "Your emotional and creative energies are flowing freely and harmoniously. You experience the simple pleasures of life without guilt, adapt beautifully to change, and maintain healthy, respectful boundaries with others. You are deeply connected to your passion and allow yourself to fully feel."
    };
    if (isMid) return {
      short: "You are generally in touch with your feelings but may suppress true emotions.",
      long: "You are generally in touch with your feelings and creativity, but you may sometimes suppress your true emotions or feel mildly guilty for prioritizing your own pleasure or rest. You are learning to balance your own desires with the demands of daily life."
    };
    return {
      short: "Your emotional flow is blocked, leading to repressed feelings or lack of inspiration.",
      long: "Your emotional flow is currently blocked or stagnant. You may be struggling with repressed feelings, a profound lack of creative inspiration, or difficulty setting boundaries in your relationships. Focus on allowing yourself to feel without judgment, embracing play, and honoring your own emotional needs."
    };
  }

  if (chakra.includes("Solar Plexus")) {
    if (isHigh) return {
      short: "You possess a strong sense of self-worth and make decisions decisively.",
      long: "You possess a strong, unwavering sense of self-worth and personal power. You are highly confident in your abilities, make decisions decisively, and take action without hesitation. You trust yourself deeply and do not rely heavily on external validation to know your own value."
    };
    if (isMid) return {
      short: "You have a good sense of self but occasionally doubt your decisions.",
      long: "You have a good, developing sense of self, but you may occasionally doubt your decisions or wait too long for the 'perfect moment' before taking action. You are on the path to reclaiming your full personal power, but sometimes let self-doubt slow you down."
    };
    return {
      short: "You are experiencing a crisis of confidence or struggle with self-doubt.",
      long: "You are experiencing a significant crisis of confidence. You likely struggle with self-doubt, a fear of rejection, or difficulty asserting your own needs and saying 'no'. Building self-esteem, practicing assertiveness, and taking small, decisive actions are essential to unblocking this center."
    };
  }

  if (chakra.includes("Heart")) {
    if (isHigh) return {
      short: "Your heart is open; you genuinely love yourself and naturally cultivate deep relationships.",
      long: "Your heart is open, radiant, and deeply balanced. You genuinely love and accept yourself as you are, easily forgive past mistakes, and naturally cultivate deep, compassionate relationships with those around you without losing your own sense of identity."
    };
    if (isMid) return {
      short: "You are empathetic but may struggle with self-forgiveness or boundaries.",
      long: "You are a caring and empathetic person, but you may sometimes struggle with self-forgiveness or find yourself putting others' needs so far ahead of your own that you feel drained. You are learning the crucial balance between giving love to others and giving it to yourself."
    };
    return {
      short: "You may be holding onto past hurts or struggling with self-acceptance.",
      long: "You are currently holding onto past hurts, grief, or struggling profoundly with self-acceptance. You may find it difficult to trust others, or deep down, feel unworthy of receiving pure love. Practicing radical self-compassion and slowly allowing yourself to be vulnerable is your key to healing."
    };
  }

  if (chakra.includes("Throat")) {
    if (isHigh) return {
      short: "You speak your truth fearlessly and communicate needs with clarity.",
      long: "You are a master of authentic expression. You speak your truth fearlessly, communicate your needs with crystal clarity, and feel deeply heard and respected by your peers. Your voice is a powerful tool for your personal truth."
    };
    if (isMid) return {
      short: "You communicate effectively but may hold back true opinions in high-stakes situations.",
      long: "You can communicate effectively most of the time, but you may hold back your true opinions in high-stakes situations or fear being judged for your authentic voice. You are working on finding the courage to speak up even when it feels uncomfortable."
    };
    return {
      short: "Your voice feels stifled; you struggle to express your true feelings.",
      long: "Your voice currently feels stifled or silenced. You likely struggle to express your true feelings, often swallowing your words to keep the peace or out of fear of conflict. You must begin practicing speaking up for yourself, starting in small, safe environments."
    };
  }

  if (chakra.includes("Third Eye")) {
    if (isHigh) return {
      short: "Your intuition is sharp, and you trust your inner guidance implicitly.",
      long: "Your intuition is sharp, accurate, and deeply trusted. You rely on your inner guidance implicitly, easily distinguishing between true intuitive hits and fear-based overthinking. You have immense clarity about your life's path."
    };
    if (isMid) return {
      short: "You are tuned into intuition but sometimes let logic second-guess your gut feelings.",
      long: "You are tuned in to your intuition, but you frequently let logic or anxiety second-guess your initial gut feelings. You are currently learning to trust your inner voice more consistently and quiet the noise of overthinking."
    };
    return {
      short: "You feel disconnected from inner wisdom and over-rely on external validation.",
      long: "You feel disconnected from your inner wisdom and intuition. You may be over-relying on external validation or strict logic, leading to confusion, mental fog, and a lack of clear direction in your life. Reconnecting with your inner voice through silence and reflection is needed."
    };
  }

  if (chakra.includes("Crown")) {
    if (isHigh) return {
      short: "You feel profoundly connected to a higher purpose and experience daily gratitude.",
      long: "You feel profoundly connected to the universe and a higher purpose. You experience daily gratitude, inner peace, and a deep understanding that you are part of something greater than yourself. You find profound meaning even in challenging times."
    };
    if (isMid) return {
      short: "You acknowledge a deeper meaning but struggle to maintain spiritual practices.",
      long: "You acknowledge a deeper meaning to life, but you may struggle to maintain a consistent spiritual or reflective practice, especially when daily life gets busy. You are working on integrating mindfulness more regularly into your routine."
    };
    return {
      short: "You are experiencing existential disconnect or a feeling that life lacks meaning.",
      long: "You are experiencing a sense of isolation or existential disconnect. You may feel that life lacks deeper meaning or purpose. Introducing small, consistent moments of silence, meditation, or gratitude into your day will help restore this vital cosmic connection."
    };
  }

  return {
    short: "This energy center requires mindful attention.",
    long: "This energy center requires your mindful attention to bring it back into a state of harmonious balance. Take time to reflect on what might be blocking this specific area of your life."
  };
}

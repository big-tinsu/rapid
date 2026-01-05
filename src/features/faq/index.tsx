import { useState } from "react";
import styles from "./index.module.css";

interface FAQItem {
  id: string;
  question: string;
  answer: string | JSX.Element;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

export function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const faqSections: FAQSection[] = [
    {
      title: "A. Registration & Account",
      items: [
        {
          id: "reg-1",
          question: "How do I register?",
          answer:
            'Click "Sign Up," provide your mobile number, email, and create a password. You must be 18+.',
        },
      ],
    },
    {
      title: "B. Deposits",
      items: [
        {
          id: "deposit-1",
          question: "How can I deposit?",
          answer:
            "We support local methods: Bank Transfer, USSD, Debit Cards (Visa/Mastercard), and Mobile Money/Wallets (like Opay, Palmpay, Moniepoint).",
        },
        {
          id: "deposit-2",
          question: "Is there a minimum deposit?",
          answer: "Yes, the minimum deposit is ₦100.",
        },
        {
          id: "deposit-3",
          question: "My deposit didn't reflect instantly. What should I do?",
          answer:
            "Contact our 24/7 support via live chat or WhatsApp. Have your transaction reference handy.",
        },
      ],
    },
    {
      title: "C. Bonuses & Promotions",
      items: [
        {
          id: "bonus-1",
          question: "What is a wagering requirement?",
          answer:
            "It's the number of times you must play through a bonus amount before you can withdraw winnings from it. E.g., A ₦10,000 bonus with a 30x requirement means you must bet ₦300,000 before withdrawal.",
        },
        {
          id: "bonus-2",
          question: "Can I withdraw my bonus immediately?",
          answer:
            "No. You must meet the wagering requirements stated in the specific promotion's terms.",
        },
      ],
    },
    {
      title: "D. Withdrawals",
      items: [
        {
          id: "withdraw-1",
          question: "How do I withdraw my winnings?",
          answer:
            'Go to the "Wallet," select "Withdraw," choose your preferred method, and enter the amount. Your first withdrawal requires account verification.',
        },
        {
          id: "withdraw-2",
          question: "How long do withdrawals take?",
          answer:
            "Verified withdrawals are typically processed within 1-2 hours. It may take longer due to third party payment processors or your bank.",
        },
        {
          id: "withdraw-3",
          question: "Is there a withdrawal limit?",
          answer:
            'Yes. The maximum daily withdrawal is ₦1,000,000. Please check the "Withdrawals" section in the Terms for full details.',
        },
      ],
    },
    {
      title: "E. Sports Betting",
      items: [
        {
          id: "games-1",
          question: "What games can I bet on?",
          answer:
            "We offer various verticals of casino games from Crash games, Table games, Number games, Card games, Penalty shootout, Spinning wheel games and more.",
        },
      ],
    },
    {
      title: "F. Responsible Gambling",
      items: [
        {
          id: "responsible-1",
          question: "How can I gamble responsibly?",
          answer: (
            <>
              Set deposit limits in your account, take regular breaks, and never
              chase losses. Contact{" "}
              <a
                href="https://www.gamblealert.org"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-orange-500 hover:text-orange-600 underline"
              >
                www.gamblealert.org
              </a>{" "}
              for support.
            </>
          ),
        },
      ],
    },
    {
      title: "G. Security & Fairness",
      items: [
        {
          id: "security-1",
          question: "Is my money and information safe?",
          answer:
            "Absolutely. We use industry-standard encryption and are licensed and regulated by the Oyo State Gaming Board. Our games are tested for fairness by independent auditors.",
        },
      ],
    },
  ];

  return (
    <div className="bd-color text-white">
      <div className={styles["faq"]}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-8">
          <h1 className="text-xl sm:text-2xl font-bold">
            FREQUENTLY ASKED QUESTIONS (FAQs)
          </h1>
        </div>

        <div className={styles["faq-container"]}>
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={styles["faq-section"]}>
              <h3 className={styles["section-title"]}>{section.title}</h3>
              <div className={styles["faq-items"]}>
                {section.items.map((item) => {
                  const isOpen = openItems.has(item.id);
                  return (
                    <div key={item.id} className={styles["faq-item"]}>
                      <button
                        className={styles["faq-question"]}
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                      >
                        <span className={styles["question-text"]}>
                          {item.question}
                        </span>
                        <span
                          className={`${styles["icon"]} ${
                            isOpen ? styles["icon-open"] : ""
                          }`}
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        className={`${styles["faq-answer-wrapper"]} ${
                          isOpen ? styles["open"] : ""
                        }`}
                      >
                        <div className={styles["faq-answer"]}>
                          {typeof item.answer === "string" ? (
                            <p>{item.answer}</p>
                          ) : (
                            item.answer
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

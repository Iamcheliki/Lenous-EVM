import Link from "next/link";
import Icon from "../UI/icon";
import { useState } from "react";

interface Question {
  question: string;
  answer: string;
  open: boolean;
}

const questionsList: Question[] = [
  {
    question: "Is Lenous a safe cryptocurrency exchange?",
    answer:
      "Veniam cupidatat pariatur duis amet consequat dolore fugiat dolor tempor tempor veniam magna eiusmod. Aliqua dolor aute nisi dolore reprehenderit. Incididunt dolore commodo eu enim sit. Voluptate exercitation nulla et cupidatat deserunt tempor. Occaecat laborum nostrud ad tempor culpa commodo pariatur. In esse sit occaecat commodo eu sint exercitation consequat. Mollit reprehenderit officia labore enim magna eu voluptate enim magna pariatur culpa eu in dolor.",
    open: false,
  },
  {
    question: "Can I start trading with just $1?",
    answer:
      "Veniam cupidatat pariatur duis amet consequat dolore fugiat dolor tempor tempor veniam magna eiusmod. Aliqua dolor aute nisi dolore reprehenderit. Incididunt dolore commodo eu enim sit. Voluptate exercitation nulla et cupidatat deserunt tempor. Occaecat laborum nostrud ad tempor culpa commodo pariatur. In esse sit occaecat commodo eu sint exercitation consequat. Mollit reprehenderit officia labore enim magna eu voluptate enim magna pariatur culpa eu in dolor.",
    open: false,
  },
  {
    question: "Is there an exchange limit between fiat and crypto?",
    answer:
      "Veniam cupidatat pariatur duis amet consequat dolore fugiat dolor tempor tempor veniam magna eiusmod. Aliqua dolor aute nisi dolore reprehenderit. Incididunt dolore commodo eu enim sit. Voluptate exercitation nulla et cupidatat deserunt tempor. Occaecat laborum nostrud ad tempor culpa commodo pariatur. In esse sit occaecat commodo eu sint exercitation consequat. Mollit reprehenderit officia labore enim magna eu voluptate enim magna pariatur culpa eu in dolor.",
    open: false,
  },
];

export default function FAQSection() {
  const [list, setList] = useState<Question[]>(questionsList);

  const handleOpenQuestion = (index: number) => {
    const newList = [...list];
    for (const item of newList) {
      item.open = false;
    }
    newList[index].open = true;
    setList([...newList]);
  };
  return (
    <div className="index-container text-white mt-36">
      <div className="flex justify-between">
        <div className="text-5xl font-extralight">
          <div>FAQs</div>
          <div className="text-primary">FAQs</div>
        </div>
        <div>
          <div className="text-primary">have a Questions?</div>
          <Link
            className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
            href="#"
          >
            Contact us
          </Link>
        </div>
      </div>
      <div className="mt-12">
        {list.map((item: Question, index: number) => (
          <div
            key={item.question + index}
            className="p-6 rounded-6xl flex flex-col border cursor-pointer border-white-bg-30 mt-4 gap-10 overflow-hidden duration-[0.7s]"
            style={{
              maxHeight: item.open ? "400px" : "100px",
            }}
            onClick={() => {
              handleOpenQuestion(index);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-3xl font-thin">{item.question}</div>
              <div>
                <Icon name="plus" />
              </div>
            </div>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
